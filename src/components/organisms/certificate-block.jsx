"use client"

import Image from "next/image"
import Eyebrow from "@/atoms/eyebrow"
import LandingSection from "@/atoms/landing-section"
import { CERT_INCLUDES } from "@/lib/data/landing"
import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import { toast } from "@/ui/toast"

export default function CertificateBlock({ course }) {
	const isLong = course.length > 26

	return (
		<LandingSection
			alt
			id="certificate"
			innerClassName="grid grid-cols-2 items-center gap-12 max-[980px]:grid-cols-1"
		>
			<figure className="m-0">
				<div className="relative overflow-hidden rounded-[18px] border border-line shadow-lu-lg [container-type:inline-size]">
					<Image
						alt="Sample LetsUpgrade certificate issued in collaboration with NSDC and ITM Edutech Training Pvt. Ltd."
						className="block h-auto w-full"
						height={990}
						src="/assets/certificate-template.png"
						width={1400}
					/>
					<span className="pointer-events-none absolute top-[23.2%] left-[40.1%] whitespace-nowrap font-heading font-semibold text-[#16181C] text-[4.4cqw] tracking-[-0.01em] [@container(max-width:470px)]:text-[max(4.4cqw,15px)]">
						Your Name
					</span>
					<span
						className={cn(
							"pointer-events-none absolute top-[46.2%] left-[40.1%] max-w-[57%] overflow-hidden text-ellipsis whitespace-nowrap font-heading font-semibold text-[#16181C] text-[4.4cqw] tracking-[-0.01em] [@container(max-width:470px)]:text-clip [@container(max-width:470px)]:whitespace-normal [@container(max-width:470px)]:text-[max(4.4cqw,13px)] [@container(max-width:470px)]:leading-[1.16]",
							isLong &&
								"top-[46.8%] text-[3.3cqw] [@container(max-width:470px)]:top-[45.4%] [@container(max-width:470px)]:text-[max(3.3cqw,12px)]",
						)}
					>
						{course}
					</span>
					<span className="pointer-events-none absolute top-[84.6%] left-[2.9%] font-bold font-heading text-[#fff] text-[1.32cqw] tracking-[0.02em] [@container(max-width:470px)]:hidden">
						DATE OF ISSUE: ON COMPLETION
					</span>
					<span className="pointer-events-none absolute top-[88.9%] left-[2.9%] font-bold font-heading text-[#fff] text-[1.32cqw] tracking-[0.02em] [@container(max-width:470px)]:hidden">
						CERTIFICATE NO: LU-XXXXXXXXXXXX
					</span>
					<span
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 overflow-hidden bg-[repeating-linear-gradient(-30deg,rgba(16,20,27,0.028)_0_14px,transparent_14px_44px)]"
					>
						<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-14deg] whitespace-nowrap font-extrabold font-heading text-[7cqw] text-[rgba(16,20,27,0.13)] uppercase tracking-[0.22em] [text-shadow:0_1px_0_rgba(255,255,255,0.55)] [@container(max-width:470px)]:text-[max(7cqw,26px)]">
							Sample
						</span>
					</span>
					<span className="absolute top-[3.2%] right-[2.2%] inline-flex items-center gap-1.5 rounded-full bg-[rgba(16,20,27,0.88)] px-[1.6cqw] py-[0.8cqw] font-extrabold font-heading text-[#fff] text-[1.5cqw] uppercase tracking-[0.14em] before:size-[0.7cqw] before:rounded-full before:bg-[var(--brand-500)] before:content-[''] [@container(max-width:470px)]:px-[11px] [@container(max-width:470px)]:py-[5px] [@container(max-width:470px)]:text-[10px] [@container(max-width:470px)]:tracking-[0.1em] [@container(max-width:470px)]:before:size-[5px]">
						Sample
					</span>
				</div>
				<figcaption className="mt-3.5 text-[0.82rem] text-ink-500 leading-[1.55]">
					Sample only. Your certificate carries your name, a unique
					credential ID and your final score, and stays verifiable at{" "}
					<a
						className="font-semibold text-[var(--track-ink)] hover:underline"
						href="https://www.letsupgrade.in/verify"
						rel="noopener noreferrer"
						target="_blank"
					>
						letsupgrade.in/verify
					</a>
					.
				</figcaption>
			</figure>
			<div>
				<Eyebrow>Credibility</Eyebrow>
				<h2 className="mb-3.5 text-[clamp(1.75rem,3.2vw,2.5rem)]">
					The certificate carries your score
				</h2>
				<p className="mt-3.5 mb-[22px] max-w-[520px] text-[1rem] text-ink-500">
					You earn it by finishing the modules, passing the exam and
					submitting a capstone that scores 60% or above. Issued in
					collaboration with NSDC and ITM Edutech Training.
				</p>
				<h3 className="mb-3 text-[1rem]">Your certificate includes</h3>
				<ul className="mb-6 grid grid-cols-2 gap-x-[18px] gap-y-2.5 max-[720px]:grid-cols-1">
					{CERT_INCLUDES.map(item => (
						<li
							className="relative pl-[22px] font-semibold text-[0.92rem] before:absolute before:left-0 before:font-extrabold before:text-[var(--track-600)] before:content-['✓']"
							key={item}
						>
							{item}
						</li>
					))}
				</ul>
				<Button
					onClick={() =>
						toast.add({
							title: "After you earn the certificate, you can add it to LinkedIn in one click.",
							type: "info",
						})
					}
					type="button"
					variant="outline"
				>
					Add to LinkedIn
				</Button>
			</div>
		</LandingSection>
	)
}
