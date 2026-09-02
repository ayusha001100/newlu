"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
	AlertCircle,
	CheckCircle2,
	Flame,
	RefreshCw,
	Trophy,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { sound } from "@/lib/learning/micro-audio"
import { Button } from "@/ui/button"

export default function StageCheck({ stageData, onStageComplete }) {
	const questions = stageData?.questions || [
		{
			answer: 0,
			options: [
				"It provides scalable, production-grade automation",
				"It is only used for temporary testing",
				"It slows down development without benefits",
				"It cannot run in modern cloud infrastructure",
			],
			q: "What is the primary benefit of mastering this module?",
			why: "Understanding these principles enables scalable, industry-standard systems.",
		},
	]

	const [qIdx, setQIdx] = useState(0)
	const [selectedOpt, setSelectedOpt] = useState(null)
	const [feedback, setFeedback] = useState(null)
	const [_score, setScore] = useState(0)

	const currentQ = questions[qIdx] || questions[0]
	const isLastQ = qIdx === questions.length - 1

	useEffect(() => {
		setSelectedOpt(null)
		setFeedback(null)
	}, [])

	const handleSelect = useCallback(
		optIndex => {
			if (feedback || !currentQ) return
			setSelectedOpt(optIndex)
			sound.playClick()

			const isCorrect = optIndex === currentQ.answer
			if (isCorrect) {
				sound.playCorrect()
				setScore(prev => prev + 1)
			} else {
				sound.playIncorrect()
			}

			setFeedback({
				explanation: isCorrect
					? currentQ.why ||
						"Spot on! You locked in this core principle."
					: currentQ.why ||
						"Review the correct concept and try again.",
				isCorrect,
			})
		},
		[feedback, currentQ],
	)

	// Keyboard shortcuts for 1, 2, 3, 4
	useEffect(() => {
		const handleKeyDown = e => {
			if (!feedback && currentQ) {
				const num = Number.parseInt(e.key, 10)
				if (num >= 1 && num <= currentQ.options.length) {
					handleSelect(num - 1)
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [feedback, currentQ, handleSelect])

	const handleNext = () => {
		if (!isLastQ) {
			setQIdx(prev => prev + 1)
		} else {
			sound.playFanfare()
			onStageComplete()
		}
	}

	return (
		<div className="flex flex-col gap-6">
			{/* Top Assessment Stepper */}
			<div className="flex items-center justify-between border-line border-b pb-3.5">
				<div className="flex items-center gap-2">
					<span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-amber-50 px-3 py-1 font-bold font-mono text-[0.7rem] text-brand-ink uppercase tracking-wider">
						<Trophy className="size-3.5 text-brand-ink" />
						Question {qIdx + 1} of {questions.length}
					</span>
					<span className="hidden items-center gap-1 font-mono font-semibold text-ink-400 text-xs sm:inline-flex">
						<Flame className="size-3.5 fill-orange-500 text-orange-500" />
						Streak Saver
					</span>
				</div>

				{/* Micro-step indicators */}
				<div className="flex items-center gap-1.5">
					{questions.map((_, i) => (
						<div
							className={`h-2 rounded-full transition-all duration-300 ${
								i === qIdx
									? "w-8 bg-brand-500"
									: i < qIdx
										? "w-3 bg-emerald-500"
										: "w-3 bg-canvas-sunken"
							}`}
							key={i}
						/>
					))}
				</div>
			</div>

			{/* Active Question Card */}
			<AnimatePresence mode="wait">
				<motion.div
					animate={{ opacity: 1, x: 0 }}
					className="flex flex-col gap-6"
					exit={{ opacity: 0, x: -10 }}
					initial={{ opacity: 0, x: 10 }}
					key={`q-${qIdx}`}
					transition={{ duration: 0.18 }}
				>
					{/* Question Headline */}
					<div className="space-y-1.5">
						<span className="font-bold font-mono text-brand-ink text-xs uppercase tracking-wider">
							Mastery Verification
						</span>
						<h3 className="font-extrabold font-heading text-ink-900 text-xl leading-snug sm:text-2xl">
							{currentQ.q}
						</h3>
					</div>

					{/* 4 Interactive Option Cards */}
					<div className="flex flex-col gap-3 pt-1">
						{currentQ.options.map((opt, optIndex) => {
							const isSelected = selectedOpt === optIndex
							const isAnswer = optIndex === currentQ.answer
							const letter = String.fromCharCode(65 + optIndex)

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
									badgeStyle =
										"bg-rose-600 text-white font-bold"
								} else {
									cardStyle =
										"border-line bg-white text-ink-400 opacity-40"
								}
							} else if (isSelected) {
								cardStyle =
									"border-2 border-brand-500 bg-brand-50 text-brand-ink shadow-sm"
								badgeStyle =
									"bg-brand-500 text-slate-950 font-bold"
							}

							return (
								<button
									className={`flex items-start gap-4 rounded-2xl p-4.5 text-left transition-all active:scale-[0.99] ${cardStyle}`}
									disabled={Boolean(feedback)}
									key={optIndex}
									onClick={() => handleSelect(optIndex)}
									type="button"
								>
									<span
										className={`grid size-7 shrink-0 place-items-center rounded-xl font-bold font-mono text-xs ${badgeStyle}`}
									>
										{letter}
									</span>
									<span className="pt-0.5 font-semibold text-[0.96rem] leading-relaxed">
										{opt}
									</span>
								</button>
							)
						})}
					</div>

					{/* Feedback Banner */}
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
												? "Correct! +20 XP"
												: "Incorrect — here is why:"}
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
											onClick={handleNext}
											size="lg"
										>
											<span>
												{isLastQ
													? "Complete Check ➔"
													: "Next Question ➔"}
											</span>
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
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
