"use client"

import { motion } from "framer-motion"
import { Lightbulb, Sparkles } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { sound } from "@/lib/learning/micro-audio"

export default function InteractionCard({
	interaction,
	onSubmit,
	disabled = false,
}) {
	const [selectedOption, setSelectedOption] = useState(null)
	const [showHint, setShowHint] = useState(false)

	useEffect(() => {
		setSelectedOption(null)
		setShowHint(false)
	}, [])

	const handleSelect = useCallback(
		val => {
			if (disabled) return
			setSelectedOption(val)
			sound.playClick()
			onSubmit(val)
		},
		[disabled, onSubmit],
	)

	// Keyboard shortcuts for MCQ and Yes/No
	useEffect(() => {
		if (disabled) return

		const handleKeyDown = e => {
			if (interaction?.type === "yes_no") {
				if (e.key === "1" || e.key.toLowerCase() === "y") {
					handleSelect("Yes")
				} else if (e.key === "2" || e.key.toLowerCase() === "n") {
					handleSelect("No")
				}
			} else if (interaction?.type === "mcq" && interaction?.options) {
				const key = e.key.toUpperCase()
				const num = Number.parseInt(e.key, 10)
				const validKeys = ["A", "B", "C", "D"]

				if (num >= 1 && num <= interaction.options.length) {
					const opt = interaction.options[num - 1]
					if (opt) handleSelect(opt.id)
				} else if (validKeys.includes(key)) {
					const opt = interaction.options.find(o => o.id === key)
					if (opt) handleSelect(opt.id)
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [interaction, disabled, handleSelect])

	return (
		<motion.div
			animate={{ opacity: 1, scale: 1 }}
			className="flex w-full flex-col gap-5"
			initial={{ opacity: 0, scale: 0.98 }}
			transition={{ duration: 0.25, ease: "easeOut" }}
		>
			{/* Question Header & Hint */}
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between gap-2">
					<span className="inline-flex items-center gap-1 font-bold text-[11px] text-amber-500 uppercase tracking-wider">
						<Sparkles className="h-3.5 w-3.5" />
						Active Recall Challenge
					</span>
					{interaction.hint && (
						<button
							className="inline-flex items-center gap-1 text-slate-500 text-xs transition-colors hover:text-amber-500 dark:hover:text-amber-400"
							onClick={() => setShowHint(!showHint)}
							type="button"
						>
							<Lightbulb className="h-3.5 w-3.5" />
							<span>
								{showHint ? "Hide Hint" : "Need a Hint?"}
							</span>
						</button>
					)}
				</div>

				<h3 className="font-bold text-lg text-slate-900 leading-snug sm:text-xl dark:text-slate-100">
					{interaction.prompt}
				</h3>

				{showHint && (
					<motion.div
						animate={{ height: "auto", opacity: 1 }}
						className="mt-1 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-amber-800 text-xs dark:text-amber-200"
						initial={{ height: 0, opacity: 0 }}
					>
						<strong>Hint:</strong> {interaction.hint}
					</motion.div>
				)}
			</div>

			{/* 1. YES / NO Binary Cards */}
			{interaction.type === "yes_no" && (
				<div className="grid grid-cols-2 gap-3 pt-2 sm:gap-4">
					{(interaction.options || ["Yes", "No"]).map((opt, i) => {
						const isSelected = selectedOption === opt
						return (
							<button
								className={`group relative flex cursor-pointer select-none flex-col items-center justify-center rounded-2xl border-2 p-5 font-bold text-lg transition-all active:scale-[0.98] sm:p-6 ${
									isSelected
										? "border-amber-500 bg-amber-500/10 text-amber-500 shadow-amber-500/10 shadow-md dark:text-amber-400"
										: "border-slate-200 bg-white text-slate-800 shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800/60"
								}`}
								disabled={disabled}
								key={opt}
								onClick={() => handleSelect(opt)}
								type="button"
							>
								<span className="absolute top-2 left-2 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 dark:bg-slate-800">
									{i === 0 ? "1" : "2"}
								</span>
								<span className="text-xl tracking-wide sm:text-2xl">
									{opt}
								</span>
							</button>
						)
					})}
				</div>
			)}

			{/* 2. MCQ 4-Option Cards */}
			{interaction.type === "mcq" && (
				<div className="flex flex-col gap-2.5 pt-1 sm:gap-3">
					{(interaction.options || []).map(opt => {
						const isSelected = selectedOption === opt.id
						return (
							<button
								className={`group relative flex cursor-pointer select-none items-start gap-3.5 rounded-xl border-2 p-3.5 text-left transition-all active:scale-[0.99] sm:p-4 ${
									isSelected
										? "border-amber-500 bg-amber-500/10 text-amber-900 shadow-sm dark:text-amber-100"
										: "border-slate-200 bg-white text-slate-800 shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
								}`}
								disabled={disabled}
								key={opt.id}
								onClick={() => handleSelect(opt.id)}
								type="button"
							>
								<div
									className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border font-bold text-xs transition-colors ${
										isSelected
											? "border-amber-500 bg-amber-500 text-slate-950"
											: "border-slate-200 bg-slate-100 text-slate-600 group-hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
									}`}
								>
									{opt.id}
								</div>
								<div className="pt-0.5 font-medium text-sm leading-relaxed sm:text-base">
									{opt.text}
								</div>
							</button>
						)
					})}
				</div>
			)}

			{/* 3. Quick Reflection */}
			{interaction.type === "quick_reflection" && (
				<div className="flex flex-col gap-2.5 pt-1">
					{(interaction.options || []).map((opt, i) => (
						<button
							className="cursor-pointer rounded-xl border-2 border-slate-200 bg-white p-4 text-left font-medium text-slate-800 text-sm transition-all hover:border-purple-500 hover:bg-purple-500/5 active:scale-[0.99] sm:text-base dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-purple-500"
							disabled={disabled}
							key={i}
							onClick={() => handleSelect(opt)}
							type="button"
						>
							{opt}
						</button>
					))}
				</div>
			)}
		</motion.div>
	)
}
