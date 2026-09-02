import { cn } from "@/lib/utils"

export default function AuthStepDots({ step }) {
	return (
		<div className="mb-6 flex gap-1.5">
			{[0, 1].map(index => (
				<span
					className={cn(
						"h-1 w-[26px] rounded-full bg-line transition-[background-color,width] duration-250",
						index < step && "bg-brand-400",
						index === step && "w-10 bg-brand-500",
					)}
					key={index}
				/>
			))}
		</div>
	)
}
