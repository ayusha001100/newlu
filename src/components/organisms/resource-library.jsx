"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { filterResourceItems } from "@/lib/data/resources"
import { cn } from "@/lib/utils"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/ui/accordion"
import { Input } from "@/ui/input"

function ResourceMark({ children }) {
	return (
		<span className="mb-[17px] inline-flex items-center gap-2.5 font-extrabold font-heading text-[0.75rem] text-[var(--brand-ink)] uppercase tracking-[0.1em] before:h-0.5 before:w-[26px] before:bg-[var(--brand-500)] before:content-['']">
			{children}
		</span>
	)
}

function SearchField({ label, onChange, placeholder, value }) {
	return (
		<div className="relative flex w-[min(100%,390px)] items-center max-[720px]:w-full">
			<svg
				aria-hidden="true"
				className="pointer-events-none absolute left-[15px] size-[18px] text-[var(--ink-500)]"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				viewBox="0 0 24 24"
			>
				<circle cx="11" cy="11" r="7" />
				<path d="m20 20-4-4" />
			</svg>
			<label className="sr-only" htmlFor="resource-search">
				{label}
			</label>
			<Input
				className="h-12 min-h-12 rounded-xl border-[var(--line-strong)] bg-[var(--bg-000)] pr-3.5 pl-11 text-[0.84rem] text-[var(--ink-900)] shadow-lu-sm"
				id="resource-search"
				onChange={event => onChange(event.target.value)}
				placeholder={placeholder}
				type="search"
				value={value}
			/>
		</div>
	)
}

function FilterRow({ active, filters, label, onChange }) {
	return (
		<nav aria-label={label} className="mb-[25px] flex flex-wrap gap-2">
			{filters.map(item => {
				const selected = active === item.id
				return (
					<button
						aria-pressed={selected}
						className={cn(
							"min-h-10 rounded-full border px-3.5 py-2 font-bold text-[0.76rem]",
							selected
								? "border-[var(--ink-900)] bg-[var(--ink-900)] text-[#fff]"
								: "border-[var(--line)] bg-[var(--bg-000)] text-[var(--ink-500)] hover:border-[var(--ink-900)] hover:bg-[var(--ink-900)] hover:text-[#fff]",
						)}
						key={item.id}
						onClick={() => onChange(item.id)}
						type="button"
					>
						{item.label}
					</button>
				)
			})}
		</nav>
	)
}

function LibraryHead({ copy, eyebrow, search, title }) {
	return (
		<div className="mb-8 flex items-end justify-between gap-7 max-[720px]:flex-col max-[720px]:items-stretch">
			<div className="max-w-[720px]">
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
			{search}
		</div>
	)
}

