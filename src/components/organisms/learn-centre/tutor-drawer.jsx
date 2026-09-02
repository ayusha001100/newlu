"use client"

import { useEffect, useRef, useState } from "react"
import { useAskTutor } from "@/hooks/learn/useAskTutor"
import { Engine } from "@/lib/learning/engine"
import { cn } from "@/lib/utils"
import { useLearn } from "@/organisms/learn-centre/context"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/ui/sheet"
import { Spinner } from "@/ui/spinner"

export default function TutorDrawer() {
	const { activeSlug, states, tutorOpen, closeTutor, tutorSeed } = useLearn()
	const ask = useAskTutor()
	const [question, setQuestion] = useState("")
	const [messages, setMessages] = useState([])
	const bottomRef = useRef(null)

	const suggestions =
		activeSlug && states[activeSlug]
			? Engine.tutorSuggestions(activeSlug, states[activeSlug])
			: ["How am I doing?", "What should I revise?"]

	useEffect(() => {
		if (!(tutorOpen && tutorSeed)) return
		let cancelled = false
		const run = async () => {
			const q = tutorSeed.trim()
			if (!q || cancelled) return
			setQuestion("")
			setMessages(prev => [...prev, { role: "user", text: q }])
			try {
				const result = await ask.mutateAsync({
					question: q,
					slug: activeSlug || "",
				})
				if (cancelled) return
				const body = Array.isArray(result.body)
					? result.body
					: [result.body]
				setMessages(prev => [
					...prev,
					{
						role: "tutor",
						source: result.source,
						text: body.join("\n\n"),
					},
				])
			} catch {
				if (!cancelled) {
					setMessages(prev => [
						...prev,
						{
							role: "tutor",
							text: "Something went wrong. Try again in a moment.",
						},
					])
				}
			}
		}
		run()
		return () => {
			cancelled = true
		}
	}, [activeSlug, ask, tutorOpen, tutorSeed])

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [])

	const send = async text => {
		const q = text.trim()
		if (!q) return
		setQuestion("")
		setMessages(prev => [...prev, { role: "user", text: q }])
		try {
			const result = await ask.mutateAsync({
				question: q,
				slug: activeSlug || "",
			})
			const body = Array.isArray(result.body)
				? result.body
				: [result.body]
			setMessages(prev => [
				...prev,
				{
					role: "tutor",
					source: result.source,
					text: body.join("\n\n"),
				},
			])
		} catch {
			setMessages(prev => [
				...prev,
				{
					role: "tutor",
					text: "Something went wrong. Try again in a moment.",
				},
			])
		}
	}

	return (
		<Sheet onOpenChange={open => !open && closeTutor()} open={tutorOpen}>
			<SheetContent
				className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
				side="right"
			>
				<SheetHeader className="border-line border-b px-5 py-4">
					<SheetTitle>AI Tutor</SheetTitle>
					<p className="text-[0.84rem] text-ink-500">
						Grounded in your curriculum and progress — not a live
						model.
					</p>
				</SheetHeader>

				<div className="flex flex-1 flex-col overflow-hidden">
					<div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
						{!messages.length ? (
							<p className="text-[0.86rem] text-ink-500">
								Ask about a topic, your progress, or what to
								revise next.
							</p>
						) : null}
						{messages.map((msg, index) => (
							<div
								className={cn(
									"whitespace-pre-wrap rounded-xl px-3.5 py-2.5 text-[0.88rem] leading-[1.55]",
									msg.role === "user"
										? "ml-8 bg-brand-500 text-white"
										: "mr-4 border border-line bg-bg-050 text-ink-900",
								)}
								key={`${msg.role}-${index}`}
							>
								{msg.text}
								{msg.source ? (
									<small className="mt-2 block text-[0.72rem] text-ink-500">
										Source: {msg.source}
									</small>
								) : null}
							</div>
						))}
						{ask.isPending ? (
							<div className="flex items-center gap-2 text-[0.84rem] text-ink-500">
								<Spinner className="size-4" />
								Thinking…
							</div>
						) : null}
						<div ref={bottomRef} />
					</div>

					<div className="border-line border-t px-5 py-3">
						<div className="mb-3 flex flex-wrap gap-1.5">
							{suggestions.map(item => (
								<button
									className="rounded-full border border-line bg-white px-3 py-1 font-bold text-[0.74rem] text-ink-500 hover:border-brand-200 hover:text-brand-ink"
									key={item}
									onClick={() => send(item)}
									type="button"
								>
									{item}
								</button>
							))}
						</div>
						<form
							className="flex gap-2"
							onSubmit={event => {
								event.preventDefault()
								send(question)
							}}
						>
							<Input
								onChange={event =>
									setQuestion(event.target.value)
								}
								placeholder="Ask the tutor…"
								value={question}
							/>
							<Button disabled={ask.isPending} type="submit">
								Send
							</Button>
						</form>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}
