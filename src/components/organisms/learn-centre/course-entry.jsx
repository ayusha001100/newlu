"use client"

import { useState } from "react"
import Eyebrow from "@/atoms/eyebrow"
import { Engine } from "@/lib/learning/engine"
import { cn } from "@/lib/utils"
import { useLearn } from "@/organisms/learn-centre/context"
import { Button } from "@/ui/button"

export default function CourseEntry() {
	const { activeSlug, closeCourse, openModule, states } = useLearn()
	const [showPicker, setShowPicker] = useState(false)

	const program = Engine.courseOf(activeSlug)
	const state = states[activeSlug] || Engine.blankState()
	const teaching = Engine.teachingModules(activeSlug)
	const first = teaching[0]
	const next = Engine.nextStep(activeSlug, state)
	const progress = Engine.learningPct(activeSlug, state)

	if (!(program && first)) return null

	const hasProgress = progress > 0 && next

	return (
		<section className="mx-auto max-w-[1000px] py-4">
			{/* Top Back Navigation Bar */}
			<div className="mb-6 flex items-center justify-between">
				<button
					className="group inline-flex items-center gap-2 font-bold font-heading text-[0.85rem] text-ink-500 transition-colors hover:text-ink-900"
					onClick={closeCourse}
					type="button"
				>
					<span className="grid size-7 place-items-center rounded-xl border border-line bg-white shadow-xs transition-all group-hover:-translate-x-1 group-hover:border-brand-400 group-hover:bg-brand-50 group-hover:text-brand-ink">
						←
					</span>
					<span>Back to Learning Dashboard</span>
				</button>

				<span className="rounded-full border border-line bg-white px-3 py-1 font-bold font-mono text-[0.7rem] text-ink-500 shadow-xs">
					{program.title}
				</span>
			</div>

			{/* Top Header */}
			<div className="mb-8 text-center sm:text-left">
				<div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
					<Eyebrow className="mb-0">BEFORE THE MODULES</Eyebrow>
					<span className="rounded-full border border-brand-300 bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.68rem] text-brand-ink uppercase">
						{program.category || "TRACK"}
					</span>
				</div>
				<h1 className="font-extrabold font-heading text-[2rem] text-ink-900 tracking-tight sm:text-[2.25rem]">
					How would you like to begin?
				</h1>
				<p className="mt-2 text-[0.95rem] text-ink-500">
					Select your preferred learning path for{" "}
					<strong className="font-bold text-ink-900">
						{program.title}
					</strong>
					. You can switch modules at any time.
				</p>
			</div>

			{/* 2 Symmetrical Glowing Choice Cards */}
			<div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
				{/* Card 01: Continue / Custom Module */}
				<div
					className={cn(
						"group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-white p-7 shadow-xs transition-all duration-300",
						"hover:-translate-y-1.5 hover:border-brand-400 hover:shadow-[0_16px_40px_-8px_rgba(255,179,0,0.3),0_0_20px_rgba(255,179,0,0.15)] hover:ring-2 hover:ring-brand-200/80",
						showPicker
							? "border-brand-400 shadow-lu-sm ring-2 ring-brand-200"
							: "border-line",
					)}
				>
					{/* Ambient Hover Glow Bubble */}
					<div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-gradient-to-br from-amber-400/20 to-brand-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

					<div className="relative z-10">
						{/* Top Icon & Step */}
						<div className="mb-5 flex items-center justify-between">
							<span className="grid size-12 place-items-center rounded-2xl border border-line bg-canvas-muted text-2xl shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:border-brand-300 group-hover:bg-brand-50 group-hover:shadow-[0_0_15px_rgba(255,179,0,0.35)]">
								⚡
							</span>
							<span className="rounded-full border border-line bg-canvas-muted/60 px-2.5 py-1 font-bold font-mono text-[0.68rem] text-ink-500 transition-colors duration-300 group-hover:border-brand-200 group-hover:bg-brand-50 group-hover:text-brand-ink">
								PATH 01
							</span>
						</div>

						<h2 className="font-extrabold font-heading text-[1.25rem] text-ink-900 leading-snug">
							{hasProgress
								? "Continue where I left off"
								: "I have prior experience"}
						</h2>
						<p className="mt-2 text-[0.88rem] text-ink-500 leading-relaxed">
							{hasProgress
								? `You are ${progress}% complete. Jump directly to ${next.lesson.week}: ${next.lesson.title}.`
								: "Skip introductory content or pick the exact module you want to start with. Earlier lessons remain available for revision."}
						</p>

						{/* Feature Pills */}
						<ul className="mt-5 space-y-2.5 border-line/60 border-t pt-4 text-[0.82rem] text-ink-700">
							<li className="flex items-center gap-2.5">
								<span className="grid size-4 place-items-center rounded-full bg-emerald-100 font-bold text-[0.65rem] text-emerald-700">
									✓
								</span>
								<span>Jump directly to advanced topics</span>
							</li>
							<li className="flex items-center gap-2.5">
								<span className="grid size-4 place-items-center rounded-full bg-emerald-100 font-bold text-[0.65rem] text-emerald-700">
									✓
								</span>
								<span>
									Instant access to capstones & projects
								</span>
							</li>
						</ul>
					</div>

					<div className="relative z-10 mt-7">
						<Button
							className="w-full transition-all duration-300 group-hover:border-brand-400 group-hover:bg-brand-50/80 group-hover:text-brand-ink"
							onClick={() => {
								if (hasProgress) {
									openModule(next.index, next.stage.id)
									return
								}
								setShowPicker(prev => !prev)
							}}
							type="button"
							variant="outline"
						>
							{hasProgress
								? "Continue Learning ➔"
								: showPicker
									? "Hide Module Picker ▲"
									: "Choose Where to Start ➔"}
						</Button>
					</div>
				</div>

				{/* Card 02: Start from beginning */}
				<div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400 hover:shadow-[0_16px_40px_-8px_rgba(255,179,0,0.3),0_0_20px_rgba(255,179,0,0.15)] hover:ring-2 hover:ring-brand-200/80">
					{/* Ambient Hover Glow Bubble */}
					<div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-gradient-to-br from-amber-400/20 to-brand-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

					<div className="relative z-10">
						{/* Top Icon & Step */}
						<div className="mb-5 flex items-center justify-between">
							<span className="grid size-12 place-items-center rounded-2xl border border-line bg-canvas-muted text-2xl shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:border-brand-300 group-hover:bg-brand-50 group-hover:shadow-[0_0_15px_rgba(255,179,0,0.35)]">
								🚀
							</span>
							<span className="rounded-full border border-line bg-canvas-muted/60 px-2.5 py-1 font-bold font-mono text-[0.68rem] text-ink-500 transition-colors duration-300 group-hover:border-brand-200 group-hover:bg-brand-50 group-hover:text-brand-ink">
								PATH 02
							</span>
						</div>

						<h2 className="font-extrabold font-heading text-[1.25rem] text-ink-900 leading-snug">
							Start from the beginning
						</h2>
						<p className="mt-2 text-[0.88rem] text-ink-500 leading-relaxed">
							<strong className="font-bold text-ink-900">
								{first.lesson.week}: {first.lesson.title}
							</strong>
							. Build a solid foundation step-by-step with guided
							code walkthroughs and practice tasks.
						</p>

						{/* Feature Pills */}
						<ul className="mt-5 space-y-2.5 border-line/60 border-t pt-4 text-[0.82rem] text-ink-700">
							<li className="flex items-center gap-2.5">
								<span className="grid size-4 place-items-center rounded-full bg-emerald-100 font-bold text-[0.65rem] text-emerald-700">
									✓
								</span>
								<span>Structured sequential learning path</span>
							</li>
							<li className="flex items-center gap-2.5">
								<span className="grid size-4 place-items-center rounded-full bg-emerald-100 font-bold text-[0.65rem] text-emerald-700">
									✓
								</span>
								<span>Earn full foundation XP (+100 XP)</span>
							</li>
						</ul>
					</div>

					<div className="relative z-10 mt-7">
						<Button
							className="w-full transition-all duration-300 group-hover:border-brand-400 group-hover:bg-brand-50/80 group-hover:text-brand-ink"
							onClick={() => openModule(first.index, "concept")}
							type="button"
							variant="outline"
						>
							Start with Module 1 ➔
						</Button>
					</div>
				</div>
			</div>

			{/* Interactive Module Picker Tray */}
			{showPicker ? (
				<div className="fade-in slide-in-from-top-4 animate-in rounded-3xl border border-brand-300 bg-white p-6 shadow-lu-md duration-300 sm:p-8">
					<div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-line border-b pb-4">
						<div>
							<h2 className="font-extrabold font-heading text-[1.2rem] text-ink-900">
								Select Your Starting Module
							</h2>
							<p className="text-[0.86rem] text-ink-500">
								Click any module to begin your learning session
								immediately.
							</p>
						</div>
						<span className="rounded-full bg-canvas-muted px-3 py-1 font-mono text-ink-600 text-xs">
							{teaching.length} Total Modules
						</span>
					</div>

					<div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
						{teaching.map(({ lesson, index }, position) => (
							<button
								className="group relative flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 text-left shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-gradient-to-r hover:from-white hover:to-amber-50/40 hover:shadow-lu-sm"
								key={lesson.slug || index}
								onClick={() => openModule(index, "concept")}
								type="button"
							>
								<div className="flex min-w-0 items-center gap-3.5">
									{/* Number badge */}
									<span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-line bg-canvas-muted font-extrabold font-mono text-ink-800 text-sm shadow-xs transition-all duration-300 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-on-brand group-hover:shadow-sm">
										{position < 9
											? `0${position + 1}`
											: position + 1}
									</span>

									{/* Module Details */}
									<div className="min-w-0">
										<div className="flex items-center gap-2">
											<span className="font-bold font-mono text-[0.68rem] text-brand-ink uppercase tracking-wider">
												{lesson.week ||
													`MODULE 0${position + 1}`}
											</span>
											<span className="text-[0.65rem] text-ink-400">
												● 3 Lessons
											</span>
										</div>
										<strong className="block truncate font-extrabold font-heading text-[0.94rem] text-ink-900 transition-colors group-hover:text-brand-ink">
											{lesson.title}
										</strong>
									</div>
								</div>

								{/* Action Button */}
								<span className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-brand-200 bg-brand-50/80 px-3 py-1.5 font-bold font-heading text-[0.76rem] text-brand-ink shadow-xs transition-all group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-on-brand">
									<span>Start</span>
									<span className="transition-transform group-hover:translate-x-0.5">
										➔
									</span>
								</span>
							</button>
						))}
					</div>
				</div>
			) : null}
		</section>
	)
}
