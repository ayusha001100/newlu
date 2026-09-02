import Container from "@/atoms/container"
import Reveal from "@/atoms/reveal"
import { BOOTCAMPS } from "@/lib/data/bootcamps"
import { BOOTCAMP_HOME } from "@/lib/data/home"
import BootcampCard from "@/molecules/bootcamp-card"
import SectionHead from "@/molecules/section-head"

export default function EntryBootcamps() {
	return (
		<section
			className="bg-[var(--bg-050)] py-[100px] max-[720px]:py-[68px]"
			id="courses"
		>
			<Container>
				<SectionHead
					eyebrow="Entry-level · Recorded"
					title="Start with one basic skill"
				>
					HTML bootcamps, Python and SQL certifications, and other
					beginner programs. Enrol free, then watch the recorded
					playlist in your Learning Centre — no live timetable.
				</SectionHead>
				<div className="grid grid-cols-3 gap-[18px] max-[720px]:grid-cols-1 max-[980px]:grid-cols-2">
					{BOOTCAMP_HOME.map((item, index) => {
						const bootcamp = BOOTCAMPS[item.slug]
						return (
							<Reveal
								className="h-full"
								delay={(index % 4) * 80}
								key={item.slug}
							>
								<BootcampCard
									credential={bootcamp.credential}
									cta={item.cta}
									duration={bootcamp.duration}
									logo={bootcamp.logo}
									modulesCount={bootcamp.modulesCount}
									slug={item.slug}
									summary={item.summary}
									title={bootcamp.title}
								/>
							</Reveal>
						)
					})}
				</div>
				<p className="mt-9 text-center text-[0.92rem] text-ink-500">
					Curriculum outlines are on each landing page. After you
					enrol, lessons play from the YouTube or Vimeo playlist for
					that program.
				</p>
			</Container>
		</section>
	)
}
