"use client"

import Link from "next/link"
import NavLink from "@/organisms/site-header/nav-link"

const groupsOf = section =>
	section.groups || [
		{ items: section.items || [], title: section.groupTitle },
	]

export default function NavPanel({ onSelect, section }) {
	if (section.layout === "mega") {
		const groups = groupsOf(section)
		return (
			<div className="grid w-[764px] grid-cols-[250px_minmax(0,1fr)] gap-[18px] p-[18px] max-nav:w-auto max-nav:grid-cols-1 max-nav:gap-0.5 max-nav:p-0 max-nav:pl-2">
				<Link
					className="flex flex-col rounded-[12px] border border-line bg-[linear-gradient(160deg,var(--brand-050),var(--bg-050))] p-[18px] max-nav:mb-2 max-nav:p-3.5"
					href={section.lead.href}
					onClick={onSelect}
				>
					<strong className="mb-1.5 font-heading text-base text-ink-900">
						{section.lead.title}
					</strong>
					<p className="mb-3.5 text-[0.83rem] text-ink-500 leading-[1.55] max-nav:hidden">
						{section.lead.text}
					</p>
					<span className="mt-auto font-bold font-heading text-[0.83rem] text-brand-ink group-hover:underline">
						{section.lead.cta} <span aria-hidden="true">→</span>
					</span>
				</Link>
				<div className="grid gap-3.5">
					{groups.map(group => (
						<div key={group.title}>
							<h4 className="px-3 py-1.5 font-extrabold text-[0.7rem] text-ink-300 uppercase tracking-[0.09em]">
								{group.title}
							</h4>
							<div className="grid grid-cols-2 gap-x-2 gap-y-0.5 max-nav:grid-cols-1">
								{group.items.map(item => (
									<NavLink
										item={item}
										key={item.label}
										onSelect={onSelect}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className="grid min-w-[232px] gap-0.5 p-2.5 max-nav:min-w-0 max-nav:p-0 max-nav:pl-2">
			{section.items.map(item => (
				<NavLink item={item} key={item.label} onSelect={onSelect} />
			))}
		</div>
	)
}
