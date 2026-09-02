import Link from "next/link"
import Container from "@/atoms/container"
import Highlight from "@/atoms/highlight"

export default function MarketHero({
	breadcrumb,
	cardKicker,
	cardTitle,
	eyebrow,
	headline,
	highlight,
	lead,
	points,
	pointsLabel,
	steps,
}) {
	return (
		<section className="relative overflow-hidden border-[var(--line)] border-b bg-[var(--bg-000)] pt-[140px] pb-[72px] [background-image:radial-gradient(720px_380px_at_88%_20%,rgba(var(--brand-rgb),0.22),transparent_72%),radial-gradient(520px_300px_at_12%_100%,rgba(var(--brand-rgb),0.1),transparent_74%)] max-[720px]:pt-[106px] max-[980px]:pt-[118px] max-[720px]:pb-11 max-[980px]:pb-14">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(16,20,27,0.065)_1px,transparent_1px)] bg-size-[28px_28px] [mask-image:linear-gradient(90deg,#000,transparent_72%)]"
			/>
			<Container className="relative grid grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] items-center gap-[72px] max-[980px]:grid-cols-1 max-[980px]:gap-10">
				<div>
					<nav
						aria-label="Breadcrumb"
						className="mb-6 flex items-center gap-2.5 font-semibold text-[0.82rem] text-[var(--ink-500)]"
					>
						<Link className="hover:text-[var(--ink-900)]" href="/">
							Home
						</Link>
						<span
							aria-hidden="true"
							className="text-[var(--ink-300)]"
						>
							/
						</span>
						<span>{breadcrumb}</span>
					</nav>
					<span className="mb-[18px] inline-flex items-center gap-2.5 font-extrabold font-heading text-[0.76rem] text-[var(--brand-ink)] uppercase tracking-[0.11em] before:h-0.5 before:w-[26px] before:rounded before:bg-[var(--brand-500)] before:content-['']">
						{eyebrow}
					</span>
					<h1 className="mb-[22px] max-w-[760px] text-[clamp(2.65rem,4.4vw,4.35rem)] text-[var(--ink-900)] leading-[1.03] max-[720px]:text-[2.35rem] max-[980px]:text-[clamp(2.4rem,5.5vw,3.5rem)]">
						{headline}{" "}
						<Highlight className="whitespace-normal">
							{highlight}
						</Highlight>
					</h1>
					<p className="max-w-[650px] text-[1.03rem] text-[var(--ink-500)] leading-[1.75] max-[720px]:text-[0.94rem] max-[720px]:leading-[1.65]">
						{lead}
					</p>
					<ul
						aria-label={pointsLabel}
						className="mt-[30px] flex flex-wrap gap-x-[18px] gap-y-2.5 max-[720px]:mt-6 max-[720px]:grid"
					>
						{points.map(point => (
							<li
								className="inline-flex items-center gap-2 font-bold text-[0.84rem] text-[var(--ink-700)] before:grid before:size-5 before:place-items-center before:rounded-full before:bg-[rgba(var(--success-rgb),0.12)] before:font-extrabold before:text-[0.68rem] before:text-[var(--success)] before:content-['✓']"
								key={point}
							>
								{point}
							</li>
						))}
					</ul>
				</div>

				<aside className="rounded-[24px] border border-white/10 bg-[var(--ink-900)] p-[30px] text-[#fff] shadow-lu-lg [background-image:radial-gradient(320px_200px_at_100%_0%,rgba(var(--brand-rgb),0.23),transparent_70%)] max-[980px]:max-w-[600px] max-[720px]:p-[22px]">
					<span className="mb-2 block font-extrabold text-[0.73rem] text-[var(--brand-400)] uppercase tracking-[0.1em]">
						{cardKicker}
					</span>
					<strong className="block font-heading text-[#fff] text-[1.3rem]">
						{cardTitle}
					</strong>
					<ol className="mt-6 grid gap-[15px]">
						{steps.map(step => (
							<li
								className="grid grid-cols-[34px_minmax(0,1fr)] items-center gap-3 border-white/10 border-t pt-[15px]"
								key={step.n}
							>
								<b className="grid size-8 place-items-center rounded-[10px] bg-[rgba(var(--brand-rgb),0.16)] font-heading text-[0.7rem] text-[var(--brand-400)]">
									{step.n}
								</b>
								<span className="text-[0.84rem] text-[rgba(255,255,255,0.72)] leading-[1.45]">
									{step.text}
								</span>
							</li>
						))}
					</ol>
				</aside>
			</Container>
		</section>
	)
}
