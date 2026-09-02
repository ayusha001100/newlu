"use client"

import { motion } from "framer-motion"
import { Clock, Lightbulb, Sparkles } from "lucide-react"
import { useEffect } from "react"
import { sound } from "@/lib/learning/micro-audio"
import { Button } from "@/ui/button"

const TONE_CONFIG = {
	calm: {
		bg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
		border: "border-blue-500/30",
		label: "Deep Concept",
	},
	celebratory: {
		bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
		border: "border-emerald-500/30",
		label: "Key Milestone",
	},
	curious: {
		bg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
		border: "border-purple-500/30",
		label: "Curious Shift",
	},
	intense: {
		bg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
		border: "border-amber-500/30",
		label: "High Impact",
	},
}

export default function ConceptCard({ screen, onGotIt }) {
	const tone = TONE_CONFIG[screen.emotional_tone] || TONE_CONFIG.calm

	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault()
				sound.playClick()
				onGotIt()
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [onGotIt])

	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className="flex w-full flex-col gap-6"
			exit={{ opacity: 0, y: -14 }}
			initial={{ opacity: 0, y: 14 }}
			transition={{ duration: 0.28, ease: "easeOut" }}
		>
			{/* Tone Chips & Reading Time */}
			<div className="flex flex-wrap items-center justify-between gap-2 font-medium text-xs">
				<div className="flex items-center gap-2">
					<span
						className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-semibold text-[11px] uppercase tracking-wide ${tone.bg}`}
					>
						<Sparkles className="h-3.5 w-3.5" />
						{tone.label}
					</span>
					{screen.reading_time && (
						<span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-slate-400 dark:bg-slate-800/60 dark:text-slate-400">
							<Clock className="h-3 w-3 text-slate-400" />
							{screen.reading_time}
						</span>
					)}
				</div>

				{screen.social_proof && (
					<span className="font-medium text-[11px] text-amber-500/90 dark:text-amber-400">
						{screen.social_proof}
					</span>
				)}
			</div>

			{/* Main Concept Body */}
			<div className="flex flex-col gap-3">
				<h2 className="font-bold text-slate-900 text-xl leading-snug tracking-tight sm:text-2xl dark:text-slate-50">
					{screen.content?.headline}
				</h2>
				<p className="font-normal text-base text-slate-700 leading-relaxed sm:text-lg dark:text-slate-300">
					{screen.content?.body}
				</p>
			</div>

			{/* Visual Hint Card (if provided) */}
			{screen.content?.visual_hint && (
				<div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 text-amber-900 text-sm sm:p-4 dark:bg-amber-500/10 dark:text-amber-200">
					<Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
					<div className="font-medium text-xs sm:text-sm">
						{screen.content.visual_hint}
					</div>
				</div>
			)}

			{/* Comparison Table (if provided) */}
			{screen.content?.comparison_table && (
				<div className="overflow-x-auto rounded-xl border border-slate-200 bg-white/50 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
					<table className="w-full text-left text-xs sm:text-sm">
						<thead>
							<tr className="border-slate-200 border-b bg-slate-100 font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300">
								{screen.content.comparison_table.headers.map(
									(h, i) => (
										<th
											className="px-3 py-2 sm:px-4 sm:py-2.5"
											key={i}
										>
											{h}
										</th>
									),
								)}
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100 text-slate-600 dark:divide-slate-800 dark:text-slate-300">
							{screen.content.comparison_table.rows.map(
								(row, rIdx) => (
									<tr
										className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
										key={rIdx}
									>
										{row.map((cell, cIdx) => (
											<td
												className={`px-3 py-2 sm:px-4 sm:py-2.5 ${
													cIdx === 0
														? "font-semibold text-slate-900 dark:text-slate-100"
														: ""
												}`}
												key={cIdx}
											>
												{cell}
											</td>
										))}
									</tr>
								),
							)}
						</tbody>
					</table>
				</div>
			)}

			{/* Phase 1 Action: Got it -> Active Recall Reveal */}
			<div className="flex flex-col items-center justify-between gap-3 border-slate-200/80 border-t pt-4 sm:flex-row dark:border-slate-800/80">
				<div className="flex items-center gap-1.5 text-slate-400 text-xs">
					<kbd className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-700 dark:bg-slate-800">
						Space
					</kbd>
					<span>or</span>
					<kbd className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-700 dark:bg-slate-800">
						Enter
					</kbd>
					<span>to advance</span>
				</div>

				<Button
					className="flex h-12 w-full min-w-[160px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 font-bold text-slate-950 text-sm shadow-amber-500/20 shadow-md transition-all hover:from-amber-600 hover:to-amber-700 hover:shadow-lg active:translate-y-0.5 sm:w-auto"
					onClick={() => {
						sound.playClick()
						onGotIt()
					}}
					size="lg"
				>
					<span>Got it</span>
					<span className="text-base">→</span>
				</Button>
			</div>
		</motion.div>
	)
}
