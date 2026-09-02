import LandingSection from "@/atoms/landing-section"
import Reveal from "@/atoms/reveal"
import SectionHead from "@/molecules/section-head"

export default function ToolsGrid({ copy, items, title }) {
	return (
		<LandingSection id="tools">
			<SectionHead eyebrow="Tools" title={title}>
				{copy}
			</SectionHead>
			<div className="grid grid-cols-4 gap-3.5 max-[720px]:grid-cols-1 max-[980px]:grid-cols-2">
				{items.map((tool, index) => (
					<Reveal
						className="grid min-h-[92px] place-items-center rounded-xl border border-line bg-[#fff] text-center font-extrabold text-[1rem] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lu-sm"
						delay={(index % 4) * 70}
						key={tool}
					>
						{tool}
					</Reveal>
				))}
			</div>
		</LandingSection>
	)
}
