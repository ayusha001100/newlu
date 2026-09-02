import { notFound } from "next/navigation"
import { getProgram, PROGRAM_SLUGS, trackStyle } from "@/lib/data/catalog"
import { programFaqs } from "@/lib/data/landing"
import AssessmentBlock from "@/organisms/assessment-block"
import AudiencePanel from "@/organisms/audience-panel"
import CareerGrid from "@/organisms/career-grid"
import CatalogHero from "@/organisms/catalog-hero"
import CertificateBlock from "@/organisms/certificate-block"
import CurriculumModules from "@/organisms/curriculum-modules"
import HighlightGrid from "@/organisms/highlight-grid"
import LandingFaq from "@/organisms/landing-faq"
import LandingFinal from "@/organisms/landing-final"
import OutcomeGrid from "@/organisms/outcome-grid"
import ProjectBlock from "@/organisms/project-block"
import ProofRating from "@/organisms/proof-rating"
import ToolsGrid from "@/organisms/tools-grid"
import WhoGrid from "@/organisms/who-grid"

export function generateStaticParams() {
	return PROGRAM_SLUGS.map(id => ({ id }))
}

export async function generateMetadata({ params }) {
	const { id } = await params
	const program = getProgram(id)
	if (!program) return { title: "Program" }

	const seo = program.seo || {}
	const url = `https://letsupgrade.in/program/${id}`

	return {
		alternates: { canonical: url },
		description: seo.description || program.tagline,
		keywords: seo.keywords,
		openGraph: {
			description: seo.description || program.tagline,
			images: [
				{
					alt: "Students learning career skills with LetsUpgrade",
					url: "/assets/letsupgrade-students-cutout.png",
				},
			],
			siteName: "LetsUpgrade",
			title: seo.title || `${program.certName} Certification`,
			type: "website",
			url,
		},
		title: seo.title || `${program.certName} Certification`,
		twitter: {
			card: "summary_large_image",
			description: seo.description || program.tagline,
			images: ["/assets/letsupgrade-students-cutout.png"],
			title: seo.title || `${program.certName} Certification`,
		},
	}
}

export default async function ProgramPage({ params }) {
	const { id } = await params
	const program = getProgram(id)
	if (!program) notFound()

	const certName = program.certName || program.title
	const outcomes = program.outcomes || []
	const projects = program.projects || []
	const capstone = projects[projects.length - 1]
	const roles = program.roles || []

	return (
		<div style={trackStyle(id)}>
			<CatalogHero
				backHref="/programs"
				backLabel="← All programs"
				badge="Free live certification"
				chips={[
					"Live online",
					"Free",
					program.duration,
					program.level,
					"Certificate + project",
				]}
				headline={`${certName} Certification`}
				journey="Learn → Build → Intern → Get Hired"
				kind="program"
				lead={program.tagline}
				note={`${program.format} · Limited seats per live cohort`}
				panelItems={[
					"A verified certificate with your final score",
					...outcomes.slice(0, 2),
					capstone
						? `A portfolio project: ${capstone.title}`
						: "A practical portfolio project",
				]}
				promise={program.promise || program.tagline}
				slug={id}
			/>
			<HighlightGrid
				copy="Practical outcomes you can demonstrate after completing the program."
				items={outcomes.slice(0, 6).map(outcome => ({
					body: "Practised through guided work, independent application and feedback.",
					title: outcome,
				}))}
				title={`What you'll be able to do with ${program.title}`}
			/>
			<AudiencePanel
				copy={
					id === "generative-ai"
						? "One certification, but how you use it depends on what you do all day."
						: "The program is most useful when one of these descriptions sounds like you."
				}
				items={program.whoFor || []}
				slug={id}
				title={
					id === "generative-ai"
						? "Pick your stream. See what changes."
						: `Who gets the most from ${program.title}`
				}
			/>
			<OutcomeGrid
				items={outcomes}
				title={`${outcomes.length} outcomes you will be able to demonstrate`}
			/>
			{capstone ? (
				<ProjectBlock
					extra={
						<>
							<strong>Portfolio-ready evidence</strong> showing
							the problem, your approach and the result.
						</>
					}
					items={projects.map(project => project.title)}
					lead={capstone.desc}
					title={capstone.title}
				/>
			) : null}
			<ToolsGrid
				copy="The working toolkit used across the live sessions, exercises and project."
				items={program.tools || []}
				title={`Tools used in ${program.title}`}
			/>
			<CertificateBlock course={certName} />
			<CurriculumModules
				copy="Nothing hidden behind a “request syllabus” form. Open a module to see every topic and the hands-on activity that goes with it."
				modules={program.curriculum || []}
				title={`Everything inside ${program.duration}`}
			/>
			<AssessmentBlock grading={program.grading} note={program.salary} />
			<WhoGrid
				items={program.whoFor || []}
				note={`${program.level} · Designed for ${program.audience}`}
			/>
			<ProofRating />
			<CareerGrid
				items={roles.map(role => ({
					body: "A role where the skills and project evidence from this certification are directly relevant.",
					title: role,
				}))}
				slug={id}
			/>
			<LandingFaq
				items={programFaqs(id, program)}
				title="Questions students ask before registering"
			/>
			<LandingFinal
				copy="Free, live, and registration takes about a minute."
				label={`${certName} Certification`}
				note="Limited seats per live cohort"
				slug={id}
				title="The next cohort is open"
			/>
		</div>
	)
}
