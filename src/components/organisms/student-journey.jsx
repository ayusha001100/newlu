"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Container from "@/atoms/container"
import Reveal from "@/atoms/reveal"
import { JOURNEY_STEPS } from "@/lib/data/home"
import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"

const GAMIFIED_META = [
	{
		icon: "⚡",
		level: "LVL 01",
		status: "QUEST START",
		xp: "+100 XP",
	},
	{
		icon: "🛠️",
		level: "LVL 02",
		status: "BUILD MODE",
		xp: "+250 XP",
	},
	{
		icon: "🎯",
		level: "LVL 03",
		status: "PRO QUALIFY",
		xp: "+500 XP",
	},
	{
		icon: "🏆",
		level: "MAX LVL",
		status: "UNLOCKED",
		xp: "VICTORY 🌟",
	},
]

function JourneyStepCard({ index, isActive, isPast, onSelect, step }) {
	const meta = GAMIFIED_META[index] || {}

	const cardStyle = isActive
		? "scale-[1.02] border-brand-500/80 bg-[linear-gradient(145deg,rgba(255,179,0,0.16),rgba(255,255,255,0.06))] shadow-[0_12px_32px_rgba(255,179,0,0.18),inset_0_0_20px_rgba(255,179,0,0.08)] ring-1 ring-brand-400/50"
		: isPast
			? "border-brand-500/30 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]"
			: "border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] opacity-80 hover:opacity-100"

	const badgeStyle = isActive
		? "border-brand-400 bg-brand-500 text-on-brand shadow-[0_0_12px_rgba(255,179,0,0.6)]"
		: isPast
			? "border-brand-500/50 bg-brand-500/20 text-brand-400"
			: "border-white/15 bg-white/5 text-white/70 group-hover:border-brand-400/40 group-hover:text-brand-400"

	const laserStyle = isActive
		? "scale-x-100 bg-[linear-gradient(90deg,transparent,var(--brand-400),var(--brand-500),transparent)] shadow-[0_0_12px_var(--brand-500)]"
		: isPast
			? "scale-x-100 bg-brand-500/40"
			: "scale-x-0 bg-transparent"

	return (
		<Reveal
			as="div"
			className={cn(
				"group relative min-h-[200px] cursor-pointer overflow-hidden rounded-[20px] border p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-[720px]:min-h-[148px] max-[720px]:w-[min(80vw,310px)] max-[720px]:shrink-0 max-[720px]:snap-start max-[720px]:p-4.5",
				"hover:-translate-y-1.5 hover:border-brand-400/60 hover:bg-[linear-gradient(145deg,rgba(255,179,0,0.12),rgba(255,255,255,0.05))] hover:shadow-[0_10px_24px_rgba(0,0,0,0.4)]",
				cardStyle,
			)}
			delay={(index % 4) * 90}
			onClick={onSelect}
			onKeyDown={e => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault()
					onSelect()
				}
			}}
			role="button"
			tabIndex={0}
		>
			<div
				className={cn(
					"absolute inset-x-0 top-0 h-[3px] transition-all duration-500",
					laserStyle,
				)}
			/>

			<span className="pointer-events-none absolute top-2 right-2 text-[0.6rem] text-white/20 transition-colors group-hover:text-brand-400/60">
				⌜⌝
			</span>

			<div className="mb-3.5 flex items-center justify-between">
				<span
					className={cn(
						"inline-flex items-center gap-1.5 rounded-[10px] border px-2.5 py-1 font-extrabold font-heading text-[0.72rem] transition-all duration-300",
						badgeStyle,
					)}
				>
					<span className="text-[0.8rem]">{meta.icon}</span>
					<span>{meta.level}</span>
				</span>

				<span
					className={cn(
						"font-mono text-[0.68rem] uppercase tracking-wider transition-colors",
						isActive
							? "font-bold text-brand-400 drop-shadow-[0_0_6px_rgba(255,179,0,0.5)]"
							: "text-white/40",
					)}
				>
					{meta.xp}
				</span>
			</div>

			<h3 className="mb-2 flex items-center gap-2 font-extrabold font-heading text-[1.28rem] text-white">
				{step.title}
				{isActive && (
					<span className="inline-block animate-pulse text-brand-400 text-xs">
						●
					</span>
				)}
			</h3>
			<p className="text-[0.88rem] text-white/75 leading-[1.55] max-[720px]:text-[0.82rem]">
				{step.body}
			</p>

			<div className="mt-4 flex items-center justify-between border-white/5 border-t pt-2.5 font-mono text-[0.68rem] text-white/40">
				<span>{meta.status}</span>
				<span className="text-brand-400/80">STAGE {step.num}</span>
			</div>
		</Reveal>
	)
}

