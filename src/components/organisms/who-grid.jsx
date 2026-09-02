import LandingSection from "@/atoms/landing-section"
import Reveal from "@/atoms/reveal"
import { getPaddedValue } from "@/lib/utils"
import SectionHead from "@/molecules/section-head"

export default function WhoGrid({ items, note }) {
	return (
		<LandingSection id="who">
			<SectionHead eyebrow="Eligibility" title="Who should join?" />
			<div className="grid grid-cols-5 gap-3.5 max-[720px]:grid-cols-1 max-[980px]:grid-cols-2">
				{items.map((item, index) => (
					<Reveal
						as="article"
						className="rounded-xl border border-line bg-[#fff] p-[22px]"
						delay={(index % 4) * 70}
						key={item}
					>
						<h3 className="mb-2 text-[1rem]">
							Best fit {getPaddedValue(index + 1)}
						</h3>
						<p className="text-[0.88rem] text-ink-500">{item}</p>
					</Reveal>
				))}
			</div>
			<p className="mt-9 text-center text-[0.92rem] text-ink-500">
				{note}
			</p>
		</LandingSection>
	)
}
