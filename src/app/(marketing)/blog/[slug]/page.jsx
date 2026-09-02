import { notFound } from "next/navigation"
import { BLOG_ARTICLES, getBlogArticle } from "@/lib/data/blog"
import BlogArticle from "@/organisms/blog-article"

export function generateStaticParams() {
	return BLOG_ARTICLES.map(article => ({ slug: article.slug }))
}

export async function generateMetadata({ params }) {
	const { slug } = await params
	const article = getBlogArticle(slug)
	if (!article) return { title: "Blog" }

	return {
		alternates: { canonical: article.canonical },
		description: article.description,
		openGraph: {
			description: article.description,
			images: [
				{
					alt: "Students learning career skills with LetsUpgrade",
					url: "/assets/letsupgrade-students-cutout.png",
				},
			],
			publishedTime: "2026-08-17",
			siteName: "LetsUpgrade",
			title: article.title,
			type: "article",
			url: article.canonical,
		},
		title: article.title,
		twitter: {
			card: "summary_large_image",
			description: article.description,
			images: ["/assets/letsupgrade-students-cutout.png"],
			title: article.title,
		},
	}
}

export default async function BlogArticlePage({ params }) {
	const { slug } = await params
	const article = getBlogArticle(slug)
	if (!article) notFound()
	return <BlogArticle article={article} />
}
