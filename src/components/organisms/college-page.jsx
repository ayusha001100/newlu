import Image from "next/image"
import Link from "next/link"
import Container from "@/atoms/container"
import Highlight from "@/atoms/highlight"
import { COLLEGE_CONTACT_URL } from "@/lib/data/colleges"
import { cn } from "@/lib/utils"
import FaqList from "@/molecules/faq-list"
import { Button } from "@/ui/button"

function CollegeMark({ children, className }) {
	return (
		<span
			className={cn(
				"mb-[18px] inline-flex items-center gap-2.5 font-extrabold font-heading text-[0.75rem] text-[var(--brand-ink)] uppercase tracking-[0.1em] before:h-0.5 before:w-[26px] before:bg-[var(--brand-500)] before:content-['']",
				className,
			)}
		>
			{children}
		</span>
	)
}

function ActionButton({ action }) {
	const className = "max-[720px]:w-full"
	const render = action.external ? (
		<a href={action.href} rel="noopener noreferrer" target="_blank">
			<span className="sr-only">{action.label}</span>
		</a>
	) : (
		<Link href={action.href} />
	)

	return (
		<Button
			className={className}
			nativeButton={false}
			render={render}
			size="lg"
			variant={action.variant}
		>
			{action.label}
		</Button>
	)
}

function Breadcrumbs({ crumbs }) {
	return (
		<nav
			aria-label="Breadcrumb"
			className="mb-6 flex flex-wrap items-center gap-2 font-semibold text-[0.76rem] text-[var(--ink-500)]"
		>
			{crumbs.map(crumb => (
				<span className="contents" key={crumb.label}>
					{crumb.href ? (
						<>
							<Link
								className="hover:text-[var(--brand-ink)]"
								href={crumb.href}
							>
								{crumb.label}
							</Link>
							<span
								aria-hidden="true"
								className="text-[var(--ink-300)]"
							>
								/
							</span>
						</>
					) : (
						<span>{crumb.label}</span>
					)}
				</span>
			))}
		</nav>
	)
}

function SectionHead({ centered, copy, eyebrow, title }) {
	return (
		<div
			className={cn(
				"mb-[38px] max-w-[740px]",
				centered && "mx-auto text-center",
			)}
		>
			<CollegeMark>{eyebrow}</CollegeMark>
			<h2 className="mb-[13px] text-[clamp(2rem,3.6vw,3rem)]">{title}</h2>
			{copy ? (
				<p className="text-[0.95rem] text-[var(--ink-500)] leading-[1.7]">
					{copy}
				</p>
			) : null}
		</div>
	)
}

function CapabilityCard({ card }) {
	return (
		<article className="group flex min-h-[285px] flex-col rounded-[18px] border border-[var(--line)] bg-[var(--bg-000)] p-[26px] shadow-lu-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-[var(--brand-200)] hover:shadow-lu-md max-[720px]:min-h-0">
			<span className="mb-6 grid size-[46px] place-items-center rounded-[13px] border border-[var(--brand-200)] bg-[var(--brand-050)] font-extrabold font-heading text-[0.72rem] text-[var(--brand-ink)]">
				{card.code}
			</span>
			<h3 className="mb-2.5 text-[1.18rem]">{card.title}</h3>
			<p className="text-[0.82rem] text-[var(--ink-500)] leading-[1.65]">
				{card.copy}
			</p>
			{card.href ? (
				<Link
					className="mt-auto inline-flex items-center gap-[7px] pt-6 font-extrabold text-[0.78rem] text-[var(--ink-900)]"
					href={card.href}
				>
					{card.link}{" "}
					<span className="text-[var(--brand-500)] transition-transform group-hover:translate-x-1">
						→
					</span>
				</Link>
			) : null}
		</article>
	)
}

