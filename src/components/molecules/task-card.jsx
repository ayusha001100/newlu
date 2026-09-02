"use client"

import { useState } from "react"
import { logActivity } from "@/lib/data/learn"
import { Engine } from "@/lib/learning/engine"
import { cn } from "@/lib/utils"
import { useLearn } from "@/organisms/learn-centre/context"
import { Button } from "@/ui/button"
import { Textarea } from "@/ui/textarea"
import { toast } from "@/ui/toast"

export default function TaskCard({ moduleIndex, task }) {
	const { activeSlug, saveState, states } = useLearn()
	const state = states[activeSlug] || Engine.blankState()
	const done = state.tasks[task.id]
	const [note, setNote] = useState("")
	const [editing, setEditing] = useState(false)

	const submit = () => {
		const trimmed = note.trim()
		if (trimmed.length < 12) {
			toast.add({
				title: "Add a line or two about what you actually did.",
				type: "info",
			})
			return
		}
		saveState(activeSlug, current => {
			const next = structuredClone(current)
			next.tasks[task.id] = { at: Date.now(), note: trimmed }
			logActivity(next)
			return next
		})
		toast.add({
			title: "Task submitted! +25 XP Earned.",
			type: "success",
		})
		setNote("")
		setEditing(false)
	}

	const reopen = () => {
		saveState(activeSlug, current => {
			const next = structuredClone(current)
			delete next.tasks[task.id]
			return next
		})
		setEditing(true)
	}

	return (
		<article
			className={cn(
				"group relative rounded-2xl border p-5 shadow-xs transition-all duration-200",
				done && !editing
					? "border-emerald-300 bg-emerald-50/40 shadow-xs"
					: "border-line bg-white hover:border-brand-300 hover:shadow-lu-sm",
			)}
		>
			<header className="mb-2.5 flex items-start justify-between gap-3">
				<div className="flex items-center gap-2.5">
					<span
						className={cn(
							"grid size-7 shrink-0 place-items-center rounded-xl font-bold font-mono text-xs shadow-xs",
							done && !editing
								? "bg-emerald-500 text-white"
								: "border border-brand-200 bg-brand-50 text-brand-ink",
						)}
					>
						{done && !editing ? "✓" : "⚡"}
					</span>
					<h4 className="font-extrabold font-heading text-[0.98rem] text-ink-900">
						{task.title}
					</h4>
				</div>

				<div className="flex shrink-0 items-center gap-2">
					<span className="rounded-full border border-brand-200 bg-amber-50 px-2.5 py-0.5 font-bold font-mono text-[0.68rem] text-brand-ink">
						+25 XP
					</span>
					<span className="font-mono text-[0.72rem] text-ink-400">
						⏱ {task.minutes} min
					</span>
				</div>
			</header>

			<p className="mb-3.5 pl-9 text-[0.86rem] text-ink-600 leading-relaxed">
				{task.brief}
			</p>

			{done && !editing ? (
				<div className="ml-9 rounded-xl border border-emerald-200/80 bg-white p-3.5 shadow-xs">
					<div className="mb-1 flex items-center justify-between">
						<span className="font-bold font-mono text-[0.66rem] text-emerald-800 uppercase tracking-wider">
							✓ VERIFIED SUBMISSION
						</span>
						<button
							className="font-bold font-mono text-[0.72rem] text-brand-600 hover:underline"
							onClick={reopen}
							type="button"
						>
							Edit Response ✎
						</button>
					</div>
					<p className="text-[0.84rem] text-ink-800 leading-relaxed">
						{done.note}
					</p>
				</div>
			) : (
				<div className="ml-9 space-y-2.5">
					<Textarea
						className="rounded-xl border-line/80 bg-canvas-muted/30 text-[0.85rem] focus:bg-white"
						onChange={event => setNote(event.target.value)}
						placeholder="Paste your prompt, output artifact, link or summary of what you tested..."
						rows={2}
						value={note}
					/>
					<Button onClick={submit} size="sm" type="button">
						Submit Task Solution (+25 XP)
					</Button>
				</div>
			)}
			{moduleIndex !== undefined ? (
				<span className="sr-only">Module {moduleIndex + 1}</span>
			) : null}
		</article>
	)
}
