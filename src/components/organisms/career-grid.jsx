import LandingSection from "@/atoms/landing-section"
import Reveal from "@/atoms/reveal"
import EnrollButton from "@/molecules/enroll-button"
import SectionHead from "@/molecules/section-head"

export default function CareerGrid({ items, slug }) {
	return (
		<LandingSection id="career">
			<SectionHead
				eyebrow="Career connection"
				title="What happens after the certificate"
			>
				This is step two of four. Here is what the rest of the route
				looks like.
			</SectionHead>
			<div className="grid grid-cols-5 gap-3.5 max-[720px]:grid-cols-1 max-[980px]:grid-cols-2">
				{items.map((item, index) => (
					<Reveal
						as="article"
						className="rounded-xl border border-line bg-[#fff] p-[22px]"
						delay={(index % 4) * 70}
						key={item.title}
					>
						<h3 className="mb-2 text-[0.98rem]">{item.title}</h3>
						<p className="text-[0.86rem] text-ink-500">
							{item.body}
						</p>
					</Reveal>
				))}
			</div>
			<div className="mt-9 text-center">
				<EnrollButton slug={slug}>Enrol Free</EnrollButton>
			</div>
		</LandingSection>
	)
}
