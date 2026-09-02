import Link from "next/link"
import Container from "@/atoms/container"
import Eyebrow from "@/atoms/eyebrow"
import Reveal from "@/atoms/reveal"
import { INTERN_PREVIEWS } from "@/lib/data/home"
import { Button } from "@/ui/button"

const PATH = [
	{ label: "Finish a project", num: "01" },
	{ label: "Passport fills in", num: "02" },
	{ label: "Apply in one click", num: "03" },
]

export default function InternshipsPreview() {
	return (
		<section
			className="bg-[var(--bg-050)] py-[88px] max-[720px]:py-14"
			id="internships"
		>
			<Container className="grid grid-cols-[minmax(0,0.92fr)_minmax(280px,1.08fr)] items-center gap-x-16 gap-y-14 max-[980px]:grid-cols-1 max-[720px]:gap-7 max-[980px]:gap-8">
				<Reveal
					className="max-w-[460px] max-[980px]:max-w-none"
					duration={800}
					variant="fade-right"
				>
					<Eyebrow className="mb-4">Internships</Eyebrow>
					<h2 className="mb-3 text-[clamp(1.85rem,3.2vw,2.45rem)] leading-[1.12]">
						Qualify with skill, not contacts
					</h2>
					<p className="text-[1.02rem] text-ink-500 leading-[1.6]">
						Browse roles now. Start a certification, finish a
						project, then apply from your Learning Centre with a
						Career Passport.
					</p>
					<ol className="my-[22px] mb-7 flex flex-wrap gap-2">
						{PATH.map(step => (
							<li
								className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-2 pr-3.5 pl-2.5 font-semibold text-[0.82rem] text-ink-700"
								key={step.num}
							>
								<span className="font-extrabold font-heading text-[0.68rem] text-brand-ink tracking-[0.06em]">
									{step.num}
								</span>
								{step.label}
							</li>
						))}
					</ol>
					<div className="flex flex-wrap gap-3 max-[720px]:flex-col max-[720px]:items-stretch">
						<Button
							className="max-[720px]:min-h-[50px] max-[720px]:w-full"
							nativeButton={false}
							render={<Link href="/internships" />}
						>
							Browse internships
						</Button>
						<Button
							className="max-[720px]:min-h-[50px] max-[720px]:w-full"
							nativeButton={false}
							render={<Link href="/programs" />}
							variant="ghost"
						>
							Start a track
						</Button>
					</div>
				</Reveal>
				<Reveal
					className="overflow-hidden rounded-[20px] border border-line bg-white shadow-lu-sm"
					delay={120}
					duration={800}
					variant="fade-left"
				>
					<p className="px-[22px] pt-3.5 font-extrabold text-[0.72rem] text-ink-300 uppercase tracking-[0.08em]">
						Preview roles
					</p>
					{INTERN_PREVIEWS.map(role => (
						<Link
							className="grid grid-cols-[1fr_auto] items-center gap-4 border-line border-b px-[22px] py-[18px] transition-colors hover:bg-[var(--bg-050)] max-[720px]:px-[18px] max-[720px]:py-4"
							href={role.href}
							key={role.title}
						>
							<div>
								<span className="mb-1.5 inline-block font-extrabold text-[0.7rem] text-brand-ink uppercase tracking-[0.06em]">
									{role.category}
								</span>
								<h3 className="mb-1 text-[1.05rem] leading-[1.25]">
									{role.title}
								</h3>
								<p className="text-[0.82rem] text-ink-500">
									{role.location}
								</p>
							</div>
							<strong className="whitespace-nowrap font-extrabold font-heading text-[1.02rem] text-ink-900">
								₹{role.pay}
								<span className="font-sans font-semibold text-[0.72rem] text-ink-300">
									/mo
								</span>
							</strong>
						</Link>
					))}
					<Link
						className="flex items-center justify-between px-[22px] py-4 font-bold font-heading text-[0.88rem] text-brand-ink hover:text-ink-900 max-[720px]:px-[18px] max-[720px]:py-3.5"
						href="/internships"
					>
						See every role <span aria-hidden="true">→</span>
					</Link>
				</Reveal>
			</Container>
		</section>
	)
}
