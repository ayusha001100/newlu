"use client"

import { ArrowLeft, Bot, Check, Sparkles } from "lucide-react"
import { getCourseData } from "@/lib/data/course-data"
import { completeStage, logActivity } from "@/lib/data/learn"
import { Engine } from "@/lib/learning/engine"
import { sound } from "@/lib/learning/micro-audio"
import { useLearn } from "@/organisms/learn-centre/context"
import { Button } from "@/ui/button"
import { toast } from "@/ui/toast"

// 6 Interactive Stage Components
import StageCheck from "./stages/stage-check"
import StageLearn from "./stages/stage-learn"
import StageRecap from "./stages/stage-recap"
import StageSee from "./stages/stage-see"
import StageTryAlone from "./stages/stage-try-alone"
import StageTryTogether from "./stages/stage-try-together"

const STAGE_LABELS = {
	concept: { desc: "Absorb & Active Recall", icon: "💡", short: "Learn" },
	demo: { desc: "Interactive Trace Simulation", icon: "👁️", short: "See" },
	guided: { desc: "Guided Scaffolding", icon: "🤝", short: "Practice" },
	quiz: { desc: "Mastery Assessment", icon: "🏆", short: "Check" },
	reflect: { desc: "Career Vault Unlock", icon: "🔒", short: "Reward" },
	task: { desc: "Real-world Scenario", icon: "🎯", short: "Challenge" },
}

