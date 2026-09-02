"use client"

import { motion } from "framer-motion"
import {
	AlertCircle,
	ArrowRight,
	CheckCircle2,
	RefreshCw,
	Sparkles,
} from "lucide-react"
import { useEffect } from "react"
import { sound } from "@/lib/learning/micro-audio"
import { Button } from "@/ui/button"

export default function FeedbackDrawer({
	isCorrect,
	isReflection = false,
	explanation,
	reassuranceMessage,
	xpGained = 50,
	onContinue,
	onRetry,
	canRetry = true,
}) {
	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault()
				sound.playClick()
				if (isCorrect || isReflection || !canRetry) {
					onContinue()
				} else {
					onRetry()
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [isCorrect, isReflection, canRetry, onContinue, onRetry])

	const isPositive = isCorrect || isReflection

	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className={`fixed right-0 bottom-0 left-0 z-50 border-t-2 p-4 shadow-2xl backdrop-blur-md sm:p-6 ${
				isReflection
					? "border-purple-500/40 bg-purple-950/95 text-purple-100"
					: isCorrect
						? "border-emerald-500/40 bg-emerald-950/95 text-emerald-100"
						: "border-rose-500/40 bg-rose-950/95 text-rose-100"
			}`}
			exit={{ opacity: 0, y: "100%" }}
			initial={{ opacity: 0, y: "100%" }}
			transition={{ damping: 28, stiffness: 320, type: "spring" }}
		>
			<div className="mx-auto flex max-w-2xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
				{/* Status & Explanation */}
				<div className="flex flex-1 items-start gap-3.5">
					<div
						className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
							isReflection
								? "bg-purple-500/20 text-purple-300"
								: isCorrect
									? "bg-emerald-500/20 text-emerald-300"
									: "bg-rose-500/20 text-rose-300"
						}`}
					>
						{isReflection ? (
							<Sparkles className="h-6 w-6" />
						) : isCorrect ? (
							<CheckCircle2 className="h-6 w-6" />
						) : (
							<AlertCircle className="h-6 w-6" />
						)}
					</div>

					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-2">
							<span className="font-bold text-base sm:text-lg">
								{isReflection
									? "Reflection Logged"
									: isCorrect
										? "Spot on! Perfect logic"
										: "Not quite, but good effort!"}
							</span>
							{isPositive && xpGained > 0 && (
								<span className="rounded-full border border-amber-500/30 bg-amber-500/20 px-2 py-0.5 font-black text-amber-300 text-xs">
									+{xpGained} XP
								</span>
							)}
						</div>

						{explanation && (
							<p className="max-w-xl text-slate-200/90 text-xs leading-relaxed sm:text-sm">
								{explanation}
							</p>
						)}

						{reassuranceMessage && (
							<p className="mt-0.5 text-[11px] text-amber-300/80 italic">
								{reassuranceMessage}
							</p>
						)}
					</div>
				</div>

				{/* CTA Buttons */}
				<div className="flex w-full shrink-0 items-center gap-2 pt-2 sm:w-auto sm:pt-0">
					{!isPositive && canRetry && (
						<Button
							className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border-rose-400/40 bg-transparent px-4 font-semibold text-rose-200 text-xs hover:bg-rose-900/40 sm:flex-initial sm:text-sm"
							onClick={() => {
								sound.playClick()
								onRetry()
							}}
							type="button"
							variant="outline"
						>
							<RefreshCw className="h-3.5 w-3.5" />
							<span>Try Again</span>
						</Button>
					)}

					<Button
						className={`flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl px-6 font-bold text-xs shadow-lg transition-all active:translate-y-0.5 sm:flex-initial sm:text-sm ${
							isReflection
								? "bg-purple-500 text-white hover:bg-purple-600"
								: isCorrect
									? "bg-emerald-500 text-slate-950 hover:bg-emerald-600"
									: "bg-rose-500 text-white hover:bg-rose-600"
						}`}
						onClick={() => {
							sound.playClick()
							onContinue()
						}}
						type="button"
					>
						<span>Continue</span>
						<ArrowRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</motion.div>
	)
}
