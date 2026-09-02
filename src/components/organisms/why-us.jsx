import Container from "@/atoms/container"
import FeatureIcon from "@/atoms/feature-icon"
import Reveal from "@/atoms/reveal"
import { WHY_US } from "@/lib/data/home"
import SectionHead from "@/molecules/section-head"

export default function WhyUs() {
	return (
		<section
			className="bg-[var(--bg-000)] py-[100px] max-[720px]:py-[68px]"
			id="why-us"
		>
			<Container>
				<SectionHead
					eyebrow="Why LetsUpgrade"
					title="What you get beyond the certificate"
				/>
				<div className="grid grid-cols-3 gap-5 max-[720px]:grid-cols-1 max-[980px]:grid-cols-2 max-[720px]:gap-3">
					{WHY_US.map((feature, index) => (
						<Reveal
							className="rounded-xl border border-line bg-white px-[26px] py-[30px] transition-[transform,box-shadow,border-color] duration-[250ms] hover:-translate-y-1 hover:border-line-strong hover:shadow-lu-md max-[720px]:p-5"
							delay={(index % 4) * 80}
							key={feature.title}
						>
							<div className="mb-[18px] grid size-[46px] place-items-center rounded-[13px] border border-brand-100 bg-brand-50 text-brand-ink">
								<FeatureIcon name={feature.icon} />
							</div>
							<h3 className="mb-2 text-[1.05rem]">
								{feature.title}
							</h3>
							<p className="text-[0.91rem] text-ink-500 leading-[1.55]">
								{feature.body}
							</p>
						</Reveal>
					))}
				</div>
			</Container>
		</section>
	)
}
