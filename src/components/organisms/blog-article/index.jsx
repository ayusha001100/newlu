import Link from "next/link"
import Container from "@/atoms/container"
import CopyArticleLink from "@/organisms/blog-article/copy-link"
import { DataAnalystBody } from "@/organisms/blog-article/data-analyst"
import { GenerativeAiBody } from "@/organisms/blog-article/generative-ai"
import { InternshipBody } from "@/organisms/blog-article/internship"
import { PromptEngineeringBody } from "@/organisms/blog-article/prompt-engineering"
import { Button } from "@/ui/button"

const BODIES = {
	"data-analyst-roadmap": DataAnalystBody,
	"generative-ai-for-students": GenerativeAiBody,
	"how-to-get-an-internship": InternshipBody,
	"prompt-engineering-guide": PromptEngineeringBody,
}

export default function BlogArticle({ article }) {
	const Body = BODIES[article.slug]
	if (!Body) return null

	return (
		<div className="bg-[var(--bg-000)]">
			<header className="relative overflow-hidden border-[var(--line)] border-b bg-[var(--bg-050)] pt-32 pb-[68px] [background-image:radial-gradient(720px_380px_at_86%_15%,rgba(var(--brand-rgb),0.18),transparent_72%)] max-[720px]:pt-[108px] max-[720px]:pb-12">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(16,20,27,0.065)_1px,transparent_1px)] bg-size-[28px_28px] [mask-image:linear-gradient(90deg,#000,transparent_78%)]"
				/>
				<Container className="relative max-w-[940px]">
					<nav
						aria-label="Breadcrumb"
						className="mb-7 flex flex-wrap items-center gap-2 font-semibold text-[0.77rem] text-[var(--ink-500)]"
					>
						<Link className="hover:text-[var(--ink-900)]" href="/">
							Home
						</Link>
						<span>/</span>
						<Link
							className="hover:text-[var(--ink-900)]"
							href="/blog"
						>
							Blog
						</Link>
						<span>/</span>
						<span>{article.shortCrumb}</span>
					</nav>
					<span className="mb-[18px] inline-flex items-center gap-2.5 font-extrabold font-heading text-[0.76rem] text-[var(--brand-ink)] uppercase tracking-[0.11em] before:h-0.5 before:w-[26px] before:rounded-[2px] before:bg-[var(--brand-500)] before:content-['']">
						{article.category}
					</span>
					<h1 className="mb-6 max-w-[900px] text-[clamp(2.65rem,5.4vw,4.7rem)] leading-[1.04] max-[720px]:text-[2.5rem]">
						{article.title}
					</h1>
					<p className="max-w-[800px] text-[1.12rem] text-[var(--ink-500)] leading-[1.72] max-[720px]:text-base">
						{article.dek}
					</p>
					<div className="mt-[30px] flex flex-wrap items-center gap-2 gap-x-[18px] text-[0.78rem] text-[var(--ink-500)] [&>span+span]:before:mr-[18px] [&>span+span]:before:text-[var(--ink-300)] [&>span+span]:before:content-['·']">
						<span>
							By{" "}
							<strong className="text-[var(--ink-900)]">
								LetsUpgrade Editorial Team
							</strong>
						</span>
						<span>Published {article.published}</span>
						<span>{article.readTime}</span>
					</div>
				</Container>
			</header>

			<div className="py-16 max-[720px]:py-[42px]">
				<Container className="grid max-w-none grid-cols-[230px_minmax(0,760px)] justify-center gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-9">
					<aside className="sticky top-[104px] self-start rounded-2xl border border-[var(--line)] bg-[var(--bg-050)] p-5 max-[900px]:static max-[900px]:max-w-[760px]">
						<strong className="mb-3 block font-heading text-[0.8rem] text-[var(--ink-900)]">
							{article.tocTitle}
						</strong>
						<ol className="m-0 grid list-none gap-2.5 p-0">
							{article.toc.map(item => (
								<li key={item.href}>
									<a
										className="block text-[0.75rem] text-[var(--ink-500)] leading-[1.4] hover:text-[var(--brand-ink)]"
										href={item.href}
									>
										{item.label}
									</a>
								</li>
							))}
						</ol>
						<div className="mt-[18px] grid gap-2 border-[var(--line)] border-t pt-4 max-[900px]:grid-cols-2">
							<CopyArticleLink />
							<Button
								className="min-h-[38px] px-3 py-0 text-[0.72rem]"
								nativeButton={false}
								render={<Link href={article.cta.href} />}
								size="sm"
							>
								{article.cta.label}
							</Button>
						</div>
					</aside>

					<article className="min-w-0 text-[var(--ink-700)] text-base leading-[1.82] max-[720px]:text-[0.95rem] max-[720px]:leading-[1.75] [&>p:first-child]:text-[1.12rem] [&>p:first-child]:text-[var(--ink-900)] [&_code:not(.whitespace-pre-wrap)]:font-mono [&_code:not(.whitespace-pre-wrap)]:text-[0.9em] [&_h2]:mt-14 [&_h2]:mb-[18px] [&_h2]:scroll-mt-[110px] [&_h2]:pt-2 [&_h2]:text-[1.85rem] max-[720px]:[&_h2]:mt-11 max-[720px]:[&_h2]:text-[1.55rem] [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[1.25rem] max-[720px]:[&_h3]:text-[1.12rem] [&_li]:pl-[5px] [&_ol]:mb-6 [&_ol]:ml-[22px] [&_ol]:grid [&_ol]:list-decimal [&_ol]:gap-2.5 [&_p]:mb-[19px] [&_ul]:mb-6 [&_ul]:ml-[22px] [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-2.5">
						<Body />
					</article>
				</Container>
			</div>

			<section className="bg-[var(--ink-900)] py-16">
				<Container className="flex max-w-[980px] items-center justify-between gap-9 max-[720px]:flex-col max-[720px]:items-stretch">
					<div>
						<span className="font-extrabold text-[0.72rem] text-[var(--brand-400)] uppercase tracking-[0.09em]">
							{article.next.kicker}
						</span>
						<h2 className="mt-2 mb-0 max-w-[650px] text-[#fff] text-[1.75rem]">
							{article.next.title}
						</h2>
					</div>
					<Button
						className="max-[720px]:w-full"
						nativeButton={false}
						render={<Link href={article.next.href} />}
						variant="light"
					>
						{article.next.label}
					</Button>
				</Container>
			</section>
		</div>
	)
}
