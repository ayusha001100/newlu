import Link from "next/link"
import Container from "@/atoms/container"
import { cn } from "@/lib/utils"
import EnrollButton from "@/molecules/enroll-button"
import { Button } from "@/ui/button"

export default function CatalogHero({
	backHref,
	backLabel,
	badge,
	chips,
	headline,
	journey,
	kicker,
	kind = "program",
	lead,
	note,
	panelItems,
	promise,
	slug,
}) {
	return (
		<section className="relative overflow-hidden border-[var(--line)] border-b bg-[#fff] pt-[132px] pb-[76px] [background-image:radial-gradient(560px_320px_at_88%_8%,rgba(var(--brand-rgb),0.26),transparent_65%),radial-gradient(640px_380px_at_6%_0%,rgba(var(--track-rgb),0.22),transparent_62%),linear-gradient(180deg,var(--track-050)_0%,#ffffff_72%)] max-[720px]:pt-[108px] max-[720px]:pb-12">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(16,20,27,0.06)_1px,transparent_1px)] bg-size-[26px_26px] [mask-image:linear-gradient(180deg,#000,transparent_70%)]"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-0 z-1 h-1 bg-[linear-gradient(90deg,var(--track-500),var(--brand-500))]"
			/>
			<Container className="relative z-1 grid grid-cols-[1.35fr_0.9fr] items-start gap-12 max-[980px]:grid-cols-1">
				<div>
					<Link
						className="mb-[22px] inline-block font-semibold text-[0.88rem] text-ink-500 hover:text-ink-900"
						href={backHref}
					>
						{backLabel}
					</Link>
					{kicker ? (
						<p className="mb-3 font-extrabold text-[0.78rem] text-brand-ink uppercase tracking-[0.08em]">
							{kicker}
						</p>
					) : null}
					<h1 className="mb-3.5 max-w-[16ch] text-balance text-[clamp(2rem,3.7vw,3.05rem)] leading-[1.06] max-[980px]:max-w-none">
						{headline}
					</h1>
					<p className="mb-3 max-w-[30ch] font-bold font-heading text-[clamp(1.02rem,1.5vw,1.22rem)] text-ink-800 leading-[1.35] max-[980px]:max-w-none">
						{promise}
					</p>
					<p className="mb-6 max-w-[560px] text-[1rem] text-ink-500">
						{lead}
					</p>
					<div className="mb-7 flex flex-wrap gap-2">
						{chips.map((chip, index) => (
							<span
								className={cn(
									"rounded-[10px] border px-3.5 py-2 font-bold text-[0.8rem]",
									index < 2
										? "border-[var(--track-200)] bg-[var(--track-100)] text-[var(--track-ink)]"
										: "border-line bg-[#fff] text-ink-700",
								)}
								key={chip}
							>
								{chip}
							</span>
						))}
					</div>
					<div className="mb-[22px] flex flex-wrap gap-3 max-[720px]:[&_a]:min-h-12 max-[720px]:[&_a]:w-full max-[720px]:[&_button]:min-h-12 max-[720px]:[&_button]:w-full">
						<EnrollButton kind={kind} slug={slug}>
							Enrol Free
						</EnrollButton>
						<Button
							nativeButton={false}
							render={<Link href="#curriculum" />}
							variant="outline"
						>
							View Curriculum
						</Button>
					</div>
					<p className="font-bold text-[0.86rem] text-ink-700 tracking-[0.02em]">
						{journey}
					</p>
				</div>
				<aside className="sticky top-24 overflow-hidden rounded-[24px] border border-[var(--track-200)] bg-[#fff] p-7 shadow-[0_16px_40px_rgba(var(--track-rgb),0.1),0_4px_12px_rgba(16,20,27,0.06),0_16px_40px_rgba(16,20,27,0.08)] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[linear-gradient(90deg,var(--track-500),var(--brand-500))] before:content-[''] max-[980px]:static">
					<div className="relative">
						<span className="mb-4 inline-block rounded-[8px] bg-[linear-gradient(180deg,var(--brand-400),var(--brand-500))] px-[13px] py-1.5 font-extrabold text-[0.72rem] text-on-brand uppercase tracking-[0.07em]">
							{badge}
						</span>
						<h2 className="mb-4 text-[1.25rem]">
							What you walk away with
						</h2>
						<ul className="mb-[22px] flex flex-col gap-3">
							{panelItems.map(item => (
								<li
									className="relative pl-[22px] text-[0.94rem] text-ink-700 before:absolute before:top-0 before:left-0 before:font-extrabold before:text-[0.82rem] before:text-[var(--track-600)] before:content-['✓']"
									key={item}
								>
									{item}
								</li>
							))}
						</ul>
						<EnrollButton
							className="w-full"
							kind={kind}
							slug={slug}
						>
							Start Learning Free
						</EnrollButton>
						<p className="mt-3 text-center text-[0.78rem] text-ink-300">
							{note}
						</p>
					</div>
				</aside>
			</Container>
		</section>
	)
}
