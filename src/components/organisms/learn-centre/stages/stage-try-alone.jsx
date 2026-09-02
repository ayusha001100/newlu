"use client"

import { motion } from "framer-motion"
import {
	AlertCircle,
	CheckCircle2,
	Lightbulb,
	RefreshCw,
	Target,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { sound } from "@/lib/learning/micro-audio"
import { Button } from "@/ui/button"

export default function StageTryAlone({ stageData, onStageComplete }) {
	const [selectedOption, setSelectedOption] = useState(null)
	const [feedback, setFeedback] = useState(null)
	const [showHint, setShowHint] = useState(false)

	const options = stageData?.options || []
	const correctAnswer = stageData?.correct_answer || "A"

	const handleSelect = useCallback(
		optId => {
			if (feedback) return
			setSelectedOption(optId)
			sound.playClick()

			const isCorrect = String(optId) === String(correctAnswer)
			if (isCorrect) {
				sound.playCorrect()
			} else {
				sound.playIncorrect()
			}

			setFeedback({
				explanation: isCorrect
					? stageData?.feedback?.correct ||
						"Masterful intuition! You solved the real-world challenge on your own."
					: stageData?.feedback?.incorrect ||
						"Not quite right for production environments. Review why this edge-case occurs.",
				isCorrect,
			})
		},
		[feedback, correctAnswer, stageData],
	)

	// Keyboard shortcuts for 1, 2, 3, 4 / A, B, C, D
	useEffect(() => {
		const handleKeyDown = e => {
			if (!feedback && options.length) {
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

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [feedback, options, handleSelect])

	const handleFinish = () => {
		sound.playCorrect()
		onStageComplete()
	}

	return (
		<div className="flex flex-col gap-6">
			{/* Header with Social Proof */}
			<div className="flex flex-col gap-3 rounded-2xl border border-amber-300/70 bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-white p-6 shadow-2xs">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<span className="flex items-center gap-1.5 font-bold font-mono text-[0.72rem] text-orange-700 uppercase tracking-wider">
						<Target className="size-3.5 text-orange-600" />
						{stageData?.difficulty ||
							"Level 3 · Real-World Scenario"}
					</span>

					{stageData?.social_proof && (
						<span className="rounded-full border border-orange-200 bg-orange-100/90 px-3 py-1 font-bold text-orange-800 text-xs">
							{stageData.social_proof}
						</span>
					)}
				</div>

				<h3 className="font-extrabold font-heading text-ink-900 text-xl leading-snug sm:text-2xl">
					{stageData?.title || "Production Challenge Problem"}
				</h3>

				<p className="font-medium text-base text-ink-800 leading-relaxed">
					{stageData?.prompt}
				</p>
			</div>

			{/* Hint Bar */}
			{stageData?.hint && (
				<div className="flex items-center justify-between px-1">
					<span className="font-medium font-mono text-ink-400 text-xs">
						Select the optimal architectural decision:
					</span>
					<button
						className="inline-flex items-center gap-1 font-medium text-ink-500 text-xs transition-colors hover:text-brand-ink"
						onClick={() => setShowHint(!showHint)}
						type="button"
					>
						<Lightbulb className="size-3.5" />
						<span>{showHint ? "Hide hint" : "Need hint?"}</span>
					</button>
				</div>
			)}

			{showHint && stageData?.hint && (
				<motion.div
					animate={{ height: "auto", opacity: 1 }}
					className="rounded-xl border border-brand-200 bg-amber-50/80 p-3.5 font-medium text-brand-ink text-xs"
					initial={{ height: 0, opacity: 0 }}
				>
					<strong>Hint:</strong> {stageData.hint}
				</motion.div>
			)}

			{/* Option Cards */}
			<div className="flex flex-col gap-3">
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
							badgeStyle = "bg-emerald-600 text-white font-bold"
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

			{/* Feedback & Mastery Banner */}
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
										? "Mastery Achieved! +25 XP"
										: "Production Issue Identified:"}
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
