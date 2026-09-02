import Image from "next/image"
import Link from "next/link"
import { WORDMARK_SRC } from "@/lib/data/nav"
import { cn } from "@/lib/utils"

export default function Logo({
	className,
	inverted = false,
	priority = false,
}) {
	return (
		<Link
			aria-label="LetsUpgrade"
			className={cn(
				"flex min-w-[126px] nav:min-w-[136px] shrink-0 items-center",
				className,
			)}
			href="/"
		>
			<Image
				alt="LetsUpgrade"
				className={cn(
					"h-[34px] nav:h-10 nav:w-[136px] w-[126px] object-contain object-left",
					inverted && "brightness-0 invert",
				)}
				height={40}
				priority={priority}
				src={WORDMARK_SRC}
				width={136}
			/>
		</Link>
	)
}
