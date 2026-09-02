"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const SLIDES = [
	{
		badge: "PROJECT-BASED LEARNING",
		description:
			"Build real-world capstone projects, ship working code, and get reviews from senior engineers.",
		gradient: "from-[#0a0f1d] via-[#101935] to-[#080d1a]",
		id: "projects",
		image: "/auth/slide_projects.jpg",
		subtitle: "Proof of Work",
		title: "Learn by Building Real Projects",
	},
	{
		badge: "INDUSTRY CREDENTIALS",
		description:
			"100% free live career tracks and bootcamps with verified, shareable digital credentials.",
		gradient: "from-[#081326] via-[#0d2240] to-[#06101f]",
		id: "certifications",
		image: "/auth/slide_certificate.jpg",
		subtitle: "Zero Tuition",
		title: "Free Certifications That Matter",
	},
	{
		badge: "CAREER LAUNCHPAD",
		description:
			"Fast-track your job search with verified portfolios and direct referrals to 450+ tech partners.",
		gradient: "from-[#110826] via-[#1d103d] to-[#0c051c]",
		id: "hiring",
		image: "/auth/slide_career.jpg",
		subtitle: "Top Companies",
		title: "Direct Referrals & Job Placement",
	},
]

export default function AuthSlider() {
	const [active, setActive] = useState(0)

	useEffect(() => {
		const timer = setInterval(() => {
			setActive(prev => (prev + 1) % SLIDES.length)
		}, 4000)
		return () => clearInterval(timer)
	}, [])

	const currentSlide = SLIDES[active]

	return (
		<div
			className={cn(
				"relative flex size-full min-h-screen flex-col justify-between overflow-hidden bg-gradient-to-br p-8 text-white transition-all duration-1000 max-[980px]:hidden sm:p-10 lg:p-12 xl:p-14",
				currentSlide.gradient,
			)}
		>
			{/* Top ambient radial light */}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(255,179,0,0.18),transparent_70%)]" />

			{/* Slide Badge & Counter */}
			<div className="relative z-10 flex items-center justify-between">
				<span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-bold font-mono text-[0.72rem] text-brand-300 uppercase tracking-wider backdrop-blur-md">
					{currentSlide.badge}
				</span>
				<span className="font-bold font-mono text-white/70 text-xs tracking-widest">
					0{active + 1} / 0{SLIDES.length}
				</span>
			</div>

			{/* Center High-Res 3D Artwork Image Container */}
			<div className="relative z-10 my-auto flex w-full items-center justify-center py-6">
				<div className="group relative aspect-square w-full max-w-[360px] xl:max-w-[400px]">
					{/* Glowing border & shadow ring */}
					<div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-brand-500/40 via-cyan-500/30 to-purple-500/40 opacity-70 blur-xl transition-all duration-700 group-hover:opacity-100" />

					<div className="relative size-full overflow-hidden rounded-2xl border border-white/20 bg-slate-950/80 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-sm">
						{SLIDES.map((slide, idx) => (
							<div
								className={cn(
									"absolute inset-0 transition-all duration-700 ease-out",
									active === idx
										? "scale-100 opacity-100"
										: "pointer-events-none scale-95 opacity-0",
								)}
								key={slide.id}
							>
								<Image
									alt={slide.title}
									className="size-full object-cover"
									height={500}
									priority={idx === 0}
									src={slide.image}
									width={500}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Bottom Slide Typography & Progress Controls */}
			<div className="relative z-10">
				<span className="mb-1 block font-extrabold font-mono text-[0.78rem] text-brand-400 uppercase tracking-widest">
					{currentSlide.subtitle}
				</span>
				<h2 className="font-extrabold font-heading text-2xl text-white tracking-tight sm:text-[1.75rem]">
					{currentSlide.title}
				</h2>
				<p className="mt-2 min-h-[44px] max-w-[480px] text-slate-300 text-sm leading-relaxed">
					{currentSlide.description}
				</p>

				{/* 3 Progress Bars */}
				<div className="mt-6 flex items-center gap-2.5">
					{SLIDES.map((slide, idx) => (
						<button
							aria-label={`Jump to slide ${idx + 1}`}
							className={cn(
								"h-2 rounded-full outline-none transition-all duration-500",
								active === idx
									? "w-10 bg-brand-400 shadow-[0_0_12px_rgba(255,179,0,0.8)]"
									: "w-3 bg-white/25 hover:bg-white/50",
							)}
							key={slide.id}
							onClick={() => setActive(idx)}
							type="button"
						/>
					))}
				</div>
			</div>
		</div>
	)
}
