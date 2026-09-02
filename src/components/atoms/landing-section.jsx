import Container from "@/atoms/container"
import { cn } from "@/lib/utils"

export default function LandingSection({
	alt = false,
	children,
	className,
	id,
	innerClassName,
}) {
	return (
		<section
			className={cn(
				"py-[88px] max-[720px]:py-16",
				alt && "bg-[var(--bg-050)]",
				className,
			)}
			id={id}
		>
			<Container className={innerClassName}>{children}</Container>
		</section>
	)
}
