import LandingSection from "@/atoms/landing-section"
import {
	ASSESSMENT_STEPS,
	DEFAULT_GRADING,
	EXAM_PARTS,
	EXAM_SCENARIO,
	GRADE_BANDS,
} from "@/lib/data/landing"
import SectionHead from "@/molecules/section-head"

export default function AssessmentBlock({ grading, note }) {
	const weights = grading?.length ? grading : DEFAULT_GRADING

	return (
		<LandingSection alt id="assessment">
			<SectionHead
				eyebrow="Assessment"
				title="How will you earn the certificate?"
			>
				Four things get graded. Attendance is not one of them.
			</SectionHead>
			<div className="mb-[34px] grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-3 max-[720px]:grid-cols-1 max-[980px]:grid-cols-2">
				{ASSESSMENT_STEPS.map((step, index) => (
					<div className="contents" key={step.num}>
						<article className="rounded-xl border border-line bg-[#fff] px-[18px] py-[22px]">
							<span className="mb-2.5 block font-extrabold text-ink-300">
								{step.num}
							</span>
							<h3 className="mb-1.5 text-[1.05rem]">
								{step.title}
							</h3>
							<p className="text-[0.9rem] text-ink-500">
								{step.body}
							</p>
						</article>
						{index < ASSESSMENT_STEPS.length - 1 ? (
							<span
								aria-hidden="true"
								className="pt-[34px] text-[1.2rem] text-ink-300 max-[980px]:hidden"
							>
								→
							</span>
						) : null}
					</div>
				))}
			</div>
			<div className="grid grid-cols-5 gap-3 max-[720px]:grid-cols-1 max-[980px]:grid-cols-3">
				{weights.map(item => (
					<div
						className="rounded-xl border border-line bg-[#fff] px-4 py-[22px] text-center"
						key={item.label}
					>
						<strong className="mb-1.5 block text-[1.6rem]">
							{item.weight}
						</strong>
						<span className="font-semibold text-[0.88rem] text-ink-500">
							{item.label}
						</span>
					</div>
				))}
			</div>
			<div className="mt-7 rounded-[24px] border border-line bg-[#fff] p-[30px] max-[720px]:p-4">
				<div className="mb-5">
					<h3 className="mb-1.5 text-[1.2rem]">
						Final examination — 100 marks
					</h3>
					<p className="text-[0.92rem] text-ink-500">
						Seven parts, weighted towards what you can actually do
						with AI.
					</p>
				</div>
				<ul className="mb-6 grid grid-cols-2 gap-x-6 gap-y-0 max-[980px]:grid-cols-1">
					{EXAM_PARTS.map(part => (
						<li
							className="flex items-center gap-3 border-line border-b border-dashed py-[11px] text-[0.92rem] text-ink-700"
							key={part.part}
						>
							<span className="shrink-0 rounded-[6px] border border-[var(--track-200)] bg-[var(--track-100)] px-2 py-1 font-extrabold text-[0.68rem] text-[var(--track-ink)] uppercase tracking-[0.08em]">
								{part.part}
							</span>
							{part.label}
							<strong className="ml-auto text-[1rem]">
								{part.marks}
							</strong>
						</li>
					))}
				</ul>
				<div className="rounded-[12px] border border-[var(--track-200)] border-l-[3px] border-l-brand-500 bg-[var(--track-050)] px-5 py-[18px]">
					<span className="mb-2 block font-extrabold text-[0.68rem] text-[var(--track-ink)] uppercase tracking-[0.1em]">
						Practical exam scenario
					</span>
					<p className="text-[0.92rem] text-ink-700 leading-[1.6]">
						{EXAM_SCENARIO}
					</p>
				</div>
			</div>
			<div className="mt-6 flex flex-wrap justify-center gap-2.5">
				{GRADE_BANDS.map(band => (
					<span
						className="rounded-full border border-line bg-[#fff] px-[18px] py-[9px] font-semibold text-[0.88rem] text-ink-500"
						key={band.label}
					>
						<strong className="mr-1.5 text-ink-900">
							{band.range}
						</strong>
						{band.label}
					</span>
				))}
			</div>
			<p className="mt-[18px] text-center text-[0.9rem] text-ink-500">
				{note}
			</p>
		</LandingSection>
	)
}