function FeatureCard({ card }) {
	return (
		<article className="flex min-h-[240px] flex-col rounded-[18px] border border-[var(--line)] bg-[var(--bg-000)] p-[26px] shadow-lu-sm max-[720px]:min-h-0">
			<span className="mb-[18px] grid size-[46px] place-items-center rounded-[13px] border border-[var(--brand-200)] bg-[var(--brand-050)] font-extrabold font-heading text-[0.72rem] text-[var(--brand-ink)]">
				{card.code}
			</span>
			<h3 className="mb-2.5 text-[1.18rem]">{card.title}</h3>
			<p className="text-[0.82rem] text-[var(--ink-500)] leading-[1.65]">
				{card.copy}
			</p>
		</article>
	)
}

function ProgramCard({ item }) {
	return (
		<article className="flex items-start gap-[18px] rounded-2xl border border-[var(--line)] bg-[var(--bg-000)] p-[22px]">
			<b className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--ink-900)] font-heading text-[0.68rem] text-[var(--brand-400)]">
				{item.code}
			</b>
			<div>
				<h3 className="mb-1 text-[0.96rem]">{item.title}</h3>
				<p className="text-[0.77rem] text-[var(--ink-500)] leading-[1.55]">
					{item.copy}
				</p>
			</div>
		</article>
	)
}

function CheckList({ items }) {
	return (
		<div className="grid gap-[13px]">
			{items.map(item => (
				<article
					className="relative rounded-[14px] border border-[var(--line)] bg-[var(--bg-000)] py-[19px] pr-5 pl-[52px]"
					key={item.title}
				>
					<span
						aria-hidden="true"
						className="absolute top-[19px] left-5 grid size-[22px] place-items-center rounded-full bg-[var(--brand-050)] font-extrabold text-[0.72rem] text-[var(--brand-ink)]"
					>
						✓
					</span>
					<strong className="mb-1 block font-heading text-[0.9rem]">
						{item.title}
					</strong>
					<p className="text-[0.78rem] text-[var(--ink-500)] leading-[1.55]">
						{item.copy}
					</p>
				</article>
			))}
		</div>
	)
}

function Process({ items }) {
	return (
		<div className="grid grid-cols-4 max-[720px]:grid-cols-1 max-[980px]:grid-cols-2 max-[720px]:gap-4 max-[980px]:gap-y-[18px]">
			{items.map((item, index) => (
				<article
					className="relative border-[var(--line-strong)] border-t px-[26px] py-[30px]"
					key={item.title}
				>
					<span className="mb-6 block font-extrabold font-heading text-[0.78rem] text-[var(--brand-ink)]">
						0{index + 1}
					</span>
					<span
						aria-hidden="true"
						className="absolute top-[-5px] left-[26px] size-[9px] rounded-full border-2 border-[var(--bg-000)] bg-[var(--brand-500)] shadow-[0_0_0_1px_var(--brand-500)] [[data-college-muted]_&]:border-[var(--bg-050)]"
					/>
					<h3 className="mb-2 text-[1rem]">{item.title}</h3>
					<p className="text-[0.78rem] text-[var(--ink-500)] leading-[1.6]">
						{item.copy}
					</p>
				</article>
			))}
		</div>
	)
}

