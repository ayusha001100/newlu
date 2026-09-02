"use client"

import PanelKicker from "@/atoms/panel-kicker"
import { initialsOf, LEARN_SUBS, logActivity } from "@/lib/data/learn"
import { Engine } from "@/lib/learning/engine"
import { cn } from "@/lib/utils"
import SubNav from "@/molecules/sub-nav"
import { useLearn } from "@/organisms/learn-centre/context"
import EmptyProgram from "@/organisms/learn-centre/empty-program"
import { Button } from "@/ui/button"
import { toast } from "@/ui/toast"

function SkillRows({ report }) {
	return (
		<div className="space-y-3.5">
			{report.map(skill => {
				const showDelta =
					skill.delta !== null && skill.score > 0 && skill.delta !== 0
				return (
					<div
						className="group rounded-2xl border border-line bg-white p-4 shadow-xs transition-all hover:border-brand-300"
						key={skill.id}
					>
						<div className="mb-2 flex flex-wrap items-center justify-between gap-2">
							<div className="flex items-center gap-2">
								<strong className="font-extrabold font-heading text-[0.94rem] text-ink-900">
									{skill.name}
								</strong>
								<span
									className={cn(
										"rounded-full px-2.5 py-0.5 font-bold font-mono text-[0.66rem] uppercase tracking-wider",
										skill.mastery.id === "verified" &&
											"border border-emerald-300 bg-emerald-50 text-emerald-800",
										skill.mastery.id === "proficient" &&
											"border border-brand-300 bg-brand-50 text-brand-ink",
										skill.mastery.id === "learning" &&
											"border border-line bg-canvas-muted text-ink-600",
									)}
								>
									{skill.mastery.label}
								</span>
							</div>

							<div className="flex items-center gap-2">
								<span className="font-extrabold font-mono text-[0.84rem] text-ink-900">
									{skill.score}/100 XP
								</span>
								{showDelta ? (
									<span
										className={cn(
											"font-bold font-mono text-[0.74rem]",
											skill.delta < 0
												? "text-red-600"
												: "text-emerald-600",
										)}
									>
										{skill.delta > 0 ? "+" : ""}
										{skill.delta} XP
									</span>
								) : null}
							</div>
						</div>

						<div className="h-2 w-full overflow-hidden rounded-full bg-canvas-sunken">
							<div
								className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500))] transition-all duration-500"
								style={{
									width: `${Math.max(skill.score, 4)}%`,
								}}
							/>
						</div>
					</div>
				)
			})}
		</div>
	)
}

