"use client"

import { useEffect, useState } from "react"
import { LEARNER_COUNT } from "@/lib/data/home"

const formatCount = value => value.toLocaleString("en-IN")

export default function LearnerCount() {
	const [count, setCount] = useState(LEARNER_COUNT)

	useEffect(() => {
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches
		if (reduced) {
			setCount(LEARNER_COUNT)
			return
		}

		let shown = LEARNER_COUNT - 240
		let frame = 0
		const paint = () => {
			if (shown >= LEARNER_COUNT) {
				setCount(LEARNER_COUNT)
				return
			}
			shown += Math.max(1, Math.ceil((LEARNER_COUNT - shown) / 16))
			setCount(shown)
			frame = requestAnimationFrame(paint)
		}
		frame = requestAnimationFrame(paint)
		return () => cancelAnimationFrame(frame)
	}, [])

	return (
		<strong className="font-extrabold font-heading text-[clamp(1.55rem,2.4vw,1.95rem)] text-ink-900 tabular-nums leading-none tracking-[-0.04em]">
			{formatCount(count)}
		</strong>
	)
}
