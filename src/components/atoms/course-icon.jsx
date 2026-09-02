import Image from "next/image"
import { cn } from "@/lib/utils"

export default function CourseIcon({ className, program }) {
	if (program?.logo) {
		const src = program.logo.startsWith("/")
			? program.logo
			: `/${program.logo}`
		return (
			<span
				className={cn(
					"grid size-[34px] shrink-0 place-items-center rounded-[10px] border border-line bg-white",
					className,
				)}
			>
				<Image alt="" height={18} src={src} width={18} />
			</span>
		)
	}

	return (
		<span
			className={cn(
				"grid size-[34px] shrink-0 place-items-center rounded-[10px] border border-line bg-[var(--bg-050)] font-extrabold font-heading text-[0.74rem] text-ink-700",
				className,
			)}
		>
			{program?.icon || "LU"}
		</span>
	)
}