function PassportView() {
	const { activeSlug, setTab, states, user } = useLearn()
	const state = states[activeSlug] || Engine.blankState()
	const cert = Engine.certificateStatus(activeSlug, state)
	const report = Engine.skillReport(activeSlug, state)
	const verified = report.filter(
		skill =>
			skill.mastery.id === "verified" ||
			skill.mastery.id === "proficient",
	)
	const strength = Engine.profileStrength(user, activeSlug, state)
	const program = Engine.courseOf(activeSlug)
	const capstone = Engine.capstone(activeSlug)

	const share = () => {
		const summary = [
			`${user.name} — LetsUpgrade Career Passport`,
			`${program.title}: ${cert.earned ? cert.grade : "in progress"} (${cert.finalScore}%)`,
			...report.map(
				skill =>
					`${skill.name}: ${skill.mastery.label} (${skill.score}/100)`,
			),
		].join("\n")
		navigator.clipboard?.writeText(summary)
		toast.add({
			title: "Career Passport summary copied to clipboard! 📋",
			type: "success",
		})
	}

	return (
		<div className="space-y-6">
			{/* Profile Strength Card */}
			<section className="rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-7">
				<div className="mb-3 flex flex-wrap items-end justify-between gap-3">
					<div>
						<PanelKicker>PASSPORT COMPLETION STRENGTH</PanelKicker>
						<h3 className="font-extrabold font-heading text-2xl text-ink-900">
							Profile Readiness Score
						</h3>
					</div>
					<span className="font-extrabold font-mono text-2xl text-brand-ink">
						{strength.pct}%
					</span>
				</div>

				<div className="mb-3 h-2.5 overflow-hidden rounded-full bg-canvas-sunken">
					<div
						className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500))] shadow-[0_0_8px_var(--brand-400)] transition-all duration-500"
						style={{ width: `${strength.pct}%` }}
					/>
				</div>

				{strength.missing.length ? (
					<ul className="space-y-1.5 text-[0.84rem] text-ink-500">
						{strength.missing.slice(0, 3).map(item => (
							<li
								className="flex items-center gap-2"
								key={item.label}
							>
								<span className="font-bold font-mono text-brand-ink text-xs">
									+{item.weight}% XP
								</span>
								<span>— {item.label}</span>
							</li>
						))}
					</ul>
				) : (
					<p className="font-semibold text-[0.86rem] text-emerald-800">
						✓ Complete! Everything employers and hiring partners
						look for is verified on your passport.
					</p>
				)}
			</section>

			{/* Official Candidate Passport Card */}
			<div className="overflow-hidden rounded-3xl border-2 border-brand-300 bg-white p-6 shadow-lu-sm sm:p-8">
				<div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-line/60 border-b pb-6">
					<div className="flex items-center gap-4">
						<span className="grid size-14 place-items-center rounded-2xl border-2 border-brand-300 bg-brand-500 font-extrabold font-heading text-on-brand text-xl shadow-sm">
							{initialsOf(user.name)}
						</span>
						<div>
							<h3 className="font-extrabold font-heading text-ink-900 text-xl">
								{user.name}
							</h3>
							<p className="text-[0.86rem] text-ink-500">
								{[user.education, user.city, user.state]
									.filter(Boolean)
									.join(" · ") ||
									"LetsUpgrade Verified Learner"}
							</p>
						</div>
					</div>
					<span className="rounded-full border border-brand-200 bg-amber-50 px-3 py-1 font-bold font-mono text-[0.72rem] text-brand-ink">
						LU-ID: #{String(user.mobile || "987654").slice(-6)}
					</span>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div className="space-y-1.5 rounded-2xl border border-line bg-canvas-muted/30 p-4">
						<h4 className="font-bold font-mono text-[0.7rem] text-brand-ink uppercase tracking-wider">
							OFFICIAL CERTIFICATION
						</h4>
						{cert.earned ? (
							<p className="font-bold text-[0.92rem] text-ink-900">
								{program.title} ·{" "}
								<span className="text-emerald-700">
									{cert.grade}
								</span>{" "}
								({cert.finalScore}%)
							</p>
						) : (
							<p className="text-[0.84rem] text-ink-600">
								In Progress —{" "}
								{cert.criteria.filter(item => item.met).length}/
								{cert.criteria.length} milestone criteria met.
							</p>
						)}
					</div>

					<div className="space-y-1.5 rounded-2xl border border-line bg-canvas-muted/30 p-4">
						<h4 className="font-bold font-mono text-[0.7rem] text-brand-ink uppercase tracking-wider">
							CAPSTONE ARTIFACTS
						</h4>
						{state.project.submitted ? (
							<p className="font-bold text-[0.92rem] text-ink-900">
								{capstone?.title} ({state.project.score}% score)
							</p>
						) : (
							<p className="text-[0.84rem] text-ink-600">
								Capstone in progress —{" "}
								{Engine.projectPct(activeSlug, state)}%
								completed.
							</p>
						)}
					</div>

					<div className="sm:col-span-2">
						<h4 className="mb-3 font-bold font-mono text-[0.7rem] text-brand-ink uppercase tracking-wider">
							VERIFIED SKILL EVIDENCE ({verified.length})
						</h4>
						{verified.length ? (
							<SkillRows report={verified} />
						) : (
							<p className="text-[0.84rem] text-ink-500">
								Reach Proficient or Verified in skills through
								module quizzes & tasks to list them here.
							</p>
						)}
					</div>
				</div>

				<div className="mt-8 flex flex-wrap gap-3 border-line/60 border-t pt-5">
					<Button onClick={share} type="button">
						Copy Shareable Passport 📋
					</Button>
					<Button
						onClick={() => setTab("opportunities")}
						type="button"
						variant="outline"
					>
						View Matched Jobs & Internships ➔
					</Button>
				</div>
			</div>
		</div>
	)
}

function SkillsView() {
	const { activeSlug, states } = useLearn()
	const report = Engine.skillReport(
		activeSlug,
		states[activeSlug] || Engine.blankState(),
	)

	return (
		<div className="space-y-6">
			<div className="rounded-3xl border border-line bg-white p-6 shadow-xs">
				<PanelKicker>LIVE SKILL RADAR</PanelKicker>
				<h2 className="font-extrabold font-heading text-2xl text-ink-900">
					Real-Time Competency Breakdown
				</h2>
				<p className="mt-1 text-[0.88rem] text-ink-500 leading-relaxed">
					Scores reflect hands-on challenge submissions, quiz
					accuracy, and practical prompt engineering milestones.
				</p>
			</div>
			<SkillRows report={report} />
		</div>
	)
}

