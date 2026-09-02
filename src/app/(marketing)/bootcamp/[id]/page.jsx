import { notFound } from "next/navigation"
import { BOOTCAMP_SLUGS, getBootcamp, trackStyle } from "@/lib/data/catalog"
import { bootcampFaqs } from "@/lib/data/landing"
import BootcampFormat from "@/organisms/bootcamp-format"
import CatalogHero from "@/organisms/catalog-hero"
import CurriculumModules from "@/organisms/curriculum-modules"
import HighlightGrid from "@/organisms/highlight-grid"
import LandingFaq from "@/organisms/landing-faq"
import LandingFinal from "@/organisms/landing-final"
import ToolsGrid from "@/organisms/tools-grid"

export function generateStaticParams() {
	return BOOTCAMP_SLUGS.map(id => ({ id }))
}

export async function generateMetadata({ params }) {
	const { id } = await params
	const program = getBootcamp(id)
	if (!program) return { title: "Bootcamp" }

	const seo = program.seo || {}
	const url = `https://letsupgrade.in/bootcamp/${id}`

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
			title: seo.title || program.title,
			type: "website",
			url,
		},
		title: seo.title || program.title,
		twitter: {
			card: "summary_large_image",
			description: seo.description || program.tagline,
			images: ["/assets/letsupgrade-students-cutout.png"],
			title: seo.title || program.title,
		},
	}
}

export default async function BootcampPage({ params }) {
	const { id } = await params
	const program = getBootcamp(id)
	if (!program) notFound()

	return (
		<div style={trackStyle(id)}>
			<CatalogHero
				backHref="/programs?format=self-paced"
				backLabel="← All entry-level programs"
				badge="Free recorded program"
				chips={[
					"Free",
					program.credential,
					program.duration,
					program.modulesCount,
					program.level,
				]}
				headline={program.title}
				journey="Watch → Practise → Get certified"
				kicker={`Free · ${program.format} · ${program.level}`}
				kind="bootcamp"
				lead={program.tagline}
				note={`${program.format} · ${program.audience}`}
				panelItems={[
					`${program.duration} of recorded lessons`,
					`${program.modulesCount} you can reopen anytime`,
					"Progress tracked in your Learning Centre",
					"A certificate for finishing the playlist",
				]}
				promise={program.promise || program.tagline}
				slug={id}
			/>
			<HighlightGrid
				copy="Entry-level on purpose. You finish able to do these things without a live cohort."
				eyebrow="What you will be able to do"
				items={(program.outcomes || []).map(outcome => ({
					body: "Practised in the recorded lessons, then in a short exercise you do yourself.",
					title: outcome,
				}))}
				title={`What you will be able to do after ${program.title}`}
			/>
			<BootcampFormat />
			<CurriculumModules
				copy="Open a module for the topic list. This is the current beginner outline and will be replaced with the official curriculum when you send it. Lesson videos appear after you enrol."
				modules={program.curriculum || []}
				title={`Everything inside ${program.duration}`}
				variant="bootcamp"
			/>
			<ToolsGrid
				items={program.tools || []}
				title={`Tools used in ${program.title}`}
			/>
			<LandingFaq
				items={bootcampFaqs(program)}
				title="Before you enrol"
			/>
			<LandingFinal
				copy="Recorded, beginner-level, and enrolment takes about a minute."
				kind="bootcamp"
				label={program.title}
				note="No live timetable · Watch when you can"
				slug={id}
				title="Start this program free"
			/>
		</div>
	)
}
