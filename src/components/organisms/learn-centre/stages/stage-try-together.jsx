"use client"

import { motion } from "framer-motion"
import {
	AlertCircle,
	CheckCircle2,
	Handshake,
	Lightbulb,
	RefreshCw,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { sound } from "@/lib/learning/micro-audio"
import { Button } from "@/ui/button"

export default function StageTryTogether({ stageData, onStageComplete }) {
	const [selectedOption, setSelectedOption] = useState(null)
	const [feedback, setFeedback] = useState(null)
	const [showHint, setShowHint] = useState(false)

	const isYesNo = stageData?.type === "yes_no"
	const options = stageData?.options || [
		{ id: "A", text: "The Tokenizer" },
		{ id: "B", text: "The Tool Execution Layer (API Handler)" },
		{ id: "C", text: "The CSS Styler" },
		{ id: "D", text: "The Browser Cache" },
	]
	const correctAnswer = stageData?.correct_answer || (isYesNo ? "Yes" : "B")

	const handleSelect = useCallback(
		optValue => {
			if (feedback) return
			setSelectedOption(optValue)
			sound.playClick()

			let isCorrect = false
			if (isYesNo) {
				isCorrect =
					String(optValue).toLowerCase() ===
					String(correctAnswer).toLowerCase()
			} else {
				isCorrect = String(optValue) === String(correctAnswer)
			}

			if (isCorrect) {
				sound.playCorrect()
			} else {
				sound.playIncorrect()
			}

			setFeedback({
				explanation: isCorrect
					? stageData?.feedback?.correct ||
						"Perfect! You understand the operational flow."
					: stageData?.feedback?.incorrect ||
						"Not quite. Check the hint and try again.",
				isCorrect,
			})
		},
		[feedback, isYesNo, correctAnswer, stageData],
	)

	// Keyboard shortcuts for 1, 2, 3, 4 / Yes, No
	useEffect(() => {
		const handleKeyDown = e => {
			if (!feedback) {
				if (isYesNo) {
					if (e.key === "1" || e.key.toLowerCase() === "y") {
						handleSelect("Yes")
					} else if (e.key === "2" || e.key.toLowerCase() === "n") {
						handleSelect("No")
					}
				} else if (options.length) {
					const num = Number.parseInt(e.key, 10)
					if (num >= 1 && num <= options.length) {
						const opt = options[num - 1]
						if (opt) handleSelect(opt.id)
					} else {
						const key = e.key.toUpperCase()
						const opt = options.find(o => o.id === key)
						if (opt) handleSelect(opt.id)
					}
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [feedback, isYesNo, options, handleSelect])

	const handleFinish = () => {
		sound.playCorrect()
		onStageComplete()
	}

	return (
		<div className="flex flex-col gap-6">
			{/* Guided Header Card */}
			<div className="flex flex-col gap-3 rounded-2xl border border-brand-200 bg-amber-50/60 p-6 shadow-2xs">
				<div className="flex items-center justify-between">
					<span className="flex items-center gap-1.5 font-bold font-mono text-[0.72rem] text-brand-ink uppercase tracking-wider">
						<Handshake className="size-3.5 text-brand-ink" />
						Guided Practice Challenge
					</span>
					{stageData?.hint && (
						<button
							className="inline-flex items-center gap-1 font-medium text-ink-500 text-xs transition-colors hover:text-brand-ink"
							onClick={() => setShowHint(!showHint)}
							type="button"
						>
							<Lightbulb className="size-3.5" />
							<span>{showHint ? "Hide hint" : "Need hint?"}</span>
						</button>
					)}
				</div>
				<h3 className="font-extrabold font-heading text-ink-900 text-xl leading-snug sm:text-2xl">
					{stageData?.title || "Guided Architecture Exercise"}
				</h3>
				<p className="font-medium text-base text-ink-800 leading-relaxed">
					{stageData?.prompt ||
						"Select the correct component responsible for this task:"}
				</p>

				{showHint && stageData?.hint && (
					<motion.div
						animate={{ height: "auto", opacity: 1 }}
						className="mt-2 rounded-xl border border-brand-300 bg-white p-3.5 font-medium text-brand-ink text-xs"
						initial={{ height: 0, opacity: 0 }}
					>
						<strong>Guided Hint:</strong> {stageData.hint}
					</motion.div>
				)}
			</div>

			{/* 1. YES / NO Options */}
			{isYesNo ? (
				<div className="grid grid-cols-2 gap-4 pt-1">
					{["Yes", "No"].map((opt, i) => {
						const isSelected = selectedOption === opt
						const isAnswer =
							opt.toLowerCase() ===
							String(correctAnswer).toLowerCase()

						let cardStyle =
							"border-line bg-white text-ink-800 hover:border-brand-300 hover:bg-amber-50/20 shadow-2xs"

						if (feedback) {
							if (isAnswer) {
								cardStyle =
									"border-2 border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm"
							} else if (isSelected && !feedback.isCorrect) {
								cardStyle =
									"border-2 border-rose-500 bg-rose-50 text-rose-950 shadow-sm"
							} else {
								cardStyle =
									"border-line bg-white text-ink-400 opacity-40"
							}
						} else if (isSelected) {
							cardStyle =
								"border-2 border-brand-500 bg-brand-50 text-brand-ink shadow-sm"
						}

						return (
							<button
								className={`relative flex flex-col items-center justify-center rounded-2xl border-2 p-6 font-extrabold text-2xl transition-all active:scale-[0.98] ${cardStyle}`}
								disabled={Boolean(feedback)}
								key={opt}
								onClick={() => handleSelect(opt)}
								type="button"
							>
								<span className="absolute top-3 left-3 rounded-md bg-canvas-muted px-1.5 py-0.5 font-bold font-mono text-[0.65rem] text-ink-500">
									{i + 1}
								</span>
								<span>{opt}</span>
							</button>
						)
					})}
				</div>
			) : (
				/* 2. MCQ 4-Option Cards */
				<div className="flex flex-col gap-3 pt-1">
					{options.map(opt => {
						const isSelected = selectedOption === opt.id
						const isAnswer = opt.id === correctAnswer

						let cardStyle =
							"border-line bg-white text-ink-800 hover:border-brand-300 hover:bg-amber-50/20 shadow-2xs"
						let badgeStyle =
							"border border-line bg-canvas-muted text-ink-700"

						if (feedback) {
							if (isAnswer) {
								cardStyle =
									"border-2 border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm"
								badgeStyle =
									"bg-emerald-600 text-white font-bold"
							} else if (isSelected && !feedback.isCorrect) {
								cardStyle =
									"border-2 border-rose-500 bg-rose-50 text-rose-950 shadow-sm"
								badgeStyle = "bg-rose-600 text-white font-bold"
							} else {
								cardStyle =
									"border-line bg-white text-ink-400 opacity-40"
							}
						} else if (isSelected) {
							cardStyle =
								"border-2 border-brand-500 bg-brand-50 text-brand-ink shadow-sm"
							badgeStyle = "bg-brand-500 text-slate-950 font-bold"
						}

						return (
							<button
								className={`flex items-start gap-4 rounded-2xl p-4.5 text-left transition-all active:scale-[0.99] ${cardStyle}`}
								disabled={Boolean(feedback)}
								key={opt.id}
								onClick={() => handleSelect(opt.id)}
								type="button"
							>
								<span
									className={`grid size-7 shrink-0 place-items-center rounded-xl font-bold font-mono text-xs ${badgeStyle}`}
								>
									{opt.id}
								</span>
								<span className="pt-0.5 font-semibold text-[0.96rem] leading-relaxed">
									{opt.text}
								</span>
							</button>
						)
					})}
				</div>
			)}

			{/* Immediate Feedback Banner */}
			{feedback && (
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className={`rounded-2xl border-2 p-5 ${
						feedback.isCorrect
							? "border-emerald-500/40 bg-emerald-50 text-emerald-950"
							: "border-rose-500/40 bg-rose-50 text-rose-950"
					}`}
					initial={{ opacity: 0, y: 12 }}
				>
					<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
						<div className="flex items-start gap-3.5">
							<div
								className={`grid size-10 shrink-0 place-items-center rounded-xl font-bold text-white shadow-xs ${
									feedback.isCorrect
										? "bg-emerald-600"
										: "bg-rose-600"
								}`}
							>
								{feedback.isCorrect ? (
									<CheckCircle2 className="size-6" />
								) : (
									<AlertCircle className="size-6" />
								)}
							</div>
							<div className="space-y-1">
								<h4 className="font-extrabold font-heading text-base">
									{feedback.isCorrect
										? "Correct! +25 XP"
										: "Not quite — review the hint:"}
								</h4>
								<p className="max-w-xl font-medium text-ink-800 text-xs leading-relaxed sm:text-sm">
									{feedback.explanation}
								</p>
							</div>
						</div>

						<div className="w-full shrink-0 pt-2 sm:w-auto sm:pt-0">
							{feedback.isCorrect ? (
								<Button
									className="h-11 w-full bg-emerald-600 px-6 font-extrabold text-sm text-white shadow-sm hover:bg-emerald-700 sm:w-auto"
									onClick={handleFinish}
									size="lg"
								>
									<span>Stage Complete ➔</span>
								</Button>
							) : (
								<Button
									className="h-11 w-full border-rose-300 px-5 font-bold text-rose-900 text-sm hover:bg-rose-100/50 sm:w-auto"
									onClick={() => setFeedback(null)}
									size="lg"
									variant="outline"
								>
									<RefreshCw className="mr-2 size-4" />
									Try Again
								</Button>
							)}
						</div>
					</div>
				</motion.div>
			)}
		</div>
	)
}
