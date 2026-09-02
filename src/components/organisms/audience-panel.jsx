"use client"

import { useState } from "react"
import LandingSection from "@/atoms/landing-section"
import { AUDIENCE_TABS, AUDIENCES } from "@/lib/data/landing"
import { cn } from "@/lib/utils"
import SectionHead from "@/molecules/section-head"

export default function AudiencePanel({ copy, items, slug, title }) {
	const isGenAi = slug === "generative-ai"
	const [tab, setTab] = useState("students")
	const cases = isGenAi ? AUDIENCES[tab] : items

	return (
		<LandingSection alt id="for-you">
			<SectionHead
				eyebrow={isGenAi ? "AI for you" : "Designed for you"}
				title={title}
			>
				{copy}
			</SectionHead>
			{isGenAi ? (
				<div
					className="mb-7 flex flex-wrap justify-center gap-2 max-[720px]:flex-nowrap max-[720px]:justify-start max-[720px]:overflow-x-auto max-[720px]:pb-1 max-[720px]:[scrollbar-width:none] max-[720px]:[&::-webkit-scrollbar]:hidden"
					role="tablist"
				>
					{AUDIENCE_TABS.map(item => {
						const selected = tab === item.key
						return (
							<button
								aria-selected={selected}
								className={cn(
									"rounded-full border px-4 py-2.5 font-semibold text-[0.88rem]",
									selected
										? "border-ink-900 bg-[var(--ink-900)] text-[#fff]"
										: "border-line bg-[#fff] text-ink-500 hover:border-line-strong hover:text-ink-900",
								)}
								key={item.key}
								onClick={() => setTab(item.key)}
								role="tab"
								type="button"
							>
								{item.label}
							</button>
						)
					})}
				</div>
			) : null}
			<div className="mx-auto max-w-[760px] rounded-[24px] border border-line bg-[#fff] px-8 py-7 max-[720px]:px-5 max-[720px]:py-6">
				<ul className="grid gap-3.5">
					{cases.map(item => (
						<li
							className="relative pl-7 font-semibold text-[1.02rem] text-ink-900 before:absolute before:left-0 before:text-[var(--track-600)] before:content-['→']"
							key={item}
						>
							{item}
						</li>
					))}
				</ul>
			</div>
		</LandingSection>
	)
}
