import { cn } from "@/lib/utils"

export default function Highlight({ children, className }) {
	return (
		<span className={cn("relative isolate whitespace-nowrap", className)}>
			{children}
			<span
				aria-hidden="true"
				className="absolute -inset-x-0.5 bottom-[0.06em] -z-10 h-[0.34em] rounded bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500))]"
			/>
		</span>
	)
}
