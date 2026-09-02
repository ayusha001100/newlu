"use client"

import { cn } from "@/lib/utils"
import { useLearn } from "@/organisms/learn-centre/context"
import { Button } from "@/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog"

const GOAL_OPTIONS = [
	{
		badge: "Skill Quest",
		detail: "Master tools, write working code & build hands-on projects",
		icon: "🎯",
		label: "Learn a skill",
	},
	{
		badge: "Portfolio Boost",
		detail: "Gain practical project evidence & verified work for my CV",
		icon: "💼",
		label: "Get an internship",
	},
	{
		badge: "Fast Referral",
		detail: "Prepare for high-growth tech & business roles at 450+ partners",
		icon: "🚀",
		label: "Get a job",
	},
	{
		badge: "Explore Path",
		detail: "Discover in-demand career paths and learn at my own pace",
		icon: "🧭",
		label: "Not sure yet",
	},
]

export default function OnboardModal() {
	const {
		onboardAfter,
		saveProfile,
		setOnboardAfter,
		setShowOnboard,
		showOnboard,
		user,
	} = useLearn()

	const pick = async purpose => {
		await saveProfile({ purpose })
		setShowOnboard(false)
		const after = onboardAfter
		setOnboardAfter(null)
		after?.()
	}

	return (
		<Dialog
			onOpenChange={open => !open && setShowOnboard(false)}
			open={showOnboard}
		>
			<DialogContent className="relative max-w-[500px] overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-2xl sm:p-6">
				{/* Top brand beam */}
				<div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500),#f59e0b)]" />

				<DialogHeader className="space-y-1 text-left">
					<div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-300 bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.66rem] text-brand-ink uppercase">
						<span>⚡</span>
						<span>PERSONALIZE YOUR JOURNEY</span>
					</div>
					<DialogTitle className="font-extrabold font-heading text-[1.35rem] text-ink-900 tracking-tight">
						What brings you here?
					</DialogTitle>
					<p className="text-[0.84rem] text-ink-500 leading-normal">
						Pick your main objective to personalize your learning
						roadmap, project assessments & job matches.
					</p>
				</DialogHeader>

				{/* 4 Interactive Goal Cards */}
				<div className="mt-3.5 space-y-2.5">
					{GOAL_OPTIONS.map(item => {
						const isCurrent = user?.purpose === item.label
						return (
							<button
								className={cn(
									"group relative flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-left shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lu-sm active:scale-[0.99]",
									isCurrent
										? "border-brand-500 bg-brand-50/60 shadow-xs ring-2 ring-brand-200"
										: "border-line bg-white hover:border-brand-400 hover:bg-gradient-to-r hover:from-white hover:to-amber-50/50",
								)}
								key={item.label}
								onClick={() => pick(item.label)}
								type="button"
							>
								<div className="flex min-w-0 items-center gap-3">
									{/* Icon Container */}
									<span
										className={cn(
											"grid size-10 shrink-0 place-items-center rounded-xl border text-xl shadow-xs transition-transform duration-200 group-hover:scale-105",
											isCurrent
												? "border-brand-400 bg-brand-400 text-on-brand"
												: "border-line bg-canvas-muted group-hover:border-brand-300 group-hover:bg-amber-50",
										)}
									>
										{item.icon}
									</span>

									{/* Text */}
									<div className="min-w-0">
										<div className="flex items-center gap-2">
											<strong className="block font-extrabold font-heading text-[0.92rem] text-ink-900 transition-colors group-hover:text-brand-ink">
												{item.label}
											</strong>
											<span className="rounded-md border border-brand-200 bg-amber-50/80 px-1.5 py-0.2 font-bold font-mono text-[0.62rem] text-brand-ink">
												{item.badge}
											</span>
										</div>
										<span className="mt-0.5 block text-[0.78rem] text-ink-500 leading-snug">
											{item.detail}
										</span>
									</div>
								</div>

								{/* Select Radio / Check Indicator */}
								<div
									className={cn(
										"flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
										isCurrent
											? "border-brand-500 bg-brand-500 text-on-brand shadow-xs"
											: "border-line bg-white group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-on-brand group-hover:shadow-xs",
									)}
								>
									<span
										className={cn(
											"font-bold text-[0.68rem] transition-opacity",
											isCurrent
												? "opacity-100"
												: "opacity-0 group-hover:opacity-100",
										)}
									>
										✓
									</span>
								</div>
							</button>
						)
					})}
				</div>

				{user?.purpose ? (
					<div className="mt-2 text-center">
						<Button
							className="text-ink-400 text-xs hover:text-ink-700"
							onClick={() => setShowOnboard(false)}
							size="sm"
							type="button"
							variant="ghost"
						>
							Keep current choice
						</Button>
					</div>
				) : null}
			</DialogContent>
		</Dialog>
	)
}
