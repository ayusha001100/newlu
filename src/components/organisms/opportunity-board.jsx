"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import Container from "@/atoms/container"
import { useSession } from "@/hooks/auth/useSession"
import {
	filterOpportunities,
	MARKETPLACE,
	opportunitiesOf,
	opportunityQuery,
	uniqueValues,
} from "@/lib/data/marketplace"
import { cn } from "@/lib/utils"
import OpportunityCard from "@/molecules/opportunity-card"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/ui/sheet"
import { toast } from "@/ui/toast"

const APPLIED_KEY = "lu_marketplace_applications"
const SAVED_KEY = "lu_saved_opportunities"

const parseStore = (key, fallback) => {
	try {
		const value = JSON.parse(localStorage.getItem(key) || "")
		return value && typeof value === "object" ? value : fallback
	} catch {
		return fallback
	}
}

const selectClass =
	"h-11 w-full appearance-none rounded-[10px] border border-[var(--line-strong)] bg-[var(--bg-000)] px-3 pr-9 font-sans text-[0.82rem] text-[var(--ink-700)] outline-none focus:border-[var(--brand-500)] focus:shadow-[0_0_0_3px_rgba(var(--brand-rgb),0.1)]"

function FilterSelect({ allLabel, id, label, onChange, options, value }) {
	return (
		<label className="grid gap-1.5" htmlFor={id}>
			<span className="font-bold text-[0.74rem] text-[var(--ink-700)]">
				{label}
			</span>
			<div className="relative">
				<select
					className={selectClass}
					id={id}
					onChange={event => onChange(event.target.value)}
					value={value}
				>
					<option value="">{allLabel}</option>
					{options.map(option => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		</label>
	)
}

function useOpportunityMemory(storageKey) {
	const [appliedIds, setAppliedIds] = useState([])
	const [savedIds, setSavedIds] = useState([])

	useEffect(() => {
		const applications = parseStore(APPLIED_KEY, {})
		const saved = parseStore(SAVED_KEY, {})
		setAppliedIds((applications[storageKey] || []).map(item => item.id))
		setSavedIds(saved[storageKey] || [])
	}, [storageKey])

	const persistApplied = ids => {
		const all = parseStore(APPLIED_KEY, {})
		all[storageKey] = ids.map(id => ({
			appliedAt: Date.now(),
			id,
			stage: "Applied",
		}))
		localStorage.setItem(APPLIED_KEY, JSON.stringify(all))
		setAppliedIds(ids)
	}

	const persistSaved = ids => {
		const all = parseStore(SAVED_KEY, {})
		all[storageKey] = ids
		localStorage.setItem(SAVED_KEY, JSON.stringify(all))
		setSavedIds(ids)
	}

	const toggleSaved = id => {
		const next = savedIds.includes(id)
			? savedIds.filter(item => item !== id)
			: [...savedIds, id]
		persistSaved(next)
		toast.add({
			title: next.includes(id)
				? "Saved for later."
				: "Removed from saved opportunities.",
			type: "success",
		})
	}

	return { appliedIds, persistApplied, savedIds, toggleSaved }
}

function OpportunityDrawer({
	appliedIds,
	copy,
	onApply,
	onSave,
	onClose,
	savedIds,
	selected,
	user,
}) {
	return (
		<Sheet
			onOpenChange={open => !open && onClose()}
			open={Boolean(selected)}
		>
			<SheetContent
				className="w-full gap-0 overflow-y-auto bg-[var(--bg-000)] p-0 sm:max-w-[600px]"
				overlayClassName="bg-[rgba(16,20,27,0.58)] backdrop-blur-[4px]"
				side="right"
			>
				{selected ? (
					<div className="px-[42px] pt-4 pb-11 max-[720px]:px-6">
						<SheetTitle className="sr-only">
							{selected.title}
						</SheetTitle>
						<SheetDescription className="sr-only">
							{selected.summary}
						</SheetDescription>
						<div className="border-[var(--line)] border-b pb-6">
							<span className="font-extrabold text-[0.7rem] text-[var(--brand-ink)] uppercase tracking-[0.07em]">
								{selected.category} · {selected.industry}
							</span>
							<h2 className="my-1.5 text-[1.8rem] text-[var(--ink-900)]">
								{selected.title}
							</h2>
							<p className="text-[0.78rem] text-[var(--ink-500)]">
								{selected.employer}
							</p>
						</div>
						<div className="my-6 grid grid-cols-2 gap-3">
							{[
								[
									"Location",
									`${selected.location} · ${selected.mode}`,
								],
								["Compensation", selected.compensation],
								[copy.durationLabel, selected.duration],
								["Experience", selected.experience],
							].map(([label, value]) => (
								<span
									className="grid gap-1 rounded-[10px] bg-[var(--bg-050)] p-[13px] text-[0.78rem] text-[var(--ink-500)]"
									key={label}
								>
									<strong className="font-bold text-[0.7rem] text-[var(--ink-900)] uppercase">
										{label}
									</strong>
									{value}
								</span>
							))}
						</div>
						<section className="mt-6">
							<h3 className="mb-2.5 text-[1rem]">
								About the role
							</h3>
							<p className="text-[0.86rem] text-[var(--ink-700)] leading-[1.65]">
								{selected.summary}
							</p>
						</section>
						<section className="mt-6">
							<h3 className="mb-2.5 text-[1rem]">
								What you will do
							</h3>
							<ul className="list-disc space-y-1 pl-5 text-[0.86rem] text-[var(--ink-700)] leading-[1.65]">
								{selected.responsibilities.map(point => (
									<li key={point}>{point}</li>
								))}
							</ul>
						</section>
						<section className="mt-6">
							<h3 className="mb-2.5 text-[1rem]">
								What you should bring
							</h3>
							<ul className="list-disc space-y-1 pl-5 text-[0.86rem] text-[var(--ink-700)] leading-[1.65]">
								{selected.requirements.map(point => (
									<li key={point}>{point}</li>
								))}
							</ul>
						</section>
						<section className="mt-6">
							<h3 className="mb-2.5 text-[1rem]">Skills used</h3>
							<div className="flex flex-wrap gap-1.5">
								{selected.skills.map(skill => (
									<span
										className="rounded-lg border border-[var(--line)] px-2.5 py-1 font-bold text-[0.7rem] text-[var(--ink-700)]"
										key={skill}
									>
										{skill}
									</span>
								))}
							</div>
						</section>
						<aside className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--bg-050)] p-4">
							<strong className="block text-[0.82rem] text-[var(--ink-900)]">
								Preview listing
							</strong>
							<p className="mt-1 text-[0.78rem] text-[var(--ink-500)] leading-[1.5]">
								This demonstrates the application experience.
								Employer identity and live availability require
								a connected, verified hiring feed.
							</p>
						</aside>
						<div className="mt-6 flex flex-wrap gap-2">
							<Button
								onClick={() => onSave(selected.id)}
								type="button"
								variant="ghost"
							>
								{savedIds.includes(selected.id)
									? "Saved"
									: "Save for later"}
							</Button>
							<Button
								disabled={appliedIds.includes(selected.id)}
								onClick={() => onApply(selected)}
								type="button"
							>
								{appliedIds.includes(selected.id)
									? "Application submitted"
									: user
										? "Apply with my profile"
										: "Sign in to apply"}
							</Button>
						</div>
					</div>
				) : null}
			</SheetContent>
		</Sheet>
	)
}

