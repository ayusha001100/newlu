"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import Container from "@/atoms/container"
import {
	CATALOG_AREAS,
	CATALOG_FORMATS,
	filterCatalogue,
} from "@/lib/data/catalog"
import { cn } from "@/lib/utils"
import CatalogCard from "@/molecules/catalog-card"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"

function CatalogCardSkeleton() {
	return (
		<div className="relative flex h-[285px] flex-col overflow-hidden rounded-xl border border-line bg-white/70 p-[24px_22px_22px] shadow-lu-sm">
			<div
				aria-hidden="true"
				className="absolute inset-0 -translate-x-full animate-[shimmer-sweep_1.5s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)]"
			/>
			<div className="mb-[18px] flex items-center justify-between">
				<div className="size-[46px] rounded-[13px] bg-slate-200/80" />
				<div className="h-3.5 w-16 rounded-full bg-slate-200/70" />
			</div>
			<div className="mb-2.5 h-5 w-3/4 rounded-md bg-slate-200/80" />
			<div className="mb-2 h-3.5 w-full rounded bg-slate-100" />
			<div className="mb-4 h-3.5 w-4/5 rounded bg-slate-100" />
			<div className="flex gap-2">
				<div className="h-6 w-16 rounded-full bg-slate-200/70" />
				<div className="h-6 w-20 rounded-full bg-slate-200/70" />
			</div>
			<div className="mt-auto flex gap-2 pt-[18px]">
				<div className="h-[42px] flex-1 rounded-[12px] bg-slate-200/80" />
				<div className="h-[42px] flex-1 rounded-[12px] bg-brand-200/70" />
			</div>
		</div>
	)
}

