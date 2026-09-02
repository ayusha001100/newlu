import { cn } from "@/lib/utils"

export default function Eyebrow({ children, className, light = false }) {
	return (
		<span
			className={cn(
				"mb-[18px] inline-flex items-center gap-2 rounded-full border px-[15px] py-1.5 font-bold text-[0.76rem] uppercase tracking-[0.08em] before:size-1.5 before:rotate-45 before:rounded-[2px] before:content-['']",
				light
					? "border-[rgba(var(--brand-rgb),0.3)] bg-[rgba(var(--brand-rgb),0.12)] text-brand-400 before:bg-brand-400"
					: "border-brand-100 bg-brand-50 text-brand-ink before:bg-brand-500",
				className,
			)}
		>
			{children}
		</span>
	)
}
