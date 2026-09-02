"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "@/hooks/auth/useSession"
import EnrollButton from "@/molecules/enroll-button"
import { Button } from "@/ui/button"

function landingCopy({ kind, pathname, signedIn, slug }) {
	if (slug && kind === "bootcamp") {
		return {
			detail: "Enrol and watch in the Learning Centre",
			title: "Free recorded program",
		}
	}
	if (slug) {
		return {
			detail: "Then apply to internships from your dashboard",
			title: "Start this certification free",
		}
	}
	if (pathname.startsWith("/colleges")) {
		return {
			detail: "Bring the cohort, outcome and timeline",
			title: "Plan a campus partnership",
		}
	}
	if (pathname.startsWith("/resources/skill-assessments")) {
		return {
			detail: "Six questions, then one small project",
			title: "Find a starting direction",
		}
	}
	if (pathname.startsWith("/resources")) {
		return {
			detail: "Then enrol and build evidence",
			title: "Turn a guide into a project",
		}
	}
	if (pathname.startsWith("/blog")) {
		return {
			detail: "Then enrol and build evidence",
			title: "Turn a guide into a project",
		}
	}
	if (pathname === "/refer") {
		return {
			detail: "Pick a certification, then invite a classmate",
			title: "Share after you start",
		}
	}
	if (pathname === "/internships") {
		return {
			detail: "Then apply with a project from your dashboard",
			title: "Start the matching certification",
		}
	}
	if (pathname === "/jobs") {
		return {
			detail: "Finish a certification, then apply with a project",
			title: "Get job-ready first",
		}
	}
	if (signedIn) {
		return {
			detail: "Your certification is in the Learning Centre",
			title: "Keep going",
		}
	}
	return {
		detail: "Pick a certification, then apply with a project",
		title: "Start free this week",
	}
}

function convertCta({ pathname, signedIn }) {
	if (pathname.startsWith("/colleges")) {
		return {
			href: "/colleges/contact-partnerships",
			label: "Partner with us",
		}
	}
	if (pathname.startsWith("/resources/skill-assessments")) {
		return {
			href: "/resources/skill-assessments#assessment",
			label: "Start the check",
		}
	}
	if (pathname.startsWith("/resources/help-center")) {
		return {
			href: "/resources/help-center#answers",
			label: "Search answers",
		}
	}
	if (pathname.startsWith("/resources") || pathname.startsWith("/blog")) {
		return { href: "/programs", label: "Start a certification" }
	}
	if (pathname === "/refer") {
		return { href: "/programs", label: "Choose a certification" }
	}
	if (pathname === "/internships" || pathname === "/jobs") {
		return { href: "/programs", label: "Start a certification" }
	}
	if (signedIn) return { href: "/learn", label: "Continue learning" }
	return { href: "/programs", label: "Choose a certification" }
}

export default function ConvertBar() {
	const { data } = useSession()
	const pathname = usePathname()
	const signedIn = Boolean(data?.user)
	const landing = pathname.match(/^\/(program|bootcamp)\/([^/]+)/)
	const kind = landing?.[1] === "bootcamp" ? "bootcamp" : "program"
	const slug = landing?.[2]
	const copy = landingCopy({ kind, pathname, signedIn, slug })
	const cta = convertCta({ pathname, signedIn })

	return (
		<div className="fixed inset-x-0 bottom-0 z-[90] hidden in-data-[nav-open]:hidden items-center gap-3 border-line border-t bg-white/94 px-4 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-[0_-6px_24px_rgba(16,20,27,0.10)] backdrop-blur-md max-[720px]:flex">
			<div className="flex min-w-0 flex-1 flex-col">
				<strong className="font-heading text-[0.86rem] text-ink-900">
					{copy.title}
				</strong>
				<span
					className={
						slug || pathname === "/refer"
							? "truncate text-[0.76rem] text-ink-500"
							: "sr-only"
					}
				>
					{copy.detail}
				</span>
			</div>
			{slug ? (
				<EnrollButton
					className="min-h-[46px] shrink-0 px-[18px] py-0"
					kind={kind}
					slug={slug}
				>
					Enrol Free
				</EnrollButton>
			) : (
				<Button
					className="min-h-[46px] shrink-0 px-[18px] py-0"
					nativeButton={false}
					render={<Link href={cta.href} />}
				>
					{cta.label}
				</Button>
			)}
		</div>
	)
}
