import Reveal from "@/atoms/reveal"
import { cn } from "@/lib/utils"

function CheckIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-[21px]"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.8"
			viewBox="0 0 24 24"
		>
			<path d="M5 12.5l4.2 4.2L19 7" />
		</svg>
	)
}

export default function HighlightCard({
	body,
	className,
	delay = 0,
	icon,
	title,
}) {
	return (
		<Reveal
			as="article"
			className={cn(
				"rounded-xl border border-line bg-[#fff] px-[22px] py-[26px] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(var(--track-rgb),0.14),0_4px_12px_rgba(16,20,27,0.06),0_16px_40px_rgba(16,20,27,0.08)]",
				className,
			)}
			delay={delay}
		>
			<span className="mb-4 grid size-11 place-items-center rounded-[12px] border border-[var(--track-200)] bg-[var(--track-100)] text-[var(--track-ink)]">
				{icon || <CheckIcon />}
			</span>
			<h3 className="mb-2 text-[1.05rem]">{title}</h3>
			{body ? (
				<p className="text-[0.92rem] text-ink-500">{body}</p>
			) : null}
		</Reveal>
	)
}
