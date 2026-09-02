"use client"

import Link from "next/link"
import { useState } from "react"
import CourseIcon from "@/atoms/course-icon"
import { useEnrollCourse } from "@/hooks/learn/useEnrollCourse"
import { CATALOGUE } from "@/lib/data/catalog"
import { LUOpportunityData } from "@/lib/data/opportunities"
import { trackOf } from "@/lib/data/tracks"
import { cn } from "@/lib/utils"
import { useLearn } from "@/organisms/learn-centre/context"
import { Button } from "@/ui/button"
import { toast } from "@/ui/toast"

const LOCKED_COPY = {
	Career: {
		body: "Report card, skills and assessments unlock after you enroll.",
		eyebrow: "Report Card",
		title: "Build your report card",
	},
	Learn: {
		body: "Modules, practice labs and projects unlock after you enrol.",
		eyebrow: "Learn & Modules",
		title: "Your modules will live here",
	},
	Opportunities: {
		body: "Matched internships and jobs unlock after you enrol in a track.",
		eyebrow: "Job Matches",
		title: "7 openings waiting for you",
	},
}

function LockedEmpty({ title }) {
	const { setTab } = useLearn()
	const copy = LOCKED_COPY[title] || {
		body: "Pick a free program on Dashboard to get started.",
		eyebrow: title,
		title: "Enrol in a program first",
	}
	const previewJobs = LUOpportunityData.slice(0, 3)

	return (
		<div className="space-y-5">
			<section className="rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-8">
				<span className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-0.5 font-bold font-mono text-[0.68rem] text-brand-ink uppercase tracking-widest">
					{copy.eyebrow}
				</span>
				<h2 className="mt-3 font-extrabold font-heading text-[1.4rem] text-ink-900 tracking-tight">
					{copy.title}
				</h2>
				<p className="mt-2 max-w-[520px] text-[0.9rem] text-ink-500 leading-relaxed">
					{copy.body}
				</p>
				<div className="mt-5 flex flex-wrap gap-3">
					<Button onClick={() => setTab("home")} type="button">
						Browse programs →
					</Button>
					<Link
						className="inline-flex items-center justify-center rounded-[12px] border border-line-strong bg-white px-5 py-3 font-bold font-heading text-[0.9rem] text-ink-900 shadow-lu-sm transition hover:-translate-y-0.5"
						href="/programs"
					>
						Open full catalogue
					</Link>
				</div>
			</section>

			{title === "Opportunities" ? (
				<div className="space-y-3">
					<h3 className="font-extrabold font-heading text-[1.05rem] text-ink-900">
						Preview openings
					</h3>
					{previewJobs.map(job => (
						<div
							className="rounded-2xl border border-line border-dashed bg-canvas-muted/40 p-4 opacity-80"
							key={job.id}
						>
							<div className="flex flex-wrap items-center justify-between gap-2">
								<strong className="font-heading text-[0.95rem] text-ink-800">
									{job.title}
								</strong>
								<span className="rounded-full border border-line bg-white px-2.5 py-0.5 font-mono text-[0.65rem] text-ink-500">
									🔒 Enrol to unlock
								</span>
							</div>
							<p className="mt-1 text-[0.8rem] text-ink-500">
								{job.compensation} · {job.location} · {job.type}
							</p>
						</div>
					))}
				</div>
			) : null}
		</div>
	)
}

