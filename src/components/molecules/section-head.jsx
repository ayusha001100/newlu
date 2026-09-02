import Eyebrow from "@/atoms/eyebrow"
import Reveal from "@/atoms/reveal"
import { cn } from "@/lib/utils"

export default function SectionHead({
	align = "center",
	children,
	className,
	eyebrow,
	light = false,
	title,
}) {
	const left = align === "left"

	return (
		<Reveal
			className={cn(
				"mx-auto mb-14 flex max-w-[660px] flex-col max-[720px]:mb-[34px] max-[720px]:items-start max-[720px]:text-left",
				left
					? "mx-0 items-start text-left"
					: "items-center text-center",
				className,
			)}
		>
			{eyebrow ? <Eyebrow light={light}>{eyebrow}</Eyebrow> : null}
			<h2
				className={cn(
					"mb-3.5 w-full text-[clamp(1.75rem,3.2vw,2.5rem)] max-[720px]:text-[1.85rem] max-[720px]:leading-[1.15]",
					light && "text-[#fff]",
				)}
			>
				{title}
			</h2>
			{children ? (
				<p
					className={cn(
						"w-full text-[1.02rem] max-[720px]:text-[0.94rem]",
						light ? "text-[rgba(255,255,255,0.7)]" : "text-ink-500",
					)}
				>
					{children}
				</p>
			) : null}
		</Reveal>
	)
}
