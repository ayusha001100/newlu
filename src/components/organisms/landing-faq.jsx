import LandingSection from "@/atoms/landing-section"
import FaqList from "@/molecules/faq-list"
import SectionHead from "@/molecules/section-head"

export default function LandingFaq({ align = "left", items, title }) {
	return (
		<LandingSection alt id="faq" innerClassName="max-w-[820px]">
			<SectionHead
				align={align}
				className={align === "left" ? "mx-0 max-w-none" : undefined}
				eyebrow="FAQ"
				title={title}
			/>
			<FaqList items={items} />
		</LandingSection>
	)
}
