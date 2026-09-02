import Link from "next/link"
import Container from "@/atoms/container"
import { Button } from "@/ui/button"

export default function OpportunityCta({ href, kicker, title }) {
	return (
		<section className="bg-[var(--ink-900)] py-16 max-[720px]:py-12">
			<Container className="flex items-center justify-between gap-10 max-[720px]:flex-col max-[720px]:items-stretch max-[720px]:gap-6">
				<div>
					<span className="mb-2 block font-extrabold text-[0.75rem] text-[var(--brand-400)] uppercase tracking-[0.08em]">
						{kicker}
					</span>
					<h2 className="max-w-[720px] text-[#fff] text-[clamp(1.5rem,2.5vw,2.25rem)]">
						{title}
					</h2>
				</div>
				<Button
					className="max-[720px]:min-h-12 max-[720px]:w-full"
					nativeButton={false}
					render={<Link href={href} />}
				>
					Build My Profile
				</Button>
			</Container>
		</section>
	)
}
