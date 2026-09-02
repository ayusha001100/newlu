import { cn } from "@/lib/utils"

export default function MiniProgress({ className, value = 0 }) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-100)]",
				className,
			)}
		>
			<div
				className="h-full rounded-full bg-brand-500"
				style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
			/>
		</div>
	)
}
