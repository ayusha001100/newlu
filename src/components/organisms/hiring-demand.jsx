import Container from "@/atoms/container"
import Reveal from "@/atoms/reveal"
import { HIRING_COMPANIES } from "@/lib/data/home"
import HiringCard from "@/molecules/hiring-card"
import SectionHead from "@/molecules/section-head"

export default function HiringDemand() {
	return (
		<section
			aria-label="Hiring demand"
			className="overflow-hidden border-line border-b bg-[var(--bg-000)] pt-[88px] pb-14 max-[720px]:pt-14 max-[720px]:pb-9"
			id="hiring"
		>
			<Container>
				<SectionHead
					className="mb-11 max-w-[720px] max-[720px]:mb-[22px]"
					eyebrow="Hiring demand"
					title="Companies hiring these skills right now"
				>
					Tech and non-tech teams recruiting from our eight tracks.
					Openings move week to week — treat this as a map of where
					the skills land, not a live job board.
				</SectionHead>
			</Container>
			<Reveal
				className="relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-[2] before:w-[72px] before:bg-[linear-gradient(90deg,var(--bg-000),transparent)] before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-[2] after:w-[72px] after:bg-[linear-gradient(270deg,var(--bg-000),transparent)] after:content-[''] max-[720px]:after:w-9 max-[720px]:before:w-9"
				delay={100}
				variant="blur-up"
			>
				<div className="flex w-max animate-hiring will-change-transform motion-reduce:animate-none hover:[animation-play-state:paused]">
					{[0, 1].map(copy => (
						<div
							aria-hidden={copy === 1 || undefined}
							className="flex shrink-0 gap-3.5 px-2 py-1 pb-2"
							key={copy}
						>
							{HIRING_COMPANIES.map(company => (
								<HiringCard
									company={company}
									key={`${copy}-${company.name}`}
								/>
							))}
						</div>
					))}
				</div>
			</Reveal>
		</section>
	)
}
