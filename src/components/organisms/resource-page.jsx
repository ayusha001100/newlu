import Image from "next/image"
import Link from "next/link"
import Container from "@/atoms/container"
import Highlight from "@/atoms/highlight"
import { cn } from "@/lib/utils"
import {
	ResourceGuideLibrary,
	ResourceHelpLibrary,
} from "@/organisms/resource-library"
import SkillAssessment from "@/organisms/skill-assessment"
import { Button } from "@/ui/button"

function ResourceMark({ children, className }) {
	return (
		<span
			className={cn(
				"mb-[17px] inline-flex items-center gap-2.5 font-extrabold font-heading text-[0.75rem] text-[var(--brand-ink)] uppercase tracking-[0.1em] before:h-0.5 before:w-[26px] before:bg-[var(--brand-500)] before:content-['']",
				className,
			)}
		>
			{children}
		</span>
	)
}

function ActionButton({ action }) {
	const render = action.external ? (
		<a href={action.href} rel="noopener noreferrer" target="_blank">
			<span className="sr-only">{action.label}</span>
		</a>
	) : (
		<Link href={action.href} />
	)

	return (
		<Button
			className="max-[720px]:w-full"
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
			className="mb-[23px] flex flex-wrap items-center gap-2 font-semibold text-[0.76rem] text-[var(--ink-500)]"
		>
			{crumbs.map((crumb, index) => (
				<span className="contents" key={crumb.label}>
					{crumb.href ? (
						<Link
							className="hover:text-[var(--brand-ink)]"
							href={crumb.href}
						>
							{crumb.label}
						</Link>
					) : (
						<span>{crumb.label}</span>
					)}
					{index < crumbs.length - 1 ? (
						<span
							aria-hidden="true"
							className="text-[var(--ink-300)]"
						>
							/
						</span>
					) : null}
				</span>
			))}
		</nav>
	)
}

function SectionHead({ action, centered, copy, eyebrow, title }) {
	return (
		<div
			className={cn(
				"mb-8 flex items-end justify-between gap-7 max-[720px]:flex-col max-[720px]:items-stretch",
				centered && "mx-auto block max-w-[730px] text-center",
			)}
		>
			<div className={centered ? undefined : "max-w-[720px]"}>
				<ResourceMark>{eyebrow}</ResourceMark>
				<h2 className="mb-[11px] text-[clamp(1.9rem,3.5vw,2.9rem)]">
					{title}
				</h2>
				{copy ? (
					<p className="text-[0.91rem] text-[var(--ink-500)] leading-[1.65]">
						{copy}
					</p>
				) : null}
			</div>
			{action && !centered ? (
				<Button
					className="max-[720px]:w-full"
					nativeButton={false}
					render={<Link href={action.href} />}
					variant="outline"
				>
					{action.label}
				</Button>
			) : null}
		</div>
	)
}

function ResourceHero({ hero }) {
	return (
		<section className="relative overflow-hidden border-[var(--line)] border-b bg-[var(--bg-000)] pt-[136px] pb-[72px] [background-image:radial-gradient(720px_390px_at_82%_20%,rgba(var(--brand-rgb),0.2),transparent_72%)] max-[720px]:pt-[108px] max-[720px]:pb-[52px]">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(16,20,27,0.06)_1px,transparent_1px)] bg-size-[28px_28px] [mask-image:linear-gradient(90deg,#000,transparent_82%)]"
			/>
			<Container className="relative grid grid-cols-[minmax(0,1.1fr)_minmax(320px,0.68fr)] items-center gap-[60px] max-[940px]:grid-cols-1 max-[940px]:gap-[38px]">
				<div>
					<Breadcrumbs crumbs={hero.crumbs} />
					<ResourceMark>{hero.eyebrow}</ResourceMark>
					<h1 className="mb-5 max-w-[780px] text-[clamp(2.7rem,5vw,4.6rem)] leading-[1.03] max-[720px]:text-[2.5rem]">
						{hero.headline}{" "}
						<Highlight className="whitespace-normal">
							{hero.highlight}
						</Highlight>
					</h1>
					<p className="max-w-[700px] text-[1.03rem] text-[var(--ink-500)] leading-[1.72] max-[720px]:text-[0.94rem]">
						{hero.lead}
					</p>
					<div className="mt-7 flex flex-wrap gap-[11px] max-[720px]:flex-col max-[720px]:items-stretch">
						{hero.actions.map(action => (
							<ActionButton action={action} key={action.label} />
						))}
					</div>
				</div>
				<div className="grid gap-[18px]">
					<figure className="m-0 aspect-4/3 overflow-hidden rounded-[22px] bg-[var(--bg-100)] shadow-lu-md max-[940px]:aspect-16/10 max-[940px]:max-w-[680px]">
						<Image
							alt={hero.alt}
							className="size-full object-cover"
							height={900}
							priority
							src={hero.image}
							width={1200}
						/>
					</figure>
					<aside className="rounded-[22px] border border-[var(--line)] bg-[var(--ink-900)] p-[27px] text-[#fff] shadow-lu-lg max-[940px]:max-w-[680px]">
						<span className="font-extrabold text-[0.68rem] text-[var(--brand-400)] uppercase tracking-[0.08em]">
							{hero.card.kicker}
						</span>
						<h2 className="my-3 text-[#fff] text-[1.45rem]">
							{hero.card.title}
						</h2>
						<p className="text-[0.79rem] text-[rgba(255,255,255,0.62)] leading-[1.6]">
							{hero.card.copy}
						</p>
						<ul className="mt-[22px] grid gap-[9px]">
							{hero.card.items.map(item => (
								<li
									className="relative rounded-[10px] border border-white/11 bg-white/5 py-[11px] pr-3 pl-[35px] text-[0.74rem] text-[rgba(255,255,255,0.82)] before:absolute before:left-[13px] before:font-extrabold before:text-[var(--brand-400)] before:content-['✓']"
									key={item}
								>
									{item}
								</li>
							))}
						</ul>
					</aside>
				</div>
			</Container>
		</section>
	)
}

