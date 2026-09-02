"use client"

import Link from "next/link"
import { logActivity } from "@/lib/data/learn"
import { Engine } from "@/lib/learning/engine"
import { cn } from "@/lib/utils"
import { useLearn } from "@/organisms/learn-centre/context"
import EmptyProgram from "@/organisms/learn-centre/empty-program"
import { Button } from "@/ui/button"
import { toast } from "@/ui/toast"

function OpportunityCard({ opp, state, onApply, onOpenTutor }) {
	const application = Engine.application(state, opp.id)
	const isUnlocked = opp.unlocked

	return (
		<article
			className={cn(
				"group relative flex flex-col justify-between gap-5 rounded-2xl border bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lu-sm md:flex-row md:items-center",
				isUnlocked
					? "border-brand-300 bg-gradient-to-r from-white via-amber-50/20 to-white"
					: "border-line",
			)}
		>
			<div className="min-w-0 flex-1">
				{/* Top metadata tags */}
				<div className="mb-2 flex flex-wrap items-center gap-2">
					<span
						className={cn(
							"rounded-full px-2.5 py-0.5 font-bold font-mono text-[0.66rem] uppercase tracking-wider",
							opp.type.toLowerCase().includes("intern")
								? "border border-blue-200 bg-blue-50 text-blue-800"
								: "border border-purple-200 bg-purple-50 text-purple-800",
						)}
					>
						{opp.type}
					</span>
					<span className="font-mono font-semibold text-[0.72rem] text-ink-700">
						💰 {opp.pay}
					</span>
					<span className="font-mono text-[0.72rem] text-ink-400">
						📍 {opp.location}
					</span>
				</div>

				<h3 className="font-extrabold font-heading text-[1.1rem] text-ink-900 transition-colors group-hover:text-brand-ink">
					{opp.role}
				</h3>
				<p className="font-semibold text-[0.84rem] text-ink-600">
					{opp.company}
				</p>

				<p className="mt-1.5 line-clamp-2 text-[0.84rem] text-ink-500 leading-relaxed">
					{opp.desc}
				</p>

				{/* Skill Verification Tags */}
				<div className="mt-3 flex flex-wrap items-center gap-1.5">
					{opp.met.map(name => (
						<span
							className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-bold font-mono text-[0.66rem] text-emerald-800"
							key={name}
						>
							✓ {name} (Verified)
						</span>
					))}
					{opp.gaps.map(gap => (
						<span
							className="inline-flex items-center gap-1 rounded-lg border border-line bg-canvas-muted px-2 py-0.5 font-mono text-[0.66rem] text-ink-600"
							key={gap.skill}
						>
							⚡ {gap.skill} ({gap.have}/{gap.need} XP)
						</span>
					))}
				</div>
			</div>

			{/* Right: Match Score Gauge & Apply Action */}
			<div className="flex shrink-0 items-center justify-between gap-4 border-line/60 border-t pt-3 md:flex-col md:items-end md:border-t-0 md:pt-0">
				<div className="flex items-center gap-2 md:flex-col md:items-end">
					<div
						className="flex size-14 flex-col items-center justify-center rounded-2xl border-2 font-mono shadow-2xs"
						style={{
							backgroundColor: `color-mix(in srgb, var(--brand-50) ${Math.max(opp.match, 20)}%, #ffffff)`,
							borderColor: `color-mix(in srgb, var(--brand-500) ${Math.max(opp.match, 20)}%, #e2e8f0)`,
						}}
					>
						<strong className="font-extrabold font-mono text-base text-ink-900 leading-none">
							{opp.match}%
						</strong>
						<span className="font-bold font-mono text-[0.58rem] text-ink-500 uppercase tracking-tighter">
							MATCH
						</span>
					</div>
				</div>

				<div>
					{application ? (
						<span className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-1.5 font-bold font-mono text-[0.75rem] text-emerald-800 shadow-2xs">
							✓ {application.stage}
						</span>
					) : (
						<Button
							className="shadow-xs"
							onClick={() => {
								if (isUnlocked) onApply(opp.id)
								else
									onOpenTutor(
										`What skills do I need to complete to qualify for the ${opp.role} role at ${opp.company}?`,
									)
							}}
							size="sm"
							type="button"
							variant={isUnlocked ? "default" : "outline"}
						>
							{isUnlocked
								? "Fast-Track Apply 🚀"
								: "Skill Gap Plan 💡"}
						</Button>
					)}
				</div>
			</div>
		</article>
	)
}