export default function OpportunityBoard({ type }) {
	const copy = MARKETPLACE[type]
	const records = useMemo(() => opportunitiesOf(type), [type])
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const session = useSession()
	const user = session.data?.user
	const storageKey = user?.mobile || "guest"
	const { appliedIds, persistApplied, savedIds, toggleSaved } =
		useOpportunityMemory(storageKey)

	const [filtersOpen, setFiltersOpen] = useState(false)
	const [selectedId, setSelectedId] = useState(null)

	const query = searchParams.get("q") || ""
	const category = searchParams.get("category") || ""
	const mode = searchParams.get("mode") || ""
	const location = searchParams.get("location") || ""
	const experience = searchParams.get("experience") || ""
	const sort = searchParams.get("sort") || "newest"

	useEffect(() => {
		const applyId = searchParams.get("apply")
		if (applyId && records.some(item => item.id === applyId)) {
			setSelectedId(applyId)
		}
	}, [records, searchParams])

	const setParams = useCallback(
		next => {
			const qs = opportunityQuery({
				category,
				experience,
				location,
				mode,
				q: query,
				sort,
				...next,
			})
			router.replace(qs ? `${pathname}?${qs}` : pathname, {
				scroll: false,
			})
		},
		[category, experience, location, mode, pathname, query, router, sort],
	)

	const rows = useMemo(
		() =>
			filterOpportunities(records, {
				category,
				experience,
				location,
				mode,
				query,
				sort,
			}),
		[category, experience, location, mode, query, records, sort],
	)

	const activeCount = [query, category, mode, location, experience].filter(
		Boolean,
	).length

	const applyTo = item => {
		if (!user) {
			const returnTo = `${copy.path}?apply=${encodeURIComponent(item.id)}`
			router.push(`/auth?returnTo=${encodeURIComponent(returnTo)}`)
			return
		}
		if (!appliedIds.includes(item.id)) {
			persistApplied([...appliedIds, item.id])
			toast.add({
				title: `Application submitted for ${item.title}.`,
				type: "success",
			})
		}
		setSelectedId(item.id)
	}

	const selected = records.find(item => item.id === selectedId) || null
	const categories = uniqueValues(records, "category")
	const modes = uniqueValues(records, "mode")
	const locations = uniqueValues(records, "location")
	const stages = uniqueValues(records, "experience")

	const clear = () =>
		setParams({
			category: "",
			experience: "",
			location: "",
			mode: "",
			q: "",
			sort: "newest",
		})

	return (
		<>
			<section className="bg-[var(--bg-050)] py-14 pb-[88px] max-[720px]:py-9 max-[720px]:pb-14">
				<Container>
					<nav
						aria-label="Opportunity type"
						className="mb-[22px] inline-flex gap-1 rounded-[14px] border border-[var(--line)] bg-[var(--bg-000)] p-1 shadow-lu-sm max-[720px]:grid max-[720px]:w-full max-[720px]:grid-cols-2"
					>
						{[
							{ href: "/internships", label: "Internships" },
							{ href: "/jobs", label: "Fresher jobs" },
						].map(tab => {
							const active = pathname === tab.href
							return (
								<Link
									aria-current={active ? "page" : undefined}
									className={cn(
										"min-w-[140px] rounded-[10px] px-[18px] py-2.5 text-center font-bold font-heading text-[0.88rem] max-[720px]:min-w-0",
										active
											? "bg-[var(--ink-900)] text-[#fff]"
											: "text-[var(--ink-500)] hover:text-[var(--ink-900)]",
									)}
									href={tab.href}
									key={tab.href}
								>
									{tab.label}
								</Link>
							)
						})}
					</nav>

					<aside className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-[var(--line)] bg-[#fff] px-5 py-[18px] max-[720px]:grid-cols-1">
						<div>
							<strong className="mb-1 block text-[0.95rem] text-[var(--ink-900)]">
								{copy.nudgeTitle}
							</strong>
							<p className="text-[0.86rem] text-[var(--ink-500)] leading-[1.5]">
								{copy.nudgeCopy}
							</p>
						</div>
						<Button
							className="max-[720px]:min-h-12 max-[720px]:w-full"
							nativeButton={false}
							render={<Link href="/programs" />}
						>
							Start a free certification
						</Button>
					</aside>

					<aside className="mb-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl border border-[var(--brand-200)] bg-[var(--brand-050)] px-4 py-3.5 max-[720px]:grid-cols-1">
						<strong className="whitespace-nowrap font-extrabold text-[0.78rem] text-[var(--brand-ink)]">
							Catalogue preview
						</strong>
						<p className="text-[0.78rem] text-[var(--ink-500)] leading-[1.5]">
							These sample roles demonstrate the complete
							discovery and application experience. No employer
							names or live vacancies are fabricated; connect a
							verified hiring feed before launch.
						</p>
					</aside>

					<div className="mb-6 flex items-center gap-3 max-[720px]:items-stretch">
						<div className="relative flex flex-1 items-center">
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
							<label
								className="sr-only"
								htmlFor="opportunity-search"
							>
								{copy.searchLabel}
							</label>
							<Input
								className="h-14 min-h-14 rounded-[14px] border-[var(--line-strong)] bg-[var(--bg-000)] pr-[18px] pl-[50px] text-[var(--ink-900)] shadow-lu-sm placeholder:text-[var(--ink-300)] max-[720px]:h-[52px] max-[720px]:min-h-[52px]"
								id="opportunity-search"
								onChange={event =>
									setParams({ q: event.target.value })
								}
								placeholder="Search roles, skills or industries"
								type="search"
								value={query}
							/>
						</div>
						<Button
							aria-controls="filterPanel"
							aria-expanded={filtersOpen}
							className="hidden min-h-[52px] max-[980px]:inline-flex"
							onClick={() => setFiltersOpen(open => !open)}
							type="button"
							variant="outline"
						>
							Filters{" "}
							<span className="rounded-full bg-[var(--brand-100)] px-1.5 py-0.5 font-bold text-[0.72rem] text-[var(--brand-ink)]">
								{activeCount ? `${activeCount} active` : "All"}
							</span>
						</Button>
					</div>

					<div className="grid grid-cols-[270px_minmax(0,1fr)] items-start gap-8 max-[980px]:grid-cols-1">
						<aside
							className={cn(
								"sticky top-[100px] grid gap-[18px] rounded-[18px] border border-[var(--line)] bg-[var(--bg-000)] p-[22px] shadow-lu-sm max-[980px]:static",
								!filtersOpen && "max-[980px]:hidden",
							)}
							id="filterPanel"
						>
							<div className="flex items-center justify-between gap-2.5 border-[var(--line)] border-b pb-3.5">
								<h2 className="text-[1rem]">
									{copy.filterTitle}
								</h2>
								{activeCount ? (
									<button
										className="font-bold text-[0.76rem] text-[var(--brand-ink)]"
										onClick={clear}
										type="button"
									>
										Clear all
									</button>
								) : null}
							</div>
							<FilterSelect
								allLabel="All skill areas"
								id="filter-category"
								label="Skill area"
								onChange={value =>
									setParams({ category: value })
								}
								options={categories}
								value={category}
							/>
							<FilterSelect
								allLabel="All work modes"
								id="filter-mode"
								label="Work mode"
								onChange={value => setParams({ mode: value })}
								options={modes}
								value={mode}
							/>
							<FilterSelect
								allLabel="All locations"
								id="filter-location"
								label="Location"
								onChange={value =>
									setParams({ location: value })
								}
								options={locations}
								value={location}
							/>
							<FilterSelect
								allLabel="All experience levels"
								id="filter-experience"
								label="Candidate stage"
								onChange={value =>
									setParams({ experience: value })
								}
								options={stages}
								value={experience}
							/>
							<div className="rounded-xl bg-[linear-gradient(145deg,var(--brand-050),var(--bg-050))] p-4">
								<strong className="block font-heading text-[0.82rem] text-[var(--ink-900)]">
									{copy.filterHelpTitle}
								</strong>
								<p className="my-1.5 mb-2.5 text-[0.75rem] text-[var(--ink-500)] leading-[1.5]">
									{copy.filterHelp}
								</p>
								<Link
									className="font-extrabold text-[0.76rem] text-[var(--brand-ink)]"
									href="/learn#career"
								>
									Build my profile →
								</Link>
							</div>
						</aside>

						<section aria-live="polite" className="min-w-0">
							<div className="mb-4 flex items-end justify-between gap-5 max-[720px]:gap-3">
								<div>
									<span className="font-bold text-[0.75rem] text-[var(--ink-500)] uppercase tracking-[0.07em]">
										{copy.resultsKicker}
									</span>
									<h2 className="mt-1 text-[1.35rem] text-[var(--ink-900)]">
										{rows.length} opportunit
										{rows.length === 1 ? "y" : "ies"}
									</h2>
								</div>
								<label
									className="grid min-w-[170px] gap-1.5 max-[720px]:min-w-[145px]"
									htmlFor="opportunity-sort"
								>
									<span className="font-bold text-[0.74rem] text-[var(--ink-700)]">
										Sort by
									</span>
									<select
										className={selectClass}
										id="opportunity-sort"
										onChange={event =>
											setParams({
												sort: event.target.value,
											})
										}
										value={sort}
									>
										<option value="newest">
											Newest first
										</option>
										<option value="compensation-high">
											{copy.sortPay}
										</option>
										<option value="title">Role name</option>
									</select>
								</label>
							</div>

							{rows.length ? (
								<div className="grid gap-3.5">
									{rows.map(item => (
										<OpportunityCard
											applied={appliedIds.includes(
												item.id,
											)}
											item={item}
											key={item.id}
											onSave={() => toggleSaved(item.id)}
											onView={() =>
												setSelectedId(item.id)
											}
											saved={savedIds.includes(item.id)}
										/>
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
										{copy.emptyTitle}
									</h3>
									<p className="mb-[18px] text-[0.84rem] text-[var(--ink-500)]">
										{copy.emptyCopy}
									</p>
									<Button
										onClick={clear}
										type="button"
										variant="outline"
									>
										Clear filters
									</Button>
								</div>
							)}
						</section>
					</div>
				</Container>
			</section>

			<OpportunityDrawer
				appliedIds={appliedIds}
				copy={copy}
				onApply={applyTo}
				onClose={() => setSelectedId(null)}
				onSave={toggleSaved}
				savedIds={savedIds}
				selected={selected}
				user={user}
			/>
		</>
	)
}