function CatalogEmpty({ title }) {
	const { openCourse, setActiveSlug } = useLearn()
	const enroll = useEnrollCourse()
	const [pendingSlug, setPendingSlug] = useState(null)
	const liveCount = CATALOGUE.filter(item => item.kind === "live").length
	const bootcampCount = CATALOGUE.filter(
		item => item.kind === "self-paced",
	).length

	const onEnrol = slug => {
		setPendingSlug(slug)
		enroll.mutate(
			{ slug },
			{
				onError: error => {
					setPendingSlug(null)
					toast.add({ title: error.message, type: "error" })
				},
				onSuccess: () => {
					setPendingSlug(null)
					setActiveSlug(slug)
					toast.add({
						title: "Enrolled! Opening your program…",
						type: "success",
					})
					openCourse(slug)
				},
			},
		)
	}

	return (
		<div className="space-y-6">
			<section className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0E131F_0%,#182236_50%,#0B0F19_100%)] p-6 text-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] sm:p-8">
				<div className="pointer-events-none absolute -top-10 -right-10 size-64 rounded-full bg-brand-500/15 blur-[75px]" />
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,179,0,0.06)_1px,transparent_1px)] bg-size-[24px_24px]" />

				<div className="relative z-10">
					<div className="mb-2.5 flex flex-wrap items-center gap-2">
						<span className="rounded-full border border-brand-400/40 bg-brand-500/15 px-3 py-0.5 font-bold font-mono text-[0.68rem] text-brand-300 uppercase tracking-widest backdrop-blur-md">
							{title || "Home"} · Catalogue
						</span>
						<span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 font-mono text-[0.68rem] text-white/70">
							{CATALOGUE.length} PROGRAMS
						</span>
					</div>
					<h2 className="font-extrabold font-heading text-2xl text-white tracking-tight sm:text-[1.8rem]">
						Start with a free program
					</h2>
					<p className="mt-2 max-w-[560px] text-[0.88rem] text-slate-300 leading-relaxed">
						{liveCount} live career tracks and {bootcampCount}{" "}
						recorded bootcamps — same list as `/programs`. Enrol one
						to unlock Learn, Jobs and Career.
					</p>
				</div>
			</section>

			<div className="flex items-center justify-between gap-3">
				<h3 className="font-extrabold font-heading text-[1.1rem] text-ink-900 tracking-tight">
					All programs
				</h3>
				<Link
					className="font-bold text-[0.78rem] text-brand-ink hover:underline"
					href="/programs"
				>
					Open /programs →
				</Link>
			</div>

			<div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
				{CATALOGUE.map(item => {
					const colors = trackOf(item.slug)
					const busy = pendingSlug === item.slug && enroll.isPending
					const isLive = item.kind === "live"

					return (
						<div
							className="group relative overflow-hidden rounded-2xl border bg-white p-4.5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lu-sm"
							key={item.slug}
							style={{
								background: `linear-gradient(145deg, ${colors[50]} 0%, #ffffff 55%)`,
								borderColor: colors[200],
							}}
						>
							<div
								aria-hidden="true"
								className="absolute inset-x-0 top-0 h-1"
								style={{
									background: `linear-gradient(90deg, ${colors[500]} 0%, var(--brand-500) 100%)`,
								}}
							/>

							<div className="flex items-start gap-3.5">
								<CourseIcon
									className="size-11 rounded-[12px] border-0 shadow-xs"
									program={item}
								/>
								<div className="min-w-0 flex-1">
									<strong className="block font-extrabold font-heading text-[0.98rem] text-ink-900">
										{item.title}
									</strong>
									<div className="mt-1 flex flex-wrap gap-1.5">
										<span
											className="rounded-md border px-2 py-0.5 font-bold font-mono text-[0.65rem]"
											style={{
												background: colors[100],
												borderColor: colors[200],
												color: colors.ink,
											}}
										>
											{isLive ? "Live track" : "Recorded"}
										</span>
										<span className="rounded-md border border-line bg-white/80 px-2 py-0.5 font-mono text-[0.65rem] text-ink-500">
											{item.area}
										</span>
										<span className="rounded-md border border-line bg-white/80 px-2 py-0.5 font-mono text-[0.65rem] text-ink-500">
											{item.duration}
										</span>
									</div>
								</div>
							</div>

							<p className="mt-3 line-clamp-2 text-[0.82rem] text-ink-500 leading-relaxed">
								{item.tagline}
							</p>

							<div className="mt-4 flex items-center justify-between gap-3">
								<span
									className="font-bold font-heading text-[0.8rem]"
									style={{ color: colors.ink }}
								>
									{isLive
										? "Get certified"
										: "Start learning"}
								</span>
								<Button
									className={cn(
										"min-w-[118px] px-4 py-2 text-[0.82rem]",
									)}
									disabled={enroll.isPending}
									onClick={() => onEnrol(item.slug)}
									type="button"
								>
									{busy ? "Enrolling…" : "Enrol free →"}
								</Button>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default function EmptyProgram({ title = "Home" }) {
	if (title === "Home") return <CatalogEmpty title={title} />
	return <LockedEmpty title={title} />
}
