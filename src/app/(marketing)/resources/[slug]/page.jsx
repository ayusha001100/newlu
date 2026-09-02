import { notFound } from "next/navigation"
import { getResourcePage, RESOURCE_SLUGS } from "@/lib/data/resources"
import ResourcePage from "@/organisms/resource-page"

export function generateStaticParams() {
	return RESOURCE_SLUGS.map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
	const { slug } = await params
	const page = getResourcePage(slug)
	if (!page) return { title: "Resources" }

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

export default async function ResourceSlugPage({ params }) {
	const { slug } = await params
	const page = getResourcePage(slug)
	if (!page) notFound()
	return <ResourcePage page={page} />
}
