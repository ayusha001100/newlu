"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import Container from "@/atoms/container"
import Highlight from "@/atoms/highlight"
import {
	BLOG_ARTICLES,
	BLOG_FILTERS,
	BLOG_HUB,
	BLOG_TOPICS,
	filterBlogArticles,
} from "@/lib/data/blog"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"

export default function BlogHub() {
	const featured = BLOG_ARTICLES.find(article => article.featured)
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()
	const topic = searchParams.get("topic") || "all"
	const filter = BLOG_TOPICS.find(item => item.id === topic)?.filter || topic
	const [query, setQuery] = useState("")

	const articles = useMemo(
		() => filterBlogArticles(BLOG_ARTICLES, { filter, query }),
		[filter, query],
	)

	const setTopic = next => {
		const params = new URLSearchParams(searchParams.toString())
		if (next === "all") params.delete("topic")
		else params.set("topic", next)
		const qs = params.toString()
		router.replace(
			qs ? `${pathname}?${qs}#articles` : `${pathname}#articles`,
			{
				scroll: false,
			},
		)
	}

	return (
		<div className="bg-[var(--bg-050)]">
			<section className="relative overflow-hidden border-[var(--line)] border-b bg-[var(--bg-000)] pt-[142px] pb-[82px] [background-image:radial-gradient(760px_420px_at_86%_18%,rgba(var(--brand-rgb),0.22),transparent_72%)] max-[720px]:pt-[112px] max-[720px]:pb-[58px]">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(16,20,27,0.065)_1px,transparent_1px)] bg-size-[28px_28px] [mask-image:linear-gradient(90deg,#000,transparent_78%)]"
				/>
				<Container className="relative grid grid-cols-[minmax(0,1.1fr)_minmax(320px,0.68fr)] items-center gap-[60px] max-[900px]:grid-cols-1 max-[900px]:gap-9">
					<div>
						<span className="mb-[18px] inline-flex items-center gap-2.5 font-extrabold font-heading text-[0.76rem] text-[var(--brand-ink)] uppercase tracking-[0.11em] before:h-0.5 before:w-[26px] before:rounded-[2px] before:bg-[var(--brand-500)] before:content-['']">
							{BLOG_HUB.kicker}
						</span>
						<h1 className="mb-[22px] max-w-[800px] text-[clamp(2.75rem,5vw,4.8rem)] leading-[1.02] max-[720px]:text-[2.65rem]">
							{BLOG_HUB.headline}{" "}
							<Highlight>{BLOG_HUB.highlight}</Highlight>
						</h1>
						<p className="max-w-[680px] text-[1.05rem] text-[var(--ink-500)] leading-[1.75]">
							{BLOG_HUB.lead}
						</p>
						<nav
							aria-label="Blog topics"
							className="mt-[30px] flex flex-wrap gap-2.5"
						>
							{BLOG_TOPICS.map(item => (
								<Link
									className="rounded-full border border-[var(--line)] bg-white/75 px-[13px] py-2 font-bold text-[0.78rem] text-[var(--ink-700)] hover:border-[var(--brand-200)] hover:bg-[var(--brand-050)] hover:text-[var(--brand-ink)]"
									href={`/blog?topic=${item.id}#articles`}
									key={item.id}
								>
									{item.label}
								</Link>
							))}
						</nav>
					</div>
					<figure className="m-0 aspect-4/3 overflow-hidden rounded-[22px] bg-[var(--bg-100)] shadow-lu-md max-[900px]:aspect-16/10 max-[900px]:max-w-[680px]">
						<Image
							alt={BLOG_HUB.imageAlt}
							className="size-full object-cover"
							height={900}
							priority
							src={BLOG_HUB.image}
							width={1200}
						/>
						<figcaption className="sr-only">
							Photo: Green Chameleon / Unsplash
						</figcaption>
					</figure>
				</Container>
			</section>

			<section className="py-16 max-[720px]:py-[42px]" id="articles">
				<Container>
					{featured ? (
						<article className="mb-[54px] grid grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--bg-000)] shadow-lu-md max-[720px]:mb-[42px] max-[900px]:grid-cols-1">
							<Link
								aria-label={`Read ${featured.cardTitle}`}
								className="relative block min-h-[420px] overflow-hidden bg-[var(--ink-900)] max-[720px]:min-h-[230px] max-[900px]:min-h-[300px]"
								href={`/blog/${featured.slug}`}
							>
								<Image
									alt={featured.imageAlt}
									className="absolute inset-0 size-full object-cover"
									height={900}
									src={featured.image}
									width={1200}
								/>
								<span className="absolute right-[22px] bottom-[22px] rounded-full border border-white/18 bg-white/9 px-[11px] py-[7px] font-bold text-[0.72rem] text-white/75">
									Featured guide
								</span>
							</Link>
							<div className="flex flex-col justify-center p-11 max-[720px]:px-[22px] max-[720px]:py-[26px]">
								<span className="mb-[11px] block font-extrabold text-[0.7rem] text-[var(--brand-ink)] uppercase tracking-[0.08em]">
									{featured.category}
								</span>
								<h2 className="mb-4 text-[clamp(1.75rem,3vw,2.55rem)]">
									{featured.cardTitle}
								</h2>
								<p className="text-[0.92rem] text-[var(--ink-500)] leading-[1.7]">
									{featured.featuredLead}
								</p>
								<div className="mt-[18px] mb-6 flex flex-wrap gap-x-3.5 gap-y-1.5 font-bold text-[0.72rem] text-[var(--ink-300)] [&>span+span]:before:mr-3.5 [&>span+span]:before:content-['·']">
									<span>{featured.readTime}</span>
									<span>Updated {featured.published}</span>
								</div>
								<Button
									className="self-start"
									nativeButton={false}
									render={
										<Link href={`/blog/${featured.slug}`} />
									}
								>
									Read the guide
								</Button>
							</div>
						</article>
					) : null}

					<div className="mb-7 flex items-center justify-between gap-5 max-[720px]:flex-col max-[720px]:items-stretch">
						<h2 className="text-[1.65rem]">
							Latest practical guides
						</h2>
						<div className="relative flex w-[min(100%,360px)] items-center max-[720px]:w-full">
							<svg
								aria-hidden="true"
								className="pointer-events-none absolute left-[15px] size-[18px] stroke-[var(--ink-500)]"
								fill="none"
								strokeWidth="1.8"
								viewBox="0 0 24 24"
							>
								<circle cx="11" cy="11" r="7" />
								<path d="m20 20-4-4" />
							</svg>
							<label className="sr-only" htmlFor="blog-search">
								Search articles
							</label>
							<Input
								className="min-h-12 rounded-xl border-[var(--line-strong)] bg-[var(--bg-000)] pr-3.5 pl-11 text-[0.85rem] shadow-lu-sm"
								id="blog-search"
								onChange={event => setQuery(event.target.value)}
								placeholder="Search guides"
								type="search"
								value={query}
							/>
						</div>
					</div>

					<nav
						aria-label="Filter articles"
						className="mb-6 flex flex-wrap gap-2"
					>
						{BLOG_FILTERS.map(item => {
							const active = filter === item.id
							return (
								<button
									aria-pressed={active}
									className={
										active
											? "min-h-10 rounded-full border border-[var(--ink-900)] bg-[var(--ink-900)] px-3.5 py-2 font-bold text-[#fff] text-[0.77rem]"
											: "min-h-10 rounded-full border border-[var(--line)] bg-[var(--bg-000)] px-3.5 py-2 font-bold text-[0.77rem] text-[var(--ink-500)] hover:border-[var(--ink-900)] hover:bg-[var(--ink-900)] hover:text-[#fff]"
									}
									key={item.id}
									onClick={() => setTopic(item.id)}
									type="button"
								>
									{item.label}
								</button>
							)
						})}
					</nav>

					<div className="grid grid-cols-2 gap-5 max-[720px]:grid-cols-1">
						{articles.map(article => (
							<article
								className="group flex min-h-[300px] flex-col rounded-[20px] border border-[var(--line)] bg-[var(--bg-000)] p-7 shadow-lu-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-[var(--brand-200)] hover:shadow-lu-md max-[720px]:min-h-[270px] max-[720px]:p-[22px]"
								key={article.slug}
							>
								<span className="mb-6 grid size-12 place-items-center rounded-[14px] border border-[var(--brand-200)] bg-[var(--brand-050)] font-extrabold font-heading text-[0.76rem] text-[var(--brand-ink)]">
									{article.icon}
								</span>
								<span className="mb-[11px] block font-extrabold text-[0.7rem] text-[var(--brand-ink)] uppercase tracking-[0.08em]">
									{article.category}
								</span>
								<h3 className="mb-3 max-w-[560px] text-[1.35rem]">
									{article.cardTitle}
								</h3>
								<p className="text-[0.86rem] text-[var(--ink-500)] leading-[1.65]">
									{article.excerpt}
								</p>
								<div className="mt-auto flex flex-wrap gap-x-3.5 gap-y-1.5 pt-[22px] font-bold text-[0.72rem] text-[var(--ink-300)] [&>span+span]:before:mr-3.5 [&>span+span]:before:content-['·']">
									<span>{article.readTime}</span>
									<span>{article.level}</span>
								</div>
								<Link
									className="mt-4 inline-flex items-center gap-[7px] font-extrabold text-[0.82rem] text-[var(--ink-900)] hover:no-underline [&>span]:text-[var(--brand-500)] [&>span]:transition-transform group-hover:[&>span]:translate-x-1"
									href={`/blog/${article.slug}`}
								>
									{article.linkLabel} <span>→</span>
								</Link>
							</article>
						))}
						{articles.length === 0 ? (
							<div className="col-span-full rounded-[18px] border border-[var(--line-strong)] border-dashed bg-[var(--bg-000)] px-6 py-[54px] text-center">
								<h3 className="mb-[5px]">
									No guide matches that search
								</h3>
								<p className="text-[0.85rem] text-[var(--ink-500)]">
									Try a broader topic such as AI, data or
									internships.
								</p>
							</div>
						) : null}
					</div>
				</Container>
			</section>
		</div>
	)
}
