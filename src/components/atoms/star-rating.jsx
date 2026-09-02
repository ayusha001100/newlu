import { cn } from "@/lib/utils"

export default function StarRating({ className, rating = 5 }) {
	const width = `${(rating / 5) * 100}%`

	return (
		<span
			aria-hidden="true"
			className={cn(
				"relative inline-block text-[0.92rem] text-line-strong leading-none tracking-[2px]",
				className,
			)}
		>
			★★★★★
			<span
				className="absolute inset-y-0 left-0 overflow-hidden text-brand-500"
				style={{ width }}
			>
				★★★★★
			</span>
		</span>
	)
}
