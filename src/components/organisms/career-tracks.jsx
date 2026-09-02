import Link from "next/link"
import Container from "@/atoms/container"
import Reveal from "@/atoms/reveal"
import { TRACK_HOME } from "@/lib/data/home"
import { PROGRAMS } from "@/lib/data/programs"
import ProgramCard from "@/molecules/program-card"
import SectionHead from "@/molecules/section-head"

export default function CareerTracks() {
	return (
		<section
			className="bg-[var(--bg-000)] py-[100px] max-[720px]:py-[68px]"
			id="tracks"
		>
			<Container>
				<SectionHead
					eyebrow="All free · All live"
					title="Choose Your Career Track"
				>
					Each track is free, runs live, and ends with a project plus
					a graded assessment. Pick by the job you want, not the
					subject you happened to like in college.
				</SectionHead>
				<div className="grid grid-cols-4 gap-5 max-[1100px]:grid-cols-3 max-[720px]:grid-cols-1 max-[980px]:grid-cols-2 max-[720px]:gap-4">
					{TRACK_HOME.map((track, index) => {
						const program = PROGRAMS[track.slug]
						return (
							<Reveal
								className="h-full"
								delay={(index % 4) * 80}
								key={track.slug}
							>
								<ProgramCard
									cta={track.cta}
									index={index}
									slug={track.slug}
									summary={track.summary}
									title={program.title}
								/>
							</Reveal>
						)
					})}
				</div>
				<p className="mt-7 text-center">
					<Link
						className="font-bold font-heading text-[0.95rem] text-brand-ink hover:text-ink-900"
						href="/programs"
					>
						Browse every track and bootcamp, with filters{" "}
						<span aria-hidden="true">→</span>
					</Link>
				</p>
			</Container>
		</section>
	)
}
