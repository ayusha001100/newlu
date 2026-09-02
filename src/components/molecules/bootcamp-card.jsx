"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

export default function BootcampCard({
	credential,
	cta,
	duration,
	logo,
	modulesCount,
	slug,
	summary,
	title,
}) {
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
				"group/spotlight relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white p-[22px_20px_20px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[5px] hover:border-brand-300 hover:shadow-lu-lg",
				"before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[linear-gradient(90deg,var(--ink-900),var(--brand-500))] before:content-['']",
			)}
			href={`/bootcamp/${slug}`}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			ref={cardRef}
			style={{
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
					background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--brand-rgb), 0.18), transparent 75%)`,
					opacity: mousePos.opacity,
				}}
			/>

			<div className="relative z-1 mb-3.5 grid size-[46px] place-items-center rounded-[12px] border border-line bg-white transition-[transform,border-color] duration-300 group-hover/spotlight:-translate-y-0.5 group-hover/spotlight:border-brand-400 group-hover/spotlight:shadow-sm">
				<Image
					alt=""
					height={26}
					src={logo.startsWith("/") ? logo : `/${logo}`}
					width={26}
				/>
			</div>
			<span className="relative z-1 mb-2.5 self-start rounded-full border border-brand-100 bg-brand-50 px-2 py-[3px] font-extrabold text-[0.68rem] text-brand-ink uppercase tracking-[0.08em] transition-colors group-hover/spotlight:border-brand-200 group-hover/spotlight:bg-brand-100">
				{credential}
			</span>
			<h3 className="relative z-1 mb-2 font-extrabold text-[1.08rem]">
				{title}
			</h3>
			<p className="relative z-1 mb-3.5 flex-1 text-[0.88rem] text-ink-500 leading-[1.5]">
				{summary}
			</p>
			<ul className="relative z-1 mb-4 flex flex-wrap gap-2">
				{[duration, modulesCount, "Beginner"].map(item => (
					<li
						className="rounded-[7px] border border-line bg-[var(--bg-050)] px-[9px] py-1 font-bold text-[0.74rem] text-ink-700 transition-colors group-hover/spotlight:border-brand-200 group-hover/spotlight:bg-white"
						key={item}
					>
						{item}
					</li>
				))}
			</ul>
			<span className="relative z-1 inline-flex items-center gap-1.5 border-line border-t pt-3.5 font-bold font-heading text-[0.88rem] text-ink-900 transition-[color,gap] group-hover/spotlight:gap-2.5 group-hover/spotlight:text-brand-ink">
				{cta} <span aria-hidden="true">→</span>
			</span>
		</Link>
	)
}
