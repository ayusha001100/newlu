"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Container from "@/atoms/container"
import Logo from "@/atoms/logo"
import { useLogout } from "@/hooks/auth/useLogout"
import { initialsOf } from "@/lib/data/learn"
import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"

export default function LearnHeader({
	onNotif,
	onOpenTutor,
	onSettings,
	user,
}) {
	const logout = useLogout()
	const [open, setOpen] = useState(false)
	const menuRef = useRef(null)
	const initials = initialsOf(user?.name)

	useEffect(() => {
		const onDoc = event => {
			if (!menuRef.current?.contains(event.target)) setOpen(false)
		}
		const onKey = event => {
			if (event.key === "Escape") setOpen(false)
		}
		document.addEventListener("click", onDoc)
		document.addEventListener("keydown", onKey)
		return () => {
			document.removeEventListener("click", onDoc)
			document.removeEventListener("keydown", onKey)
		}
	}, [])

	const firstName = user?.name?.split(" ")[0] || "Learner"
	const meta = user?.education
		? user.education.replace(/\s*\(.*\)\s*/, "").trim()
		: "Learner"
	const location =
		[user?.city, user?.state].filter(Boolean).join(", ") ||
		user?.country ||
		"LetsUpgrade learner"

	return (
		<header className="fixed inset-x-0 top-0 z-[100] border-line border-b bg-white/94 shadow-[0_1px_0_rgba(16,20,27,0.04),0_8px_24px_rgba(16,20,27,0.06)] backdrop-blur-lg">
			<Container
				className="flex h-[76px] items-center justify-between gap-4 max-[720px]:h-[68px]"
				size="nav"
			>
				<Logo />

				<nav className="nav:block hidden">
					<Link
						className="font-bold text-[0.9rem] text-brand-ink"
						href="/learn"
					>
						Learning Centre
					</Link>
				</nav>

				<div className="ml-auto flex items-center gap-2">
					<Button
						className="hidden gap-2 sm:inline-flex"
						onClick={onOpenTutor}
						type="button"
						variant="ghost"
					>
						<svg
							aria-hidden="true"
							fill="none"
							height="17"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="1.8"
							viewBox="0 0 24 24"
							width="17"
						>
							<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.3-3.6A8.4 8.4 0 1 1 21 11.5z" />
						</svg>
						AI Tutor
					</Button>

					<button
						aria-label="Notifications"
						className="relative flex size-10 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-bg-050 hover:text-ink-900"
						onClick={onNotif}
						title="Notifications"
						type="button"
					>
						<svg
							aria-hidden="true"
							fill="currentColor"
							height="20"
							viewBox="0 0 24 24"
							width="20"
						>
							<path d="M12 22a2.2 2.2 0 0 0 2.2-2.2h-4.4A2.2 2.2 0 0 0 12 22Zm7.2-5.5V11a7.2 7.2 0 1 0-14.4 0v5.5L3 18.3v1.1h18v-1.1l-1.8-1.8Z" />
						</svg>
					</button>

					<div className="relative" ref={menuRef}>
						<button
							aria-expanded={open}
							aria-haspopup="true"
							className="flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pr-2 pl-1.5 transition-colors hover:border-line-strong"
							onClick={event => {
								event.stopPropagation()
								setOpen(value => !value)
							}}
							type="button"
						>
							<span className="flex size-8 items-center justify-center rounded-full bg-brand-500 font-bold text-[0.78rem] text-white">
								{initials}
							</span>
							<span className="hidden text-left sm:block">
								<strong className="block font-bold text-[0.82rem] text-ink-900">
									{firstName}
								</strong>
								<small className="block text-[0.72rem] text-ink-500">
									{meta}
								</small>
							</span>
							<span
								aria-hidden="true"
								className="text-ink-400 text-xs"
							>
								▾
							</span>
						</button>

						{open ? (
							<div className="absolute top-[calc(100%+8px)] right-0 z-10 min-w-[220px] overflow-hidden rounded-xl border border-line bg-white shadow-lu-md">
								<div className="flex items-center gap-3 border-line border-b px-4 py-3">
									<span className="flex size-10 items-center justify-center rounded-full bg-brand-500 font-bold text-[0.85rem] text-white">
										{initials}
									</span>
									<div>
										<strong className="block text-[0.9rem]">
											{user?.name}
										</strong>
										<p className="text-[0.78rem] text-ink-500">
											{location}
										</p>
									</div>
								</div>
								<button
									className="block w-full px-4 py-2.5 text-left text-[0.86rem] hover:bg-bg-050"
									onClick={() => {
										setOpen(false)
										onSettings?.()
									}}
									type="button"
								>
									Settings
								</button>
								<button
									className={cn(
										"block w-full px-4 py-2.5 text-left text-[0.86rem] text-danger hover:bg-bg-050",
									)}
									disabled={logout.isPending}
									onClick={() => {
										setOpen(false)
										logout.mutate(undefined, {
											onSuccess: () => {
												window.location.href = "/"
											},
										})
									}}
									type="button"
								>
									Log out
								</button>
							</div>
						) : null}
					</div>
				</div>
			</Container>
		</header>
	)
}
