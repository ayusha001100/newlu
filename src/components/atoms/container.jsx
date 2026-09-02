import { cn } from "@/lib/utils"

export default function Container({ className, size = "default", ...props }) {
	return (
		<div
			className={cn(
				"mx-auto w-full px-6 max-[720px]:px-[18px]",
				size === "nav" ? "max-w-[1280px]" : "max-w-[1200px]",
				className,
			)}
			{...props}
		/>
	)
}
