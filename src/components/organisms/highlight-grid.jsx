import LandingSection from "@/atoms/landing-section"
import HighlightCard from "@/molecules/highlight-card"
import SectionHead from "@/molecules/section-head"

export default function HighlightGrid({
	copy,
	eyebrow = "Program highlights",
	items,
	title,
}) {
	return (
		<LandingSection id="highlights">
			<SectionHead eyebrow={eyebrow} title={title}>
				{copy}
			</SectionHead>
			<div className="grid grid-cols-3 gap-[18px] max-[720px]:grid-cols-1 max-[980px]:grid-cols-2">
				{items.map((item, index) => (
					<HighlightCard
						body={item.body}
						delay={(index % 4) * 70}
						key={item.title}
						title={item.title}
					/>
				))}
			</div>
		</LandingSection>
	)
}
