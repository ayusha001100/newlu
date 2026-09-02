"use client"

import Link from "next/link"
import { enrolledRows, focusProgram, focusReason } from "@/lib/data/learn"
import { trackOf } from "@/lib/data/tracks"
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
	const focusState = states[focus.slug] || Engine.blankState()
	const next = Engine.nextStep(focus.slug, focusState)
	const reason = focusReason(focus, rows)
	const colors = trackOf(focus.slug)
	const cta = next
		? "Continue learning"
		: Engine.isSelfPaced(focus.slug)
			? "Open lessons"
			: "Open capstone"
	const nextLabel = next
		? `${next.stage?.label || "Next"} · ${next.lesson?.title || "Continue"}`
		: "Pick up where you left off"

	return (
		<div className="space-y-6">
			<section
				className="relative overflow-hidden rounded-[28px] p-6 text-white shadow-[0_18px_44px_rgba(14,19,31,0.18)] sm:p-8"
				style={{
					background: `radial-gradient(420px 220px at 100% 0%, rgba(${colors.rgb}, 0.28), transparent 60%), linear-gradient(135deg, #0E131F 0%, #182236 48%, #0B0F19 100%)`,
				}}
			>
				<div className="pointer-events-none absolute -top-16 -right-10 size-72 rounded-full bg-brand-500/20 blur-[90px]" />
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[22px_22px]" />

				<div className="relative z-10 grid gap-6 lg:grid-cols-[1.4fr_auto] lg:items-end">
					<div className="min-w-0">
						<div className="mb-3 flex flex-wrap items-center gap-2">
							<span className="rounded-full border border-brand-400/35 bg-brand-500/15 px-3 py-1 font-bold font-mono text-[0.66rem] text-brand-300 uppercase tracking-[0.14em]">
								Up next
							</span>
							<span className="rounded-full border border-white/12 bg-white/8 px-2.5 py-1 font-mono text-[0.66rem] text-white/65 tracking-wide">
								{focus.category}
							</span>
						</div>

						<div className="flex items-start gap-3.5">
							<span
								className="mt-0.5 grid size-12 shrink-0 place-items-center rounded-2xl border font-extrabold font-heading text-sm shadow-xs"
								style={{
									background: colors[100],
									borderColor: colors[200],
									color: colors.ink,
								}}
							>
								{focus.program.icon || "LU"}
							</span>
							<div className="min-w-0">
								<h2 className="font-extrabold font-heading text-[1.55rem] text-white tracking-tight sm:text-[1.75rem]">
									{focus.program.title}
								</h2>
								<p className="mt-1.5 max-w-[540px] text-[0.88rem] text-slate-300 leading-relaxed">
									{reason}
								</p>
							</div>
						</div>

						<div className="mt-5 max-w-[460px]">
							<div className="mb-2 flex items-center justify-between gap-3">
								<span className="font-medium text-[0.75rem] text-slate-300">
									{nextLabel}
								</span>
								<span className="font-bold font-mono text-[0.75rem] text-brand-400">
									{focus.progress}%
								</span>
							</div>
							<div className="h-2.5 w-full overflow-hidden rounded-full bg-white/12">
								<div
									className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500))] shadow-[0_0_14px_rgba(255,179,0,0.45)] transition-all duration-700"
									style={{
										width: `${Math.max(focus.progress, 8)}%`,
									}}
								/>
							</div>
						</div>

						<div className="mt-4 flex flex-wrap gap-2">
							<span className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-[0.72rem] text-emerald-300">
								{focus.openings} openings matched
							</span>
							<span className="rounded-lg border border-white/10 bg-white/6 px-2.5 py-1 font-mono text-[0.72rem] text-slate-300">
								~25 min to next badge
							</span>
						</div>
					</div>

					<div className="flex flex-col gap-2 sm:items-end">
						<Button
							className="w-full px-7 py-3.5 text-[0.95rem] shadow-[0_12px_28px_rgba(255,179,0,0.32)] sm:w-auto"
							onClick={() => openCourse(focus.slug)}
							type="button"
						>
							{cta} →
						</Button>
						<button
							className="font-bold text-[0.78rem] text-white/55 transition hover:text-brand-300"
							onClick={() => setTab("learn")}
							type="button"
						>
							View all modules
						</button>
					</div>
				</div>
			</section>

			{/* Adaptive Microlearning Spotlight Banner */}
			<div className="relative overflow-hidden rounded-[24px] border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-purple-500/10 p-5 shadow-sm sm:p-6">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<div className="flex items-start gap-3.5">
						<div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-amber-500 font-black text-slate-950 text-xl shadow-amber-500/20 shadow-md">
							🚀
						</div>
						<div>
							<div className="flex items-center gap-2">
								<span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 font-bold font-mono text-[0.65rem] text-amber-600 uppercase tracking-wider dark:text-amber-400">
									Duolingo / Brilliant Active Recall
								</span>
								<span className="font-bold text-[0.7rem] text-orange-500">
									7-Day AI PM Sprint 🔥
								</span>
							</div>
							<h3 className="mt-1 font-extrabold font-heading text-ink-900 text-lg tracking-tight">
								Adaptive Microlearning Engine
							</h3>
							<p className="mt-0.5 max-w-xl text-ink-500 text-xs">
								Experience bite-sized concept absorption,
								procedural audio SFX, instant 2-way feedback
								drawers, and real Career Vault unlocks.
							</p>
						</div>
					</div>

					<Link
						className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-bold text-slate-950 text-xs shadow-amber-500/20 shadow-md transition-all hover:bg-amber-600 active:translate-y-0.5"
						href="/microlearning"
					>
						<span>Enter Sprint Mode</span>
						<span>→</span>
					</Link>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.55fr_1fr]">
				<div className="space-y-3.5">
					<div className="flex items-center justify-between gap-3">
						<div>
							<h3 className="font-extrabold font-heading text-[1.08rem] text-ink-900 tracking-tight">
								Active quests
							</h3>
							<p className="mt-0.5 font-mono text-[0.7rem] text-ink-400 uppercase tracking-wide">
								{rows.length} campaign
								{rows.length === 1 ? "" : "s"} in play
							</p>
						</div>
						<Link
							className="rounded-full border border-brand-300 bg-brand-50 px-3 py-1.5 font-bold text-[0.75rem] text-brand-ink transition hover:bg-brand-500 hover:text-on-brand"
							href="/programs"
						>
							+ New track
						</Link>
					</div>

					<div className="space-y-3.5">
						{rows.map(row => {
							const rowColors = trackOf(row.slug)
							const isFocus = row.slug === focus.slug
							const modules =
								Engine.teachingModules(row.slug)?.length || 6
							const cleared = Math.round(
								(row.progress / 100) * modules,
							)
							const level = Math.max(
								1,
								Math.floor(row.progress / 20) + 1,
							)
							const xp = 100 + row.progress * 12
							const checkpoints = Array.from(
								{ length: Math.min(modules, 8) },
								(_, i) => i < cleared,
							)

							return (
								<button
									className={cn(
										"group relative w-full overflow-hidden rounded-[22px] border p-0 text-left transition-all duration-200 hover:-translate-y-1",
										isFocus
											? "border-brand-400 shadow-[0_14px_34px_rgba(255,179,0,0.22)]"
											: "border-line shadow-xs hover:border-brand-300 hover:shadow-lu-sm",
									)}
									key={row.slug}
									onClick={() => openCourse(row.slug)}
									style={{
										background: `linear-gradient(145deg, ${rowColors[50]} 0%, #ffffff 42%, #ffffff 100%)`,
									}}
									type="button"
								>
									<div
										aria-hidden="true"
										className="absolute inset-x-0 top-0 h-1.5"
										style={{
											background: `linear-gradient(90deg, ${rowColors[500]}, var(--brand-500))`,
										}}
									/>
									<div
										aria-hidden="true"
										className="pointer-events-none absolute -top-10 -right-8 size-36 rounded-full opacity-40 blur-2xl"
										style={{
											background: `rgba(${rowColors.rgb}, 0.35)`,
										}}
									/>

									<div className="relative z-10 p-4 pt-5 sm:p-5">
										<div className="flex items-start gap-3.5">
											<div className="relative shrink-0">
												<span
													className="grid size-14 place-items-center rounded-2xl border-2 font-extrabold font-heading text-[0.95rem] shadow-sm"
													style={{
														background:
															rowColors[100],
														borderColor:
															rowColors[200],
														boxShadow: `0 8px 18px rgba(${rowColors.rgb}, 0.22)`,
														color: rowColors.ink,
													}}
												>
													{row.program.icon || "LU"}
												</span>
												<span className="absolute -right-1.5 -bottom-1.5 grid size-6 place-items-center rounded-full border-2 border-white bg-ink-900 font-bold font-mono text-[0.62rem] text-brand-400">
													L{level}
												</span>
											</div>

											<div className="min-w-0 flex-1">
												<div className="flex flex-wrap items-center gap-1.5">
													{isFocus ? (
														<span className="rounded-md border border-brand-400/50 bg-brand-500 px-2 py-0.5 font-bold font-mono text-[0.6rem] text-on-brand uppercase tracking-wider">
															Active
														</span>
													) : null}
													<span
														className="rounded-md border px-2 py-0.5 font-bold font-mono text-[0.6rem] uppercase tracking-wider"
														style={{
															background:
																rowColors[100],
															borderColor:
																rowColors[200],
															color: rowColors.ink,
														}}
													>
														{row.category}
													</span>
													<span className="rounded-md border border-line bg-white/80 px-2 py-0.5 font-mono text-[0.6rem] text-ink-500">
														+{xp} XP
													</span>
												</div>
												<strong className="mt-1.5 block truncate font-extrabold font-heading text-[1.02rem] text-ink-900 group-hover:text-brand-ink">
													{row.program.title}
												</strong>
												<span className="mt-0.5 block text-[0.74rem] text-ink-500">
													{cleared}/{modules} modules
													cleared · Rank{" "}
													{level < 5
														? "Rookie"
														: level < 8
															? "Builder"
															: "Pro"}
												</span>
											</div>

											<span className="hidden shrink-0 items-center gap-1.5 rounded-xl bg-[linear-gradient(180deg,var(--brand-400),var(--brand-500))] px-3.5 py-2.5 font-bold font-heading text-[0.8rem] text-on-brand shadow-[0_8px_16px_rgba(255,179,0,0.28)] transition group-hover:scale-[1.03] sm:inline-flex">
												Play →
											</span>
										</div>

										<div className="mt-4">
											<div className="mb-2 flex items-center justify-between gap-2">
												<span className="font-bold font-mono text-[0.68rem] text-ink-500 uppercase tracking-wide">
													Quest map
												</span>
												<span
													className="font-extrabold font-mono text-[0.8rem]"
													style={{
														color: rowColors.ink,
													}}
												>
													{row.progress}%
												</span>
											</div>

											<div className="mb-2.5 flex items-center gap-1">
												{checkpoints.map((done, i) => (
													<span
														className={cn(
															"h-2 flex-1 rounded-full transition-all",
															done
																? "shadow-sm"
																: "bg-black/8",
														)}
														key={`${row.slug}-cp-${i}`}
														style={
															done
																? {
																		background: `linear-gradient(90deg, ${rowColors[400]}, var(--brand-500))`,
																	}
																: undefined
														}
													/>
												))}
											</div>

											<div className="relative h-3 overflow-hidden rounded-full bg-black/6">
												<div
													className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
													style={{
														background: `linear-gradient(90deg, ${rowColors[500]}, var(--brand-400), var(--brand-500))`,
														boxShadow: `0 0 12px rgba(${rowColors.rgb}, 0.45)`,
														width: `${Math.max(row.progress, 6)}%`,
													}}
												/>
												<div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] bg-size-[40px_100%] opacity-40" />
											</div>
										</div>

										<span className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-brand-300 bg-brand-50 py-2 font-bold font-heading text-[0.8rem] text-brand-ink sm:hidden">
											Play quest →
										</span>
									</div>
								</button>
							)
						})}
					</div>
				</div>

				<div className="space-y-3.5">
					<div className="rounded-[22px] border border-brand-200 bg-[linear-gradient(180deg,#FFFBF2_0%,#ffffff_55%)] p-4 shadow-xs">
						<div className="mb-3.5 flex items-center justify-between gap-2">
							<div>
								<strong className="font-extrabold font-heading text-[0.95rem] text-ink-900">
									Daily quests
								</strong>
								<p className="font-mono text-[0.65rem] text-ink-400 uppercase tracking-wide">
									Reset in 24h
								</p>
							</div>
							<span className="rounded-full border border-brand-300 bg-brand-500 px-2.5 py-1 font-bold font-mono text-[0.65rem] text-on-brand shadow-[0_6px_14px_rgba(255,179,0,0.3)]">
								+175 XP
							</span>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/60 px-3 py-2.5">
								<div className="flex items-center gap-2.5">
									<span className="grid size-6 place-items-center rounded-full bg-emerald-500 font-bold text-[0.7rem] text-white">
										✓
									</span>
									<span className="font-semibold text-[0.82rem] text-emerald-950">
										Daily login
									</span>
								</div>
								<span className="font-bold font-mono text-[0.72rem] text-emerald-700">
									+25
								</span>
							</div>

							<button
								className="flex w-full items-center justify-between rounded-xl border border-line bg-canvas-muted/70 px-3 py-2.5 text-left transition hover:border-brand-400 hover:bg-brand-50/50"
								onClick={() => openCourse(focus.slug)}
								type="button"
							>
								<div className="flex items-center gap-2.5">
									<span className="grid size-6 place-items-center rounded-full border border-line bg-white font-mono text-[0.65rem] text-ink-500">
										2
									</span>
									<span className="font-semibold text-[0.82rem] text-ink-800">
										Finish 1 lesson
									</span>
								</div>
								<span className="font-bold font-mono text-[0.72rem] text-brand-ink">
									+50
								</span>
							</button>

							<button
								className="flex w-full items-center justify-between rounded-xl border border-line bg-canvas-muted/70 px-3 py-2.5 text-left transition hover:border-brand-400 hover:bg-brand-50/50"
								onClick={() =>
									openTutor(
										`Take 3-question quiz for ${focus.program.title}`,
									)
								}
								type="button"
							>
								<div className="flex items-center gap-2.5">
									<span className="grid size-6 place-items-center rounded-full border border-line bg-white font-mono text-[0.65rem] text-ink-500">
										3
									</span>
									<span className="font-semibold text-[0.82rem] text-ink-800">
										5-min AI quiz
									</span>
								</div>
								<span className="font-bold font-mono text-[0.72rem] text-brand-ink">
									+100
								</span>
							</button>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<button
							className="rounded-2xl border border-line bg-white p-3.5 text-left transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-xs"
							onClick={() => setTab("opportunities")}
							type="button"
						>
							<span className="inline-flex rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-bold font-mono text-[0.62rem] text-emerald-700 uppercase tracking-wide">
								Jobs
							</span>
							<strong className="mt-2.5 block font-extrabold font-heading text-[0.9rem] text-ink-900">
								{focus.openings} matches
							</strong>
							<span className="mt-0.5 block font-medium text-[0.72rem] text-emerald-600">
								View openings →
							</span>
						</button>

						<Link
							className="rounded-2xl border border-line bg-white p-3.5 text-left transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-xs"
							href="/refer"
						>
							<span className="inline-flex rounded-lg border border-brand-200 bg-brand-50 px-2 py-0.5 font-bold font-mono text-[0.62rem] text-brand-ink uppercase tracking-wide">
								Refer
							</span>
							<strong className="mt-2.5 block font-extrabold font-heading text-[0.9rem] text-ink-900">
								Earn ₹500
							</strong>
							<span className="mt-0.5 block font-medium text-[0.72rem] text-brand-ink">
								Invite a friend →
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