export default function StudentJourney() {
	const [activeStage, setActiveStage] = useState(0)
	const [isAutoPlaying, setIsAutoPlaying] = useState(true)

	useEffect(() => {
		if (!isAutoPlaying) return
		const timer = setInterval(() => {
			setActiveStage(prev => (prev + 1) % JOURNEY_STEPS.length)
		}, 3000)
		return () => clearInterval(timer)
	}, [isAutoPlaying])

	const progressPercent = Math.round(
		((activeStage + 1) / JOURNEY_STEPS.length) * 100,
	)

	return (
		<section
			className="relative z-1 overflow-hidden bg-[var(--ink-900)] max-[720px]:min-h-[470px]"
			id="how-it-works"
		>
			<div className="relative border-white/8 border-b bg-[var(--ink-900)] pt-[58px] pb-16 text-[#fff] [background-image:radial-gradient(900px_320px_at_12%_0%,rgba(var(--brand-rgb),0.18),transparent_72%)] max-[720px]:sticky max-[720px]:top-[68px] max-[720px]:overflow-hidden max-[720px]:py-6 max-[720px]:pb-7">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,179,0,0.06)_1px,transparent_1px)] bg-size-[28px_28px] opacity-40"
				/>

				<Container className="relative">
					<div className="mb-7 flex flex-wrap items-center justify-between gap-3 max-[720px]:mb-3.5">
						<div className="flex items-center gap-2.5">
							<span className="relative flex size-2.5">
								<span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-75" />
								<span className="relative inline-flex size-2.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(255,179,0,0.8)]" />
							</span>
							<p className="inline-flex items-center gap-2 font-bold font-heading text-[0.74rem] text-brand-400 uppercase tracking-[0.14em]">
								The student journey · Level Roadmap
							</p>
						</div>

						<div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.72rem] text-white/80 backdrop-blur-md sm:flex">
							<span className="text-brand-400">
								QUEST PROGRESS:
							</span>
							<span className="font-bold text-white">
								{progressPercent}%
							</span>
							<div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
								<div
									className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500))] transition-all duration-500"
									style={{ width: `${progressPercent}%` }}
								/>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-3.5 max-[720px]:mr-[-18px] max-[720px]:flex max-[720px]:snap-x max-[720px]:snap-mandatory max-[980px]:grid-cols-2 max-[720px]:gap-3 max-[980px]:gap-5 max-[720px]:overflow-x-auto max-[720px]:scroll-smooth max-[720px]:pr-[18px] max-[720px]:[scrollbar-width:none] max-[720px]:[&::-webkit-scrollbar]:hidden">
						{JOURNEY_STEPS.map((step, index) => (
							<div className="contents" key={step.num}>
								<JourneyStepCard
									index={index}
									isActive={activeStage === index}
									isPast={activeStage > index}
									onSelect={() => {
										setActiveStage(index)
										setIsAutoPlaying(false)
									}}
									step={step}
								/>

								{index < JOURNEY_STEPS.length - 1 ? (
									<div className="relative grid size-8 items-center justify-center place-self-center rounded-full border border-white/10 bg-white/5 font-bold text-[0.95rem] text-brand-400 transition-all max-[980px]:hidden">
										<span
											className={cn(
												"transition-all duration-300",
												activeStage > index
													? "text-brand-400 drop-shadow-[0_0_8px_rgba(255,179,0,0.8)]"
													: "text-white/30",
											)}
										>
											→
										</span>
										{activeStage === index && (
											<span className="absolute inset-0 animate-ping rounded-full border border-brand-500/60 opacity-60" />
										)}
									</div>
								) : null}
							</div>
						))}
					</div>

					<div className="mt-8 flex flex-wrap items-center gap-4 max-[720px]:[&_a]:min-h-[50px] max-[720px]:[&_a]:w-full">
						<Button
							nativeButton={false}
							render={<Link href="/programs" />}
							variant="light"
						>
							Start with a free certification
						</Button>
						<span className="font-mono text-[0.78rem] text-white/50">
							✦ Instant Unlock: Career Passport + Internship
							Quests
						</span>
					</div>
				</Container>
			</div>
		</section>
	)
}
