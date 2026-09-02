"use client"

import Link from "next/link"
import MiniProgress from "@/atoms/mini-progress"
import PanelKicker from "@/atoms/panel-kicker"
import { useLogout } from "@/hooks/auth/useLogout"
import { initialsOf } from "@/lib/data/learn"
import { Engine } from "@/lib/learning/engine"
import { useLearn } from "@/organisms/learn-centre/context"
import { Button } from "@/ui/button"
import { toast } from "@/ui/toast"

export default function ProfilePanel() {
	const { openModule, setActiveSlug, setShowOnboard, states, user } =
		useLearn()
	const logout = useLogout()

	const initials = initialsOf(user?.name || "Student")
	const studentId = `LU-${String(user?.mobile || "987654").slice(-6)}`

	const copyReferral = () => {
		const link = `${window.location.origin}/signup?ref=${studentId}`
		navigator.clipboard?.writeText(link)
		toast.add({
			title: "Personal referral link copied to clipboard! 🎁",
			type: "success",
		})
	}

	const infoItems = [
		{
			icon: "🎓",
			label: "Education",
			value: user?.education || "Undergraduate (pursuing)",
		},
		{
			icon: "🏛️",
			label: "College / University",
			value: user?.college || "Mumbai University",
		},
		{
			icon: "📅",
			label: "Graduation Year",
			value: user?.year || "2025",
		},
		{
			icon: "📍",
			label: "Location",
			value:
				[user?.city, user?.state, user?.country]
					.filter(Boolean)
					.join(", ") || "Mumbai, Maharashtra, India",
		},
		{
			icon: "🎯",
			label: "Primary Goal",
			value: user?.purpose || "Get an internship",
		},
		{
			icon: "💡",
			label: "Interests",
			value:
				(user?.interests || []).join(", ") ||
				"Generative AI, Prompt Engineering, Agentic Workflows",
		},
	]

	const enrolledCourses = (user?.enrolled || [])
		.filter(slug => Engine.courseOf(slug))
		.map(slug => {
			const program = Engine.courseOf(slug)
			const state = states[slug] || Engine.blankState()
			const pct = Engine.learningPct(slug, state)
			return { pct, program, slug, state }
		})

	return (
		<div className="space-y-6">
			{/* Top Gamified Profile Hero Card */}
			<section className="overflow-hidden rounded-3xl border border-brand-300 bg-white p-6 shadow-lu-sm sm:p-8">
				<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-5">
						<div className="relative">
							<span className="grid size-18 place-items-center rounded-2xl border-2 border-brand-400 bg-brand-500 font-extrabold font-heading text-2xl text-on-brand shadow-md">
								{initials}
							</span>
							<span className="absolute -right-1.5 -bottom-1.5 grid size-6 place-items-center rounded-full bg-emerald-500 font-bold text-white text-xs ring-2 ring-white">
								✓
							</span>
						</div>

						<div>
							<div className="mb-1 flex flex-wrap items-center gap-2">
								<span className="rounded-full border border-brand-200 bg-amber-50 px-2.5 py-0.5 font-bold font-mono text-[0.66rem] text-brand-ink uppercase">
									PRO LEARNER
								</span>
								<span className="font-mono text-[0.72rem] text-ink-400">
									{studentId}
								</span>
							</div>

							<h2 className="font-extrabold font-heading text-2xl text-ink-900 tracking-tight">
								{user?.name}
							</h2>
							<p className="font-mono text-[0.84rem] text-ink-500">
								📞 {user?.mobile || "+91 98765 43210"}
							</p>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-2.5 sm:flex-col sm:items-end">
						<div className="flex items-center gap-2">
							<span className="rounded-xl border border-line bg-canvas-muted px-3 py-1.5 font-bold font-mono text-[0.76rem] text-ink-700">
								🔥 3 Days Streak
							</span>
							<span className="rounded-xl border border-brand-200 bg-brand-50 px-3 py-1.5 font-bold font-mono text-[0.76rem] text-brand-ink">
								⚡ 750 XP (Lvl 2)
							</span>
						</div>
						<Button
							className="mt-1 shadow-2xs"
							onClick={() => setShowOnboard(true)}
							size="sm"
							type="button"
							variant="outline"
						>
							Edit Goal & Preferences ⚙️
						</Button>
					</div>
				</div>
			</section>

			{/* Personal & Academic Information Grid */}
			<section className="rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-7">
				<div className="mb-4">
					<PanelKicker>STUDENT RECORD</PanelKicker>
					<h3 className="font-extrabold font-heading text-ink-900 text-xl">
						Academic & Profile Attributes
					</h3>
				</div>

				<div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
					{infoItems.map(item => (
						<div
							className="rounded-2xl border border-line bg-canvas-muted/30 p-4 transition-colors hover:border-brand-200 hover:bg-white"
							key={item.label}
						>
							<div className="mb-1 flex items-center gap-2 text-ink-400">
								<span className="text-base">{item.icon}</span>
								<span className="font-bold font-mono text-[0.68rem] uppercase tracking-wider">
									{item.label}
								</span>
							</div>
							<p className="font-bold text-[0.92rem] text-ink-900 leading-snug">
								{item.value}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Enrolled Tracks (Gamified Cards) */}
			<section className="rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-7">
				<div className="mb-5 flex flex-wrap items-center justify-between gap-3">
					<div>
						<PanelKicker>MY TRACKS</PanelKicker>
						<h3 className="font-extrabold font-heading text-ink-900 text-xl">
							Enrolled Career Bootcamps
						</h3>
					</div>
					<Button
						nativeButton={false}
						render={<Link href="/programs" />}
						size="sm"
						variant="outline"
					>
						+ Explore More Tracks ➔
					</Button>
				</div>

				{enrolledCourses.length ? (
					<div className="space-y-3">
						{enrolledCourses.map(
							({ program, slug, pct, state }) => {
								const next = Engine.nextStep(slug, state)
								return (
									<div
										className="group flex flex-col justify-between gap-4 rounded-2xl border border-line bg-white p-5 shadow-xs transition-all duration-300 hover:border-brand-300 hover:shadow-lu-sm sm:flex-row sm:items-center"
										key={slug}
									>
										<div className="min-w-0 flex-1">
											<div className="mb-1 flex items-center gap-2">
												<span className="rounded-full border border-brand-200 bg-amber-50 px-2 py-0.5 font-bold font-mono text-[0.64rem] text-brand-ink uppercase">
													{program.category ||
														"BOOTCAMP"}
												</span>
												<span className="font-mono text-[0.7rem] text-ink-400">
													●{" "}
													{program.curriculum.length}{" "}
													Modules
												</span>
											</div>
											<h4 className="font-extrabold font-heading text-[1.05rem] text-ink-900 transition-colors group-hover:text-brand-ink">
												{program.title}
											</h4>
											<p className="mt-0.5 font-mono text-[0.78rem] text-ink-500">
												{next
													? `Current: ${next.lesson.week} — ${next.lesson.title}`
													: "Track Complete"}
											</p>
										</div>

										<div className="flex shrink-0 items-center justify-between gap-4 border-line/60 border-t pt-3 sm:border-t-0 sm:pt-0">
											<div className="w-28 text-right">
												<span className="mb-1 block font-bold font-mono text-[0.74rem] text-ink-700">
													{pct}% Complete
												</span>
												<MiniProgress value={pct} />
											</div>

											<Button
												onClick={() => {
													setActiveSlug(slug)
													if (next) {
														openModule(
															next.index,
															next.stage.id,
														)
													}
												}}
												size="sm"
												type="button"
											>
												Resume Quest ➔
											</Button>
										</div>
									</div>
								)
							},
						)}
					</div>
				) : (
					<p className="py-4 text-center font-mono text-ink-500 text-sm">
						No active programs enrolled yet.
					</p>
				)}
			</section>

			{/* Refer & Earn Reward Banner */}
			<section className="rounded-3xl border border-brand-200 bg-gradient-to-r from-amber-50 via-orange-50/40 to-amber-50 p-6 shadow-xs sm:p-7">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
					<div className="max-w-[560px]">
						<span className="font-bold font-mono text-[0.7rem] text-brand-ink uppercase tracking-wider">
							🎁 REFERRAL QUEST REWARDS
						</span>
						<h3 className="mt-1 font-extrabold font-heading text-ink-900 text-xl">
							Invite Classmates & Earn +200 XP Each
						</h3>
						<p className="mt-1 text-[0.86rem] text-ink-600 leading-relaxed">
							Share your unique referral link with your college
							peers. When they sign up, you both unlock fast-track
							recruiter perks and community bonus XP.
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-2.5">
						<Button
							className="shadow-xs"
							onClick={copyReferral}
							type="button"
						>
							Copy Referral Link 📋
						</Button>
						<Button
							nativeButton={false}
							render={<Link href="/refer" />}
							variant="outline"
						>
							Referral Hub ➔
						</Button>
					</div>
				</div>
			</section>

			{/* Session & Security */}
			<section className="rounded-3xl border border-line bg-white p-6 shadow-xs">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<div>
						<h3 className="font-extrabold font-heading text-ink-900 text-lg">
							Account Session Security
						</h3>
						<p className="text-[0.84rem] text-ink-500">
							Signed in as <strong>{user?.name}</strong> (
							{studentId}). Single-device secure session active.
						</p>
					</div>

					<Button
						disabled={logout.isPending}
						onClick={() =>
							logout.mutate(undefined, {
								onSuccess: () => {
									window.location.href = "/"
								},
							})
						}
						size="sm"
						type="button"
						variant="outline"
					>
						Sign Out of Account 🚪
					</Button>
				</div>
			</section>
		</div>
	)
}
