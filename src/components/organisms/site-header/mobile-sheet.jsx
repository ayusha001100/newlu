"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import NavPanel from "@/organisms/site-header/nav-panel"
import { Button } from "@/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetTitle } from "@/ui/sheet"

export default function MobileNav({
	onColleges,
	onOpenChange,
	open,
	sections,
	signedIn,
}) {
	const [openSection, setOpenSection] = useState(null)

	return (
		<Sheet
			onOpenChange={next => {
				onOpenChange(next)
				if (!next) setOpenSection(null)
			}}
			open={open}
		>
			<SheetContent
				className="z-[90] gap-0 border-0 p-0 shadow-none data-[side=right]:inset-x-0 data-[side=right]:top-[var(--header-h)] data-[side=right]:right-0 data-[side=right]:bottom-0 data-[side=right]:left-0 data-[side=right]:h-auto data-[side=right]:w-full data-[side=right]:sm:max-w-none"
				overlayClassName="z-[90] top-[var(--header-h)] bg-black/32 backdrop-blur-[3px]"
				showCloseButton={false}
				side="right"
			>
				<SheetTitle className="sr-only">Site menu</SheetTitle>
				<div className="flex h-full flex-col bg-white">
					<nav className="flex-1 overflow-y-auto overscroll-contain px-3.5 pt-2.5 pb-5">
						{sections.map(section => {
							const expanded = openSection === section.id
							return (
								<div
									className="border-line border-b last:border-b-0"
									key={section.id}
								>
									<button
										aria-expanded={expanded}
										className="flex min-h-[52px] w-full items-center justify-between rounded-[10px] px-3 py-3 text-left font-semibold text-base text-ink-700"
										onClick={() =>
											setOpenSection(
												expanded ? null : section.id,
											)
										}
										type="button"
									>
										{section.label}
										<svg
											aria-hidden="true"
											className={cn(
												"size-[13px] opacity-85 transition-transform",
												expanded && "rotate-180",
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
									{expanded ? (
										<NavPanel
											onSelect={() => onOpenChange(false)}
											section={section}
										/>
									) : null}
								</div>
							)
						})}
					</nav>
					<SheetFooter className="flex-row gap-2.5 border-line border-t bg-white px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-6px_24px_rgba(16,20,27,0.08)]">
						<Button
							className="min-h-[48px] flex-1"
							nativeButton={false}
							onClick={() => onOpenChange(false)}
							render={
								<Link href={signedIn ? "/refer" : "/auth"} />
							}
							variant="ghost"
						>
							{signedIn ? "Refer & Earn" : "Login"}
						</Button>
						<Button
							className="min-h-[48px] flex-1"
							nativeButton={false}
							onClick={() => onOpenChange(false)}
							render={
								<Link
									href={
										onColleges
											? "/colleges/contact-partnerships"
											: signedIn
												? "/learn"
												: "/programs"
									}
								/>
							}
						>
							{onColleges
								? "Partner With Us"
								: signedIn
									? "Continue learning"
									: "Start free"}
						</Button>
					</SheetFooter>
				</div>
			</SheetContent>
		</Sheet>
	)
}
