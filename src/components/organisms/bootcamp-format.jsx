import LandingSection from "@/atoms/landing-section"
import { BOOTCAMP_STEPS } from "@/lib/data/landing"
import SectionHead from "@/molecules/section-head"

export default function BootcampFormat() {
	return (
		<LandingSection alt id="format">
			<SectionHead
				eyebrow="How it works"
				title="Recorded lessons, then a playlist after you enrol"
			>
				These are not live tracks. You watch the curriculum at your
				pace. After enrolment, the Learning Centre plays the official
				YouTube or Vimeo playlist for this program.
			</SectionHead>
			<div className="grid grid-cols-4 gap-4 max-[520px]:grid-cols-1 max-[720px]:grid-cols-2">
				{BOOTCAMP_STEPS.map(step => (
					<article
						className="rounded-xl border border-line bg-[#fff] px-5 py-[22px]"
						key={step.num}
					>
						<span className="mb-2.5 inline-block font-extrabold font-heading text-[0.78rem] text-brand-ink">
							{step.num}
						</span>
						<h3 className="mb-2 text-[1.02rem]">{step.title}</h3>
						<p className="text-[0.9rem] text-ink-500">
							{step.body}
						</p>
					</article>
				))}
			</div>
		</LandingSection>
	)
}
