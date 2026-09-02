"use client"

import { motion } from "framer-motion"
import { Briefcase, ExternalLink, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { sound } from "@/lib/learning/micro-audio"
import { Button } from "@/ui/button"

export default function StageRecap({
	stageData,
	careerUnlock,
	capabilityUnlock,
	onFinishModule,
}) {
	const canvasRef = useRef(null)
	const [reflection, setReflection] = useState("")

	useEffect(() => {
		sound.playFanfare()

		// Canvas confetti effect
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

		for (let i = 0; i < 90; i++) {
			particles.push({
				alpha: 1,
				color: colors[Math.floor(Math.random() * colors.length)],
				rotation: Math.random() * 360,
				size: Math.random() * 7 + 3,
				vRot: (Math.random() - 0.5) * 8,
				vx: (Math.random() - 0.5) * 14,
				vy: (Math.random() - 0.7) * 14,
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
				p.vy += 0.28
				p.rotation += p.vRot
				p.alpha -= 0.009

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

	return (
		<div className="relative flex flex-col gap-6 text-left">
			<canvas
				className="pointer-events-none fixed inset-0 z-40"
				ref={canvasRef}
			/>

			{/* Capability Unlock Headline Card */}
			<motion.div
				animate={{ opacity: 1, scale: 1 }}
				className="relative overflow-hidden rounded-3xl border border-brand-300 bg-gradient-to-br from-amber-500/15 via-white to-emerald-500/10 p-6 shadow-xs sm:p-7"
				initial={{ opacity: 0, scale: 0.95 }}
			>
				<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<div className="flex items-start gap-4">
						<div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-amber-500 font-black text-2xl text-slate-950 shadow-amber-500/20 shadow-md">
							🏆
						</div>
						<div className="space-y-1">
							<span className="flex items-center gap-1.5 font-bold font-mono text-[0.68rem] text-brand-ink uppercase tracking-wider">
								<Sparkles className="size-3.5 text-brand-ink" />
								Capability Unlocked
							</span>
							<h3 className="font-extrabold font-heading text-ink-900 text-xl leading-tight sm:text-2xl">
								{capabilityUnlock ||
									stageData?.capability_summary ||
									"New Professional Skill Acquired!"}
							</h3>
							<p className="font-medium text-ink-600 text-xs sm:text-sm">
								{stageData?.badge
									? `Earned Badge: ${stageData.badge}`
									: "Module Cleared +50 XP"}
							</p>
						</div>
					</div>

					<div className="shrink-0 rounded-2xl border border-brand-300/80 bg-white/90 px-4 py-3 text-center shadow-xs">
						<span className="block font-black font-mono text-brand-ink text-xl">
							+50 XP
						</span>
						<span className="font-bold font-mono text-[0.66rem] text-ink-500 uppercase">
							Mastery XP
						</span>
					</div>
				</div>
			</motion.div>

			{/* Career Vault Opportunity Unlock */}
			{careerUnlock && (
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="rounded-2xl border border-emerald-300 bg-gradient-to-r from-emerald-50/90 to-transparent p-5"
					initial={{ opacity: 0, y: 10 }}
					transition={{ delay: 0.15 }}
				>
					<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
						<div className="flex items-start gap-3.5">
							<div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-500 font-bold text-white shadow-xs">
								<Briefcase className="size-5" />
							</div>
							<div className="space-y-1">
								<div className="flex items-center gap-2">
									<span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-bold font-mono text-[0.65rem] text-emerald-800 uppercase">
										Career Vault Unlocked
									</span>
									<span className="font-bold font-mono text-emerald-700 text-xs">
										{careerUnlock.stipend}
									</span>
								</div>
								<h4 className="font-extrabold font-heading text-base text-ink-900">
									{careerUnlock.title}
								</h4>
								<p className="text-ink-600 text-xs">
									{careerUnlock.company}
								</p>

								{careerUnlock.skills && (
									<div className="flex flex-wrap gap-1.5 pt-1">
										{careerUnlock.skills.map((sk, i) => (
											<span
												className="rounded-md border border-emerald-200 bg-white px-2 py-0.5 font-mono text-[0.65rem] text-emerald-800"
												key={i}
											>
												{sk}
											</span>
										))}
									</div>
								)}
							</div>
						</div>

						<Button
							className="h-10 shrink-0 bg-emerald-600 px-4 font-bold text-white text-xs shadow-xs hover:bg-emerald-700"
							onClick={() => {
								sound.playClick()
								alert(
									`🎉 Applying to: ${careerUnlock.title} (${careerUnlock.company})`,
								)
							}}
							size="sm"
							type="button"
						>
							<span>Claim Unlock</span>
							<ExternalLink className="ml-1 size-3.5" />
						</Button>
					</div>
				</motion.div>
			)}

			{/* Reflection Input */}
			<div className="space-y-3 rounded-2xl border border-line bg-white p-5 shadow-2xs">
				<div className="flex items-center gap-2">
					<span className="font-bold font-heading text-ink-900 text-sm">
						Lock in your takeaway (Optional Reflection)
					</span>
				</div>
				<textarea
					className="w-full rounded-xl border border-line p-3 text-ink-900 text-xs placeholder:text-ink-400 focus:border-brand-500 focus:outline-none sm:text-sm"
					onChange={e => setReflection(e.target.value)}
					placeholder="What was the most surprising takeaway from this module's interactive simulation and practice?"
					rows={3}
					value={reflection}
				/>
			</div>

			{/* Final CTA */}
			<div className="flex items-center justify-end border-line border-t pt-4">
				<Button
					className="h-12 bg-brand-500 px-8 font-extrabold font-heading text-on-brand text-sm shadow-md hover:bg-brand-600"
					onClick={() => {
						sound.playFanfare()
						onFinishModule()
					}}
					type="button"
				>
					<span>Complete Module & Advance ➔</span>
				</Button>
			</div>
		</div>
	)
}
