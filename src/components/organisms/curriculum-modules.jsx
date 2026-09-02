"use client"

import LandingSection from "@/atoms/landing-section"
import { topicCount } from "@/lib/data/catalog"
import { cn } from "@/lib/utils"
import SectionHead from "@/molecules/section-head"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/ui/accordion"

function ModuleNote({ label, text }) {
	if (!text) return null

	return (
		<div className="rounded-[12px] border border-[var(--track-200)] bg-[var(--track-050)] px-[18px] py-4">
			<span className="mb-1.5 inline-block font-extrabold text-[0.68rem] text-[var(--track-ink)] uppercase tracking-[0.1em]">
				{label}
			</span>
			<p className="text-[0.9rem] text-ink-700 leading-[1.5]">{text}</p>
		</div>
	)
}

function ModuleBody({ module, variant }) {
	const isProgram = variant === "program"

	return (
		<AccordionContent className="border-line border-t px-[22px] pt-[18px] pb-[22px] max-[720px]:px-4">
			<p className="mb-[22px] max-w-[78ch] text-ink-500">
				{module.detail}
			</p>
			{module.sections?.length ? (
				<div
					className={cn(
						"mb-[22px] grid gap-[18px] max-[720px]:grid-cols-1",
						isProgram ? "grid-cols-2 gap-x-7" : "grid-cols-1",
					)}
				>
					{module.sections.map(section => (
						<div
							className="rounded-[12px] border border-line bg-[var(--bg-050)] px-5 py-[18px] max-[720px]:px-[15px] max-[720px]:py-3.5"
							key={section.name}
						>
							<h4 className="mb-2.5 font-extrabold text-[0.86rem] tracking-[-0.01em]">
								{section.name}
							</h4>
							<ul className="flex flex-col gap-1.5">
								{section.points.map(point => (
									<li
										className="relative pl-4 text-[0.88rem] text-ink-700 leading-[1.45] before:absolute before:top-2 before:left-0 before:size-[5px] before:rotate-45 before:rounded-[2px] before:bg-[var(--track-500)] before:content-['']"
										key={point}
									>
										{point}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			) : null}
			{isProgram && (module.outcome || module.activity) ? (
				<div className="mb-5 grid grid-cols-2 gap-3.5 max-[720px]:grid-cols-1">
					<ModuleNote label="Outcome" text={module.outcome} />
					<ModuleNote label="Hands-on" text={module.activity} />
				</div>
			) : null}
			{isProgram && module.skills?.length ? (
				<div>
					<h4 className="mb-2.5 text-[0.76rem] text-ink-300 uppercase tracking-[0.08em]">
						Skills you gain
					</h4>
					<div className="flex flex-wrap gap-2">
						{module.skills.map(skill => (
							<span
								className="rounded-full border border-line bg-[var(--bg-050)] px-3 py-2 font-bold text-[0.8rem]"
								key={skill}
							>
								{skill}
							</span>
						))}
					</div>
				</div>
			) : null}
		</AccordionContent>
	)
}

function CurriculumModule({ module, variant }) {
	const weekLabel =
		variant === "bootcamp" && module.duration
			? `${module.week} · ${module.duration}`
			: module.week

	return (
		<AccordionItem
			className="overflow-hidden rounded-xl border border-line not-last:border-b bg-[#fff] transition-[border-color,box-shadow] duration-200 data-open:border-[var(--track-200)] data-open:shadow-lu-sm"
			value={module.title}
		>
			<AccordionTrigger className="items-center gap-4 px-[22px] py-5 hover:no-underline focus-visible:border-transparent focus-visible:ring-0 **:data-[slot=accordion-trigger-icon]:hidden max-[720px]:px-4">
				<div className="min-w-0 text-left">
					<span className="mb-1 block font-bold text-[0.72rem] text-ink-300 uppercase tracking-[0.08em] group-aria-expanded/accordion-trigger:text-[var(--track-ink)]">
						{weekLabel}
					</span>
					<h3 className="text-[1.05rem]">{module.title}</h3>
				</div>
				<div className="flex shrink-0 items-center gap-3.5">
					{variant === "program" ? (
						<span className="whitespace-nowrap rounded-[7px] border border-line bg-[var(--bg-050)] px-2.5 py-1 font-bold text-[0.74rem] text-ink-500">
							{topicCount(module)} topics
						</span>
					) : null}
					<span className="grid size-8 place-items-center rounded-[10px] bg-[var(--bg-100)] font-bold text-[1.05rem] text-ink-700 transition-[background-color,color] group-aria-expanded/accordion-trigger:bg-brand-500 group-aria-expanded/accordion-trigger:text-on-brand">
						<span className="group-aria-expanded/accordion-trigger:hidden">
							+
						</span>
						<span className="hidden group-aria-expanded/accordion-trigger:inline">
							−
						</span>
					</span>
				</div>
			</AccordionTrigger>
			<ModuleBody module={module} variant={variant} />
		</AccordionItem>
	)
}

export default function CurriculumModules({
	copy,
	modules,
	title,
	variant = "program",
}) {
	const first = modules[0]?.title

	return (
		<LandingSection id="curriculum">
			<SectionHead eyebrow="Curriculum" title={title}>
				{copy}
			</SectionHead>
			<Accordion className="gap-3" defaultValue={first ? [first] : []}>
				{modules.map(module => (
					<CurriculumModule
						key={`${module.week}-${module.title}`}
						module={module}
						variant={variant}
					/>
				))}
			</Accordion>
		</LandingSection>
	)
}
