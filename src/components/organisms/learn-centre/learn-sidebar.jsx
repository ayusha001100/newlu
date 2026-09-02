"use client"

import { initialsOf, LEARN_TABS } from "@/lib/data/learn"
import { cn } from "@/lib/utils"
import { useLearn } from "@/organisms/learn-centre/context"

export default function LearnSidebar({ onTabChange, tab: tabProp }) {
	const { openTutor, setTab, tab: tabFromContext, user } = useLearn()
	const tab = tabProp ?? tabFromContext
	const changeTab = onTabChange ?? setTab
	const initials = initialsOf(user?.name)
	const firstName = user?.name?.split(" ")[0] || "Learner"

	return (
		<aside className="sticky top-[76px] z-20 hidden h-[calc(100vh-76px)] w-[240px] shrink-0 flex-col justify-between overflow-y-auto border-line border-r bg-white p-4 shadow-xs lg:flex">
			<div className="space-y-4">
				<div className="px-2 pt-1">
					<span className="font-bold font-mono text-[0.68rem] text-ink-400 uppercase tracking-wider">
						LEARNING MENU
					</span>
				</div>

				<nav aria-label="Sidebar Navigation" className="space-y-1">
					{LEARN_TABS.map(item => {
						const active = tab === item.id
						return (
							<button
								aria-current={active ? "page" : undefined}
								className={cn(
									"group flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left font-bold text-[0.86rem] transition-all",
									active
										? "border border-brand-300 bg-brand-50 text-brand-ink shadow-xs"
										: "border border-transparent text-ink-600 hover:bg-canvas-muted hover:text-ink-900",
								)}
								key={item.id}
								onClick={event => {
									event.preventDefault()
									event.stopPropagation()
									changeTab(item.id)
								}}
								type="button"
							>
								<div className="flex items-center gap-2.5">
									<span className="text-base">
										{item.icon}
									</span>
									<span>{item.label}</span>
								</div>
								{item.id === "opportunities" ? (
									<span className="rounded-full bg-emerald-100 px-2 py-0.5 font-bold font-mono text-[0.65rem] text-emerald-700">
										7
									</span>
								) : null}
							</button>
						)
					})}
				</nav>
			</div>

			<div className="space-y-3 border-line border-t pt-3.5">
				<button
					className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-brand-200 bg-amber-50/70 p-2.5 text-left transition-all hover:bg-amber-100/70 hover:shadow-xs"
					onClick={() => openTutor()}
					type="button"
				>
					<span className="grid size-7 place-items-center rounded-lg bg-brand-400 text-on-brand text-sm shadow-xs">
						🤖
					</span>
					<div className="min-w-0 flex-1">
						<strong className="block font-bold text-[0.78rem] text-ink-900">
							AI Doubt Solver
						</strong>
						<span className="text-[0.68rem] text-brand-ink">
							Instant Help ➔
						</span>
					</div>
				</button>

				<div className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas-muted p-2.5">
					<span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-500 font-bold font-heading text-on-brand text-xs">
						{initials}
					</span>
					<div className="min-w-0 flex-1">
						<strong className="block truncate font-bold text-[0.78rem] text-ink-900 leading-tight">
							{firstName}
						</strong>
						<span className="font-mono text-[0.68rem] text-brand-ink">
							⚡ 750 XP (Lvl 2)
						</span>
					</div>
				</div>
			</div>
		</aside>
	)
}
