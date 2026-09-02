import Link from "next/link"
import LandingSection from "@/atoms/landing-section"
import { PROJECT_SUBMIT } from "@/lib/data/landing"
import SectionHead from "@/molecules/section-head"
import { Button } from "@/ui/button"

export default function ProjectBlock({ extra, items, lead, title }) {
	return (
		<LandingSection alt id="project">
			<SectionHead
				eyebrow="Proof of work"
				title="The thing you'll actually show people"
			>
				Interviewers skim certificates. They ask questions about
				projects.
			</SectionHead>
			<div className="grid grid-cols-[1.5fr_0.9fr] items-stretch gap-6 max-[980px]:grid-cols-1">
				<div className="rounded-[24px] border border-line bg-[#fff] p-8 max-[720px]:p-5">
					<p className="mb-2.5 font-bold text-[0.78rem] text-ink-300 uppercase tracking-[0.08em]">
						Capstone project
					</p>
					<h3 className="mb-3 text-[1.7rem] max-[720px]:text-[1.35rem]">
						{title}
					</h3>
					<p className="mb-[22px] text-ink-500">{lead}</p>
					<div className="mb-5 flex flex-wrap gap-2.5">
						{items.map(item => (
							<span
								className="rounded-full border border-[var(--track-200)] bg-[var(--track-050)] px-3.5 py-2.5 font-bold text-[0.84rem] text-[var(--track-ink)]"
								key={item}
							>
								{item}
							</span>
						))}
					</div>
					<p className="mb-[22px] text-ink-700">{extra}</p>
					<Button
						nativeButton={false}
						render={<Link href="#curriculum" />}
						variant="outline"
					>
						See it in the curriculum
					</Button>
				</div>
				<div className="rounded-[24px] border border-line bg-[#fff] p-8 max-[720px]:p-4">
					<h4 className="mb-4">What you submit</h4>
					<ul className="flex flex-col gap-3">
						{PROJECT_SUBMIT.map(item => (
							<li
								className="relative pl-[22px] text-[0.95rem] text-ink-700 before:absolute before:top-2 before:left-0 before:size-1.5 before:rotate-45 before:rounded-[2px] before:bg-[var(--track-500)] before:content-['']"
								key={item}
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		</LandingSection>
	)
}
