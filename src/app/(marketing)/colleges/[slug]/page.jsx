import { notFound } from "next/navigation"
import { COLLEGE_SLUGS, getCollegePage } from "@/lib/data/colleges"
import CollegePage from "@/organisms/college-page"

export function generateStaticParams() {
	return COLLEGE_SLUGS.map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
	const { slug } = await params
	const page = getCollegePage(slug)
	if (!page) return { title: "For Colleges" }

	return {
		alternates: { canonical: page.canonical },
		description: page.description,
		openGraph: {
			description: page.description,
			images: [
				{
					alt: "Students learning career skills with LetsUpgrade",
					url: "/assets/letsupgrade-students-cutout.png",
				},
			],
			siteName: "LetsUpgrade",
			title: page.title,
			type: "website",
			url: page.canonical,
		},
		title: page.title,
		twitter: {
			card: "summary_large_image",
			description: page.description,
			images: ["/assets/letsupgrade-students-cutout.png"],
			title: page.title,
		},
	}
}

export default async function CollegeSolutionPage({ params }) {
	const { slug } = await params
	const page = getCollegePage(slug)
	if (!page || slug === "hub") notFound()
	return <CollegePage page={page} />
}