export function ResourceGuideLibrary({ section }) {
	const [query, setQuery] = useState("")
	const [filter, setFilter] = useState("all")
	const rows = useMemo(
		() => filterResourceItems(section.items, { filter, query }),
		[filter, query, section.items],
	)

	return (
		<div>
			<LibraryHead
				copy={section.copy}
				eyebrow={section.eyebrow}
				search={
					<SearchField
						label={section.searchLabel}
						onChange={setQuery}
						placeholder={section.searchPlaceholder}
						value={query}
					/>
				}
				title={section.title}
			/>
			<FilterRow
				active={filter}
				filters={section.filters}
				label="Filter career guides"
				onChange={setFilter}
			/>
			<div className="grid grid-cols-3 gap-[18px] max-[720px]:grid-cols-1 max-[940px]:grid-cols-2">
				{rows.map(card => (
					<article
						className="group flex min-h-[290px] flex-col rounded-[18px] border border-[var(--line)] bg-[var(--bg-000)] p-[25px] shadow-lu-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-[var(--brand-200)] hover:shadow-lu-md max-[720px]:min-h-0"
						key={card.title}
					>
						<span className="mb-5 inline-flex self-start rounded-full border border-[var(--brand-200)] bg-[var(--brand-050)] px-2.5 py-1.5 font-extrabold text-[0.65rem] text-[var(--brand-ink)] uppercase tracking-[0.05em]">
							{card.tag}
						</span>
						<h3 className="mb-2.5 text-[1.18rem]">{card.title}</h3>
						<p className="text-[0.81rem] text-[var(--ink-500)] leading-[1.65]">
							{card.copy}
						</p>
						{card.meta ? (
							<div className="mt-[17px] flex flex-wrap gap-x-4 gap-y-2 font-bold text-[0.69rem] text-[var(--ink-300)]">
								{card.meta.map(meta => (
									<span key={meta}>{meta}</span>
								))}
							</div>
						) : null}
						<Link
							className="mt-auto inline-flex items-center gap-[7px] pt-[22px] font-extrabold text-[0.78rem] text-[var(--ink-900)]"
							href={card.href}
						>
							{card.link}{" "}
							<span className="text-[var(--brand-500)] transition-transform group-hover:translate-x-1">
								→
							</span>
						</Link>
					</article>
				))}
				{rows.length ? null : (
					<div className="col-span-full rounded-2xl border border-[var(--line-strong)] border-dashed bg-[var(--bg-000)] px-6 py-12 text-center">
						<h3 className="text-[1.1rem]">{section.emptyTitle}</h3>
						<p className="mt-1 text-[0.82rem] text-[var(--ink-500)]">
							{section.emptyCopy}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

function LinkedAnswer({ item }) {
	if (!item.links?.length) return <p>{item.answer}</p>

	const nodes = []
	let rest = item.answer
	item.links.forEach(link => {
		const index = rest.indexOf(link.label)
		if (index === -1) return
		nodes.push(rest.slice(0, index))
		const className =
			"font-bold text-[var(--brand-ink)] underline-offset-2 hover:underline"
		nodes.push(
			link.external ? (
				<a
					className={className}
					href={link.href}
					key={link.href}
					rel="noopener noreferrer"
					target="_blank"
				>
					{link.label}
				</a>
			) : (
				<Link className={className} href={link.href} key={link.href}>
					{link.label}
				</Link>
			),
		)
		rest = rest.slice(index + link.label.length)
	})
	nodes.push(rest)
	return <p>{nodes}</p>
}

export function ResourceHelpLibrary({ section }) {
	const [query, setQuery] = useState("")
	const [filter, setFilter] = useState("all")
	const rows = useMemo(
		() => filterResourceItems(section.items, { filter, query }),
		[filter, query, section.items],
	)

	return (
		<div>
			<LibraryHead
				copy={section.copy}
				eyebrow={section.eyebrow}
				search={
					<SearchField
						label={section.searchLabel}
						onChange={setQuery}
						placeholder={section.searchPlaceholder}
						value={query}
					/>
				}
				title={section.title}
			/>
			<div className="mb-[42px] grid grid-cols-3 gap-4 max-[720px]:grid-cols-1 max-[940px]:grid-cols-2">
				{section.categories.map(item => (
					<article
						className="rounded-[15px] border border-[var(--line)] bg-[var(--bg-000)] p-[22px]"
						key={item.title}
					>
						<b className="mb-4 grid size-10 place-items-center rounded-[11px] bg-[var(--brand-050)] font-heading text-[0.68rem] text-[var(--brand-ink)]">
							{item.code}
						</b>
						<h3 className="mb-1 text-[0.96rem]">{item.title}</h3>
						<p className="text-[0.74rem] text-[var(--ink-500)] leading-[1.5]">
							{item.copy}
						</p>
					</article>
				))}
			</div>
			<FilterRow
				active={filter}
				filters={section.filters}
				label="Filter help answers"
				onChange={setFilter}
			/>
			{rows.length ? (
				<Accordion className="mx-auto max-w-[900px] gap-[11px]">
					{rows.map(item => (
						<AccordionItem
							className="rounded-[13px] border border-[var(--line)] not-last:border-b bg-[var(--bg-000)]"
							key={item.question}
							value={item.question}
						>
							<AccordionTrigger className="px-5 py-[18px] font-bold font-heading text-[0.9rem] text-[var(--ink-900)] hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
								{item.question}
							</AccordionTrigger>
							<AccordionContent className="px-5 pb-[18px] text-[0.81rem] text-[var(--ink-500)] leading-[1.65]">
								<LinkedAnswer item={item} />
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			) : (
				<div className="rounded-[14px] border border-[var(--line-strong)] border-dashed px-5 py-9 text-center">
					<h3>{section.emptyTitle}</h3>
					<p className="mt-1 text-[0.82rem] text-[var(--ink-500)]">
						{section.emptyCopy}
					</p>
				</div>
			)}
		</div>
	)
}
