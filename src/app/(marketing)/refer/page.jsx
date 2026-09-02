import { Suspense } from "react"
import { REFER } from "@/lib/data/refer"
import CtaBanner from "@/organisms/cta-banner"
import ReferPage from "@/organisms/refer-page"

export const metadata = {
	alternates: { canonical: REFER.canonical },
	description: REFER.description,
	openGraph: {
		description: REFER.ogDescription,
		images: [
			{
				alt: "Students learning career skills with LetsUpgrade",
				url: "/assets/letsupgrade-students-cutout.png",
			},
		],
		siteName: "LetsUpgrade",
		title: `${REFER.title} | LetsUpgrade`,
		type: "website",
		url: REFER.canonical,
	},
	title: REFER.title,
	twitter: {
		card: "summary_large_image",
		description: REFER.ogDescription,
		images: ["/assets/letsupgrade-students-cutout.png"],
		title: `${REFER.title} | LetsUpgrade`,
	},
}

export default function ReferRoute() {
	return (
		<>
			<Suspense>
				<ReferPage />
			</Suspense>
			<CtaBanner
				copy={REFER.ctaCopy}
				href="/programs"
				label={REFER.ctaLabel}
				title={REFER.ctaTitle}
			/>
		</>
	)
}