function CollegeHero({ hero }) {
	return (
		<section className="relative overflow-hidden border-[var(--line)] border-b bg-[var(--bg-050)] pt-[142px] pb-[82px] [background-image:radial-gradient(780px_440px_at_82%_28%,rgba(var(--brand-rgb),0.2),transparent_70%)] max-[720px]:pt-[108px] max-[720px]:pb-[52px]">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,20,27,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(16,20,27,0.035)_1px,transparent_1px)] bg-size-[42px_42px]"
			/>
			<Container className="relative grid grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)] items-center gap-16 max-[980px]:grid-cols-1 max-[980px]:gap-[42px]">
				<div>
					<Breadcrumbs crumbs={hero.crumbs} />
					<CollegeMark>{hero.eyebrow}</CollegeMark>
					<h1 className="mb-[21px] max-w-[760px] text-[clamp(2.7rem,5vw,4.75rem)] leading-[1.03] max-[720px]:text-[2.55rem]">
						{hero.headline}{" "}
						<Highlight className="whitespace-normal">
							{hero.highlight}
						</Highlight>
					</h1>
					<p className="max-w-[690px] text-[1.05rem] text-[var(--ink-500)] leading-[1.72] max-[720px]:text-[0.95rem]">
						{hero.lead}
					</p>
					<div className="mt-[30px] flex flex-wrap gap-[11px] max-[720px]:flex-col max-[720px]:items-stretch">
						{hero.actions.map(action => (
							<ActionButton action={action} key={action.label} />
						))}
					</div>
					{hero.note ? (
						<p className="mt-[15px] text-[0.72rem] text-[var(--ink-300)]">
							{hero.note}
						</p>
					) : null}
				</div>
				<div className="grid gap-[18px]">
					<figure className="m-0 aspect-4/3 overflow-hidden rounded-[22px] bg-[var(--bg-100)] shadow-lu-md max-[980px]:aspect-16/10 max-[980px]:max-w-[680px]">
						<Image
							alt={hero.alt}
							className="size-full object-cover"
							height={900}
							priority={hero.priority}
							src={hero.image}
							width={1200}
						/>
					</figure>
					<aside
						aria-label={hero.panel.label}
						className="rounded-[24px] border border-[var(--line)] bg-white/88 p-7 shadow-lu-lg backdrop-blur-[12px] max-[980px]:max-w-[680px] max-[720px]:p-5"
					>
						<div className="mb-6 flex items-center justify-between gap-3">
							<strong className="font-heading text-[0.88rem]">
								{hero.panel.title}
							</strong>
							<span className="rounded-full bg-[var(--brand-050)] px-[9px] py-1.5 font-extrabold text-[0.66rem] text-[var(--brand-ink)]">
								{hero.panel.badge}
							</span>
						</div>
						<div className="grid gap-[11px]">
							{hero.panel.steps.map(step => (
								<div
									className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-[13px] rounded-[13px] border border-[var(--line)] bg-[var(--bg-000)] p-[13px]"
									key={step.n}
								>
									<b className="grid size-[38px] place-items-center rounded-[11px] bg-[var(--ink-900)] font-heading text-[0.72rem] text-[var(--brand-400)]">
										{step.n}
									</b>
									<div>
										<strong className="mb-0.5 block font-heading text-[0.82rem]">
											{step.title}
										</strong>
										<p className="text-[0.71rem] text-[var(--ink-500)] leading-[1.45]">
											{step.text}
										</p>
									</div>
								</div>
							))}
						</div>
					</aside>
				</div>
			</Container>
		</section>
	)
}

function CollegeProof({ proof }) {
	return (
		<section
			aria-label={proof.label}
			className="border-[var(--line)] border-b bg-[var(--bg-000)]"
		>
			<Container className="grid grid-cols-[180px_repeat(4,minmax(0,1fr))] items-center max-[720px]:grid-cols-1 max-[980px]:grid-cols-2">
				<strong className="flex min-h-[88px] items-center pr-[22px] font-heading text-[0.74rem] text-[var(--ink-500)] leading-[1.45] max-[980px]:col-span-2 max-[980px]:min-h-[62px] max-[980px]:border-r-0">
					{proof.title}
				</strong>
				{proof.items.map(item => (
					<span
						className="flex min-h-[88px] items-center gap-[9px] border-[var(--line)] border-r px-[22px] font-bold text-[0.77rem] text-[var(--ink-700)] before:font-extrabold before:text-[var(--success)] before:content-['✓'] last:border-r-0 max-[720px]:min-h-16 max-[980px]:min-h-16 max-[720px]:border-t max-[980px]:border-t max-[720px]:border-r-0"
						key={item}
					>
						{item}
					</span>
				))}
			</Container>
		</section>
	)
}

