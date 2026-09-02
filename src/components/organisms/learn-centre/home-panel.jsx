"use client"

import Link from "next/link"
import CourseIcon from "@/atoms/course-icon"
import MiniProgress from "@/atoms/mini-progress"
import { enrolledRows, focusProgram, focusReason } from "@/lib/data/learn"
import { Engine } from "@/lib/learning/engine"
import { cn } from "@/lib/utils"
import { useLearn } from "@/organisms/learn-centre/context"
import EmptyProgram from "@/organisms/learn-centre/empty-program"
import { Button } from "@/ui/button"

export default function HomePanel() {
	const { openCourse, openTutor, setTab, states, user } = useLearn()
	const rows = enrolledRows(user.enrolled, states)
	if (!rows.length) return <EmptyProgram title="Home" />

	const focus = focusProgram(rows)
	const next = Engine.nextStep(
		focus.slug,
		states[focus.slug] || Engine.blankState(),
	)
	const reason = focusReason(focus, rows)
	const cta = next
		? "Continue Learning ➔"
		: Engine.isSelfPaced(focus.slug)
			? "Open Lessons ➔"
			: "Open Capstone ➔"

	return (
		<div className="space-y-6">
			{/* 1. Sleek Cosmic Hero: Suggested Next Move */}
			<section className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0E131F_0%,#182236_50%,#0B0F19_100%)] p-6 text-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] sm:p-8">
				{/* Ambient Glow */}
				<div className="pointer-events-none absolute -top-10 -right-10 size-64 rounded-full bg-brand-500/15 blur-[75px]" />
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,179,0,0.06)_1px,transparent_1px)] bg-size-[24px_24px]" />

				<div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
					<div className="min-w-[280px] flex-1">
						<div className="mb-2.5 flex items-center gap-2">
							<span className="rounded-full border border-brand-400/40 bg-brand-500/15 px-3 py-0.5 font-bold font-mono text-[0.68rem] text-brand-300 uppercase tracking-widest backdrop-blur-md">
								🔥 NEXT RECOMMENDED STEP
							</span>
							<span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 font-mono text-[0.68rem] text-white/70">
								{focus.category.toUpperCase()}
							</span>
						</div>

						<h2 className="font-extrabold font-heading text-2xl text-white tracking-tight sm:text-[1.8rem]">
							{focus.program.title}
						</h2>
						<p className="mt-2 max-w-[540px] text-[0.88rem] text-slate-300 leading-relaxed">
							{reason}
						</p>

						{/* Progress Bar & Indicators */}
						<div className="mt-4 max-w-[440px]">
							<div className="mb-1.5 flex items-center justify-between text-xs">
								<span className="font-medium text-slate-300">
									Milestone Progress
								</span>
								<span className="font-bold font-mono text-brand-400">
									{focus.progress}% Complete
								</span>
							</div>
							<div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
								<div
									className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500))] shadow-[0_0_12px_var(--brand-400)] transition-all duration-700"
									style={{
										width: `${Math.max(focus.progress, 6)}%`,
									}}
								/>
							</div>
						</div>

						<div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[0.76rem] text-slate-400">
							<span className="flex items-center gap-1.5 text-emerald-400">
								<span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
								{focus.openings} active openings
							</span>
							<span>⏱️ ~25 mins to next badge</span>
						</div>
					</div>

					<div className="shrink-0">
						<Button
							className="px-7 py-3.5 font-bold text-base shadow-[0_10px_25px_rgba(255,179,0,0.3)] transition-transform duration-300 hover:scale-[1.03]"
							onClick={() => openCourse(focus.slug)}
							type="button"
						>
							{cta}
						</Button>
					</div>
				</div>
			</section>

			{/* 2. Balanced 2-Column Section */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
				{/* Left: Your Enrolled Programs */}
				<div className="space-y-3.5">
					<div className="flex items-center justify-between">
						<h3 className="font-extrabold font-heading text-[1.1rem] text-ink-900 tracking-tight">
							Your Enrolled Programs
						</h3>
						<Link
							className="font-bold text-[0.78rem] text-brand-ink hover:underline"
							href="/programs"
						>
							+ Explore More
						</Link>
					</div>

					<div className="space-y-3">
						{rows.map(row => (
							<button
								className={cn(
									"group flex w-full items-center justify-between gap-4 rounded-2xl border bg-white p-4.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lu-sm",
									row.slug === focus.slug
										? "border-brand-500 shadow-[0_0_0_2px_var(--brand-050)]"
										: "border-line hover:border-brand-300",
								)}
								key={row.slug}
								onClick={() => openCourse(row.slug)}
								type="button"
							>
								<div className="flex min-w-0 items-center gap-3.5">
									<CourseIcon program={row.program} />
									<div className="min-w-0">
										<strong className="block truncate font-extrabold font-heading text-[0.96rem] text-ink-900 transition-colors group-hover:text-brand-ink">
											{row.program.title}
										</strong>
										<span className="font-mono text-[0.72rem] text-ink-500">
											{row.category} · {row.progress}%
											complete
										</span>
									</div>
								</div>

								<div className="flex shrink-0 items-center gap-4">
									<div className="hidden w-28 sm:block">
										<MiniProgress value={row.progress} />
									</div>
									<span className="inline-flex items-center gap-1.5 rounded-xl border border-brand-300 bg-brand-50 px-3.5 py-1.5 font-bold font-heading text-[0.8rem] text-brand-ink shadow-xs transition-all group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-on-brand group-hover:shadow-sm">
										<span>Resume</span>
										<span className="transition-transform group-hover:translate-x-0.5">
											➔
										</span>
									</span>
								</div>
							</button>
						))}
					</div>
				</div>

				{/* Right: Daily Quests & Opportunities */}
				<div className="space-y-4">
					{/* Daily Quests Box */}
					<div className="rounded-2xl border border-brand-200/80 bg-white p-4.5 shadow-xs">
						<div className="mb-3 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<span className="text-lg">🎯</span>
								<strong className="font-extrabold font-heading text-[0.92rem] text-ink-900">
									Daily Quests
								</strong>
							</div>
							<span className="rounded-md border border-brand-200 bg-amber-50 px-2 py-0.5 font-bold font-mono text-[0.68rem] text-brand-ink">
								+175 XP Total
							</span>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/50 px-3 py-2 text-xs">
								<div className="flex items-center gap-2">
									<span className="font-bold text-emerald-600">
										✓
									</span>
									<span className="font-semibold text-emerald-950">
										Daily Login
									</span>
								</div>
								<span className="font-bold font-mono text-emerald-700">
									+25 XP
								</span>
							</div>

							<button
								className="flex w-full items-center justify-between rounded-xl border border-line bg-canvas-muted px-3 py-2 text-left text-xs transition-colors hover:border-brand-400 hover:bg-brand-50/40"
								onClick={() => openCourse(focus.slug)}
								type="button"
							>
								<span className="font-semibold text-ink-800">
									Finish 1 Lesson
								</span>
								<span className="font-bold font-mono text-brand-ink">
									+50 XP
								</span>
							</button>

							<button
								className="flex w-full items-center justify-between rounded-xl border border-line bg-canvas-muted px-3 py-2 text-left text-xs transition-colors hover:border-brand-400 hover:bg-brand-50/40"
								onClick={() =>
									openTutor(
										`Take 3-question quiz for ${focus.program.title}`,
									)
								}
								type="button"
							>
								<span className="font-semibold text-ink-800">
									5-Min AI Quiz
								</span>
								<span className="font-bold font-mono text-brand-ink">
									+100 XP
								</span>
							</button>
						</div>
					</div>

					{/* Fast Actions: Jobs & Refer */}
					<div className="grid grid-cols-2 gap-3">
						<button
							className="flex flex-col justify-between rounded-2xl border border-line bg-white p-3.5 text-left transition-all hover:border-emerald-300 hover:shadow-xs"
							onClick={() => setTab("opportunities")}
							type="button"
						>
							<span className="text-base">💼</span>
							<div className="mt-2">
								<strong className="block font-bold text-[0.82rem] text-ink-900">
									7 Job Matches
								</strong>
								<span className="font-medium text-[0.7rem] text-emerald-600">
									View Openings ➔
								</span>
							</div>
						</button>

						<Link
							className="flex flex-col justify-between rounded-2xl border border-line bg-white p-3.5 text-left transition-all hover:border-brand-300 hover:shadow-xs"
							href="/refer"
						>
							<span className="text-base">🎁</span>
							<div className="mt-2">
								<strong className="block font-bold text-[0.82rem] text-ink-900">
									Refer & Earn
								</strong>
								<span className="font-medium text-[0.7rem] text-brand-ink">
									Get ₹500 ➔
								</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
