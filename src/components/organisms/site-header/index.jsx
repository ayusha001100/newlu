"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Container from "@/atoms/container"
import Logo from "@/atoms/logo"
import { useSession } from "@/hooks/auth/useSession"
import { NAV_SECTIONS } from "@/lib/data/nav"
import { cn } from "@/lib/utils"
import DesktopNav from "@/organisms/site-header/desktop-nav"
import MobileNav from "@/organisms/site-header/mobile-sheet"
import { Button } from "@/ui/button"

export default function SiteHeader() {
	const pathname = usePathname()
	const { data } = useSession()
	const signedIn = Boolean(data?.user)
	const onColleges = pathname.startsWith("/colleges")
	const [scrolled, setScrolled] = useState(false)
	const [sheetOpen, setSheetOpen] = useState(false)

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	useEffect(() => {
		setSheetOpen(false)
	}, [])

	useEffect(() => {
		document.documentElement.toggleAttribute("data-nav-open", sheetOpen)
		return () => document.documentElement.removeAttribute("data-nav-open")
	}, [sheetOpen])

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-0 z-[100] border-transparent border-b bg-white/72 backdrop-blur-lg backdrop-saturate-[180%] transition-[background-color,border-color,box-shadow] duration-[250ms]",
				scrolled &&
					"border-line bg-white/94 shadow-[0_1px_0_rgba(16,20,27,0.04),0_8px_24px_rgba(16,20,27,0.06)]",
				sheetOpen && "bg-white backdrop-blur-none",
			)}
		>
			<Container
				className="flex h-[76px] items-center justify-between gap-6 max-[720px]:h-[68px]"
				size="nav"
			>
				<Logo priority />
				<DesktopNav sections={NAV_SECTIONS} />
				<div className="nav:flex hidden items-center gap-2">
					<Button
						nativeButton={false}
						render={<Link href={signedIn ? "/refer" : "/auth"} />}
						variant="ghost"
					>
						{signedIn ? "Refer & Earn" : "Login"}
					</Button>
					<Button
						nativeButton={false}
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
				</div>
				<button
					aria-controls="mobile-nav"
					aria-expanded={sheetOpen}
					aria-label="Toggle menu"
					className="flex nav:hidden size-11 flex-col items-center justify-center gap-[5px] rounded-full p-3"
					onClick={() => setSheetOpen(open => !open)}
					type="button"
				>
					<span
						className={cn(
							"block h-0.5 w-full rounded-sm bg-ink-900 transition",
							sheetOpen && "translate-y-[7px] rotate-45",
						)}
					/>
					<span
						className={cn(
							"block h-0.5 w-full rounded-sm bg-ink-900 transition",
							sheetOpen && "scale-x-0 opacity-0",
						)}
					/>
					<span
						className={cn(
							"block h-0.5 w-full rounded-sm bg-ink-900 transition",
							sheetOpen && "-translate-y-[7px] -rotate-45",
						)}
					/>
				</button>
			</Container>
			<MobileNav
				onColleges={onColleges}
				onOpenChange={setSheetOpen}
				open={sheetOpen}
				sections={NAV_SECTIONS}
				signedIn={signedIn}
			/>
		</header>
	)
}