function CollegeCta({ cta }) {
	const render = cta.external ? (
		<a href={cta.href} rel="noopener noreferrer" target="_blank">
			<span className="sr-only">{cta.label}</span>
		</a>
	) : (
		<Link href={cta.href} />
	)

	return (
		<section className="bg-[var(--ink-900)] py-[76px] [background-image:radial-gradient(520px_260px_at_80%_30%,rgba(var(--brand-rgb),0.2),transparent_70%)]">
			<Container className="flex items-center justify-between gap-[42px] max-[720px]:flex-col max-[720px]:items-stretch">
				<div>
					<span className="font-extrabold text-[0.72rem] text-[var(--brand-400)] uppercase tracking-[0.09em]">
						{cta.kicker}
					</span>
					<h2 className="mt-2 max-w-[720px] text-[#fff] text-[clamp(1.8rem,3.2vw,2.8rem)]">
						{cta.title}
					</h2>
					{cta.lead ? (
						<p className="mt-2.5 max-w-[650px] text-[0.85rem] text-[rgba(255,255,255,0.62)] leading-[1.6]">
							{cta.lead}
						</p>
					) : null}
				</div>
				<Button
					className="max-[720px]:w-full"
					nativeButton={false}
					render={render}
					size="lg"
					variant="light"
				>
					{cta.label}
				</Button>
			</Container>
		</section>
	)
}

function ContactBlock({ section }) {
	return (
		<div className="grid grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] gap-7 max-[720px]:grid-cols-1">
			<article className="rounded-[20px] border border-[var(--line)] bg-[var(--bg-000)] p-[30px] shadow-lu-sm max-[720px]:p-[22px]">
				<h2 className="mb-3 text-[1.5rem]">
					Partnership brief checklist
				</h2>
				<p className="text-[0.86rem] text-[var(--ink-500)] leading-[1.65]">
					Copy these points into your notes before opening the contact
					portal.
				</p>
				<ol className="mt-[22px] grid gap-[11px]">
					{section.brief.map((item, index) => (
						<li
							className="relative rounded-[11px] bg-[var(--bg-050)] py-3.5 pr-[15px] pl-[45px] text-[0.78rem] text-[var(--ink-700)] leading-[1.5]"
							key={item}
						>
							<span className="absolute top-[13px] left-3.5 grid size-[22px] place-items-center rounded-[7px] bg-[var(--ink-900)] font-extrabold text-[0.66rem] text-[var(--brand-400)]">
								{index + 1}
							</span>
							{item}
						</li>
					))}
				</ol>
				<Button
					className="mt-6 max-[720px]:w-full"
					nativeButton={false}
					render={
						<a
							href={COLLEGE_CONTACT_URL}
							rel="noopener noreferrer"
							target="_blank"
						>
							<span className="sr-only">
								Open Official Contact Portal
							</span>
						</a>
					}
					size="lg"
				>
					Open Official Contact Portal
				</Button>
			</article>
			<aside className="rounded-[20px] border border-[var(--line)] bg-[var(--bg-000)] p-[30px] shadow-lu-sm max-[720px]:p-[22px]">
				<h3 className="mb-3 text-[1.15rem]">
					Which option should I choose?
				</h3>
				<p className="text-[0.86rem] text-[var(--ink-500)] leading-[1.65]">
					On the official LetsUpgrade contact page, choose the option
					for <strong>business-related queries</strong> and include
					“College partnership” at the beginning of your message.
				</p>
				<div className="mt-[22px]">
					<CheckList items={section.routes} />
				</div>
			</aside>
		</div>
	)
}

function cardGridClass(cols) {
	return cols === 2
		? "grid grid-cols-2 gap-[18px] max-[720px]:grid-cols-1"
		: "grid grid-cols-3 gap-[18px] max-[720px]:grid-cols-1 max-[980px]:grid-cols-2"
}

function CapabilitiesSection({ section }) {
	const cards = (
		<div className={cardGridClass(section.cols)}>
			{section.cards.map(card => (
				<CapabilityCard card={card} key={card.title} />
			))}
		</div>
	)
	if (section.split) {
		return (
			<div className="grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-start gap-[72px] max-[980px]:grid-cols-1 max-[980px]:gap-[38px]">
				<div>
					<SectionHead
						copy={section.copy}
						eyebrow={section.eyebrow}
						title={section.title}
					/>
				</div>
				{cards}
			</div>
		)
	}
	return (
		<>
			<SectionHead
				centered={section.centered}
				copy={section.copy}
				eyebrow={section.eyebrow}
				title={section.title}
			/>
			{cards}
		</>
	)
}

