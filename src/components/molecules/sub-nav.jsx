import { cn } from "@/lib/utils"

export default function SubNav({ items, onChange, value }) {
	return (
		<div className="mb-6 flex flex-wrap gap-2">
			{items.map(item => {
				const active = value === item.id
				return (
					<button
						className={cn(
							"rounded-xl border px-4 py-2 font-bold font-heading text-[0.84rem] shadow-xs transition-all duration-200",
							active
								? "border-brand-500 bg-brand-50/90 text-brand-ink shadow-sm ring-2 ring-brand-200"
								: "border-line bg-white text-ink-600 hover:border-brand-200 hover:bg-canvas-muted hover:text-ink-900",
						)}
						key={item.id}
						onClick={() => onChange(item.id)}
						type="button"
					>
						{item.label}
					</button>
				)
			})}
		</div>
	)
}
