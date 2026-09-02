import { COLLEGE_PAGES } from "@/lib/data/colleges"
import CollegePage from "@/organisms/college-page"

const page = COLLEGE_PAGES.hub

export const metadata = {
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

export default function CollegesHubPage() {
	return <CollegePage page={page} />
}