function FeaturesSection({ section }) {
	return (
		<>
			<SectionHead
				copy={section.copy}
				eyebrow={section.eyebrow}
				title={section.title}
			/>
			<div className={cardGridClass(section.cols)}>
				{section.cards.map(card => (
					<FeatureCard card={card} key={card.title} />
				))}
			</div>
		</>
	)
}

function ProgramsSection({ section }) {
	return (
		<>
			<SectionHead
				copy={section.copy}
				eyebrow={section.eyebrow}
				title={section.title}
			/>
			<div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
				{section.programs.map(item => (
					<ProgramCard item={item} key={item.title} />
				))}
			</div>
		</>
	)
}

function SplitSection({ section }) {
	return (
		<div className="grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-start gap-[72px] max-[980px]:grid-cols-1 max-[980px]:gap-[38px]">
			<div>
				<SectionHead
					copy={section.copy}
					eyebrow={section.eyebrow}
					title={section.title}
				/>
				{section.image ? (
					<figure className="mt-7 mb-0 aspect-5/4 overflow-hidden rounded-[22px] bg-[var(--bg-100)] shadow-lu-md">
						<Image
							alt={section.imageAlt}
							className="size-full object-cover"
							height={960}
							src={section.image}
							width={1200}
						/>
					</figure>
				) : null}
				{section.cta ? (
					<Button
						className="mt-[25px]"
						nativeButton={false}
						render={<Link href={section.cta.href} />}
						variant="outline"
					>
						{section.cta.label}
					</Button>
				) : null}
			</div>
			{section.type === "split-programs" ? (
				<div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
					{section.programs.map(item => (
						<ProgramCard item={item} key={item.title} />
					))}
				</div>
			) : (
				<CheckList items={section.items} />
			)}
		</div>
	)
}

function ProcessSection({ section }) {
	return (
		<>
			<SectionHead
				centered={section.centered}
				copy={section.copy}
				eyebrow={section.eyebrow}
				title={section.title}
			/>
			<Process items={section.items} />
		</>
	)
}

function FaqSection({ section }) {
	return (
		<>
			<SectionHead
				centered={section.centered}
				eyebrow={section.eyebrow}
				title={section.title}
			/>
			<FaqList className="mx-auto max-w-[840px]" items={section.faqs} />
		</>
	)
}

function ContactSection({ section }) {
	return (
		<>
			<SectionHead
				copy={section.copy}
				eyebrow={section.eyebrow}
				title={section.title}
			/>
			<ContactBlock section={section} />
		</>
	)
}

const SECTION_BODY = {
	capabilities: CapabilitiesSection,
	contact: ContactSection,
	faq: FaqSection,
	features: FeaturesSection,
	process: ProcessSection,
	programs: ProgramsSection,
	"split-list": SplitSection,
	"split-programs": SplitSection,
}

function CollegeSection({ section }) {
	const muted = Boolean(section.alt)
	const Body = SECTION_BODY[section.type]
	return (
		<section
			className={cn(
				"py-[88px] max-[720px]:py-[62px]",
				muted && "border-[var(--line)] border-y bg-[var(--bg-050)]",
			)}
			data-college-muted={muted ? "" : undefined}
			id={section.id}
		>
			<Container>{Body ? <Body section={section} /> : null}</Container>
		</section>
	)
}

export default function CollegePage({ page }) {
	return (
		<div className="bg-[var(--bg-000)]">
			<CollegeHero hero={page.hero} />
			<CollegeProof proof={page.proof} />
			{page.sections.map(section => (
				<CollegeSection
					key={section.id || section.title}
					section={section}
				/>
			))}
			<CollegeCta cta={page.cta} />
		</div>
	)
}
