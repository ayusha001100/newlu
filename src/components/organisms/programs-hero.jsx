"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Container from "@/atoms/container"
import Highlight from "@/atoms/highlight"
import Reveal from "@/atoms/reveal"
import { cn } from "@/lib/utils"

const POINTS = [
	"Live tracks and recorded bootcamps",
	"Filter by the skill you want",
	"Enroll into your Learning Centre",
]

const STEPS = [
	{
		n: "01",
		text: "Filter live tracks or recorded bootcamps.",
		title: "Filter by goal",
	},
	{
		n: "02",
		text: "Open a curriculum and check the project.",
		title: "Review projects",
	},
	{
		n: "03",
		text: "Enroll — it lands in your Learning Centre.",
		title: "Instant access",
	},
]

function HowToPickCard() {
	const [activeStep, setActiveStep] = useState(0)

	useEffect(() => {
		const timer = setInterval(() => {
			setActiveStep(prev => (prev + 1) % STEPS.length)
		}, 3500)
		return () => clearInterval(timer)
	}, [])

	return (
		<aside
			aria-label="How to pick guide"
			className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[var(--ink-900)] p-[28px] text-[#fff] shadow-lu-lg [background-image:radial-gradient(360px_220px_at_100%_0%,rgba(var(--brand-rgb),0.18),transparent_72%)] max-[980px]:max-w-[600px] max-[720px]:p-[22px]"
		>
			<span className="mb-2 inline-flex items-center gap-2 font-extrabold font-heading text-[0.72rem] text-brand-400 uppercase tracking-[0.12em]">
				<span className="size-1.5 rounded-full bg-brand-500 shadow-[0_0_6px_var(--brand-500)]" />
				How to pick
			</span>

			<strong className="mb-6 block font-extrabold font-heading text-[#fff] text-[1.3rem] leading-[1.2] tracking-tight">
				Job first, then the program.
			</strong>

			<div className="relative flex flex-col gap-2.5">
				{STEPS.map((step, index) => {
					const isActive = activeStep === index

					return (
						<button
							className={cn(
								"group relative flex w-full cursor-pointer items-start gap-3.5 rounded-[14px] border p-3.5 text-left outline-none transition-all duration-[300ms] ease-out",
								isActive
									? "border-brand-500/40 bg-[linear-gradient(135deg,rgba(255,179,0,0.1),rgba(255,255,255,0.03))] shadow-[0_4px_16px_rgba(0,0,0,0.25)] ring-1 ring-brand-500/20"
									: "border-white/6 bg-white/2 hover:border-white/15 hover:bg-white/4",
							)}
							key={step.n}
							onClick={() => setActiveStep(index)}
							type="button"
						>
							<span
								className={cn(
									"grid size-[32px] shrink-0 place-items-center rounded-[9px] border font-extrabold font-heading text-[0.72rem] transition-all duration-300",
									isActive
										? "border-brand-400 bg-brand-500 text-on-brand shadow-[0_0_10px_rgba(255,179,0,0.5)]"
										: "border-white/10 bg-white/5 text-white/50 group-hover:border-white/20 group-hover:text-white/80",
								)}
							>
								{step.n}
							</span>

							<div className="flex-1 pt-0.5">
								<p
									className={cn(
										"text-[0.88rem] leading-[1.45] transition-colors",
										isActive
											? "font-medium text-white"
											: "text-white/70 group-hover:text-white/90",
									)}
								>
									{step.text}
								</p>
							</div>
						</button>
					)
				})}
			</div>
		</aside>
	)
}

export default function ProgramsHero() {
	return (
		<section className="relative overflow-hidden border-[var(--line)] border-b bg-[var(--bg-000)] pt-[140px] pb-[72px] [background-image:radial-gradient(720px_380px_at_88%_20%,rgba(var(--brand-rgb),0.22),transparent_72%),radial-gradient(520px_300px_at_12%_100%,rgba(var(--brand-rgb),0.1),transparent_74%)] max-[720px]:pt-[106px] max-[980px]:pt-[118px] max-[720px]:pb-11 max-[980px]:pb-14">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(16,20,27,0.065)_1px,transparent_1px)] bg-size-[28px_28px] [mask-image:linear-gradient(90deg,#000,transparent_72%)]"
			/>
			<Container className="relative grid grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] items-center gap-[72px] max-[980px]:grid-cols-1 max-[980px]:gap-10">
				<div>
					<nav
						aria-label="Breadcrumb"
						className="mb-6 flex items-center gap-2.5 font-semibold text-[0.82rem] text-[var(--ink-500)]"
					>
						<Link className="hover:text-[var(--ink-900)]" href="/">
							Home
						</Link>
						<span
							aria-hidden="true"
							className="text-[var(--ink-300)]"
						>
							/
						</span>
						<span>Programs</span>
					</nav>
					<span className="mb-[18px] inline-flex items-center gap-2.5 font-extrabold font-heading text-[0.76rem] text-[var(--brand-ink)] uppercase tracking-[0.11em] before:h-0.5 before:w-[26px] before:rounded before:bg-[var(--brand-500)] before:content-['']">
						All programs
					</span>
					<h1 className="mb-[22px] max-w-[760px] text-[clamp(2.65rem,4.4vw,4.35rem)] text-[var(--ink-900)] leading-[1.03] max-[720px]:text-[2.35rem] max-[980px]:text-[clamp(2.4rem,5.5vw,3.5rem)]">
						Choose a track or bootcamp, then{" "}
						<Highlight className="whitespace-normal">
							enroll.
						</Highlight>
					</h1>
					<p className="max-w-[650px] text-[1.03rem] text-[var(--ink-500)] leading-[1.75] max-[720px]:text-[0.94rem] max-[720px]:leading-[1.65]">
						Live career tracks and recorded entry-level programs in
						one list. Filter by format and skill area, open the
						curriculum, and enroll when you are ready.
					</p>
					<ul
						aria-label="How this catalogue works"
						className="mt-[30px] flex flex-wrap gap-x-[18px] gap-y-2.5 max-[720px]:mt-6 max-[720px]:grid"
					>
						{POINTS.map(point => (
							<li
								className="inline-flex items-center gap-2 font-bold text-[0.84rem] text-[var(--ink-700)] before:grid before:size-5 before:place-items-center before:rounded-full before:bg-[rgba(var(--success-rgb),0.12)] before:font-extrabold before:text-[0.68rem] before:text-[var(--success)] before:content-['✓']"
								key={point}
							>
								{point}
							</li>
						))}
					</ul>
				</div>

				<Reveal delay={120} variant="fade-left">
					<HowToPickCard />
				</Reveal>
			</Container>
		</section>
	)
}
