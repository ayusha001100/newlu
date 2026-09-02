import { Suspense } from "react"
import { MARKETPLACE } from "@/lib/data/marketplace"
import MarketHero from "@/organisms/market-hero"
import OpportunityBoard from "@/organisms/opportunity-board"
import OpportunityCta from "@/organisms/opportunity-cta"

const copy = MARKETPLACE.internship

export const metadata = {
	alternates: { canonical: "https://letsupgrade.in/internships" },
	description: copy.description,
	title: copy.title,
}

export default function InternshipsPage() {
	return (
		<div className="bg-[var(--bg-050)]">
			<MarketHero
				breadcrumb={copy.breadcrumb}
				cardKicker={copy.cardKicker}
				cardTitle={copy.cardTitle}
				eyebrow={copy.eyebrow}
				headline={copy.headline}
				highlight={copy.highlight}
				lead={copy.lead}
				points={copy.points}
				pointsLabel={copy.pointsLabel}
				steps={copy.steps}
			/>
			<Suspense>
				<OpportunityBoard type="internship" />
			</Suspense>
			<OpportunityCta
				href="/learn#career"
				kicker={copy.ctaKicker}
				title={copy.ctaTitle}
			/>
		</div>
	)
}