export default function ModulePlayer() {
	const {
		activeSlug,
		closeCourse,
		moduleIndex,
		openModule,
		openTutor,
		saveState,
		setSubTab,
		setTab,
		setStageId,
		stageId,
		states,
	} = useLearn()

	const program = Engine.courseOf(activeSlug)
	const state = states[activeSlug] || Engine.blankState()
	const lesson = program?.curriculum?.[moduleIndex]
	const kit = Engine.kit(activeSlug, moduleIndex) || {}
	const done = Engine.stagesDone(state, moduleIndex)
	const order = Engine.STAGES.map(stage => stage.id)
	const stageIndex = order.indexOf(stageId)

	// Fetch rich multi-stage data
	const courseData = getCourseData(activeSlug)
	const moduleData =
		courseData?.modules?.find(m => m.module_index === moduleIndex) ||
		courseData?.modules?.[moduleIndex] ||
		courseData?.modules?.[0] ||
		{}
	const stagesData = moduleData?.stages || {}

	// Fallback mappings
	const stage1Data = stagesData["1_learn"] || {
		screens: [
			{
				content: {
					body:
						lesson?.detail ||
						"Master this fundamental capability through active recall.",
					headline: lesson?.title || "Core Concept Overview",
					visual_hint:
						lesson?.outcome ||
						"🎯 Apply this skill to real-world workflows.",
				},
				emotional_tone: "calm",
				feedback: {
					correct:
						"Spot on! This skill directly enables end-to-end capabilities.",
					incorrect:
						"Yes it is! This skill is foundational to modern workflows.",
				},
				interaction: {
					correct_answer: "Yes",
					hint: "Think about real-world automation and engineering applications.",
					options: ["Yes", "No"],
					prompt: `Is ${lesson?.title || "this skill"} directly applicable to production workflows?`,
					type: "yes_no",
				},
				reading_time: "30 sec read",
				screen_id: `${activeSlug}-${moduleIndex}-01`,
				screen_type: "concept",
			},
		],
	}

	const stage2Data = stagesData["2_see"] || {
		scenario_title:
			kit.demo?.title ||
			`${lesson?.title || "Concept"} Simulation Walkthrough`,
		steps: (
			kit.demo?.steps || [
				"1. Trigger received and memory initialized.",
				"2. Core engine validates state context.",
				"3. Service executes and verifies output.",
				"4. Formatted response is returned cleanly.",
			]
		).map((step, idx) => ({
			actor: "Engine",
			actor_icon: "⚡",
			content: step,
			explanation:
				"Inspect how state transitions between stages in real time.",
			raw_payload: {
				phase: idx + 1,
				status: "OK",
				timestamp: "12:00:00",
			},
			stage_name: `Phase 0${idx + 1}`,
		})),
	}

	const stage3Data = stagesData["3_try_together"] || {
		correct_answer: "B",
		feedback: {
			correct: `Spot on! Understanding ${lesson?.title || "this skill"} is foundational to modern workflows.`,
			incorrect:
				"Option B is correct. Input validation and clean transitions ensure high reliability.",
		},
		hint: `Think about how ${lesson?.title || "this concept"} is applied in practice.`,
		options: [
			{ id: "A", text: "Skip all error checks and manual verification" },
			{
				id: "B",
				text: `Verify inputs and apply best practices for ${lesson?.title || "this task"}`,
			},
			{ id: "C", text: "Hardcode credentials into client-side code" },
			{ id: "D", text: "Delete logs after deployment" },
		],
		prompt: `When implementing ${lesson?.title || "this capability"} in production, what is the most important requirement?`,
		title: kit.guided?.title || `Guided ${lesson?.title || "Practice"}`,
		type: "mcq",
	}

	const stage4Data = stagesData["4_try_alone"] || {
		correct_answer: "A",
		difficulty: "Level 3 - Production Scenario",
		feedback: {
			correct: `Mastery! You correctly handled the real-world edge case for ${lesson?.title || "this module"}.`,
			incorrect:
				"Option A is correct. Defensive error handling and retry logic prevent unexpected outages.",
		},
		hint: "Think about error handling, reliability, and edge cases.",
		options: [
			{
				id: "A",
				text: "Implement exponential backoff retry policies and alert on persistent failures",
			},
			{ id: "B", text: "Crash the application and wipe the database" },
			{ id: "C", text: "Assume network requests will never fail" },
			{
				id: "D",
				text: "Silently swallow all exceptions without logging",
			},
		],
		prompt:
			kit.tasks?.[0]?.brief ||
			`In a production environment running ${lesson?.title || "this service"}, how should you handle unexpected failures or edge cases?`,
		social_proof:
			"💡 74% of developers encounter this challenge in live deployments",
		title: `${lesson?.title || "Production"} Edge Case Challenge`,
	}

	const stage5Data = stagesData["5_check"] || {
		questions: (kit.quiz?.length
			? kit.quiz
			: [
					{
						answer: 0,
						options: [
							`It enables structured, repeatable, and scalable ${lesson?.title || "operations"}`,
							"It is only used for temporary local development",
							"It increases manual labor without benefits",
							"It cannot run in production cloud environments",
						],
						q: `What is the primary benefit of mastering ${lesson?.title || "this skill"}?`,
						why: `Understanding ${lesson?.title || "this concept"} enables scalable, industry-standard practices.`,
					},
					{
						answer: 1,
						options: [
							"Skip all tests and deploy immediately",
							"Automate tests, monitor health metrics, and maintain version control",
							"Never document changes or architecture decisions",
							"Manually copy files across servers",
						],
						q: `Which practice ensures highest long-term maintainability for ${lesson?.title || "this topic"}?`,
						why: "Automated testing, continuous monitoring, and version control are industry best practices.",
					},
				]
		).map(q => ({
			answer: q.answer,
			options: q.options,
			q: q.q,
			why: q.why || "Anchors the core learning principle.",
		})),
		title: `${lesson?.title || "Module"} Mastery Assessment`,
	}

	const stage6Data = stagesData["6_recap"] || {
		badge: `${program?.icon || "LU"} Specialist 🏆`,
		capability_summary:
			moduleData?.capability_unlock ||
			`You have mastered ${lesson?.title || "this module"} and unlocked new career assets.`,
		title: "Module Complete",
		xp_reward: 100,
	}

	if (!(program && lesson)) return null

	const currentStageMeta = STAGE_LABELS[stageId] || {
		icon: "💡",
		short: "Learn",
	}

	const patchState = updater => {
		saveState(activeSlug, current => {
			const next = structuredClone(current)
			updater(next)
			return next
		})
	}

	const handleStageCleared = () => {
		patchState(next => {
			completeStage(next, moduleIndex, stageId)
			logActivity(next)
		})

		toast.add({
			title: "Stage Cleared! +15 XP",
			type: "success",
		})

		const nextStage = order[stageIndex + 1]
		if (nextStage) {
			setStageId(nextStage)
		}
	}

	const handleFinishModule = () => {
		patchState(next => {
			completeStage(next, moduleIndex, "reflect")
			logActivity(next)
		})

		toast.add({
			title: "Module Complete! +50 XP Earned 🎉",
			type: "success",
		})

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
	}

	// Calculate overall track progress
	const totalModules = program.curriculum?.length || 1
	const completedModulesCount = (program.curriculum || []).filter((_, i) =>
		Engine.stagesDone(state, i).has("reflect"),
	).length
	const overallProgressPct = Math.round(
		(completedModulesCount / totalModules) * 100,
	)

	return (
		<div
			className="mx-auto max-w-[1360px] px-3 pb-28 sm:px-6"
			suppressHydrationWarning
		>
			{/* 1. Sleek Consolidated Header */}
			<header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-line/70 border-b pt-1 pb-4">
				<div className="flex items-center gap-3">
					<button
						className="flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-1.5 font-bold text-ink-600 text-xs shadow-2xs transition-colors hover:bg-canvas-muted hover:text-ink-900"
						onClick={() => {
							sound.playClick()
							closeCourse()
						}}
						type="button"
					>
						<ArrowLeft className="size-3.5" />
						<span>Dashboard</span>
					</button>

					<div className="h-4 w-px bg-line" />

					<div className="flex items-center gap-2">
						<span className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.66rem] text-brand-ink uppercase">
							{program.title}
						</span>
						<span className="max-w-[200px] truncate font-extrabold font-heading text-ink-900 text-sm sm:max-w-xs">
							{moduleData?.module_title || lesson.title}
						</span>
					</div>
				</div>

				<div className="flex items-center gap-2.5">
					<div className="flex items-center gap-1.5 rounded-full border border-brand-200 bg-amber-50 px-3 py-1 font-bold font-mono text-brand-ink text-xs">
						<Sparkles className="size-3.5 fill-brand-400 text-brand-500" />
						<span>+50 XP</span>
					</div>

					<Button
						className="h-8.5 rounded-xl px-3 font-bold text-xs shadow-2xs"
						onClick={() => {
							sound.playClick()
							openTutor(
								`Explain ${lesson.title} in simple bullet points with real examples`,
							)
						}}
						size="sm"
						variant="outline"
					>
						<Bot className="mr-1.5 size-3.5 text-brand-500" />
						<span>Ask AI</span>
					</Button>
				</div>
			</header>

			{/* 2. Main 2-Column Learning Arena: [Interactive Stage Canvas (Left)] + [Track Modules Sidebar (Right)] */}
			<div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_340px]">
				{/* LEFT: Active Stage Stepper & Interactive Learning Card */}
				<div className="min-w-0 space-y-4">
					{/* 6-Stage Progress Stepper Pills */}
					<div className="space-y-2">
						<div className="flex items-center justify-between px-1 text-xs">
							<span className="flex items-center gap-2 font-bold font-heading text-ink-900">
								<span className="grid size-5 place-items-center rounded-md bg-brand-500 font-bold font-mono text-[0.7rem] text-slate-950">
									{stageIndex + 1}
								</span>
								<span>{currentStageMeta.desc}</span>
							</span>
							<span className="font-bold font-mono text-[0.72rem] text-ink-500">
								Stage {stageIndex + 1} of {order.length}
							</span>
						</div>

						{/* Stepper Tabs */}
						<div className="grid grid-cols-6 gap-1.5 sm:gap-2">
							{Engine.STAGES.map((stg, _idx) => {
								const isActive = stg.id === stageId
								const isDone = done.has(stg.id)
								const meta = STAGE_LABELS[stg.id] || {
									icon: "●",
									short: stg.label,
								}

								return (
									<button
										className={`flex items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 font-bold text-xs transition-all ${
											isActive
												? "border-brand-500 bg-brand-500 text-slate-950 shadow-sm ring-2 ring-brand-200"
												: isDone
													? "border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100/60"
													: "border-line bg-white text-ink-600 hover:border-brand-200 hover:bg-canvas-muted"
										}`}
										key={stg.id}
										onClick={() => {
											sound.playClick()
											setStageId(stg.id)
										}}
										type="button"
									>
										<span className="shrink-0 text-[11px]">
											{isDone ? "✓" : meta.icon}
										</span>
										<span className="hidden truncate font-heading text-xs sm:inline">
											{meta.short}
										</span>
									</button>
								)
							})}
						</div>
					</div>

					{/* Main Interactive Stage Card */}
					<main className="relative w-full">
						<div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-md sm:p-8">
							{/* Ambient soft glow at top of card */}
							<div className="pointer-events-none absolute -top-20 left-1/2 h-36 w-96 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

							{/* STAGE 1: Learn */}
							{stageId === "concept" && (
								<StageLearn
									onStageComplete={handleStageCleared}
									stageData={stage1Data}
								/>
							)}

							{/* STAGE 2: See */}
							{stageId === "demo" && (
								<StageSee
									onStageComplete={handleStageCleared}
									stageData={stage2Data}
								/>
							)}

							{/* STAGE 3: Practice */}
							{stageId === "guided" && (
								<StageTryTogether
									onStageComplete={handleStageCleared}
									stageData={stage3Data}
								/>
							)}

							{/* STAGE 4: Challenge */}
							{stageId === "task" && (
								<StageTryAlone
									onStageComplete={handleStageCleared}
									stageData={stage4Data}
								/>
							)}

							{/* STAGE 5: Check */}
							{stageId === "quiz" && (
								<StageCheck
									onStageComplete={handleStageCleared}
									stageData={stage5Data}
								/>
							)}

							{/* STAGE 6: Reward */}
							{stageId === "reflect" && (
								<StageRecap
									capabilityUnlock={
										moduleData?.capability_unlock
									}
									careerUnlock={moduleData?.career_unlock}
									onFinishModule={handleFinishModule}
									stageData={stage6Data}
								/>
							)}
						</div>
					</main>
				</div>

				{/* RIGHT: Visible Track Modules Sidebar */}
				<aside className="sticky top-20 space-y-4">
					<div className="rounded-3xl border border-line bg-white p-5 shadow-xs">
						{/* Sidebar Header & Course Progress */}
						<div className="mb-4 space-y-2 border-line border-b pb-3.5">
							<div className="flex items-center justify-between">
								<span className="font-bold font-mono text-[0.68rem] text-brand-ink uppercase tracking-wider">
									{program.title}
								</span>
								<span className="rounded-full bg-canvas-muted px-2 py-0.5 font-bold font-mono text-[0.65rem] text-ink-600">
									{totalModules} Modules
								</span>
							</div>

							<h3 className="font-extrabold font-heading text-base text-ink-900">
								Curriculum Modules
							</h3>

							{/* Overall Progress Bar */}
							<div className="space-y-1 pt-1">
								<div className="flex items-center justify-between text-[0.68rem]">
									<span className="font-medium text-ink-500">
										Progress
									</span>
									<span className="font-bold font-mono text-brand-ink">
										{completedModulesCount}/{totalModules}{" "}
										Cleared ({overallProgressPct}%)
									</span>
								</div>
								<div className="h-1.5 w-full overflow-hidden rounded-full bg-canvas-sunken">
									<div
										className="h-full rounded-full bg-brand-500 transition-all duration-500"
										style={{
											width: `${Math.max(overallProgressPct, 4)}%`,
										}}
									/>
								</div>
							</div>
						</div>

						{/* Module Cards List */}
						<div className="scrollbar-thin max-h-[calc(100vh-280px)] space-y-2.5 overflow-y-auto pr-1">
							{(program.curriculum || []).map((mod, idx) => {
								const isCurrent = idx === moduleIndex
								const modDone = Engine.stagesDone(
									state,
									idx,
								).has("reflect")

								return (
									<button
										className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition-all duration-150 ${
											isCurrent
												? "border-2 border-brand-500 bg-amber-50/50 shadow-xs ring-2 ring-brand-100"
												: modDone
													? "border-emerald-300 bg-emerald-50/40 text-emerald-950 hover:border-emerald-400"
													: "border-line bg-white text-ink-700 shadow-2xs hover:border-brand-200 hover:bg-canvas-muted"
										}`}
										key={idx}
										onClick={() => {
											sound.playClick()
											openModule(idx, "concept")
										}}
										type="button"
									>
										<div className="flex min-w-0 items-center gap-3">
											<span
												className={`grid size-7 shrink-0 place-items-center rounded-xl font-bold font-mono text-xs ${
													isCurrent
														? "bg-brand-500 font-extrabold text-slate-950 shadow-xs"
														: modDone
															? "bg-emerald-500 font-extrabold text-white shadow-xs"
															: "bg-canvas-muted text-ink-600"
												}`}
											>
												{modDone ? (
													<Check className="size-3.5 stroke-[3]" />
												) : (
													idx + 1
												)}
											</span>
											<div className="min-w-0">
												<h4
													className={`truncate font-bold font-heading text-xs sm:text-sm ${
														isCurrent
															? "text-brand-ink"
															: modDone
																? "text-emerald-950"
																: "text-ink-900"
													}`}
												>
													{mod.title}
												</h4>
												<p className="font-medium font-mono text-[0.65rem] text-ink-400">
													{modDone
														? "Completed"
														: isCurrent
															? "Currently Learning"
															: "Ready to learn"}
												</p>
											</div>
										</div>

										{isCurrent && (
											<span className="shrink-0 rounded-full bg-brand-500 px-2 py-0.5 font-bold font-mono text-[0.62rem] text-slate-950 shadow-2xs">
												Current
											</span>
										)}
									</button>
								)
							})}
						</div>
					</div>
				</aside>
			</div>
		</div>
	)
}