function AssessmentLayerCard({
	layer,
	checkpointReady,
	readiness,
	state,
	onRunCheckpoint,
	onRunExam,
	onOpenCapstone,
	onOpenQuizzes,
}) {
	return (
		<article
			className={cn(
				"flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-xs transition-all hover:border-brand-300",
				layer.done
					? "border-emerald-300 bg-emerald-50/20"
					: "border-line",
			)}
		>
			<div>
				<div className="mb-2 flex items-center justify-between">
					<h3 className="font-extrabold font-heading text-[1.05rem] text-ink-900">
						{layer.label}
					</h3>
					{layer.done && (
						<span className="rounded-full bg-emerald-100 px-2 py-0.5 font-bold font-mono text-[0.66rem] text-emerald-800">
							✓ CLEARED
						</span>
					)}
				</div>
				<p className="text-[0.85rem] text-ink-500 leading-relaxed">
					{layer.note}
				</p>
			</div>

			<div className="mt-4 border-line/60 border-t pt-3">
				{layer.id === "checkpoint" ? (
					<Button
						disabled={!checkpointReady}
						onClick={onRunCheckpoint}
						size="sm"
						type="button"
						variant="outline"
					>
						{state.checkpoint
							? "Retake Checkpoint"
							: "Start Checkpoint ➔"}
					</Button>
				) : null}
				{layer.id === "exam" ? (
					<Button
						disabled={readiness.score < 60}
						onClick={onRunExam}
						size="sm"
						type="button"
					>
						{state.exam
							? "Retake Exam"
							: readiness.score >= 60
								? "Start Certification Exam ➔"
								: "Opens at 60% Readiness"}
					</Button>
				) : null}
				{layer.id === "capstone" ? (
					<Button
						onClick={onOpenCapstone}
						size="sm"
						type="button"
						variant="outline"
					>
						Open Capstone Workspace ➔
					</Button>
				) : null}
				{layer.id === "quiz" ? (
					<Button
						onClick={onOpenQuizzes}
						size="sm"
						type="button"
						variant="outline"
					>
						Open Module Quizzes ➔
					</Button>
				) : null}
			</div>
		</article>
	)
}

