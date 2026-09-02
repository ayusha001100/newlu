"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import TrackIcon from "@/atoms/track-icon"
import { trackOf } from "@/lib/data/tracks"
import { cn } from "@/lib/utils"

export default function ProgramCard({ cta, index, slug, summary, title }) {
	const track = trackOf(slug)
	const num = String(index + 1).padStart(2, "0")

	const cardRef = useRef(null)
	const [mousePos, setMousePos] = useState({ opacity: 0, x: 0, y: 0 })
	const [tilt, setTilt] = useState({ x: 0, y: 0 })

	const handleMouseMove = e => {
		if (!cardRef.current) return
		const rect = cardRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

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
		<Link
			className={cn(
				"group/spotlight relative flex h-full flex-col overflow-hidden rounded-xl border p-[24px_22px_22px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[var(--track-400)] hover:shadow-[0_20px_45px_rgba(var(--track-rgb),0.18),0_4px_12px_rgba(16,20,27,0.06)] max-[720px]:min-h-[230px] max-[720px]:p-[22px] max-[720px]:active:scale-[0.985] max-[720px]:hover:translate-y-0 max-[720px]:hover:shadow-none",
				"before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[linear-gradient(90deg,var(--track-500)_0%,var(--brand-500)_100%)] before:content-['']",
			)}
			href={`/program/${slug}`}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			ref={cardRef}
			style={{
				"--track-50": track[50],
				"--track-100": track[100],
				"--track-200": track[200],
				"--track-400": track[400],
				"--track-500": track[500],
				"--track-ink": track.ink,
				"--track-rgb": track.rgb,
				background: `radial-gradient(170px 120px at 108% -8%, rgba(255, 179, 0, 0.32), transparent 68%), radial-gradient(210px 150px at -12% 118%, rgba(${track.rgb}, 0.22), transparent 70%), linear-gradient(165deg, ${track[50]} 0%, #ffffff 58%)`,
				borderColor: track[200],
				transform:
					tilt.x || tilt.y
						? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
						: undefined,
			}}
		>
			{/* Dynamic 3D Cursor Spotlight */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
				style={{
					background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--brand-rgb), 0.22), transparent 75%)`,
					opacity: mousePos.opacity,
				}}
			/>

			<div className="relative z-1 mb-[18px] flex items-center justify-between">
				<div
					className="grid size-[46px] place-items-center rounded-[13px] border text-[var(--track-ink)] transition-[transform,background-color,border-color,color] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/spotlight:-translate-y-0.5 group-hover/spotlight:scale-[1.06] group-hover/spotlight:border-brand-500 group-hover/spotlight:bg-brand-500 group-hover/spotlight:text-on-brand"
					style={{
						background: "var(--track-100)",
						borderColor: "var(--track-200)",
					}}
				>
					<TrackIcon slug={slug} />
				</div>
				<span className="font-extrabold font-heading text-[0.78rem] text-[var(--track-500)] tracking-[0.06em]">
					{num}
				</span>
			</div>
			<h3 className="relative z-1 mb-2 font-extrabold text-[1.08rem] leading-[1.28]">
				{title}
			</h3>
			<p className="relative z-1 mb-[18px] flex-1 text-[0.89rem] text-ink-500 leading-[1.5]">
				{summary}
			</p>
			<div className="relative z-1 mb-4 flex flex-wrap gap-1.5">
				{["Free", "Live", "Certificate"].map((tag, tagIndex) => (
					<span
						className={cn(
							"rounded-[6px] border px-[9px] py-[3px] font-bold text-[0.7rem] tracking-[0.01em] transition-colors",
							tagIndex === 0
								? "border-[var(--track-200)] bg-[var(--track-100)] text-[var(--track-ink)]"
								: "border-line bg-white/72 text-ink-500 group-hover/spotlight:border-brand-200 group-hover/spotlight:bg-white",
						)}
						key={tag}
					>
						{tag}
					</span>
				))}
			</div>
			<span
				className="relative z-1 mt-auto inline-flex items-center gap-1.5 border-t pt-4 font-bold font-heading text-[0.88rem] text-ink-900 transition-[color,gap] group-hover/spotlight:gap-2.5 group-hover/spotlight:text-[var(--track-ink)]"
				style={{ borderColor: "var(--track-200)" }}
			>
				{cta} <span aria-hidden="true">→</span>
			</span>
		</Link>
	)
}