function ResourceCta({ cta }) {
	if (!cta) return null
	const render = cta.external ? (
		<a href={cta.href} rel="noopener noreferrer" target="_blank">
			<span className="sr-only">{cta.label}</span>
		</a>
	) : (
		<Link href={cta.href} />
	)

	return (
		<section className="bg-[var(--ink-900)] py-[70px] [background-image:radial-gradient(520px_260px_at_80%_30%,rgba(var(--brand-rgb),0.2),transparent_70%)]">
			<Container className="flex items-center justify-between gap-[38px] max-[720px]:flex-col max-[720px]:items-stretch">
				<div>
					<span className="font-extrabold text-[0.7rem] text-[var(--brand-400)] uppercase tracking-[0.08em]">
						{cta.kicker}
					</span>
					<h2 className="mt-2 max-w-[720px] text-[#fff] text-[clamp(1.75rem,3vw,2.6rem)]">
						{cta.title}
					</h2>
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

function StepList({ steps }) {
	return (
		<div className="grid gap-3">
			{steps.map((step, index) => (
				<article
					className="relative rounded-[14px] border border-[var(--line)] bg-[var(--bg-000)] py-[19px] pr-5 pl-[62px]"
					key={step.title}
				>
					<span className="absolute top-[18px] left-[18px] font-extrabold font-heading text-[0.72rem] text-[var(--brand-ink)]">
						0{index + 1}
					</span>
					<h3 className="mb-1 text-[0.9rem]">{step.title}</h3>
					<p className="text-[0.77rem] text-[var(--ink-500)] leading-[1.55]">
						{step.copy}
					</p>
				</article>
			))}
		</div>
	)
}

function SplitSection({ section }) {
	const action = section.action
	const render = action?.external ? (
		<a href={action.href} rel="noopener noreferrer" target="_blank">
			<span className="sr-only">{action.label}</span>
		</a>
	) : action ? (
		<Link href={action.href} />
	) : null

	return (
		<div className="grid grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] items-start gap-16 max-[940px]:grid-cols-1 max-[940px]:gap-9">
			<div>
				<ResourceMark>{section.eyebrow}</ResourceMark>
				<h2 className="mb-[15px] text-[clamp(1.9rem,3.4vw,2.8rem)]">
					{section.title}
				</h2>
				<p className="text-[0.91rem] text-[var(--ink-500)] leading-[1.7]">
					{section.copy}
				</p>
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
				{action ? (
					<Button
						className="mt-[22px]"
						nativeButton={false}
						render={render}
					>
						{action.label}
					</Button>
				) : null}
			</div>
			<StepList steps={section.steps} />
		</div>
	)
}

function CardsSection({ section }) {
	return (
		<>
			<SectionHead
				centered={section.centered}
				copy={section.copy}
				eyebrow={section.eyebrow}
				title={section.title}
			/>
			<div className="grid grid-cols-3 gap-[18px] max-[720px]:grid-cols-1 max-[940px]:grid-cols-2">
				{section.cards.map(card => (
					<article
						className="group flex min-h-[290px] flex-col rounded-[18px] border border-[var(--line)] bg-[var(--bg-000)] p-[25px] shadow-lu-sm max-[720px]:min-h-0"
						key={card.title}
					>
						<span className="mb-5 inline-flex self-start rounded-full border border-[var(--brand-200)] bg-[var(--brand-050)] px-2.5 py-1.5 font-extrabold text-[0.65rem] text-[var(--brand-ink)] uppercase tracking-[0.05em]">
							{card.tag}
						</span>
						<h3 className="mb-2.5 text-[1.18rem]">{card.title}</h3>
						<p className="text-[0.81rem] text-[var(--ink-500)] leading-[1.65]">
							{card.copy}
						</p>
						{card.href ? (
							<Link
								className="mt-auto inline-flex items-center gap-[7px] pt-[22px] font-extrabold text-[0.78rem] text-[var(--ink-900)]"
								href={card.href}
							>
								{card.link}{" "}
								<span className="text-[var(--brand-500)] transition-transform group-hover:translate-x-1">
									→
								</span>
							</Link>
						) : null}
					</article>
				))}
			</div>
		</>
	)
}

function EventsSection({ section }) {
	return (
		<>
			<SectionHead
				action={section.action}
				copy={section.copy}
				eyebrow={section.eyebrow}
				title={section.title}
			/>
			<div className="grid gap-3.5">
				{section.events.map(event => (
					<article
						className="grid grid-cols-[120px_minmax(0,1fr)_auto] items-center gap-6 rounded-2xl border border-[var(--line)] bg-[var(--bg-000)] p-[23px] max-[720px]:grid-cols-1"
						key={event.title}
					>
						<div className="grid min-h-[82px] place-items-center whitespace-pre-line rounded-[13px] bg-[var(--ink-900)] text-center font-extrabold font-heading text-[0.75rem] text-[var(--brand-400)] max-[720px]:min-h-[62px]">
							{event.type}
						</div>
						<div>
							<span className="font-extrabold text-[0.65rem] text-[var(--brand-ink)] uppercase tracking-[0.06em]">
								{event.tag}
							</span>
							<h3 className="my-1.5 text-[1.1rem]">
								{event.title}
							</h3>
							<p className="text-[0.78rem] text-[var(--ink-500)] leading-[1.55]">
								{event.copy}
							</p>
						</div>
						<Button
							className="max-[720px]:w-full"
							nativeButton={false}
							render={<Link href={event.href} />}
							variant="outline"
						>
							{event.link}
						</Button>
					</article>
				))}
			</div>
		</>
	)
}

function ChannelsSection({ section }) {
	return (
		<>
			<SectionHead
				centered={section.centered}
				copy={section.copy}
				eyebrow={section.eyebrow}
				title={section.title}
			/>
			<div className="grid grid-cols-3 gap-[18px] max-[720px]:grid-cols-1 max-[940px]:grid-cols-2">
				{section.channels.map(channel => {
					const render = channel.external ? (
						<a
							href={channel.href}
							rel="noopener noreferrer"
							target="_blank"
						>
							<span className="sr-only">{channel.link}</span>
						</a>
					) : (
						<Link href={channel.href} />
					)
					return (
						<article
							className="rounded-[18px] border border-[var(--line)] bg-[var(--bg-000)] p-[27px]"
							key={channel.title}
						>
							<b className="mb-[22px] grid size-12 place-items-center rounded-[14px] bg-[var(--ink-900)] font-heading text-[0.7rem] text-[var(--brand-400)]">
								{channel.code}
							</b>
							<h3 className="mb-2">{channel.title}</h3>
							<p className="text-[0.8rem] text-[var(--ink-500)] leading-[1.6]">
								{channel.copy}
							</p>
							<Button
								className="mt-[22px]"
								nativeButton={false}
								render={render}
								variant={
									channel.primary ? "default" : "outline"
								}
							>
								{channel.link}
							</Button>
						</article>
					)
				})}
			</div>
		</>
	)
}

const SECTION_BODY = {
	assessment: ({ section }) => (
		<>
			<SectionHead
				centered
				copy={section.copy}
				eyebrow={section.eyebrow}
				title={section.title}
			/>
			<SkillAssessment />
		</>
	),
	cards: CardsSection,
	channels: ChannelsSection,
	events: EventsSection,
	help: ResourceHelpLibrary,
	library: ResourceGuideLibrary,
	split: SplitSection,
}

function ResourceSection({ section }) {
	const Body = SECTION_BODY[section.type]
	return (
		<section
			className={cn(
				"py-[82px] max-[720px]:py-[60px]",
				section.white &&
					"border-[var(--line)] border-y bg-[var(--bg-000)]",
			)}
			id={section.id}
		>
			<Container>{Body ? <Body section={section} /> : null}</Container>
		</section>
	)
}

export default function ResourcePage({ page }) {
	return (
		<div className="bg-[var(--bg-050)]">
			<ResourceHero hero={page.hero} />
			{page.sections.map(section => (
				<ResourceSection
					key={section.id || section.title}
					section={section}
				/>
			))}
			<ResourceCta cta={page.cta} />
		</div>
	)
}
