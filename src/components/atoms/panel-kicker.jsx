import { cn } from "@/lib/utils"

export default function PanelKicker({ children, className }) {
	return (
		<span
			className={cn(
				"mb-2 block font-extrabold text-[0.7rem] text-brand-ink uppercase tracking-[0.11em]",
				className,
			)}
		>
			{children}
		</span>
	)
}
