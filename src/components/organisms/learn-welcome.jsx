"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import Container from "@/atoms/container"
import { useLogout } from "@/hooks/auth/useLogout"
import { useSession } from "@/hooks/auth/useSession"
import { BOOTCAMPS } from "@/lib/data/bootcamps"
import { PROGRAMS } from "@/lib/data/programs"
import { Button } from "@/ui/button"

const courseOf = slug => PROGRAMS[slug] || BOOTCAMPS[slug] || null

export default function LearnWelcome() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const { data, isLoading } = useSession()
	const logout = useLogout()
	const user = data?.user

	useEffect(() => {
		if (!(isLoading || user)) router.replace("/auth")
	}, [isLoading, router, user])

	if (isLoading || !user) {
		return (
			<div className="flex flex-1 items-center justify-center py-24 text-ink-500">
				Opening your Learning Centre…
			</div>
		)
	}

	const first = user.name.split(" ")[0]
	const course = searchParams.get("course")
	const courseTitle = courseOf(course)?.title

	return (
		<section className="flex-1 bg-canvas-muted pt-[148px] pb-[100px] max-[720px]:pt-[112px] max-[720px]:pb-[68px]">
			<Container>
				<p className="mb-2 font-bold font-heading text-[0.78rem] text-brand-ink uppercase tracking-[0.14em]">
					Learning Centre
				</p>
				<h1 className="mb-3 font-heading text-[2rem] text-ink-900">
					Welcome back, {first}
				</h1>
				<p className="mb-8 max-w-xl text-[1.02rem] text-ink-500">
					{courseTitle
						? `${courseTitle} is on your dashboard. The full module player is the next build slice.`
						: "Your certifications live here. The full module player is the next build slice — enrolments and session are already wired."}
				</p>

				<div className="mb-8 grid gap-3">
					{(user.enrolled || []).map(slug => {
						const program = courseOf(slug)
						if (!program) return null
						const href =
							program.kind === "self-paced"
								? `/bootcamp/${slug}`
								: `/program/${slug}`
						return (
							<Link
								className="rounded-2xl border border-line bg-white px-5 py-4 text-ink-900 shadow-lu-sm hover:border-ink-900"
								href={href}
								key={slug}
							>
								<strong className="block font-heading">
									{program.title}
								</strong>
								<span className="text-[0.88rem] text-ink-500">
									{program.kind === "self-paced"
										? "Recorded bootcamp"
										: "Live certification"}
								</span>
							</Link>
						)
					})}
				</div>

				<div className="flex flex-wrap gap-3">
					<Button
						nativeButton={false}
						render={<Link href="/programs" />}
					>
						Browse programs
					</Button>
					<Button
						onClick={() =>
							logout.mutate(undefined, {
								onSuccess: () => router.push("/"),
							})
						}
						type="button"
						variant="outline"
					>
						Log out
					</Button>
				</div>
			</Container>
		</section>
	)
}
