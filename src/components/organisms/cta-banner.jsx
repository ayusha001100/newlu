import Link from "next/link"
import Container from "@/atoms/container"
import Reveal from "@/atoms/reveal"
import { Button } from "@/ui/button"

export default function CtaBanner({
	copy = "Free to join. About a minute to register. Internships wait in your dashboard once you have a project.",
	href = "/programs",
	label = "Choose a free certification",
	title = "Start a certification this week",
}) {
	return (
		<section className="bg-[var(--bg-000)] py-24 max-[720px]:py-14">
			<Container>
				<Reveal
					className="relative overflow-hidden rounded-[28px] bg-[var(--ink-900)] px-8 py-[72px] text-center text-[#fff] shadow-lu-lg [background-image:radial-gradient(620px_260px_at_50%_118%,rgba(var(--brand-rgb),0.3),transparent_70%),linear-gradient(160deg,#171C24_0%,var(--ink-900)_100%)]"
					duration={800}
					variant="blur-up"
				>
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[22px_22px] [mask-image:radial-gradient(60%_80%_at_50%_0%,#000,transparent)]"
					/>
					<h2 className="relative mb-3 text-[#fff] text-[clamp(1.7rem,3.1vw,2.4rem)] max-[720px]:text-[1.75rem]">
						{title}
					</h2>
					<p className="relative mb-[30px] text-[rgba(255,255,255,0.72)]">
						{copy}
					</p>
					<Button
						className="relative max-[720px]:min-h-[50px] max-[720px]:w-full"
						nativeButton={false}
						render={<Link href={href} />}
					>
						{label}
					</Button>
				</Reveal>
			</Container>
		</section>
	)
}
