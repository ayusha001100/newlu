"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import TrackIcon from "@/atoms/track-icon"
import { trackStyle } from "@/lib/data/catalog"
import { cn } from "@/lib/utils"
import EnrollButton from "@/molecules/enroll-button"
import { Button } from "@/ui/button"

export default function CatalogCard({ item }) {
	const live = item.kind === "live"
	const logoSrc = item.logo
		? item.logo.startsWith("/")
			? item.logo
			: `/${item.logo}`
		: null

	const cardRef = useRef(null)
	const [mousePos, setMousePos] = useState({ opacity: 0, x: 0, y: 0 })
	const [tilt, setTilt] = useState({ x: 0, y: 0 })

	const handleMouseMove = e => {
		if (!cardRef.current) return
		const rect = cardRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		// Subtle micro-tilt (max 2.5deg)
		const centerX = rect.width / 2
		const centerY = rect.height / 2
		const rotateX = ((centerY - y) / centerY) * 2.5
		const rotateY = ((x - centerX) / centerX) * 2.5

		setMousePos({ opacity: 1, x, y })
		setTilt({ x: rotateX, y: rotateY })
	}

	const handleMouseLeave = () => {
		setMousePos(prev => ({ ...prev, opacity: 0 }))
		setTilt({ x: 0, y: 0 })
	}

	return (
		<article
			className={cn(
				"group/spotlight relative flex h-full flex-col overflow-hidden rounded-xl border p-[24px_22px_22px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
				"hover:-translate-y-1.5 hover:border-[var(--track-400)] hover:shadow-[0_20px_45px_rgba(var(--track-rgb),0.18),0_4px_12px_rgba(16,20,27,0.06)] max-[720px]:hover:translate-y-0",
				"before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[linear-gradient(90deg,var(--track-500)_0%,var(--brand-500)_100%)] before:content-['']",
			)}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			ref={cardRef}
			style={{
				...trackStyle(item.slug),
				background:
					"radial-gradient(170px 120px at 108% -8%, rgba(255, 179, 0, 0.32), transparent 68%), radial-gradient(210px 150px at -12% 118%, rgba(var(--track-rgb), 0.22), transparent 70%), linear-gradient(165deg, var(--track-050) 0%, #ffffff 58%)",
				borderColor: "var(--track-200)",
				transform:
					tilt.x || tilt.y
						? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
						: undefined,
			}}
		>
			{/* Dynamic 3D Cursor Spotlight Overlay */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
				style={{
					background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--brand-rgb), 0.22), transparent 75%)`,
					opacity: mousePos.opacity,
				}}
			/>

			{/* Top Bar Icon & Live Track Tag */}
			<div className="relative z-1 mb-[18px] flex items-center justify-between">
				<span
					className={cn(
						"grid size-[46px] place-items-center rounded-[13px] border font-extrabold font-heading text-[0.82rem] text-[var(--track-ink)] transition-[transform,background-color,border-color,color] duration-[350ms] group-hover/spotlight:-translate-y-0.5 group-hover/spotlight:scale-[1.06]",
						logoSrc
							? "border-line bg-white group-hover/spotlight:border-line-strong group-hover/spotlight:bg-white"
							: "border-[var(--track-200)] bg-[var(--track-100)] group-hover/spotlight:border-brand-500 group-hover/spotlight:bg-brand-500 group-hover/spotlight:text-on-brand",
					)}
				>
					{logoSrc ? (
						<Image alt="" height={22} src={logoSrc} width={22} />
					) : live ? (
						<TrackIcon slug={item.slug} />
					) : (
						item.icon
					)}
				</span>
				<span className="inline-flex items-center gap-1.5 font-extrabold text-[0.72rem] text-[var(--track-ink)] uppercase tracking-[0.06em]">
					{live && (
						<span className="relative flex size-2">
							<span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
							<span className="relative inline-flex size-2 rounded-full bg-success shadow-[0_0_6px_rgba(22,163,74,0.6)]" />
						</span>
					)}
					{live ? "Live track" : "Recorded"}
				</span>
			</div>

			<h3 className="relative z-1 mb-2 font-extrabold text-[1.08rem] leading-[1.28]">
				{item.title}
			</h3>
			<p className="relative z-1 mb-3 flex-1 text-[0.89rem] text-[var(--ink-500)] leading-[1.5]">
				{item.tagline}
			</p>
			<ul className="relative z-1 mb-0 flex flex-wrap gap-2">
				{[item.duration, item.level, item.area].map(meta => (
					<li
						className="rounded-full border border-[var(--line)] bg-[var(--bg-050)] px-2.5 py-1 font-bold text-[0.74rem] text-[var(--ink-500)] transition-colors group-hover/spotlight:border-brand-200 group-hover/spotlight:bg-white"
						key={meta}
					>
						{meta}
					</li>
				))}
			</ul>
			<div className="relative z-1 mt-auto flex gap-2 pt-[18px] max-[720px]:flex-col">
				<Button
					className="min-h-[42px] flex-1"
					nativeButton={false}
					render={<Link href={item.href} />}
					size="sm"
					variant="outline"
				>
					View curriculum
				</Button>
				<EnrollButton
					className="min-h-[42px] flex-1"
					kind={live ? "program" : "bootcamp"}
					size="sm"
					slug={item.slug}
				>
					Enrol
				</EnrollButton>
			</div>
		</article>
	)
}
