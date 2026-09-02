"use client"

import Link from "next/link"
import { useState } from "react"
import Container from "@/atoms/container"
import Highlight from "@/atoms/highlight"
import { useReferral } from "@/hooks/refer/useReferral"
import { REFER, whatsappShareHref } from "@/lib/data/refer"
import { handleCopy } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"

export default function ReferPage() {
	const { enrolled, url } = useReferral()
	const [copied, setCopied] = useState(false)

	return (
		<div className="bg-[var(--bg-050)]">
			<section className="pt-32 pb-14 max-[720px]:pt-[108px] max-[720px]:pb-10">
				<Container>
					<nav
						aria-label="Breadcrumb"
						className="mb-6 flex items-center gap-2.5 font-semibold text-[0.82rem] text-[var(--ink-500)]"
					>
						<Link className="hover:text-[var(--ink-900)]" href="/">
							Home
						</Link>
						<span
							aria-hidden="true"
							className="text-[var(--ink-300)]"
						>
							/
						</span>
						<span>Refer & Earn</span>
					</nav>
					<span className="mb-[18px] inline-flex items-center gap-2.5 font-extrabold font-heading text-[0.76rem] text-[var(--brand-ink)] uppercase tracking-[0.11em] before:h-0.5 before:w-[26px] before:rounded before:bg-[var(--brand-500)] before:content-['']">
						Refer & Earn
					</span>
					<h1 className="mb-4 max-w-[18ch] text-[clamp(2.1rem,4.2vw,3.2rem)] leading-[1.08]">
						{REFER.headline}{" "}
						<Highlight>{REFER.highlight}</Highlight>
					</h1>
					<p className="mb-7 max-w-[58ch] text-[1.05rem] text-[var(--ink-500)] leading-[1.7]">
						{REFER.lead}
					</p>

					<div
						className="grid max-w-[720px] grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-white p-3 max-[720px]:grid-cols-1"
						id="share"
					>
						<label className="sr-only" htmlFor="refer-link">
							Your referral link
						</label>
						<Input
							className="min-h-12 rounded-xl border-[var(--line)] bg-[var(--bg-050)] px-3.5"
							id="refer-link"
							readOnly
							value={url}
						/>
						<Button
							className="max-[720px]:min-h-12 max-[720px]:w-full"
							onClick={() => {
								if (!url) return
								handleCopy({ setCopy: setCopied, text: url })
							}}
							type="button"
							variant="outline"
						>
							{copied ? "Copied" : "Copy link"}
						</Button>
						<Button
							className="max-[720px]:min-h-12 max-[720px]:w-full"
							disabled={!url}
							nativeButton={false}
							render={
								<a
									href={url ? whatsappShareHref(url) : "#"}
									rel="noopener noreferrer"
									target="_blank"
								/>
							}
						>
							Share on WhatsApp
						</Button>
					</div>
					{enrolled > 0 ? (
						<p className="mt-[22px] flex gap-7 font-bold text-[var(--ink-700)]">
							<strong className="font-heading text-[1.35rem] text-[var(--ink-900)]">
								{enrolled}
								<span className="mt-1 block font-semibold text-[0.75rem] text-[var(--ink-500)]">
									classmate{enrolled === 1 ? "" : "s"}{" "}
									enrolled
								</span>
							</strong>
						</p>
					) : null}
				</Container>
			</section>

			<section className="pt-0 pb-[88px] max-[720px]:pb-14">
				<Container>
					<div className="mt-12 mb-2 grid grid-cols-3 gap-4 max-[720px]:mt-6 max-[720px]:grid-cols-1">
						{REFER.steps.map(step => (
							<article
								className="rounded-2xl border border-[var(--line)] bg-white p-[22px]"
								key={step.n}
							>
								<b className="mb-2.5 block font-extrabold text-[0.72rem] text-[var(--brand-ink)] uppercase tracking-[0.1em]">
									{step.n}
								</b>
								<h3 className="mb-2 text-[1.05rem]">
									{step.title}
								</h3>
								<p className="text-[0.9rem] text-[var(--ink-500)]">
									{step.copy}
								</p>
							</article>
						))}
					</div>
				</Container>
			</section>
		</div>
	)
}
