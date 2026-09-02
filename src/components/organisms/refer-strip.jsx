import Link from "next/link"
import Container from "@/atoms/container"
import Eyebrow from "@/atoms/eyebrow"
import Reveal from "@/atoms/reveal"
import { Button } from "@/ui/button"

export default function ReferStrip() {
	return (
		<section
			className="bg-[var(--bg-000)] pt-7 pb-2 max-[720px]:pt-2 max-[720px]:pb-0"
			id="refer"
		>
			<Container>
				<Reveal
					className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-9 gap-y-7 rounded-[24px] border border-line bg-[var(--bg-050)] px-9 py-8 max-[720px]:grid-cols-1 max-[720px]:gap-[18px] max-[720px]:px-[18px] max-[720px]:py-[22px]"
					duration={750}
					variant="scale-up"
				>
					<div>
						<Eyebrow className="mb-3">Refer & Earn</Eyebrow>
						<h2 className="mb-2 text-[clamp(1.35rem,2.4vw,1.85rem)]">
							Bring a classmate. You both start free.
						</h2>
						<p className="max-w-[54ch] text-[0.95rem] text-ink-500">
							Share your link. When they enrol in a certification,
							the invite is counted on your Refer & Earn
							dashboard.
						</p>
					</div>
					<Button
						className="max-[720px]:min-h-[50px] max-[720px]:w-full"
						nativeButton={false}
						render={<Link href="/refer" />}
					>
						Get my referral link
					</Button>
				</Reveal>
			</Container>
		</section>
	)
}
