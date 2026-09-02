import Container from "@/atoms/container"
import EnrollButton from "@/molecules/enroll-button"

export default function LandingFinal({
	copy,
	kind = "program",
	label,
	note,
	slug,
	title,
}) {
	return (
		<section
			className="bg-[var(--ink-900)] py-[90px] text-center text-[#fff] max-[720px]:py-16"
			id="enroll"
		>
			<Container>
				<div className="mx-auto max-w-[640px]">
					<h2 className="mb-3 text-[#fff] text-[clamp(1.8rem,3.5vw,2.6rem)]">
						{title}
					</h2>
					<p className="mb-[18px] text-[rgba(255,255,255,0.72)]">
						{copy}
					</p>
					<p className="mb-5 font-bold text-[#fff] text-[0.9rem] uppercase tracking-[0.04em]">
						{label}
					</p>
					<EnrollButton kind={kind} slug={slug} variant="light">
						Enrol Free →
					</EnrollButton>
					<p className="mt-4 text-[0.84rem] text-[rgba(255,255,255,0.55)]">
						{note}
					</p>
				</div>
			</Container>
		</section>
	)
}
