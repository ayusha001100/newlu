"use client"

import { motion } from "framer-motion"
import { ArrowRight, Briefcase, Flame, Sparkles, Trophy } from "lucide-react"
import { useEffect, useRef } from "react"
import { sound } from "@/lib/learning/micro-audio"
import { MicroEngine } from "@/lib/learning/micro-engine"
import { Button } from "@/ui/button"

export default function ModuleCompleteCelebration({
	module,
	state,
	onNextModule,
	onOpenVault,
	onBackToMap,
}) {
	const canvasRef = useRef(null)

	useEffect(() => {
		sound.playFanfare()

		// Simple procedural canvas confetti
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext("2d")
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		const particles = []
		const colors = [
			"#FFB300",
			"#10B981",
			"#3B82F6",
			"#EC4899",
			"#8B5CF6",
			"#F59E0B",
		]

		for (let i = 0; i < 120; i++) {
			particles.push({
				alpha: 1,
				color: colors[Math.floor(Math.random() * colors.length)],
				rotation: Math.random() * 360,
				size: Math.random() * 8 + 4,
				vRot: (Math.random() - 0.5) * 10,
				vx: (Math.random() - 0.5) * 16,
				vy: (Math.random() - 0.7) * 16,
				x: canvas.width / 2,
				y: canvas.height / 2,
			})
		}

		let animationFrameId
		const render = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			let alive = false

			particles.forEach(p => {
				p.x += p.vx
				p.y += p.vy
				p.vy += 0.3 // gravity
				p.rotation += p.vRot
				p.alpha -= 0.008

				if (p.alpha > 0) {
					alive = true
					ctx.save()
					ctx.globalAlpha = Math.max(0, p.alpha)
					ctx.translate(p.x, p.y)
					ctx.rotate((p.rotation * Math.PI) / 180)
					ctx.fillStyle = p.color
					ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
					ctx.restore()
				}
			})

			if (alive) {
				animationFrameId = requestAnimationFrame(render)
			}
		}

		render()

		return () => {
			if (animationFrameId) cancelAnimationFrame(animationFrameId)
		}
	}, [])

	const rankInfo = MicroEngine.getRank(state.xp)

	return (
		<div className="relative mx-auto flex w-full max-w-xl flex-col items-center justify-center p-6 text-center">
			<canvas
				className="pointer-events-none fixed inset-0 z-40"
				ref={canvasRef}
			/>

			<motion.div
				animate={{ opacity: 1, scale: 1 }}
				className="z-10 flex w-full flex-col items-center gap-6"
				initial={{ opacity: 0, scale: 0.85 }}
				transition={{ damping: 20, stiffness: 260, type: "spring" }}
			>
				{/* Trophy Badge */}
				<div className="relative">
					<div className="flex h-24 w-24 animate-bounce items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 text-slate-950 shadow-2xl shadow-amber-500/40">
						<Trophy className="h-12 w-12" />
					</div>
					<span className="absolute -right-2 -bottom-2 rounded-full bg-emerald-500 px-2.5 py-1 font-black text-slate-950 text-xs shadow-md">
						DAY {module.day} DONE
					</span>
				</div>

				{/* Headline */}
				<div className="flex flex-col gap-1.5">
					<h1 className="font-black text-2xl text-slate-900 tracking-tight sm:text-3xl dark:text-slate-50">
						Day {module.day} Mastered! 🎉
					</h1>
					<p className="font-medium text-slate-600 text-sm dark:text-slate-300">
						{module.title}
					</p>
				</div>

				{/* Rewards Breakdown Card */}
				<div className="grid w-full grid-cols-2 gap-3">
					<div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
						<div className="flex items-center gap-1.5 font-black text-2xl text-amber-500">
							<Sparkles className="h-5 w-5" />
							<span>+{module.xp_reward || 100}</span>
						</div>
						<span className="font-bold text-[11px] text-amber-600/90 uppercase tracking-wider dark:text-amber-400">
							XP Earned
						</span>
					</div>

					<div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">
						<div className="flex items-center gap-1.5 font-black text-2xl text-orange-500">
							<Flame className="h-5 w-5" />
							<span>{state.streak}</span>
						</div>
						<span className="font-bold text-[11px] text-orange-600/90 uppercase tracking-wider dark:text-orange-400">
							Active Streak
						</span>
					</div>
				</div>

				{/* Rank Progress */}
				<div className="flex w-full flex-col gap-2.5 rounded-2xl border border-slate-200 bg-white/60 p-4 text-left dark:border-slate-800 dark:bg-slate-900/60">
					<div className="flex items-center justify-between font-bold text-xs">
						<span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
							<span>Rank:</span>
							<span className="text-slate-900 dark:text-slate-100">
								{rankInfo.currentRank.emoji}{" "}
								{rankInfo.currentRank.title}
							</span>
						</span>
						<span className="text-amber-500">{state.xp} XP</span>
					</div>

					<div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
						<div
							className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-1000"
							style={{ width: `${rankInfo.progressPercent}%` }}
						/>
					</div>

					{rankInfo.nextRank && (
						<p className="text-[11px] text-slate-500 dark:text-slate-400">
							{rankInfo.nextRank.minXp - state.xp} XP until next
							rank ({rankInfo.nextRank.emoji}{" "}
							{rankInfo.nextRank.title})
						</p>
					)}
				</div>

				{/* Career Vault Unlocked Banner */}
				{module.career_unlock && (
					<div className="flex w-full items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-4 text-left">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 font-bold text-slate-950">
								<Briefcase className="h-5 w-5" />
							</div>
							<div>
								<span className="font-bold text-[10px] text-emerald-600 uppercase tracking-wider dark:text-emerald-400">
									Career Vault Unlocked
								</span>
								<h4 className="line-clamp-1 font-bold text-slate-900 text-xs sm:text-sm dark:text-slate-100">
									{module.career_unlock.title}
								</h4>
							</div>
						</div>

						<button
							className="shrink-0 rounded-xl bg-emerald-500 px-3 py-1.5 font-bold text-slate-950 text-xs shadow-sm transition-colors hover:bg-emerald-600"
							onClick={() => {
								sound.playClick()
								onOpenVault()
							}}
							type="button"
						>
							View
						</button>
					</div>
				)}

				{/* Action Buttons */}
				<div className="flex w-full flex-col gap-3 pt-2 sm:flex-row">
					<Button
						className="h-12 flex-1 rounded-xl font-bold text-xs sm:text-sm"
						onClick={() => {
							sound.playClick()
							onBackToMap()
						}}
						type="button"
						variant="outline"
					>
						Course Roadmap
					</Button>

					<Button
						className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 font-bold text-slate-950 text-xs shadow-amber-500/20 shadow-lg hover:bg-amber-600 sm:text-sm"
						onClick={() => {
							sound.playClick()
							onNextModule()
						}}
						type="button"
					>
						<span>Continue to Next Day</span>
						<ArrowRight className="h-4 w-4" />
					</Button>
				</div>
			</motion.div>
		</div>
	)
}
