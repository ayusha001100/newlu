"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import NavPanel from "@/organisms/site-header/nav-panel"

export default function DesktopNav({ sections }) {
	const [openId, setOpenId] = useState(null)
	const rootRef = useRef(null)

	useEffect(() => {
		const onPointer = event => {
			if (!rootRef.current?.contains(event.target)) setOpenId(null)
		}
		const onKey = event => {
			if (event.key === "Escape") setOpenId(null)
		}
		document.addEventListener("mousedown", onPointer)
		document.addEventListener("keydown", onKey)
		return () => {
			document.removeEventListener("mousedown", onPointer)
			document.removeEventListener("keydown", onKey)
		}
	}, [])

	return (
		<nav
			aria-label="Primary"
			className="mr-2 ml-auto nav:flex hidden items-center gap-0.5"
			onMouseLeave={() => setOpenId(null)}
			ref={rootRef}
		>
			{sections.map(section => {
				const open = openId === section.id
				const alignEnd = ["stories", "colleges", "resources"].includes(
					section.id,
				)
				return (
					<div className="relative" key={section.id}>
						<button
							aria-controls={`nav-panel-${section.id}`}
							aria-expanded={open}
							className={cn(
								"flex items-center gap-[5px] whitespace-nowrap rounded-[10px] px-3 py-2 font-sans font-semibold text-[0.9rem] text-ink-700 transition-colors hover:bg-canvas-sunken hover:text-ink-900 max-[1400px]:px-[9px] max-[1400px]:text-[0.875rem]",
								open && "bg-canvas-sunken text-ink-900",
							)}
							onClick={() => setOpenId(open ? null : section.id)}
							onMouseEnter={() => {
								if (openId) setOpenId(section.id)
							}}
							type="button"
						>
							{section.label}
							<svg
								aria-hidden="true"
								className={cn(
									"size-2.5 opacity-60 transition-transform",
									open && "rotate-180",
								)}
								viewBox="0 0 10 10"
							>
								<path
									d="M1.5 3.5 5 7l3.5-3.5"
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.6"
								/>
							</svg>
						</button>
						{open ? (
							<div
								className={cn(
									"absolute top-[calc(100%+10px)] z-[120] animate-nav-panel rounded-xl border border-line bg-white shadow-lu-lg before:absolute before:-top-2.5 before:right-0 before:left-0 before:h-2.5 before:content-['']",
									alignEnd ? "right-0" : "left-0",
								)}
								id={`nav-panel-${section.id}`}
							>
								<NavPanel
									onSelect={() => setOpenId(null)}
									section={section}
								/>
							</div>
						) : null}
					</div>
				)
			})}
		</nav>
	)
}
