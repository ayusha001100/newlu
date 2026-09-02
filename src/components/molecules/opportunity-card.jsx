import { postedLabel } from "@/lib/data/marketplace"
import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"

export default function OpportunityCard({
	applied,
	item,
	onSave,
	onView,
	saved,
}) {
	const initials = item.category.slice(0, 2).toUpperCase()

	return (
		<article className="grid grid-cols-[52px_minmax(0,1fr)] gap-[18px] rounded-[18px] border border-[var(--line)] bg-[var(--bg-000)] p-[22px] shadow-lu-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[var(--brand-200)] hover:shadow-lu-md max-[720px]:grid-cols-[40px_minmax(0,1fr)] max-[720px]:gap-3 max-[720px]:p-4">
			<div
				aria-hidden="true"
				className="grid size-[52px] place-items-center rounded-[15px] border border-[var(--brand-200)] bg-[linear-gradient(145deg,var(--brand-100),var(--brand-050))] font-extrabold font-heading text-[0.8rem] text-[var(--brand-ink)] max-[720px]:size-10 max-[720px]:rounded-[12px]"
			>
				{initials}
			</div>
			<div className="min-w-0">
				<div className="flex items-start justify-between gap-4">
					<div>
						<span className="mb-1 block font-extrabold text-[0.7rem] text-[var(--brand-ink)] uppercase tracking-[0.07em]">
							{item.category} · {item.industry}
						</span>
						<h2 className="mb-1 text-[1.15rem] tracking-[-0.02em] max-[720px]:text-[1.05rem]">
							{item.title}
						</h2>
						<p className="text-[0.78rem] text-[var(--ink-500)]">
							{item.employer}
						</p>
					</div>
					<button
						aria-label={
							saved
								? "Remove from saved opportunities"
								: "Save opportunity"
						}
						aria-pressed={saved}
						className={cn(
							"grid size-10 shrink-0 place-items-center rounded-[11px] border border-[var(--line)] text-[var(--ink-500)] transition-colors",
							saved &&
								"border-[var(--brand-200)] bg-[var(--brand-050)] text-[var(--brand-ink)]",
						)}
						onClick={onSave}
						type="button"
					>
						<svg
							aria-hidden="true"
							className="size-[18px]"
							fill={saved ? "var(--brand-500)" : "none"}
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="1.8"
							viewBox="0 0 24 24"
						>
							<path d="M6.5 4.5h11v16L12 17l-5.5 3.5z" />
						</svg>
					</button>
				</div>

				<div className="my-3.5 flex flex-wrap gap-1.5 max-[720px]:my-3">
					{[
						["location", item.location],
						["mode", item.mode],
						["duration", item.duration],
						["experience", item.experience],
					].map(([field, meta]) => (
						<span
							className="rounded-full bg-[var(--bg-050)] px-2.5 py-1 font-semibold text-[0.7rem] text-[var(--ink-500)]"
							key={field}
						>
							{meta}
						</span>
					))}
				</div>

				<p className="text-[0.86rem] text-[var(--ink-700)] leading-[1.6]">
					{item.summary}
				</p>

				<div className="mt-3.5 flex flex-wrap gap-1.5">
					{item.skills.slice(0, 4).map(skill => (
						<span
							className="rounded-lg border border-[var(--line)] px-2.5 py-1 font-bold text-[0.7rem] text-[var(--ink-700)]"
							key={skill}
						>
							{skill}
						</span>
					))}
				</div>

				<div className="mt-[18px] flex items-end justify-between gap-4 border-[var(--line)] border-t pt-4 max-[720px]:flex-col max-[720px]:items-stretch">
					<div>
						<strong className="block font-heading text-[0.92rem] text-[var(--ink-900)]">
							{item.compensation}
						</strong>
						<small className="text-[0.7rem] text-[var(--ink-500)]">
							{postedLabel(item.postedDays)} · {item.openings}{" "}
							opening{item.openings === 1 ? "" : "s"}
						</small>
					</div>
					<Button
						className="max-[720px]:min-h-11 max-[720px]:w-full"
						onClick={onView}
						size="sm"
						type="button"
						variant={applied ? "ghost" : "outline"}
					>
						{applied ? "Applied · View details" : "View details"}
					</Button>
				</div>
			</div>
		</article>
	)
}