export default function OpportunitiesPanel() {
	const { activeSlug, openTutor, saveState, setSubTab, states } = useLearn()

	if (!activeSlug) return <EmptyProgram title="Opportunities" />

	const state = states[activeSlug] || Engine.blankState()
	const matches = Engine.opportunities(activeSlug, state)
	const applications = Engine.applicationDetails(state)
	const internship = Engine.internship(state)
	const next = Engine.nextProgram(activeSlug)
	const weak = Engine.weakestSkill(activeSlug, state)
	const cert = Engine.certificateStatus(activeSlug, state)
	const open = matches.filter(
		opp => opp.unlocked && !Engine.application(state, opp.id),
	)

	const apply = id => {
		saveState(activeSlug, current => {
			const nextState = structuredClone(current)
			Engine.apply(nextState, id)
			logActivity(nextState)
			return nextState
		})
		toast.add({
			title: "Application submitted! Fast-track referral active.",
			type: "success",
		})
	}

	const advance = id => {
		saveState(activeSlug, current => {
			const nextState = structuredClone(current)
			const app = Engine.advanceApplication(nextState, id)
			toast.add({
				title: app ? `Moved to ${app.stage} round!` : "No update yet.",
				type: "success",
			})
			return nextState
		})
	}

	return (
		<div className="space-y-6">
			{/* Top Hero Pipeline Card */}
			<div className="rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-7">
				<div className="flex flex-wrap items-start justify-between gap-4">
					<div>
						<div className="mb-1.5 flex items-center gap-2">
							<span className="rounded-full border border-brand-300 bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.66rem] text-brand-ink uppercase">
								LIVE HIRING PIPELINE
							</span>
							<span className="font-mono text-ink-400 text-xs">
								● Direct Recruiter Matching
							</span>
						</div>
						<h2 className="font-extrabold font-heading text-2xl text-ink-900 tracking-tight sm:text-[1.65rem]">
							{internship
								? "Active Internship Placement"
								: open.length
									? `${open.length} Ready Opening${open.length === 1 ? "" : "s"} Unlocked`
									: "Evidence-Based Job & Internship Matching"}
						</h2>
						<p className="mt-1.5 max-w-[680px] text-[0.88rem] text-ink-500 leading-relaxed">
							Every opportunity match is calibrated against your
							real hands-on code artifacts, quiz scores, and
							capstone projects — not generic resume buzzwords.
						</p>
					</div>

					<div className="flex items-center gap-3">
						<div className="rounded-2xl border border-brand-200 bg-amber-50/60 px-4 py-2.5 text-center">
							<span className="block font-extrabold font-mono text-brand-ink text-lg sm:text-xl">
								{matches.length}
							</span>
							<span className="font-bold font-mono text-[0.65rem] text-brand-ink uppercase tracking-wider">
								MATCHED ROLES
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* My Active Applications */}
			{applications.length ? (
				<section className="space-y-3">
					<div className="flex items-center justify-between px-1">
						<h3 className="font-extrabold font-heading text-[1.1rem] text-ink-900">
							Active Application Pipeline
						</h3>
						<span className="font-mono text-ink-400 text-xs">
							{applications.length} Active
						</span>
					</div>

					<div className="space-y-3">
						{applications.map(app => (
							<article
								className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-white via-emerald-50/20 to-white p-5 shadow-xs"
								key={app.id}
							>
								<div className="mb-2.5 flex flex-wrap items-start justify-between gap-3">
									<div>
										<h4 className="font-extrabold font-heading text-[1.05rem] text-ink-900">
											{app.opportunity.role}
										</h4>
										<p className="text-[0.84rem] text-ink-600">
											{app.opportunity.company} ·{" "}
											{app.opportunity.location}
										</p>
									</div>
									<span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 font-bold font-mono text-[0.74rem] text-emerald-800">
										● Stage: {app.stage}
									</span>
								</div>

								{app.interviewOn ? (
									<p className="mb-3 font-mono text-[0.82rem] text-brand-ink">
										📅 Interview scheduled on{" "}
										<strong>{app.interviewOn}</strong>
									</p>
								) : null}

								<div className="flex flex-wrap gap-2.5 border-line/60 border-t pt-3">
									{app.stage !== "Selected" ? (
										<Button
											onClick={() => advance(app.id)}
											size="sm"
											type="button"
											variant="outline"
										>
											Simulate Stage Advance ➔
										</Button>
									) : null}
									{app.stage === "Interview" ? (
										<Button
											onClick={() => {
												openTutor(
													`Simulate a technical interview for ${app.opportunity.role} at ${app.opportunity.company}. Ask me 3 challenging questions.`,
												)
											}}
											size="sm"
											type="button"
										>
											AI Mock Interview Prep 🤖
										</Button>
									) : null}
								</div>
							</article>
						))}
					</div>
				</section>
			) : null}

			{/* Recommended Opportunities List */}
			<section className="space-y-3.5">
				<div className="flex items-center justify-between px-1">
					<h3 className="font-extrabold font-heading text-[1.1rem] text-ink-900">
						{internship
							? "Also Open To You"
							: "Curated Opportunities for Your Skill Profile"}
					</h3>
					<span className="font-mono text-ink-400 text-xs">
						Sorted by Skill Evidence Match
					</span>
				</div>

				<div className="space-y-3">
					{matches.map(opp => (
						<OpportunityCard
							key={opp.id}
							onApply={apply}
							onOpenTutor={openTutor}
							opp={opp}
							state={state}
						/>
					))}
				</div>
			</section>

			{/* Bottom Skill Acceleration Insights */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{/* Recommended Next Skill */}
				<section className="flex flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-xs transition-all hover:border-brand-300">
					<div>
						<div className="mb-2 flex items-center gap-2">
							<span className="grid size-7 place-items-center rounded-lg bg-amber-50 font-bold text-brand-ink text-sm">
								⚡
							</span>
							<h3 className="font-extrabold font-heading text-[0.98rem] text-ink-900">
								Targeted Skill Accelerator
							</h3>
						</div>
						{weak ? (
							<p className="text-[0.85rem] text-ink-500 leading-relaxed">
								Your current lowest evidenced skill is{" "}
								<strong className="text-ink-800">
									{weak.name}
								</strong>{" "}
								at ({weak.score}/100 XP). Raising this to 60+
								will unlock 2 additional interview shortlists.
							</p>
						) : (
							<p className="text-[0.85rem] text-ink-500 leading-relaxed">
								Complete practice tasks in Module 1 to calculate
								your skill accelerator.
							</p>
						)}
					</div>
					{weak ? (
						<div className="mt-4 border-line/60 border-t pt-3">
							<Button
								onClick={() => setSubTab("learn", "practice")}
								size="sm"
								type="button"
								variant="outline"
							>
								Practise {weak.name} ➔
							</Button>
						</div>
					) : null}
				</section>

				{/* Next Program Domain */}
				{next ? (
					<section className="flex flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-xs transition-all hover:border-brand-300">
						<div>
							<div className="mb-2 flex items-center gap-2">
								<span className="grid size-7 place-items-center rounded-lg bg-brand-50 font-bold text-brand-ink text-sm">
									🚀
								</span>
								<h3 className="font-extrabold font-heading text-[0.98rem] text-ink-900">
									Recommended Next Domain
								</h3>
							</div>
							<p className="text-[0.85rem] text-ink-500 leading-relaxed">
								<strong className="text-ink-800">
									{next.program.title}
								</strong>{" "}
								— {next.why}
							</p>
						</div>
						<div className="mt-4 border-line/60 border-t pt-3">
							<Button
								nativeButton={false}
								render={<Link href={`/program/${next.slug}`} />}
								size="sm"
								variant="outline"
							>
								Explore {next.program.title} ➔
							</Button>
						</div>
					</section>
				) : null}
			</div>

			{/* Certified Placement Perks */}
			{cert.earned ? (
				<section className="rounded-2xl border border-brand-200 bg-gradient-to-r from-amber-50 to-orange-50/30 p-5 shadow-xs">
					<h3 className="font-extrabold font-heading text-[1.05rem] text-ink-900">
						🎉 You Are Certified for Direct Placement!
					</h3>
					<p className="mt-1 text-[0.86rem] text-ink-600 leading-relaxed">
						Your certificate has been validated. Activate these
						three career boosters to accelerate interviews:
					</p>
					<div className="mt-4 flex flex-wrap gap-2.5">
						<Button
							onClick={() =>
								toast.add({
									title: "Module 8 rewrites your resume against live hiring briefs.",
									type: "info",
								})
							}
							size="sm"
							type="button"
							variant="outline"
						>
							AI Resume Optimizer 📄
						</Button>
						<Button
							onClick={() => setSubTab("learn", "project")}
							size="sm"
							type="button"
							variant="outline"
						>
							Verify Portfolio Artifacts 💼
						</Button>
						<Button
							onClick={() => setSubTab("career", "skills")}
							size="sm"
							type="button"
							variant="outline"
						>
							Recruiter Skill Passport ⚡
						</Button>
					</div>
				</section>
			) : null}
		</div>
	)
}