export default function ProgramsCatalogue() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [isFiltering, setIsFiltering] = useState(false)

	const format = searchParams.get("format") || ""
	const area = searchParams.get("area") || ""
	const query = searchParams.get("q") || ""

	const setFilters = useCallback(
		next => {
			setIsFiltering(true)
			const params = new URLSearchParams()
			const formatValue = next.format ?? format
			const areaValue = next.area ?? area
			const queryValue = next.query ?? query
			if (queryValue) params.set("q", queryValue)
			if (formatValue) params.set("format", formatValue)
			if (areaValue) params.set("area", areaValue)
			const qs = params.toString()
			router.replace(qs ? `${pathname}?${qs}` : pathname, {
				scroll: false,
			})
			setTimeout(() => {
				setIsFiltering(false)
			}, 240)
		},
		[area, format, pathname, query, router],
	)

	const rows = useMemo(
		() => filterCatalogue({ area, format, query }),
		[area, format, query],
	)

	const clear = () => setFilters({ area: "", format: "", query: "" })

	return (
		<section
			className="bg-[var(--bg-050)] py-14 pb-[88px] max-[720px]:py-9 max-[720px]:pb-14"
			id="catalogue"
		>
			<Container>
				<div
					aria-label="Program format"
					className="mb-[22px] inline-flex gap-1 rounded-[14px] border border-[var(--line)] bg-[var(--bg-000)] p-1 shadow-lu-sm max-[720px]:grid max-[720px]:w-full max-[720px]:grid-cols-1"
					role="tablist"
				>
					{CATALOG_FORMATS.map(item => {
						const active = format === item.id
						return (
							<button
								aria-selected={active}
								className={cn(
									"relative min-w-[140px] rounded-[10px] px-[18px] py-2.5 text-center font-bold font-heading text-[0.88rem] outline-none transition-all duration-200 max-[720px]:min-h-[46px] max-[720px]:min-w-0",
									active
										? "bg-[var(--ink-900)] text-[#fff] shadow-sm"
										: "text-[var(--ink-500)] hover:bg-white/60 hover:text-[var(--ink-900)]",
								)}
								key={item.label}
								onClick={() => setFilters({ format: item.id })}
								role="tab"
								type="button"
							>
								{item.label}
							</button>
						)
					})}
				</div>

				<div className="relative mb-6 flex items-center">
					<svg
						aria-hidden="true"
						className="pointer-events-none absolute left-[18px] size-5 text-[var(--ink-500)]"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeWidth="1.8"
						viewBox="0 0 24 24"
					>
						<circle cx="11" cy="11" r="7" />
						<path d="m20 20-4-4" />
					</svg>
					<label className="sr-only" htmlFor="program-search">
						Search programs
					</label>
					<Input
						className="h-14 min-h-14 rounded-[14px] border-[var(--line-strong)] bg-[var(--bg-000)] pr-[18px] pl-[50px] text-[var(--ink-900)] shadow-lu-sm placeholder:text-[var(--ink-300)]"
						id="program-search"
						onChange={event =>
							setFilters({ query: event.target.value })
						}
						placeholder="Search AI, SQL, Figma, marketing…"
						type="search"
						value={query}
					/>
				</div>

				<nav
					aria-label="Skill area"
					className="mb-7 flex flex-wrap gap-2"
				>
					{["All", ...CATALOG_AREAS].map(name => {
						const value = name === "All" ? "" : name
						const active = area === value
						return (
							<button
								className={cn(
									"rounded-full border px-3.5 py-2 font-semibold text-[0.82rem] transition-all duration-200",
									active
										? "border-[var(--ink-900)] bg-[var(--ink-900)] text-[#fff]"
										: "border-[var(--line)] bg-[#fff] text-[var(--ink-700)] hover:border-[var(--line-strong)] hover:text-[var(--ink-900)]",
								)}
								key={name}
								onClick={() => setFilters({ area: value })}
								type="button"
							>
								{name}
							</button>
						)
					})}
				</nav>

				<div className="mb-5 flex items-center justify-between">
					<div>
						<span className="font-bold text-[0.75rem] text-[var(--ink-500)] uppercase tracking-[0.07em]">
							Catalogue
						</span>
						<h2 className="mt-1 text-[1.35rem] text-[var(--ink-900)]">
							{rows.length} program{rows.length === 1 ? "" : "s"}
						</h2>
					</div>
					{isFiltering && (
						<span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-brand-600">
							<span className="size-1.5 animate-ping rounded-full bg-brand-500" />
							Updating...
						</span>
					)}
				</div>

				{isFiltering ? (
					<div className="grid grid-cols-3 gap-[18px] max-[720px]:grid-cols-1 max-[980px]:grid-cols-2">
						{[1, 2, 3, 4, 5, 6].map(n => (
							<CatalogCardSkeleton key={`skeleton-${n}`} />
						))}
					</div>
				) : rows.length ? (
					<div className="grid grid-cols-3 gap-[18px] max-[720px]:grid-cols-1 max-[980px]:grid-cols-2">
						{rows.map((item, index) => (
							<div
								className="animate-[hero-rise_0.4s_both_cubic-bezier(0.16,1,0.3,1)]"
								key={item.slug}
								style={{
									animationDelay: `${Math.min(index * 40, 300)}ms`,
								}}
							>
								<CatalogCard item={item} />
							</div>
						))}
					</div>
				) : (
					<div className="rounded-[18px] border border-[var(--line-strong)] border-dashed bg-[var(--bg-000)] px-6 py-16 text-center">
						<span
							aria-hidden="true"
							className="block text-[2.4rem] text-[var(--brand-500)]"
						>
							⌕
						</span>
						<h3 className="mt-2 mb-1.5 text-[1.15rem] text-[var(--ink-900)]">
							No programs match those filters
						</h3>
						<p className="mb-[18px] text-[0.84rem] text-[var(--ink-500)]">
							Try a broader skill area, or clear the search.
						</p>
						<Button onClick={clear} type="button" variant="outline">
							Clear filters
						</Button>
					</div>
				)}
			</Container>
		</section>
	)
}
