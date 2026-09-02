"use client"

import { useState } from "react"
import MiniProgress from "@/atoms/mini-progress"
import PanelKicker from "@/atoms/panel-kicker"
import { LEARN_SUBS, logActivity, topicTotal } from "@/lib/data/learn"
import { COMMUNITY_CHALLENGE, Engine } from "@/lib/learning/engine"
import { cn } from "@/lib/utils"
import SubNav from "@/molecules/sub-nav"
import TaskCard from "@/molecules/task-card"
import { useLearn } from "@/organisms/learn-centre/context"
import EmptyProgram from "@/organisms/learn-centre/empty-program"
import { Button } from "@/ui/button"
import { Textarea } from "@/ui/textarea"
import { toast } from "@/ui/toast"

function ModuleQuestCard({ lesson, index, position, state, onOpen }) {
	const done = Engine.stagesDone(state, index)
	const pct = Math.round((done.size / Engine.STAGES.length) * 100)
	const quiz = state.quiz[String(index)]
	const isComplete = pct === 100

	return (
		<div
			className={cn(
				"group relative flex flex-col justify-between gap-4 rounded-2xl border bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lu-sm md:flex-row md:items-center",
				isComplete
					? "border-emerald-200/80 bg-gradient-to-r from-white to-emerald-50/20"
					: "border-line",
			)}
		>
			{/* Left: Number & Details */}
			<div className="flex items-start gap-4">
				<span
					className={cn(
						"grid size-12 shrink-0 place-items-center rounded-2xl font-extrabold font-mono text-sm shadow-xs transition-colors",
						isComplete
							? "bg-emerald-500 text-white"
							: pct > 0
								? "border border-brand-300 bg-brand-50 text-brand-ink"
								: "border border-line bg-canvas-muted text-ink-700",
					)}
				>
					{isComplete
						? "✓"
						: position < 9
							? `0${position + 1}`
							: position + 1}
				</span>

				<div className="min-w-0">
					<div className="mb-1 flex flex-wrap items-center gap-2">
						<span className="font-bold font-mono text-[0.68rem] text-brand-ink uppercase tracking-wider">
							{lesson.week || `MODULE 0${position + 1}`}
						</span>
						<span className="text-[0.68rem] text-ink-400">
							● {topicTotal(lesson)} topics
						</span>
						{quiz ? (
							<span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.2 font-mono text-[0.65rem] text-emerald-800">
								Quiz: {quiz.score}%
							</span>
						) : null}
					</div>

					<h3 className="font-extrabold font-heading text-[1.05rem] text-ink-900 transition-colors group-hover:text-brand-ink">
						{lesson.title}
					</h3>

					{/* 6 Stage Micro Nodes */}
					<div className="mt-2.5 flex items-center gap-1.5">
						{Engine.STAGES.map((stage, stageIdx) => {
							const stageDone = done.has(stage.id)
							return (
								<span
									className={cn(
										"grid size-6 place-items-center rounded-lg font-bold font-mono text-[0.65rem] transition-colors",
										stageDone
											? "bg-emerald-500 text-white shadow-2xs"
											: "border border-line bg-canvas-muted/80 text-ink-400",
									)}
									key={stage.id}
									title={`${stage.label}: ${stageDone ? "Completed" : "Pending"}`}
								>
									{stageDone ? "✓" : stageIdx + 1}
								</span>
							)
						})}
						<span className="ml-1 font-mono text-[0.7rem] text-ink-400">
							{done.size}/6 cleared
						</span>
					</div>
				</div>
			</div>

			{/* Right: Progress & Action CTA */}
			<div className="flex shrink-0 items-center justify-between gap-4 border-line/60 border-t pt-3 md:border-t-0 md:pt-0">
				<div className="hidden w-28 text-right sm:block">
					<span className="mb-1 block font-bold font-mono text-[0.74rem] text-ink-700">
						{pct}% Done
					</span>
					<MiniProgress value={pct} />
				</div>

				<Button
					className="group/btn gap-1.5 shadow-xs"
					onClick={() => onOpen(index)}
					size="sm"
					type="button"
					variant={isComplete ? "outline" : "default"}
				>
					<span>
						{pct === 0
							? "Start Quest"
							: isComplete
								? "Review"
								: "Resume"}
					</span>
					<span className="transition-transform group-hover/btn:translate-x-0.5">
						➔
					</span>
				</Button>
			</div>
		</div>
	)
}

