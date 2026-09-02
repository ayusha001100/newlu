"use client"

import { useEffect, useRef, useState } from "react"
import Container from "@/atoms/container"
import Reveal from "@/atoms/reveal"
import { REVIEWS } from "@/lib/data/home"
import { cn } from "@/lib/utils"
import GoogleRating from "@/molecules/google-rating"
import SectionHead from "@/molecules/section-head"

function TypewriterText({
	className,
	isQuote = true,
	speed = 22,
	startDelay = 0,
	text,
}) {
	const [displayedText, setDisplayedText] = useState("")
	const [isTyping, setIsTyping] = useState(false)
	const [hasStarted, setHasStarted] = useState(false)
	const containerRef = useRef(null)

	useEffect(() => {
		const node = containerRef.current
		if (!node) return

		if (
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			setDisplayedText(text)
			return
		}

		const observer = new IntersectionObserver(
			entries => {
				if (entries[0]?.isIntersecting && !hasStarted) {
					setHasStarted(true)
					observer.disconnect()
				}
			},
			{ rootMargin: "0px 0px -40px 0px", threshold: 0.15 },
		)

		observer.observe(node)
		return () => observer.disconnect()
	}, [hasStarted, text])

	useEffect(() => {
		if (!hasStarted) return

		let timeoutId
		let intervalId

		timeoutId = setTimeout(() => {
			setIsTyping(true)
			let currentIndex = 0

			intervalId = setInterval(() => {
				if (currentIndex <= text.length) {
					setDisplayedText(text.slice(0, currentIndex))
					currentIndex += 1
				} else {
					setIsTyping(false)
					clearInterval(intervalId)
				}
			}, speed)
		}, startDelay)

		return () => {
			clearTimeout(timeoutId)
			clearInterval(intervalId)
		}
	}, [hasStarted, text, speed, startDelay])

	return (
		<div className="relative mb-[22px] flex-1" ref={containerRef}>
			{/* Invisible text placeholder to lock card height and prevent layout shift */}
			<div
				aria-hidden="true"
				className={cn(
					"pointer-events-none invisible select-none font-heading text-[1.02rem] leading-[1.5] tracking-[-0.015em]",
					isQuote ? "font-semibold" : "font-medium italic",
					className,
				)}
			>
				{text}
			</div>

			{/* Visible typing text */}
			<div
				className={cn(
					"absolute inset-0 font-heading text-[1.02rem] leading-[1.5] tracking-[-0.015em]",
					isQuote
						? "font-semibold text-white"
						: "font-medium text-[rgba(255,255,255,0.82)] italic",
					className,
				)}
			>
				{displayedText}
				{isTyping && (
					<span
						aria-hidden="true"
						className="ml-0.5 inline-block animate-pulse font-bold font-mono text-brand-400 drop-shadow-[0_0_8px_rgba(255,179,0,0.8)]"
					>
						|
					</span>
				)}
			</div>
		</div>
	)
}

function ReviewCard({ index, review }) {
	const isQuote = Boolean(review.quote)
	const rawText = review.quote || review.summary

	return (
		<Reveal
			as="article"
			className="group relative flex h-full flex-col rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-6 py-[26px] transition-all duration-[350ms] hover:-translate-y-1.5 hover:border-[rgba(var(--brand-rgb),0.5)] hover:bg-[rgba(255,255,255,0.07)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.35),0_0_20px_rgba(255,179,0,0.08)] max-[720px]:last:col-span-1 max-[980px]:last:col-span-2"
			delay={(index % 4) * 80}
		>
			<div className="mb-4 flex items-center justify-between">
				<span
					aria-hidden="true"
					className="text-[0.92rem] text-brand-500 tracking-[2px]"
				>
					★★★★★
				</span>
				<span className="font-mono text-[0.68rem] text-white/30 uppercase tracking-widest transition-colors group-hover:text-brand-400">
					VERIFIED REVIEW
				</span>
			</div>

			<TypewriterText
				isQuote={isQuote}
				speed={20}
				startDelay={index * 200 + 100}
				text={rawText}
			/>

			<footer className="mt-auto flex items-center gap-3 border-white/5 border-t pt-4">
				<span
					aria-hidden="true"
					className="grid size-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(180deg,var(--brand-400),var(--brand-500))] font-extrabold font-heading text-[0.78rem] text-[var(--on-brand)] shadow-[0_2px_8px_rgba(255,179,0,0.3)] transition-transform duration-300 group-hover:scale-105"
				>
					{review.initials}
				</span>
				<span>
					<strong className="block text-[#fff] text-[0.92rem]">
						{review.author}
					</strong>
					<small className="text-[0.78rem] text-[rgba(255,255,255,0.55)]">
						{review.program}
					</small>
				</span>
			</footer>
		</Reveal>
	)
}

export default function StudentReviews() {
	return (
		<section
			className="bg-[var(--ink-900)] py-[100px] text-[#fff] [background-image:radial-gradient(760px_320px_at_50%_0%,rgba(var(--brand-rgb),0.12),transparent_70%)] max-[720px]:py-[68px]"
			id="success"
		>
			<Container>
				<SectionHead
					eyebrow="Student reviews"
					light
					title="What 4,911 students rated us"
				>
					Unedited, from our Google listing and public review pages.
				</SectionHead>
				<Reveal className="mx-auto mb-11 w-fit max-w-full max-[720px]:mb-7">
					<GoogleRating />
				</Reveal>
				<div className="grid grid-cols-3 gap-5 max-[720px]:grid-cols-1 max-[980px]:grid-cols-2">
					{REVIEWS.map((review, index) => (
						<ReviewCard
							index={index}
							key={review.author}
							review={review}
						/>
					))}
				</div>
				<p className="mx-auto mt-[34px] max-w-[720px] text-center text-[0.78rem] text-[rgba(255,255,255,0.42)] leading-[1.6]">
					The 4.6/5 rating is from the LetsUpgrade Google Business
					listing (Vashi). Individual reviews above are student
					reviews published on public third-party review pages, shown
					verbatim where a written quote exists.
				</p>
			</Container>
		</section>
	)
}
