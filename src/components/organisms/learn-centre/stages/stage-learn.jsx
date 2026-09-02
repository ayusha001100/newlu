"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
	AlertCircle,
	ArrowRight,
	CheckCircle2,
	Clock,
	Lightbulb,
	RefreshCw,
	Sparkles,
	Zap,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { sound } from "@/lib/learning/micro-audio"
import { Button } from "@/ui/button"

export default function StageLearn({ stageData, onStageComplete }) {
	const screens = stageData?.screens || []
	const [screenIdx, setScreenIdx] = useState(0)
	const [phase, setPhase] = useState("concept") // 'concept' | 'interaction'
	const [selectedOption, setSelectedOption] = useState(null)
	const [feedback, setFeedback] = useState(null)
	const [showHint, setShowHint] = useState(false)

	const currentScreen = screens[screenIdx] || screens[0]

	useEffect(() => {
		setPhase("concept")
		setSelectedOption(null)
		setFeedback(null)
		setShowHint(false)
	}, [])

	const handleGotIt = useCallback(() => {
		sound.playClick()
		setPhase("interaction")
	}, [])

	const handleSelectAnswer = useCallback(
		val => {
			if (feedback || !currentScreen) return
			setSelectedOption(val)
			sound.playClick()

			const interaction = currentScreen.interaction
			let isCorrect = false

			if (interaction?.type === "yes_no") {
				isCorrect =
					String(val).toLowerCase() ===
					String(interaction.correct_answer).toLowerCase()
			} else if (interaction?.type === "mcq") {
				isCorrect = String(val) === String(interaction.correct_answer)
			} else {
				isCorrect = true
			}

			if (isCorrect) {
				sound.playCorrect()
			} else {
				sound.playIncorrect()
			}

			setFeedback({
				explanation: isCorrect
					? currentScreen.feedback?.correct ||
						"Great job! You mastered this concept."
					: currentScreen.feedback?.incorrect ||
						"Review the explanation and try again.",
				isCorrect,
			})
		},
		[feedback, currentScreen],
	)

	// Keyboard listener for Space (Got it) and 1,2,3,4 (Options)
	useEffect(() => {
		const handleKeyDown = e => {
			if (phase === "concept" && e.code === "Space") {
				e.preventDefault()
				handleGotIt()
			} else if (phase === "interaction" && !feedback) {
				const interaction = currentScreen?.interaction
				if (interaction?.type === "yes_no") {
					if (e.key === "1" || e.key.toLowerCase() === "y") {
						handleSelectAnswer("Yes")
					} else if (e.key === "2" || e.key.toLowerCase() === "n") {
						handleSelectAnswer("No")
					}
				} else if (interaction?.type === "mcq") {
					const num = Number.parseInt(e.key, 10)
					if (num >= 1 && num <= (interaction.options?.length || 4)) {
						const opt = interaction.options[num - 1]
						if (opt) handleSelectAnswer(opt.id)
					}
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [phase, feedback, currentScreen, handleSelectAnswer, handleGotIt])

	if (!currentScreen) return null

	const handleContinue = () => {
		setFeedback(null)
		if (screenIdx < screens.length - 1) {
			setScreenIdx(prev => prev + 1)
		} else {
			sound.playCorrect()
			onStageComplete()
		}
	}

	return (
		<div className="flex flex-col gap-6">
			{/* Card Progress Stepper Header */}
			<div className="flex items-center justify-between border-line/80 border-b pb-3.5">
				<div className="flex items-center gap-2">
					<span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 font-bold font-mono text-[0.7rem] text-brand-ink uppercase tracking-wider">
						<Sparkles className="size-3.5 text-brand-ink" />
						Concept {screenIdx + 1} of {screens.length}
					</span>
					{currentScreen.reading_time && (
						<span className="hidden items-center gap-1 font-mono text-ink-400 text-xs sm:inline-flex">
							<Clock className="size-3" />
							{currentScreen.reading_time}
						</span>
					)}
				</div>

				{/* Micro-step indicators */}
				<div className="flex items-center gap-1.5">
					{screens.map((_, i) => (
						<div
							className={`h-2 rounded-full transition-all duration-300 ${
								i === screenIdx
									? "w-8 bg-brand-500"
									: i < screenIdx
										? "w-3 bg-emerald-500"
										: "w-3 bg-canvas-sunken"
							}`}
							key={i}
						/>
					))}
				</div>
			</div>

			<AnimatePresence mode="wait">
				{phase === "concept" ? (
					/* ======================================================
					   PHASE 1: BITE-SIZED CONCEPT ABSORPTION
					   ====================================================== */
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						className="flex flex-col gap-6"
						exit={{ opacity: 0, y: -8 }}
						initial={{ opacity: 0, y: 8 }}
						key={`concept-${currentScreen.screen_id}`}
						transition={{ duration: 0.18 }}
					>
						{/* Social Proof Tag */}
						{currentScreen.social_proof && (
							<div className="inline-flex items-center gap-1.5 self-start rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1 font-semibold text-amber-800 text-xs">
								<span>💡</span>
								<span>{currentScreen.social_proof}</span>
							</div>
						)}

						{/* Main Headline & Punchy Concept */}
						<div className="space-y-3">
							<h2 className="font-extrabold font-heading text-2xl text-ink-900 leading-tight tracking-tight sm:text-3xl">
								{currentScreen.content?.headline}
							</h2>
							<p className="font-normal text-base text-ink-700 leading-relaxed sm:text-lg">
								{currentScreen.content?.body}
							</p>
						</div>

						{/* Visual Comparison: Side-by-Side Modern Cards */}
						{currentScreen.content?.comparison_table ? (
							<div className="grid grid-cols-1 gap-3.5 pt-1 sm:grid-cols-2">
								{/* Left: Standard LLM */}
								<div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-canvas-muted/50 p-4.5">
									<div className="flex items-center justify-between">
										<span className="font-bold font-heading text-ink-700 text-sm">
											🤖 Standard LLM (ChatGPT)
										</span>
										<span className="rounded-md bg-canvas-sunken px-2 py-0.5 font-bold font-mono text-[0.68rem] text-ink-500">
											Passive
										</span>
									</div>
									<ul className="space-y-2 font-medium text-ink-600 text-xs">
										<li className="flex items-start gap-2">
											<span className="font-bold text-ink-400">
												•
											</span>
											<span>Text generation only</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="font-bold text-ink-400">
												•
											</span>
											<span>
												Frozen training cutoff (no live
												data)
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="font-bold text-ink-400">
												•
											</span>
											<span>
												Single prompt-response loop
											</span>
										</li>
									</ul>
								</div>

								{/* Right: AI Agent */}
								<div className="flex flex-col gap-2.5 rounded-2xl border-2 border-brand-400 bg-amber-50/40 p-4.5 shadow-2xs">
									<div className="flex items-center justify-between">
										<span className="flex items-center gap-1.5 font-extrabold font-heading text-brand-ink text-sm">
											<Zap className="size-4 fill-brand-500 text-brand-500" />
											AI Agent (ReAct)
										</span>
										<span className="rounded-md bg-brand-500 px-2 py-0.5 font-bold font-mono text-[0.68rem] text-slate-950">
											Active
										</span>
									</div>
									<ul className="space-y-2 font-medium text-ink-800 text-xs">
										<li className="flex items-start gap-2">
											<span className="font-bold text-brand-500">
												✓
											</span>
											<span>
												Calls live APIs, tools & web
												search
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="font-bold text-brand-500">
												✓
											</span>
											<span>
												Executes real actions (emails,
												payments)
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="font-bold text-brand-500">
												✓
											</span>
											<span>
												Autonomous multi-step planning
												loop
											</span>
										</li>
									</ul>
								</div>
							</div>
						) : null}

						{/* Visual Analogy / Key Takeaway Pill */}
						{currentScreen.content?.visual_hint && (
							<div className="flex items-start gap-3 rounded-2xl border border-brand-200 bg-amber-50/70 p-4 text-ink-900 shadow-2xs">
								<span className="shrink-0 text-lg">🎯</span>
								<div className="font-semibold text-xs leading-relaxed sm:text-sm">
									{currentScreen.content.visual_hint}
								</div>
							</div>
						)}

						{/* Bottom Action Button */}
						<div className="mt-2 flex items-center justify-between border-line/80 border-t pt-5">
							<span className="hidden font-mono text-ink-400 text-xs sm:inline-block">
								Press{" "}
								<kbd className="rounded border border-line bg-canvas-muted px-2 py-0.5 font-bold text-ink-700">
									Space
								</kbd>{" "}
								to test your recall
							</span>

							<Button
								className="h-12 w-full min-w-[160px] bg-brand-500 px-7 font-extrabold text-slate-950 text-sm shadow-md transition-transform hover:bg-brand-600 active:scale-[0.98] sm:w-auto"
								onClick={handleGotIt}
								size="lg"
							>
								<span>Got it</span>
								<ArrowRight className="ml-2 size-4" />
							</Button>
						</div>
					</motion.div>
				) : (
					/* ======================================================
					   PHASE 2: ACTIVE RECALL QUESTION (Duolingo Style)
					   ====================================================== */
					<motion.div
						animate={{ opacity: 1, scale: 1 }}
						className="flex flex-col gap-6"
						exit={{ opacity: 0, scale: 0.98 }}
						initial={{ opacity: 0, scale: 0.98 }}
						key={`interaction-${currentScreen.screen_id}`}
						transition={{ duration: 0.18 }}
					>
						{/* Question Prompt Header */}
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<span className="flex items-center gap-1.5 font-bold font-mono text-[0.72rem] text-brand-ink uppercase tracking-wider">
									<Zap className="size-3.5 fill-brand-500 text-brand-500" />
									Active Recall Check
								</span>
								{currentScreen.interaction?.hint && (
									<button
										className="inline-flex items-center gap-1 font-medium text-ink-500 text-xs transition-colors hover:text-brand-ink"
										onClick={() => setShowHint(!showHint)}
										type="button"
									>
										<Lightbulb className="size-3.5" />
										<span>
											{showHint
												? "Hide hint"
												: "Need hint?"}
										</span>
									</button>
								)}
							</div>

							<h3 className="font-extrabold font-heading text-ink-900 text-xl leading-snug sm:text-2xl">
								{currentScreen.interaction?.prompt}
							</h3>

							{showHint && (
								<motion.div
									animate={{ height: "auto", opacity: 1 }}
									className="rounded-xl border border-brand-200 bg-amber-50/80 p-3 font-medium text-brand-ink text-xs"
									initial={{ height: 0, opacity: 0 }}
								>
									<strong>Hint:</strong>{" "}
									{currentScreen.interaction.hint}
								</motion.div>
							)}
						</div>

						{/* 1. YES / NO Buttons */}
						{currentScreen.interaction?.type === "yes_no" && (
							<div className="grid grid-cols-2 gap-4 pt-1">
								{["Yes", "No"].map((opt, i) => {
									const isSelected = selectedOption === opt
									return (
										<button
											className={`relative flex flex-col items-center justify-center rounded-2xl border-2 p-6 font-extrabold text-2xl transition-all active:scale-[0.98] ${
												isSelected
													? "border-brand-500 bg-brand-50 text-brand-ink shadow-md"
													: "border-line bg-white text-ink-800 shadow-2xs hover:border-brand-300 hover:bg-amber-50/20"
											}`}
											disabled={Boolean(feedback)}
											key={opt}
											onClick={() =>
												handleSelectAnswer(opt)
											}
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
						)}

						{/* 2. MCQ 4-Option Cards */}
						{currentScreen.interaction?.type === "mcq" && (
							<div className="flex flex-col gap-3 pt-1">
								{(currentScreen.interaction.options || []).map(
									(opt, _i) => {
										const isSelected =
											selectedOption === opt.id
										return (
											<button
												className={`flex items-start gap-4 rounded-2xl border-2 p-4.5 text-left transition-all active:scale-[0.99] ${
													isSelected
														? "border-brand-500 bg-brand-50 text-brand-ink shadow-sm"
														: "border-line bg-white text-ink-800 shadow-2xs hover:border-brand-300 hover:bg-amber-50/20"
												}`}
												disabled={Boolean(feedback)}
												key={opt.id}
												onClick={() =>
													handleSelectAnswer(opt.id)
												}
												type="button"
											>
												<span
													className={`grid size-7 shrink-0 place-items-center rounded-xl font-extrabold font-mono text-xs ${
														isSelected
															? "bg-brand-500 text-slate-950 shadow-xs"
															: "border border-line bg-canvas-muted text-ink-700"
													}`}
												>
													{opt.id}
												</span>
												<span className="pt-0.5 font-semibold text-[0.96rem] text-ink-800 leading-relaxed">
													{opt.text}
												</span>
											</button>
										)
									},
								)}
							</div>
						)}

						{/* Feedback Result Drawer */}
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
													? "Spot on! +15 XP"
													: "Not quite — here is why:"}
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
												onClick={handleContinue}
												size="lg"
											>
												<span>Continue ➔</span>
											</Button>
										) : (
											<Button
												className="h-11 w-full border-rose-300 px-5 font-bold text-rose-900 text-sm hover:bg-rose-100/50 sm:w-auto"
												onClick={() =>
													setFeedback(null)
												}
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
				)}
			</AnimatePresence>
		</div>
	)
}
