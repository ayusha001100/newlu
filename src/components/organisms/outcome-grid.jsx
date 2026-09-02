import LandingSection from "@/atoms/landing-section"
import Reveal from "@/atoms/reveal"
import SectionHead from "@/molecules/section-head"

export default function OutcomeGrid({ items, title }) {
	return (
		<LandingSection id="outcomes">
			<SectionHead eyebrow="Outcomes" title={title} />
			<div className="mx-auto grid max-w-[900px] grid-cols-2 gap-3 max-[720px]:grid-cols-1">
				{items.map((item, index) => (
					<Reveal
						className="rounded-[12px] border border-line bg-[#fff] px-[18px] py-4 font-semibold text-[0.95rem]"
						delay={(index % 4) * 70}
						key={item}
					>
						{item}
					</Reveal>
				))}
			</div>
		</LandingSection>
	)
}