function ModulesView() {
	const { activeSlug, openModule, setSubTab, setTab, states } = useLearn()
	const program = Engine.courseOf(activeSlug)
	const state = states[activeSlug] || Engine.blankState()

	if (Engine.isSelfPaced(activeSlug)) {
		return <PlaylistView />
	}

	const teaching = Engine.teachingModules(activeSlug)
	const totalStages = teaching.length * Engine.STAGES.length
	const completedStages = teaching.reduce((acc, { index }) => {
		return acc + Engine.stagesDone(state, index).size
	}, 0)
	const overallProgress = totalStages
		? Math.round((completedStages / totalStages) * 100)
		: 0

	return (
		<div className="space-y-6">
			{/* Top Quest Header Card */}
			<div className="rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-7">
				<div className="flex flex-wrap items-start justify-between gap-4">
					<div>
						<div className="mb-1.5 flex items-center gap-2">
							<span className="rounded-full border border-brand-300 bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.66rem] text-brand-ink uppercase">
								{program.category || "TRACK ROADMAP"}
							</span>
							<span className="font-mono text-ink-400 text-xs">
								● {teaching.length} Core Modules
							</span>
						</div>
						<h2 className="font-extrabold font-heading text-2xl text-ink-900 tracking-tight sm:text-[1.65rem]">
							{program.title}
						</h2>
						<p className="mt-1.5 max-w-[680px] text-[0.88rem] text-ink-500 leading-relaxed">
							Master each module through the 6-stage active
							learning workflow — from foundational concept to
							hands-on task verification and interview takeaway.
						</p>
					</div>

					<div className="flex items-center gap-3">
						<div className="rounded-2xl border border-brand-200 bg-amber-50/60 px-4 py-2.5 text-center">
							<span className="block font-extrabold font-mono text-brand-ink text-lg sm:text-xl">
								{overallProgress}%
							</span>
							<span className="font-bold font-mono text-[0.65rem] text-brand-ink uppercase tracking-wider">
								TRACK CLEARANCE
							</span>
						</div>
					</div>
				</div>

				{/* 6-Stage Legend Ribbon */}
				<div className="mt-5 border-line/60 border-t pt-4">
					<span className="mb-2.5 block font-bold font-mono text-[0.68rem] text-ink-400 uppercase tracking-wider">
						THE 6-STAGE MASTERY FLOW
					</span>
					<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
						{Engine.STAGES.map((stage, sIdx) => (
							<div
								className="flex items-center gap-2 rounded-xl border border-line bg-canvas-muted/40 px-2.5 py-1.5 text-left"
								key={stage.id}
							>
								<span className="grid size-5 shrink-0 place-items-center rounded-md bg-white font-bold font-mono text-[0.65rem] text-ink-700 shadow-2xs">
									0{sIdx + 1}
								</span>
								<div className="min-w-0">
									<strong className="block truncate font-bold text-[0.76rem] text-ink-800">
										{stage.label}
									</strong>
									<span className="block truncate font-mono text-[0.62rem] text-ink-400">
										{stage.blurb}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Module Quest Cards List */}
			<div className="space-y-3.5">
				{teaching.map(({ lesson, index }, position) => (
					<ModuleQuestCard
						index={index}
						key={lesson.slug || index}
						lesson={lesson}
						onOpen={openModule}
						position={position}
						state={state}
					/>
				))}
			</div>

			{/* Prove It: Capstone, Portfolio, Exam Section */}
			<div className="mt-10 space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<PanelKicker className="mb-0">
							MILESTONE ARTIFACTS
						</PanelKicker>
						<h3 className="font-extrabold font-heading text-ink-900 text-xl">
							Prove Your Practical Mastery
						</h3>
					</div>
					<span className="rounded-full bg-brand-50 px-3 py-1 font-bold font-mono text-[0.72rem] text-brand-ink">
						+450 Total XP
					</span>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					{program.curriculum
						.filter(lesson =>
							["Capstone", "Portfolio", "Final Exam"].includes(
								lesson.week,
							),
						)
						.map(lesson => {
							const isExam = lesson.week === "Final Exam"
							const isCapstone = lesson.week === "Capstone"
							return (
								<article
									className="group relative flex flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-lu-sm"
									key={lesson.title}
								>
									<div>
										<div className="mb-3 flex items-center justify-between">
											<span className="rounded-full border border-brand-200 bg-amber-50 px-2.5 py-0.5 font-bold font-mono text-[0.66rem] text-brand-ink uppercase">
												{lesson.week}
											</span>
											<span className="text-xl">
												{isExam
													? "🏆"
													: isCapstone
														? "🚀"
														: "💼"}
											</span>
										</div>

										<h4 className="font-extrabold font-heading text-[1.05rem] text-ink-900">
											{lesson.title}
										</h4>
										<p className="mt-1.5 text-[0.84rem] text-ink-500 leading-relaxed">
											{lesson.detail}
										</p>
									</div>

									<div className="mt-5 border-line/60 border-t pt-4">
										<button
											className="inline-flex items-center gap-1.5 font-bold font-heading text-[0.84rem] text-brand-ink transition-colors hover:text-ink-900"
											onClick={() => {
												if (isExam) {
													setTab("career")
													setSubTab(
														"career",
														"assessments",
													)
													return
												}
												setSubTab("learn", "project")
											}}
											type="button"
										>
											<span>Open Challenge</span>
											<span className="transition-transform group-hover:translate-x-1">
												➔
											</span>
										</button>
									</div>
								</article>
							)
						})}
				</div>
			</div>
		</div>
	)
}

function PlaylistView() {
	const { activeSlug, saveState, states } = useLearn()
	const program = Engine.courseOf(activeSlug)
	const state = states[activeSlug] || Engine.blankState()
	const videos =
		program.playlist?.videos ||
		program.curriculum.map(lesson => ({
			duration: lesson.duration || "",
			title: lesson.title,
			vimeoId: "",
			youtubeId: "",
		}))
	const watched = Engine.watchedSet(state)
	let current = Number.isInteger(state.activeVideo)
		? state.activeVideo
		: Engine.nextStep(activeSlug, state)?.index || 0
	if (current < 0 || current >= videos.length) current = 0
	const next = Engine.nextStep(activeSlug, state)
	const pct = Engine.learningPct(activeSlug, state)
	const lesson = program.curriculum[current] || {}
	const video = videos[current] || {}

	return (
		<div className="space-y-6">
			<div className="rounded-3xl border border-line bg-white p-6 shadow-xs">
				<PanelKicker>Recorded playlist</PanelKicker>
				<h2 className="font-extrabold font-heading text-2xl text-ink-900">
					{program.title}
				</h2>
				<p className="mt-1 text-[0.88rem] text-ink-500">
					Watch lessons sequentially to earn certification progress (
					{pct}% complete).
				</p>
			</div>

			<div className="grid grid-cols-[minmax(0,1fr)_300px] gap-6 max-[980px]:grid-cols-1">
				<div className="space-y-4">
					<div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(140deg,#0A0E17_0%,#131B2B_50%,#090D15_100%)] text-white shadow-xl">
						<div className="relative z-10 p-4 text-center">
							<div className="mb-3 grid size-16 place-items-center rounded-full border-2 border-brand-400/60 bg-brand-500 text-2xl text-on-brand shadow-[0_0_25px_rgba(255,179,0,0.4)]">
								▶
							</div>
							<p className="font-extrabold font-heading text-lg text-white">
								{lesson.title || program.title}
							</p>
							<span className="mt-1 font-mono text-[0.74rem] text-slate-400">
								{lesson.week || `Lesson ${current + 1}`} ·{" "}
								{video.duration ||
									lesson.duration ||
									program.duration}
							</span>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-3">
						<Button
							onClick={() => {
								saveState(activeSlug, currentState => {
									const nextState =
										structuredClone(currentState)
									Engine.markWatched(nextState, current)
									logActivity(nextState)
									return nextState
								})
								const cert = Engine.certificateStatus(
									activeSlug,
									states[activeSlug],
								)
								toast.add({
									title: cert.earned
										? `${program.title} complete.`
										: "Lesson marked watched! +20 XP",
									type: "success",
								})
							}}
							type="button"
						>
							{watched.has(current)
								? "✓ Watched"
								: "Mark as Watched (+20 XP)"}
						</Button>
						{next && next.index !== current ? (
							<Button
								onClick={() =>
									saveState(activeSlug, currentState => {
										const nextState =
											structuredClone(currentState)
										nextState.activeVideo = next.index
										return nextState
									})
								}
								type="button"
								variant="outline"
							>
								Next: {next.lesson.title} ➔
							</Button>
						) : null}
					</div>
				</div>

				<div className="space-y-1.5 rounded-2xl border border-line bg-white p-3 shadow-xs">
					<span className="mb-2 block px-2 font-bold font-mono text-[0.7rem] text-ink-400 uppercase tracking-wider">
						PLAYLIST MODULES ({videos.length})
					</span>
					{videos.map((item, index) => {
						const module = program.curriculum[index] || {}
						const isWatched = watched.has(index)
						return (
							<button
								className={cn(
									"flex w-full items-start gap-2.5 rounded-xl border p-2.5 text-left transition-colors",
									index === current
										? "border-brand-400 bg-brand-50/70 shadow-xs"
										: "border-transparent hover:border-line hover:bg-canvas-muted",
								)}
								key={item.title || index}
								onClick={() =>
									saveState(activeSlug, currentState => {
										const nextState =
											structuredClone(currentState)
										nextState.activeVideo = index
										return nextState
									})
								}
								type="button"
							>
								<span
									className={cn(
										"grid size-6 shrink-0 place-items-center rounded-lg font-bold font-mono text-[0.7rem]",
										isWatched
											? "bg-emerald-500 text-white"
											: index === current
												? "bg-brand-500 text-on-brand"
												: "bg-canvas-muted text-ink-600",
									)}
								>
									{isWatched ? "✓" : index + 1}
								</span>
								<div className="min-w-0">
									<strong className="block truncate font-bold text-[0.84rem] text-ink-900">
										{item.title || module.title}
									</strong>
									<span className="font-mono text-[0.68rem] text-ink-400">
										{item.duration || module.duration || ""}
									</span>
								</div>
							</button>
						)
					})}
				</div>
			</div>
		</div>
	)
}

function PracticeView() {
	const { activeSlug, states } = useLearn()
	const state = states[activeSlug] || Engine.blankState()
	const stats = Engine.taskStats(activeSlug, state)
	const program = Engine.courseOf(activeSlug)
	const grouped = Engine.teachingModules(activeSlug)
		.map(({ index }) => ({
			index,
			tasks: Engine.tasksFor(activeSlug, index),
		}))
		.filter(group => group.tasks.length)

	return (
		<div className="space-y-6">
			<div className="rounded-3xl border border-line bg-white p-6 shadow-xs">
				<div className="flex flex-wrap items-start justify-between gap-4">
					<div>
						<PanelKicker>Hands-on Practice</PanelKicker>
						<h2 className="font-extrabold font-heading text-2xl text-ink-900">
							{stats.done} of {stats.total} Practice Tasks
							Completed
						</h2>
						<p className="mt-1 text-[0.88rem] text-ink-500 leading-relaxed">
							Practice is 30% of your final certification score.
							Submit real solution artifacts to level up.
						</p>
					</div>
					<div className="rounded-2xl border border-brand-200 bg-amber-50 px-4 py-2.5 text-center">
						<strong className="block font-bold font-mono text-brand-ink text-xl">
							{Math.round(
								(stats.done / Math.max(1, stats.total)) * 100,
							)}
							%
						</strong>
						<span className="font-bold font-mono text-[0.65rem] text-brand-ink uppercase">
							PRACTICE CLEARANCE
						</span>
					</div>
				</div>
			</div>

			{grouped.map(group => (
				<section className="space-y-3" key={group.index}>
					<div className="flex items-center gap-2">
						<span className="rounded-full border border-brand-200 bg-amber-50 px-2.5 py-0.5 font-bold font-mono text-[0.66rem] text-brand-ink uppercase">
							{program.curriculum[group.index].week}
						</span>
						<h3 className="font-extrabold font-heading text-[1.05rem] text-ink-900">
							{program.curriculum[group.index].title}
						</h3>
					</div>
					<div className="grid gap-3 md:grid-cols-2">
						{group.tasks.map(task => (
							<TaskCard
								key={task.id}
								moduleIndex={group.index}
								task={task}
							/>
						))}
					</div>
				</section>
			))}
		</div>
	)
}

function ProjectView() {
	const { activeSlug, saveState, states } = useLearn()
	const capstone = Engine.capstone(activeSlug)
	const state = states[activeSlug] || Engine.blankState()

	if (!capstone) {
		return (
			<div className="rounded-3xl border border-line border-dashed bg-white px-8 py-12 text-center shadow-xs">
				<h2 className="font-extrabold font-heading text-ink-900 text-xl">
					Capstone Configuring
				</h2>
				<p className="mt-1 text-ink-500 text-sm">
					This program's capstone workspace is currently being curated
					with industry project briefs.
				</p>
			</div>
		)
	}

	const pct = Engine.projectPct(activeSlug, state)

	return (
		<div className="space-y-6">
			<div className="rounded-3xl border border-line bg-white p-6 shadow-xs">
				<div className="flex flex-wrap items-start justify-between gap-4">
					<div>
						<PanelKicker>INDUSTRY PORTFOLIO CAPSTONE</PanelKicker>
						<h2 className="font-extrabold font-heading text-2xl text-ink-900">
							{capstone.title}
						</h2>
						<p className="mt-1 max-w-[640px] text-[0.88rem] text-ink-500 leading-relaxed">
							Build five verified AI assistants and document your
							prompt portfolio for hiring partners.
						</p>
					</div>
					<div className="rounded-2xl border border-brand-200 bg-amber-50 px-4 py-2.5 text-center">
						<strong className="block font-bold font-mono text-brand-ink text-xl">
							{pct}%
						</strong>
						<span className="font-bold font-mono text-[0.65rem] text-brand-ink uppercase">
							PROJECT SCORE
						</span>
					</div>
				</div>
			</div>

			<section className="rounded-2xl border border-line bg-white p-6 shadow-xs">
				<h3 className="mb-3 font-extrabold font-heading text-[1.05rem] text-ink-900">
					1. Choose your project persona
				</h3>
				<div className="flex flex-wrap gap-2.5">
					{capstone.personas.map(persona => (
						<button
							className={cn(
								"rounded-xl border px-4 py-2 font-bold font-heading text-[0.84rem] transition-all",
								state.project.persona === persona
									? "border-brand-500 bg-brand-50 text-brand-ink ring-2 ring-brand-200"
									: "border-line bg-white text-ink-600 hover:border-brand-200",
							)}
							key={persona}
							onClick={() =>
								saveState(activeSlug, current => {
									const next = structuredClone(current)
									next.project.persona = persona
									return next
								})
							}
							type="button"
						>
							{persona}
						</button>
					))}
				</div>
			</section>

			<section className="rounded-2xl border border-line bg-white p-6 shadow-xs">
				<h3 className="mb-3 font-extrabold font-heading text-[1.05rem] text-ink-900">
					2. Build the five verified assistants
				</h3>
				<div className="space-y-2.5">
					{capstone.parts.map(part => (
						<label
							className="flex cursor-pointer items-start gap-3.5 rounded-xl border border-line p-3.5 transition-colors hover:border-brand-200 hover:bg-amber-50/20"
							key={part.id}
						>
							<input
								checked={Boolean(state.project.parts[part.id])}
								className="mt-1 accent-brand-500"
								onChange={event =>
									saveState(activeSlug, current => {
										const next = structuredClone(current)
										if (event.target.checked) {
											next.project.parts[part.id] = {
												at: Date.now(),
											}
										} else {
											delete next.project.parts[part.id]
										}
										return next
									})
								}
								type="checkbox"
							/>
							<div>
								<strong className="block font-bold text-[0.92rem] text-ink-900">
									{part.name}
								</strong>
								<span className="text-[0.82rem] text-ink-500">
									{part.must}
								</span>
							</div>
						</label>
					))}
				</div>
			</section>

			<section className="rounded-2xl border border-line bg-white p-6 shadow-xs">
				<h3 className="mb-2 font-extrabold font-heading text-[1.05rem] text-ink-900">
					3. Submit for recruiter evaluation
				</h3>
				<p className="mb-4 text-[0.86rem] text-ink-500">
					Documented prompts: {state.portfolio.length}/
					{capstone.portfolioTarget} portfolio artifacts verified.
				</p>
				<Button
					disabled={state.project.submitted}
					onClick={() =>
						saveState(activeSlug, current => {
							const next = structuredClone(current)
							next.project.submitted = true
							next.project.score = pct
							logActivity(next)
							return next
						})
					}
					type="button"
				>
					{state.project.submitted
						? `✓ Submitted at ${state.project.score}% score`
						: "Submit Capstone Project (+150 XP)"}
				</Button>
			</section>
		</div>
	)
}

function CommunityView() {
	const { community, setCommunity, user } = useLearn()
	const [body, setBody] = useState("")
	const initials = user?.name
		?.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map(part => part[0].toUpperCase())
		.join("")

	const post = () => {
		const trimmed = body.trim()
		if (trimmed.length < 15) {
			toast.add({
				title: "Say a little more so it is useful to others.",
				type: "info",
			})
			return
		}
		setCommunity(prev => [
			{
				author: user.name,
				body: trimmed,
				id: `${Date.now()}-${user.name}`,
				initials,
				tag: "Prompt share",
				when: "Just now",
			},
			...prev,
		])
		setBody("")
		toast.add({ title: "Posted to your cohort.", type: "success" })
	}

	return (
		<div className="space-y-6">
			<div className="rounded-3xl border border-line bg-white p-6 shadow-xs">
				<PanelKicker>LEARNER COHORT HUB</PanelKicker>
				<h2 className="font-extrabold font-heading text-2xl text-ink-900">
					Peer Community & Prompt Sharing
				</h2>
				<p className="mt-1 text-[0.88rem] text-ink-500 leading-relaxed">
					Learn faster by seeing how fellow engineers craft prompts
					and solve workflows.
				</p>
			</div>

			<div className="rounded-2xl border border-brand-200 bg-gradient-to-r from-amber-50 to-orange-50/40 p-5 shadow-xs">
				<span className="font-bold font-mono text-[0.7rem] text-brand-ink uppercase">
					⚡ WEEKLY COHORT CHALLENGE
				</span>
				<h3 className="mt-1 font-extrabold font-heading text-ink-900 text-lg">
					{COMMUNITY_CHALLENGE.title}
				</h3>
				<p className="mt-1 text-[0.86rem] text-ink-700 leading-relaxed">
					{COMMUNITY_CHALLENGE.body}
				</p>
			</div>

			<div className="rounded-2xl border border-line bg-white p-5 shadow-xs">
				<Textarea
					className="mb-3 rounded-xl"
					onChange={event => setBody(event.target.value)}
					placeholder="Share a prompt insight, code comparison, or project win with your cohort…"
					rows={3}
					value={body}
				/>
				<Button onClick={post} size="sm" type="button">
					Share with Cohort ➔
				</Button>
			</div>

			<div className="space-y-3">
				{community.map(postItem => (
					<article
						className="flex gap-3.5 rounded-2xl border border-line bg-white p-4 shadow-xs"
						key={
							postItem.id || `${postItem.author}-${postItem.when}`
						}
					>
						<span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 font-bold font-mono text-[0.78rem] text-brand-ink">
							{postItem.initials}
						</span>
						<div className="min-w-0 flex-1">
							<header className="mb-1 flex flex-wrap items-center gap-2">
								<strong className="font-bold text-[0.9rem] text-ink-900">
									{postItem.author}
								</strong>
								<span className="rounded-full bg-canvas-muted px-2 py-0.5 font-bold font-mono text-[0.66rem] text-ink-600">
									{postItem.tag}
								</span>
								<small className="font-mono text-[0.72rem] text-ink-400">
									{postItem.when}
								</small>
							</header>
							<p className="text-[0.88rem] text-ink-700 leading-relaxed">
								{postItem.body}
							</p>
						</div>
					</article>
				))}
			</div>
		</div>
	)
}

export default function LearnPanel() {
	const { activeSlug, subTab, setSubTab } = useLearn()

	if (!activeSlug) return <EmptyProgram title="Learn" />

	const learnItems = Engine.isSelfPaced(activeSlug)
		? [
				{ id: "modules", label: "Lessons" },
				{ id: "community", label: "Community" },
			]
		: LEARN_SUBS.learn

	const current = learnItems.some(item => item.id === subTab.learn)
		? subTab.learn
		: "modules"

	return (
		<div>
			<SubNav
				items={learnItems}
				onChange={value => setSubTab("learn", value)}
				value={current}
			/>
			{current === "modules" ? <ModulesView /> : null}
			{current === "practice" ? <PracticeView /> : null}
			{current === "project" ? <ProjectView /> : null}
			{current === "community" ? <CommunityView /> : null}
		</div>
	)
}
