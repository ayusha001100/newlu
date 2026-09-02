"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import PanelKicker from "@/atoms/panel-kicker"
import { completeStage, logActivity } from "@/lib/data/learn"
import { Engine } from "@/lib/learning/engine"
import { cn } from "@/lib/utils"
import TaskCard from "@/molecules/task-card"
import { useLearn } from "@/organisms/learn-centre/context"
import { Button } from "@/ui/button"
import { Label } from "@/ui/label"
import { Textarea } from "@/ui/textarea"
import { toast } from "@/ui/toast"

export default function ModulePlayer() {
	const {
		activeSlug,
		closeCourse,
		moduleIndex,
		openModule,
		openTutor,
		saveState,
		setTab,
		setSubTab,
		stageId,
		setStageId,
		states,
	} = useLearn()

	const program = Engine.courseOf(activeSlug)
	const state = states[activeSlug] || Engine.blankState()
	const lesson = program?.curriculum?.[moduleIndex]
	const kit = Engine.kit(activeSlug, moduleIndex) || {}
	const done = Engine.stagesDone(state, moduleIndex)
	const order = Engine.STAGES.map(stage => stage.id)
	const stageIndex = order.indexOf(stageId)
	const [quizAnswers, setQuizAnswers] = useState({})
	const [quizResult, setQuizResult] = useState(null)
	const [reflectDraft, setReflectDraft] = useState(
		() => state.reflect[String(moduleIndex)] || {},
	)
	const [activeTopicIdx, setActiveTopicIdx] = useState(0)
	const topicRefs = useRef([])

	useEffect(() => {
		if (stageId !== "concept") return
		const handleScroll = () => {
			const viewportCenter = window.innerHeight * 0.45
			let closestIdx = 0
			let minDistance = Number.POSITIVE_INFINITY

			topicRefs.current.forEach((el, idx) => {
				if (!el) return
				const rect = el.getBoundingClientRect()
				const elementCenter = rect.top + rect.height / 2
				const distance = Math.abs(viewportCenter - elementCenter)
				if (distance < minDistance) {
					minDistance = distance
					closestIdx = idx
				}
			})

			setActiveTopicIdx(closestIdx)
		}

		window.addEventListener("scroll", handleScroll, { passive: true })
		handleScroll()
		return () => window.removeEventListener("scroll", handleScroll)
	}, [stageId])

	const blocked = useMemo(() => {
		if (stageId === "task") {
			const tasks = Engine.tasksFor(activeSlug, moduleIndex)
			if (tasks.length && !tasks.some(task => state.tasks[task.id])) {
				return "Submit at least one Skill Challenge to unlock next stage."
			}
		}
		if (stageId === "quiz") {
			if ((kit.quiz || []).length && !state.quiz[String(moduleIndex)]) {
				return "Pass the Knowledge Check quiz to continue."
			}
		}
		return ""
	}, [activeSlug, kit.quiz, moduleIndex, stageId, state])

	if (!(program && lesson)) return null

	const pct = Engine.learningPct(activeSlug, state)
	const isDone = done.has(stageId)
	const wasLast = stageId === order[order.length - 1]
	const nextLabel = wasLast
		? done.has("reflect")
			? "Next Module ➔"
			: "Finish Module (+50 XP) ➔"
		: "Complete Stage & Continue ➔"

	const patchState = updater => {
		saveState(activeSlug, current => {
			const next = structuredClone(current)
			updater(next)
			return next
		})
	}

	const onNext = () => {
		if (blocked) {
			toast.add({ title: blocked, type: "info" })
			return
		}

		if (wasLast) {
			patchState(next => {
				next.reflect[String(moduleIndex)] = reflectDraft
			})
		}

		patchState(next => {
			completeStage(next, moduleIndex, stageId)
			logActivity(next)
		})

		toast.add({
			title: wasLast
				? "Module Complete! +50 XP Earned"
				: "Stage Cleared! +10 XP",
			type: "success",
		})

		if (wasLast) {
			const teaching = Engine.teachingModules(activeSlug).map(
				item => item.index,
			)
			const nextModule = teaching[teaching.indexOf(moduleIndex) + 1]
			if (nextModule !== undefined) {
				openModule(nextModule, "concept")
				return
			}
			closeCourse()
			setTab("learn")
			setSubTab("learn", "project")
			return
		}

		const nextStage = order[stageIndex + 1]
		if (nextStage) setStageId(nextStage)
	}

	const onPrev = () => {
		if (stageIndex > 0) {
			setStageId(order[stageIndex - 1])
			return
		}
		if (moduleIndex > 0) {
			openModule(moduleIndex - 1, order[order.length - 1])
		}
	}

	const submitQuiz = event => {
		event.preventDefault()
		const questions = kit.quiz || []
		const answers = questions.map((_, index) =>
			Number(quizAnswers[`q${index}`]),
		)
		if (answers.some(value => Number.isNaN(value))) {
			toast.add({ title: "Answer every question first.", type: "info" })
			return
		}
		const correct = questions.filter(
			(question, index) => answers[index] === question.answer,
		).length
		const score = Math.round((correct / questions.length) * 100)
		const previous = state.quiz[String(moduleIndex)]
		patchState(next => {
			next.quiz[String(moduleIndex)] = {
				answers,
				attempts: (previous?.attempts || 0) + 1,
				score,
			}
			logActivity(next)
		})
		setQuizResult({ answers, correct, questions, score })
	}

	return (
		<div className="mx-auto max-w-[1280px] pb-28">
			{/* Top Bar Navigation */}
			<div className="mb-4 flex items-center justify-between">
				<button
					className="group inline-flex items-center gap-2 font-bold font-heading text-[0.84rem] text-ink-500 transition-colors hover:text-ink-900"
					onClick={closeCourse}
					type="button"
				>
					<span className="transition-transform group-hover:-translate-x-1">
						←
					</span>
					<span>Back to Learning Dashboard</span>
				</button>

				<div className="flex items-center gap-2">
					<span className="rounded-full border border-brand-200 bg-amber-50 px-3 py-1 font-bold font-mono text-[0.7rem] text-brand-ink">
						+50 XP on completion
					</span>
				</div>
			</div>

			{/* 1. Gamified Header Card */}
			<div className="mb-6 rounded-3xl border border-line bg-white p-5 shadow-xs sm:p-6">
				<div className="flex flex-wrap items-start justify-between gap-4">
					<div className="min-w-0 flex-1">
						<div className="mb-1.5 flex items-center gap-2">
							<span className="rounded-full border border-brand-300 bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.66rem] text-brand-ink uppercase">
								{program.title}
							</span>
							<span className="font-mono text-ink-400 text-xs">
								● {lesson.week || `Module 0${moduleIndex + 1}`}
							</span>
						</div>
						<h1 className="font-extrabold font-heading text-2xl text-ink-900 tracking-tight sm:text-[1.75rem]">
							{lesson.title}
						</h1>
						<p className="mt-1.5 max-w-[700px] text-[0.88rem] text-ink-500 leading-relaxed">
							{lesson.detail}
						</p>
					</div>

					<div className="flex shrink-0 items-center gap-3">
						<Button
							className="shadow-xs"
							onClick={() =>
								openTutor(
									`Explain ${lesson.title} step-by-step with examples`,
								)
							}
							size="sm"
							type="button"
							variant="outline"
						>
							Ask AI Tutor
						</Button>
					</div>
				</div>

				{/* Progress Track */}
				<div className="mt-5 space-y-1.5 border-line/60 border-t pt-4">
					<div className="flex items-center justify-between text-xs">
						<span className="font-bold text-ink-700">
							Module Quest Progress
						</span>
						<span className="font-bold font-mono text-brand-ink">
							{done.size} / {Engine.STAGES.length} Stages Cleared
							({pct}%)
						</span>
					</div>
					<div className="h-2 w-full overflow-hidden rounded-full bg-canvas-sunken">
						<div
							className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500))] shadow-[0_0_8px_var(--brand-400)] transition-all duration-500"
							style={{
								width: `${Math.max((done.size / Engine.STAGES.length) * 100, 4)}%`,
							}}
						/>
					</div>
				</div>
			</div>

			{/* 2. Main Stage Stage Nodes & Content Layout */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
				<div className="min-w-0 space-y-5">
					{/* Quest Stage Progression Nodes */}
					<div
						className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-1"
						role="tablist"
					>
						{Engine.STAGES.map((stage, index) => {
							const active = stage.id === stageId
							const stageDone = done.has(stage.id)
							return (
								<button
									aria-selected={active}
									className={cn(
										"group relative flex min-w-[130px] flex-1 items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200",
										active
											? "border-brand-500 bg-brand-50/80 shadow-xs ring-2 ring-brand-200"
											: stageDone
												? "border-emerald-200 bg-emerald-50/40 hover:border-emerald-300"
												: "border-line bg-white hover:border-brand-200 hover:bg-canvas-muted",
									)}
									key={stage.id}
									onClick={() => setStageId(stage.id)}
									role="tab"
									type="button"
								>
									{/* Node Number / Check */}
									<span
										className={cn(
											"grid size-7 shrink-0 place-items-center rounded-xl font-bold font-mono text-xs transition-colors",
											stageDone
												? "bg-emerald-500 text-white shadow-xs"
												: active
													? "bg-brand-500 text-on-brand shadow-xs"
													: "border border-line bg-canvas-muted text-ink-500",
										)}
									>
										{stageDone ? "✓" : index + 1}
									</span>

									<div className="min-w-0">
										<strong
											className={cn(
												"block truncate font-extrabold font-heading text-[0.82rem] leading-tight",
												active
													? "text-brand-ink"
													: stageDone
														? "text-emerald-950"
														: "text-ink-800",
											)}
										>
											{stage.label}
										</strong>
										<span className="block truncate font-mono text-[0.68rem] text-ink-400">
											{stage.blurb}
										</span>
									</div>
								</button>
							)
						})}
					</div>

					{/* Stage Main Body Content Container */}
					<div className="rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-7">
						{isDone ? (
							<div className="mb-5 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-emerald-900 text-xs">
								<span className="flex items-center gap-2 font-bold font-heading text-[0.84rem]">
									<span className="grid size-5 place-items-center rounded-full bg-emerald-500 text-[0.65rem] text-white">
										✓
									</span>
									Stage Completed
								</span>
								<span className="font-mono text-emerald-700">
									+10 XP Earned
								</span>
							</div>
						) : null}

						{/* STAGE 1: Concept & Video */}
						{stageId === "concept" ? (
							<div className="space-y-6">
								{/* Cosmic Video Player Shell */}
								<div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(140deg,#0A0E17_0%,#131B2B_50%,#090D15_100%)] text-white shadow-xl">
									{/* Glow & grid backdrop */}
									<div className="pointer-events-none absolute -top-12 -right-12 size-48 rounded-full bg-brand-500/15 blur-[60px]" />
									<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,179,0,0.08)_1px,transparent_1px)] bg-size-[20px_20px]" />

									<div className="relative z-10 flex flex-col items-center p-4 text-center">
										<div className="mb-3 grid size-16 place-items-center rounded-full border-2 border-brand-400/60 bg-brand-500 text-2xl text-on-brand shadow-[0_0_25px_rgba(255,179,0,0.4)] transition-transform duration-300 group-hover:scale-110">
											▶
										</div>
										<p className="font-extrabold font-heading text-base text-white tracking-tight sm:text-lg">
											{lesson.week} · {lesson.title}
										</p>
										<span className="mt-1 font-mono text-[0.74rem] text-slate-400">
											HD Concept Walkthrough · ~12 mins
										</span>
									</div>
								</div>

								{/* Structured Curriculum Points with Dynamic Scroll Spotlight Focus */}
								<div className="space-y-4">
									<div className="flex items-center justify-between px-1">
										<span className="font-bold font-mono text-[0.7rem] text-brand-ink uppercase tracking-wider">
											TOPIC CURRICULUM · SCROLL TO
											NAVIGATE
										</span>
										<span className="rounded-full bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.65rem] text-brand-ink">
											{activeTopicIdx + 1} of{" "}
											{(lesson.sections || []).length} In
											Focus
										</span>
									</div>

									{(lesson.sections || []).map(
										(section, idx) => {
											const isFocused =
												idx === activeTopicIdx
											return (
												<button
													className={cn(
														"group relative w-full rounded-2xl border p-5 text-left transition-all duration-500",
														isFocused
															? "scale-[1.008] border-brand-400 bg-white opacity-100 shadow-lu-sm ring-2 ring-brand-200/80"
															: "scale-[0.985] cursor-pointer border-line bg-canvas-muted/40 opacity-40 blur-[2px] grayscale-[25%] hover:opacity-85 hover:blur-none hover:grayscale-0",
													)}
													key={section.name}
													onClick={() =>
														setActiveTopicIdx(idx)
													}
													ref={el => {
														topicRefs.current[idx] =
															el
													}}
													type="button"
												>
													<div className="mb-2.5 flex items-center justify-between">
														<div className="flex items-center gap-2">
															<span
																className={cn(
																	"grid size-6 place-items-center rounded-lg font-bold font-mono text-xs shadow-xs transition-colors",
																	isFocused
																		? "bg-brand-500 text-on-brand"
																		: "border border-line bg-white text-ink-700",
																)}
															>
																{idx + 1}
															</span>
															<h3
																className={cn(
																	"font-extrabold font-heading text-[0.98rem] transition-colors",
																	isFocused
																		? "text-ink-900"
																		: "text-ink-700",
																)}
															>
																{section.name}
															</h3>
														</div>

														{isFocused && (
															<span className="flex items-center gap-1.5 rounded-full border border-brand-300 bg-amber-50 px-2.5 py-0.5 font-bold font-mono text-[0.65rem] text-brand-ink">
																<span className="size-1.5 animate-pulse rounded-full bg-brand-500" />
																READING FOCUS
															</span>
														)}
													</div>
													<ul className="list-disc space-y-1.5 pl-8 text-[0.86rem] text-ink-700 leading-relaxed">
														{section.points.map(
															point => (
																<li key={point}>
																	{point}
																</li>
															),
														)}
													</ul>
												</button>
											)
										},
									)}

									{/* Outcome / Takeaway Box */}
									{lesson.outcome ? (
										<div className="rounded-2xl border border-brand-200 bg-amber-50/50 p-4.5">
											<PanelKicker className="mb-1 text-brand-ink">
												MISSION OUTCOME
											</PanelKicker>
											<p className="font-medium text-[0.88rem] text-ink-800 leading-relaxed">
												{lesson.outcome}
											</p>
										</div>
									) : null}
								</div>
							</div>
						) : null}

						{/* STAGE 2: Demo */}
						{stageId === "demo" ? (
							<div className="space-y-6">
								<div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(140deg,#0A0E17_0%,#131B2B_50%,#090D15_100%)] text-white shadow-xl">
									<div className="pointer-events-none absolute -top-12 -right-12 size-48 rounded-full bg-brand-500/15 blur-[60px]" />
									<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,179,0,0.08)_1px,transparent_1px)] bg-size-[20px_20px]" />
									<div className="relative z-10 p-4 text-center">
										<div className="mb-3 grid size-16 place-items-center rounded-full border-2 border-brand-400/60 bg-brand-500 text-2xl text-on-brand shadow-[0_0_25px_rgba(255,179,0,0.4)] transition-transform duration-300 group-hover:scale-110">
											▶
										</div>
										<p className="font-extrabold font-heading text-base text-white sm:text-lg">
											Instructor Demo ·{" "}
											{kit.demo?.title || lesson.title}
										</p>
										<span className="mt-1 font-mono text-[0.74rem] text-slate-400">
											Interactive Walkthrough ·{" "}
											{(kit.demo?.steps || []).length}{" "}
											Phases
										</span>
									</div>
								</div>

								{/* Step by Step Action Cards */}
								<div className="space-y-3.5">
									<div className="flex items-center justify-between px-1">
										<span className="font-bold font-mono text-[0.7rem] text-brand-ink uppercase tracking-wider">
											STEP-BY-STEP LIVE DEMO BREAKDOWN
										</span>
										<span className="rounded-full bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.65rem] text-brand-ink">
											{(kit.demo?.steps || []).length} Key
											Checkpoints
										</span>
									</div>

									<div className="grid gap-3">
										{(kit.demo?.steps || []).map(
											(step, stepIdx) => (
												<div
													className="group relative flex items-start gap-3.5 rounded-2xl border border-line bg-gradient-to-r from-white to-amber-50/20 p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lu-sm"
													key={step}
												>
													<span className="grid size-7 shrink-0 place-items-center rounded-xl border border-brand-200 bg-brand-50 font-bold font-mono text-brand-ink text-xs shadow-xs transition-colors group-hover:bg-brand-500 group-hover:text-on-brand">
														0{stepIdx + 1}
													</span>
													<div className="min-w-0 flex-1">
														<div className="mb-1 flex items-center gap-2">
															<span className="font-bold font-mono text-[0.66rem] text-ink-400 uppercase tracking-wide">
																PHASE 0
																{stepIdx + 1}
															</span>
														</div>
														<p className="font-medium text-[0.88rem] text-ink-800 leading-relaxed">
															{step}
														</p>
													</div>
												</div>
											),
										)}
									</div>
								</div>
							</div>
						) : null}

						{/* STAGE 3: Guided Practice */}
						{stageId === "guided" ? (
							<div className="space-y-6">
								<div className="rounded-2xl border border-brand-200/80 bg-gradient-to-br from-white to-amber-50/40 p-5 shadow-xs">
									<div className="mb-1.5 flex items-center gap-2">
										<span className="rounded-full border border-brand-300 bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.66rem] text-brand-ink uppercase">
											GUIDED HANDS-ON QUEST
										</span>
									</div>
									<h3 className="font-extrabold font-heading text-ink-900 text-xl">
										{kit.guided?.title ||
											"Guided Hands-On Exercise"}
									</h3>
									<p className="mt-1.5 text-[0.88rem] text-ink-600 leading-relaxed">
										{kit.guided?.brief ||
											lesson.activity ||
											""}
									</p>
								</div>

								{/* Step cards */}
								<div className="space-y-3">
									<span className="block px-1 font-bold font-mono text-[0.7rem] text-brand-ink uppercase tracking-wider">
										EXECUTION WORKFLOW
									</span>
									<div className="grid gap-2.5">
										{(kit.guided?.steps || []).map(
											(step, sIdx) => (
												<div
													className="flex items-start gap-3 rounded-2xl border border-line bg-white p-3.5 shadow-xs transition-colors hover:border-brand-200 hover:bg-amber-50/20"
													key={step}
												>
													<span className="grid size-6 shrink-0 place-items-center rounded-lg border border-brand-200 bg-brand-50 font-bold font-mono text-brand-ink text-xs">
														{sIdx + 1}
													</span>
													<p className="font-medium text-[0.86rem] text-ink-800 leading-relaxed">
														{step}
													</p>
												</div>
											),
										)}
									</div>
								</div>

								{kit.guided?.starter ? (
									<div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-lg">
										<div className="flex items-center justify-between border-slate-800 border-b bg-slate-900/90 px-4 py-2.5">
											<div className="flex items-center gap-2">
												<span className="size-2.5 rounded-full bg-red-500/80" />
												<span className="size-2.5 rounded-full bg-amber-500/80" />
												<span className="size-2.5 rounded-full bg-emerald-500/80" />
												<span className="ml-2 font-bold font-mono text-[0.72rem] text-slate-300">
													STARTER PROMPT / CODE
												</span>
											</div>
											<div className="flex items-center gap-2">
												<button
													className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 font-bold font-mono text-[0.75rem] text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
													onClick={() => {
														navigator.clipboard?.writeText(
															kit.guided.starter,
														)
														toast.add({
															title: "Copied starter to clipboard!",
															type: "success",
														})
													}}
													type="button"
												>
													Copy Prompt 📋
												</button>
												<Button
													className="h-7 text-xs shadow-none"
													onClick={() =>
														openTutor(
															`Review starter code: ${kit.guided.starter}`,
														)
													}
													size="sm"
													type="button"
												>
													Ask AI Tutor 🤖
												</Button>
											</div>
										</div>
										<pre className="overflow-x-auto whitespace-pre-wrap p-4 font-mono text-[0.84rem] text-amber-200/95 leading-relaxed">
											{kit.guided.starter}
										</pre>
									</div>
								) : null}
							</div>
						) : null}

						{/* STAGE 4: Tasks */}
						{stageId === "task" ? (
							<div className="space-y-4">
								<div className="flex items-center justify-between border-line border-b pb-3">
									<div>
										<h3 className="font-extrabold font-heading text-[1.1rem] text-ink-900">
											Independent Skill Challenges
										</h3>
										<p className="text-[0.84rem] text-ink-500">
											Submit at least 1 task to verify
											your hands-on mastery.
										</p>
									</div>
									<span className="rounded-full bg-brand-50 px-3 py-1 font-bold font-mono text-brand-ink text-xs">
										{
											Engine.tasksFor(
												activeSlug,
												moduleIndex,
											).filter(t => state.tasks[t.id])
												.length
										}{" "}
										/{" "}
										{
											Engine.tasksFor(
												activeSlug,
												moduleIndex,
											).length
										}{" "}
										Done
									</span>
								</div>

								<div className="grid gap-3 pt-2">
									{Engine.tasksFor(
										activeSlug,
										moduleIndex,
									).map(task => (
										<TaskCard
											key={task.id}
											moduleIndex={moduleIndex}
											task={task}
										/>
									))}
								</div>
							</div>
						) : null}
						{/* STAGE 5: Quiz */}
						{stageId === "quiz" ? (
							<div className="space-y-6">
								{/* Compact Quest Header Card */}
								<div className="relative overflow-hidden rounded-2xl border border-brand-200/80 bg-gradient-to-r from-amber-50/60 via-white to-amber-50/30 p-4 shadow-xs sm:p-5">
									<div className="flex flex-wrap items-center justify-between gap-3">
										<div>
											<div className="mb-1 flex items-center gap-2">
												<span className="rounded-full border border-brand-300 bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.66rem] text-brand-ink uppercase">
													STAGE 05 · KNOWLEDGE CHECK
												</span>
												<span className="font-mono text-ink-400 text-xs">
													● {(kit.quiz || []).length}{" "}
													Questions
												</span>
											</div>
											<h3 className="font-extrabold font-heading text-ink-900 text-lg">
												Module Knowledge Challenge
											</h3>
											<p className="mt-0.5 text-[0.82rem] text-ink-500">
												Score 60%+ to complete this
												stage and earn your verification
												XP.
											</p>
										</div>

										<div className="flex items-center gap-2">
											<span className="rounded-xl border border-brand-200 bg-white px-3 py-1.5 font-bold font-mono text-[0.76rem] text-brand-ink shadow-2xs">
												⚡ +50 XP Reward
											</span>
										</div>
									</div>
								</div>

								{!(kit.quiz || []).length ? (
									<p className="py-8 text-center font-mono text-ink-500 text-sm">
										Question bank being curated for this
										module.
									</p>
								) : (
									<form
										className="space-y-6"
										onSubmit={submitQuiz}
									>
										{(kit.quiz || []).map(
											(question, index) => {
												const isSubmitted =
													Boolean(quizResult)
												const selectedVal = Number(
													quizAnswers[`q${index}`],
												)
												const isAnswered =
													!Number.isNaN(
														selectedVal,
													) && selectedVal >= 0

												return (
													<div
														className={cn(
															"group relative overflow-hidden rounded-3xl border-2 bg-white p-6 shadow-xs transition-all duration-300 hover:border-brand-400 hover:shadow-lu-md sm:p-7",
															isAnswered
																? "border-brand-200"
																: "border-slate-200/90",
														)}
														key={question.q}
													>
														{/* Question Header Pill Bar */}
														<div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-line/60 border-b pb-3.5">
															<div className="flex items-center gap-2.5">
																<span className="grid size-8 place-items-center rounded-xl border border-brand-300 bg-brand-50 font-extrabold font-mono text-brand-ink text-xs shadow-2xs">
																	Q{index + 1}
																</span>
																<span className="font-bold font-mono text-[0.72rem] text-ink-500 uppercase tracking-wider">
																	QUESTION{" "}
																	{index + 1}{" "}
																	OF{" "}
																	{
																		(
																			kit.quiz ||
																			[]
																		).length
																	}
																</span>
															</div>

															<div className="flex items-center gap-2">
																{isAnswered ? (
																	<span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-bold font-mono text-[0.68rem] text-emerald-700">
																		<span className="size-1.5 rounded-full bg-emerald-500" />
																		Answer
																		Selected
																	</span>
																) : (
																	<span className="rounded-full bg-canvas-muted px-2.5 py-0.5 font-mono text-[0.68rem] text-ink-400">
																		Pending
																	</span>
																)}
																<span className="rounded-full border border-brand-200 bg-amber-50 px-2.5 py-0.5 font-bold font-mono text-[0.68rem] text-brand-ink">
																	+15 XP
																</span>
															</div>
														</div>

														{/* Question Title */}
														<h4 className="font-extrabold font-heading text-[1.1rem] text-ink-900 leading-snug">
															{question.q}
														</h4>

														{/* 3D Tactile Option Buttons */}
														<div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
															{question.options.map(
																(
																	option,
																	optionIndex,
																) => {
																	const isSelected =
																		selectedVal ===
																		optionIndex
																	const letter =
																		[
																			"A",
																			"B",
																			"C",
																			"D",
																		][
																			optionIndex
																		] ||
																		String(
																			optionIndex +
																				1,
																		)
																	const isCorrect =
																		isSubmitted &&
																		optionIndex ===
																			question.answer
																	const isUserWrong =
																		isSubmitted &&
																		isSelected &&
																		optionIndex !==
																			question.answer

																	return (
																		<button
																			className={cn(
																				"group/opt relative flex items-start gap-3.5 rounded-2xl border-2 p-4 text-left transition-all duration-200",
																				// 3D tactile button border states
																				isSelected
																					? "border-brand-500 border-b-4 border-b-brand-600 bg-amber-50/90 text-brand-ink shadow-sm ring-2 ring-brand-300/80"
																					: "border-slate-200/90 border-b-4 border-b-slate-300 bg-white text-ink-800 hover:-translate-y-0.5 hover:border-brand-300 hover:border-b-4 hover:border-b-brand-400 hover:bg-amber-50/20 active:translate-y-0.5 active:border-b-2",
																				isCorrect &&
																					"border-emerald-500 border-b-4 border-b-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300",
																				isUserWrong &&
																					"border-rose-400 border-b-4 border-b-rose-500 bg-rose-50 text-rose-950 line-through opacity-90 ring-2 ring-rose-200",
																			)}
																			key={
																				option
																			}
																			onClick={() =>
																				setQuizAnswers(
																					prev => ({
																						...prev,
																						[`q${index}`]:
																							String(
																								optionIndex,
																							),
																					}),
																				)
																			}
																			type="button"
																		>
																			{/* Letter Badge Avatar */}
																			<span
																				className={cn(
																					"grid size-8 shrink-0 place-items-center rounded-xl font-extrabold font-mono text-xs transition-all duration-200",
																					isSelected
																						? "bg-brand-500 text-on-brand shadow-xs"
																						: "border border-line bg-canvas-muted text-ink-600 group-hover/opt:border-brand-300 group-hover/opt:bg-brand-50 group-hover/opt:text-brand-ink",
																					isCorrect &&
																						"bg-emerald-500 text-white",
																					isUserWrong &&
																						"bg-rose-500 text-white",
																				)}
																			>
																				{isCorrect
																					? "✓"
																					: isUserWrong
																						? "✕"
																						: letter}
																			</span>

																			<div className="min-w-0 flex-1">
																				<span className="block font-medium text-[0.9rem] leading-snug">
																					{
																						option
																					}
																				</span>
																				{isCorrect && (
																					<span className="mt-1 block font-bold font-mono text-[0.68rem] text-emerald-700">
																						✓
																						Correct
																						Choice
																					</span>
																				)}
																				{isUserWrong && (
																					<span className="mt-1 block font-bold font-mono text-[0.68rem] text-rose-600">
																						✕
																						Incorrect
																						Choice
																					</span>
																				)}
																			</div>
																		</button>
																	)
																},
															)}
														</div>

														{/* Post-submission Knowledge Insight Feedback */}
														{isSubmitted &&
														question.explain ? (
															<div className="mt-4 rounded-2xl border border-brand-200 bg-amber-50/50 p-4 text-ink-700 text-xs">
																<strong className="block font-bold font-heading text-[0.82rem] text-brand-ink">
																	💡 Knowledge
																	Explanation:
																</strong>
																<p className="mt-0.5 text-ink-600 leading-relaxed">
																	{
																		question.explain
																	}
																</p>
															</div>
														) : null}
													</div>
												)
											},
										)}

										{/* Gamified Action Bar */}
										<div className="flex flex-wrap items-center gap-3.5 pt-2">
											<Button
												className="gap-2 border-b-4 border-b-brand-600 px-6 py-6 font-extrabold text-[0.95rem] shadow-lu-sm active:translate-y-0.5 active:border-b-2"
												size="default"
												type="submit"
											>
												<span>
													⚡ Submit & Verify Answers
												</span>
												<span className="rounded-full bg-black/10 px-2 py-0.5 font-mono text-xs">
													+50 XP
												</span>
											</Button>

											{quizResult ? (
												<Button
													className="px-5 py-6 font-bold"
													onClick={() => {
														setQuizResult(null)
														setQuizAnswers({})
													}}
													type="button"
													variant="outline"
												>
													Retake Challenge 🔄
												</Button>
											) : null}
										</div>
									</form>
								)}

								{/* Celebratory Result Card */}
								{quizResult ? (
									<div
										className={cn(
											"overflow-hidden rounded-3xl border-2 p-6 shadow-lu-sm sm:p-7",
											quizResult.score >= 60
												? "border-emerald-300 bg-gradient-to-r from-white via-emerald-50/40 to-white text-emerald-950"
												: "border-rose-300 bg-gradient-to-r from-white via-rose-50/40 to-white text-rose-950",
										)}
									>
										<div className="flex flex-wrap items-center justify-between gap-4">
											<div>
												<span className="rounded-full bg-white/80 px-3 py-1 font-bold font-mono text-[0.7rem] uppercase tracking-wider shadow-2xs">
													{quizResult.score >= 60
														? "🎉 KNOWLEDGE CHECK CLEARED"
														: "⚠️ PASS SCORE: 60% REQUIRED"}
												</span>
												<h4 className="mt-2 font-extrabold font-heading text-2xl sm:text-3xl">
													Verification Score:{" "}
													{quizResult.score}%
												</h4>
												<p className="mt-1 text-[0.88rem] text-ink-600">
													{quizResult.correct} of{" "}
													{
														quizResult.questions
															.length
													}{" "}
													questions answered
													accurately.{" "}
													{quizResult.score >= 60
														? "You have successfully earned +50 XP and unlocked the Reflection stage!"
														: "Score is below 60%. Review the explanations above and retake to clear."}
												</p>
											</div>

											<div className="rounded-2xl border border-brand-200 bg-white p-4 text-center shadow-xs">
												<span className="block font-extrabold font-mono text-2xl text-brand-ink">
													{quizResult.score >= 60
														? "+50 XP"
														: "+0 XP"}
												</span>
												<span className="font-bold font-mono text-[0.64rem] text-ink-400 uppercase">
													XP REWARD
												</span>
											</div>
										</div>
									</div>
								) : null}
							</div>
						) : null}

						{/* STAGE 6: Reflection */}
						{stageId === "reflect" ? (
							<div className="space-y-5">
								<div className="rounded-2xl border border-brand-200/80 bg-gradient-to-br from-white to-amber-50/40 p-5 shadow-xs">
									<div className="mb-1.5 flex items-center gap-2">
										<span className="rounded-full border border-brand-300 bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.66rem] text-brand-ink uppercase">
											CAREER PASSPORT RECAP
										</span>
										<span className="font-bold font-mono text-[0.7rem] text-brand-ink">
											+50 XP
										</span>
									</div>
									<h3 className="font-extrabold font-heading text-ink-900 text-xl">
										Session Key Insights & Interview Prep
									</h3>
									<p className="mt-1 text-[0.86rem] text-ink-600 leading-relaxed">
										Documenting key takeaways solidifies
										retention for interview rounds and
										portfolio artifacts.
									</p>
								</div>

								<div className="space-y-4 pt-1">
									{(kit.reflection || []).map(
										(prompt, index) => (
											<div
												className="rounded-2xl border border-line bg-white p-4.5 shadow-xs transition-colors focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100"
												key={prompt}
											>
												<div className="mb-2 flex items-center justify-between">
													<Label className="block font-bold text-ink-900 text-xs sm:text-sm">
														{prompt}
													</Label>
													<span className="font-mono text-[0.68rem] text-ink-400">
														Prompt 0{index + 1}
													</span>
												</div>
												<Textarea
													className="rounded-xl border-line/80 bg-canvas-muted/30 text-[0.86rem] focus:bg-white"
													onChange={event =>
														setReflectDraft(
															prev => ({
																...prev,
																[index]:
																	event.target
																		.value,
															}),
														)
													}
													placeholder="Type your personal insights, key mental models, or code takeaways..."
													rows={3}
													value={
														reflectDraft[index] ||
														""
													}
												/>
											</div>
										),
									)}
								</div>
							</div>
						) : null}
					</div>
				</div>

				{/* Right Sidebar: Module Quest Roadmap */}
				<aside className="sticky top-[96px] h-fit rounded-3xl border border-line bg-white p-4.5 shadow-xs">
					<div className="mb-3.5 flex items-center justify-between border-line border-b pb-2.5">
						<span className="font-bold font-mono text-[0.7rem] text-ink-400 uppercase tracking-wider">
							TRACK MODULES
						</span>
						<span className="rounded-full bg-canvas-muted px-2 py-0.5 font-bold font-mono text-[0.68rem] text-ink-600">
							{Engine.teachingModules(activeSlug).length} Total
						</span>
					</div>

					<div className="space-y-1.5">
						{Engine.teachingModules(activeSlug).map(
							({ lesson: item, index }) => {
								const moduleDone = Engine.stagesDone(
									state,
									index,
								)
								const complete =
									moduleDone.size === Engine.STAGES.length
								const current = index === moduleIndex
								return (
									<button
										className={cn(
											"group flex w-full items-center justify-between gap-2.5 rounded-2xl p-2.5 text-left transition-all duration-200",
											current
												? "border border-brand-400 bg-brand-50/70 shadow-xs"
												: complete
													? "border border-emerald-100 bg-emerald-50/30 hover:bg-emerald-50/60"
													: "border border-transparent hover:border-line hover:bg-canvas-muted",
										)}
										key={item.slug || index}
										onClick={() => openModule(index)}
										type="button"
									>
										<div className="flex min-w-0 items-center gap-2.5">
											<span
												className={cn(
													"grid size-7 shrink-0 place-items-center rounded-xl font-bold font-mono text-xs transition-colors",
													complete
														? "bg-emerald-500 text-white shadow-xs"
														: current
															? "bg-brand-500 text-on-brand shadow-xs"
															: "border border-line bg-white text-ink-600",
												)}
											>
												{complete ? "✓" : index + 1}
											</span>
											<div className="min-w-0">
												<strong className="block truncate font-bold font-heading text-[0.82rem] text-ink-900 transition-colors group-hover:text-brand-ink">
													{item.title}
												</strong>
												<span className="block font-mono text-[0.66rem] text-ink-400">
													{moduleDone.size}/
													{Engine.STAGES.length}{" "}
													stages
												</span>
											</div>
										</div>

										{current && (
											<span className="size-2 shrink-0 rounded-full bg-brand-500" />
										)}
									</button>
								)
							},
						)}
					</div>
				</aside>
			</div>

			{/* Sticky Floating Bottom Bar */}
			<div className="fixed inset-x-0 bottom-0 z-40 border-line border-t bg-white/95 px-5 py-3.5 shadow-lg backdrop-blur-md">
				<div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
					<Button
						disabled={stageIndex === 0 && moduleIndex === 0}
						onClick={onPrev}
						type="button"
						variant="outline"
					>
						← Previous Stage
					</Button>
					<Button
						className="shadow-[0_4px_15px_rgba(255,179,0,0.25)]"
						onClick={onNext}
						type="button"
					>
						{nextLabel}
					</Button>
				</div>
			</div>
		</div>
	)
}