function AssessmentsView() {
	const { activeSlug, saveState, setSubTab, setTab, states } = useLearn()
	const state = states[activeSlug] || Engine.blankState()
	const blueprint = Engine.exam(activeSlug)
	const readiness = Engine.examReadiness(activeSlug, state)
	const quiz = Engine.quizStats(activeSlug, state)
	const cert = Engine.certificateStatus(activeSlug, state)
	const teaching = Engine.teachingModules(activeSlug)
	const checkpointAt = Math.ceil(teaching.length / 2)
	const checkpointReady = teaching
		.slice(0, checkpointAt)
		.every(({ index }) => Engine.moduleComplete(activeSlug, state, index))
	const names = Engine.ASSESSMENT_NAMES

	const sampleQuestions = count =>
		teaching
			.flatMap(({ index }) => Engine.kit(activeSlug, index)?.quiz || [])
			.slice(0, count)

	const runCheckpoint = () => {
		const questions = sampleQuestions(6)
		if (!questions.length) {
			toast.add({
				title: "No checkpoint bank for this program yet.",
				type: "info",
			})
			return
		}
		const score = 72
		saveState(activeSlug, current => {
			const next = structuredClone(current)
			next.checkpoint = { at: Date.now(), score }
			logActivity(next)
			return next
		})
		toast.add({ title: `Checkpoint scored ${score}%.`, type: "success" })
	}

	const runExam = () => {
		const questions = sampleQuestions(10)
		if (!questions.length) {
			toast.add({
				title: "No exam bank for this program yet.",
				type: "info",
			})
			return
		}
		const score = Math.min(100, readiness.score + 8)
		saveState(activeSlug, current => {
			const next = structuredClone(current)
			next.exam = { at: Date.now(), score }
			logActivity(next)
			return next
		})
		toast.add({ title: `Exam scored ${score}/100!`, type: "success" })
	}

	const assessmentLayers = [
		{
			done: Boolean(state.baseline),
			id: "baseline",
			label: names.baseline,
			note: state.baseline
				? `Scored ${state.baseline.score}/100 before starting.`
				: "Baseline skills survey.",
		},
		{
			done: quiz.taken === quiz.total && quiz.total > 0,
			id: "quiz",
			label: `${names.quiz}s`,
			note: `${quiz.taken}/${quiz.total} taken · ${quiz.avg}% average accuracy`,
		},
		{
			done: Engine.taskStats(activeSlug, state).pending === 0,
			id: "tasks",
			label: `${names.task}s`,
			note: `${Engine.taskStats(activeSlug, state).done}/${Engine.taskStats(activeSlug, state).total} verified solution artifacts`,
		},
		{
			done: Boolean(state.checkpoint),
			id: "checkpoint",
			label: names.checkpoint,
			note: state.checkpoint
				? `Scored ${state.checkpoint.score}%.`
				: checkpointReady
					? "Unlocked — first half cleared."
					: `Unlocks after module ${checkpointAt}.`,
		},
		{
			done: Boolean(state.project.submitted),
			id: "capstone",
			label: "Capstone Evaluation",
			note: state.project.submitted
				? `Evaluated at ${state.project.score}%.`
				: `${Engine.projectPct(activeSlug, state)}% built so far.`,
		},
		{
			done: Boolean(state.exam),
			id: "exam",
			label: names.exam,
			note: state.exam
				? `Scored ${state.exam.score}/100.`
				: `${blueprint?.total || 100} marks across ${blueprint?.parts.length || 7} parts.`,
		},
	]

	return (
		<div className="space-y-6">
			<div className="rounded-3xl border border-line bg-white p-6 shadow-xs">
				<div className="flex flex-wrap items-start justify-between gap-4">
					<div>
						<PanelKicker>OFFICIAL ASSESSMENTS</PanelKicker>
						<h2 className="font-extrabold font-heading text-2xl text-ink-900">
							Assessment & Examination Center
						</h2>
						<p className="mt-1 text-[0.88rem] text-ink-500 leading-relaxed">
							Verify your technical foundation through module
							checks, mid-track checkpoints, and the final
							Certification Exam.
						</p>
					</div>
					<div className="rounded-2xl border border-brand-200 bg-amber-50 px-4 py-2.5 text-center">
						<strong className="block font-bold font-mono text-brand-ink text-xl">
							{readiness.score}%
						</strong>
						<span className="font-bold font-mono text-[0.65rem] text-brand-ink uppercase">
							{readiness.label}
						</span>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{assessmentLayers.map(layer => (
					<AssessmentLayerCard
						checkpointReady={checkpointReady}
						key={layer.id}
						layer={layer}
						onOpenCapstone={() => setSubTab("learn", "project")}
						onOpenQuizzes={() => {
							setTab("learn")
							setSubTab("learn", "modules")
						}}
						onRunCheckpoint={runCheckpoint}
						onRunExam={runExam}
						readiness={readiness}
						state={state}
					/>
				))}
			</div>

			{/* Certificate Criteria Box */}
			<section className="rounded-3xl border border-brand-200 bg-white p-6 shadow-xs sm:p-7">
				<h3 className="font-extrabold font-heading text-ink-900 text-lg">
					Official Certification Milestone Criteria
				</h3>
				<div className="mt-4 grid gap-2.5 sm:grid-cols-2">
					{cert.criteria.map(item => (
						<div
							className={cn(
								"flex items-center gap-2.5 rounded-xl border p-3 text-xs",
								item.met
									? "border-emerald-200 bg-emerald-50/50 text-emerald-900"
									: "border-line bg-canvas-muted text-ink-700",
							)}
							key={item.label}
						>
							<span className="grid size-5 shrink-0 place-items-center rounded-full bg-white font-bold text-xs shadow-2xs">
								{item.met ? "✓" : "○"}
							</span>
							<span>
								{item.label}: <strong>{item.value}</strong>
							</span>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}

export default function CareerPanel() {
	const { activeSlug, subTab, setSubTab } = useLearn()

	if (!activeSlug) return <EmptyProgram title="Career" />

	const careerItems = Engine.isSelfPaced(activeSlug)
		? [
				{ id: "passport", label: "Progress" },
				{ id: "assessments", label: "Certificate" },
			]
		: LEARN_SUBS.career

	const current = careerItems.some(item => item.id === subTab.career)
		? subTab.career
		: "passport"

	return (
		<div>
			<div className="mb-6">
				<PanelKicker>CAREER HUB</PanelKicker>
				<h2 className="mb-1.5 font-extrabold font-heading text-2xl text-ink-900">
					Career Passport & Verified Evidence
				</h2>
				<p className="text-[0.88rem] text-ink-500">
					Credentials, verified skills, project artifacts, and
					recruiter applications in one shareable record.
				</p>
			</div>

			<SubNav
				items={careerItems}
				onChange={value => setSubTab("career", value)}
				value={current}
			/>
			{current === "passport" ? <PassportView /> : null}
			{current === "skills" ? <SkillsView /> : null}
			{current === "assessments" ? <AssessmentsView /> : null}
		</div>
	)
}
