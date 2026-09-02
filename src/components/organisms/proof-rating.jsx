import LandingSection from "@/atoms/landing-section"
import { GOOGLE_RATING, GOOGLE_REVIEWS } from "@/lib/data/home"
import GoogleRating from "@/molecules/google-rating"
import SectionHead from "@/molecules/section-head"

export default function ProofRating() {
	return (
		<LandingSection alt id="stories">
			<SectionHead
				eyebrow="Proof"
				title={`${GOOGLE_RATING} out of 5, from ${GOOGLE_REVIEWS.toLocaleString("en-IN")} Google reviews`}
			>
				That rating covers every LetsUpgrade program. Written reviews
				for this certification go up as each cohort finishes it.
			</SectionHead>
			<GoogleRating className="mx-auto mb-0" cta="Read them" />
		</LandingSection>
	)
}
