import Container from "@/atoms/container"
import { FAQS } from "@/lib/data/home"
import FaqList from "@/molecules/faq-list"
import SectionHead from "@/molecules/section-head"

export default function FaqAccordion() {
	return (
		<section
			className="bg-[var(--bg-050)] py-[100px] max-[720px]:py-[68px]"
			id="faq"
		>
			<Container>
				<SectionHead
					eyebrow="FAQ"
					title="What students ask before signing up"
				/>
				<FaqList className="mx-auto max-w-[760px]" items={FAQS} />
			</Container>
		</section>
	)
}
