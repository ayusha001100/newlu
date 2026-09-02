import { Suspense } from "react"
import { BLOG_HUB } from "@/lib/data/blog"
import BlogHub from "@/organisms/blog-hub"

export const metadata = {
	alternates: { canonical: BLOG_HUB.canonical },
	description: BLOG_HUB.description,
	openGraph: {
		description: BLOG_HUB.description,
		images: [
			{
				alt: BLOG_HUB.imageAlt,
				url: BLOG_HUB.image,
			},
		],
		siteName: "LetsUpgrade",
		title: BLOG_HUB.title,
		type: "website",
		url: BLOG_HUB.canonical,
	},
	title: BLOG_HUB.title,
	twitter: {
		card: "summary_large_image",
		description: BLOG_HUB.description,
		images: [BLOG_HUB.image],
		title: BLOG_HUB.title,
	},
}

export default function BlogPage() {
	return (
		<Suspense>
			<BlogHub />
		</Suspense>
	)
}
