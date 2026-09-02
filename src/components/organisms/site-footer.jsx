import Link from "next/link"
import Container from "@/atoms/container"
import Logo from "@/atoms/logo"
import { Button } from "@/ui/button"

const SOCIALS = [
	{ href: "#", label: "LinkedIn", short: "in" },
	{ href: "#", label: "Instagram", short: "ig" },
	{ href: "#", label: "YouTube", short: "yt" },
	{ href: "#", label: "Twitter", short: "x" },
]

const CERTIFICATIONS = [
	{ href: "/programs", label: "All programs" },
	{
		href: "/program/generative-ai",
		label: "Generative AI & Prompt Engineering",
	},
	{
		href: "/program/data-analytics",
		label: "Data Analytics (Excel + SQL + Power BI)",
	},
	{
		href: "/program/cybersecurity",
		label: "Cybersecurity & Ethical Hacking",
	},
	{ href: "/program/digital-marketing", label: "Digital Marketing + AI" },
	{ href: "/bootcamp/html", label: "HTML Bootcamp" },
	{ href: "/bootcamp/python", label: "Python Certification" },
	{ href: "/bootcamp/sql", label: "SQL Certification" },
	{
		href: "/programs?format=self-paced",
		label: "All entry-level programs",
	},
]

const COMPANY = [
	{ href: "/blog", label: "Blog & Career Guides" },
	{ href: "/internships", label: "Internships" },
	{ href: "/jobs", label: "Fresher Jobs" },
	{ href: "/refer", label: "Refer & Earn" },
	{ href: "/colleges", label: "For Colleges" },
	{ href: "#", label: "About Us" },
	{ href: "#", label: "Careers" },
	{ href: "#", label: "Hiring Partners" },
	{ href: "#", label: "Contact" },
]

function FooterLinks({ heading, links }) {
	return (
		<div>
			<h4 className="mb-[18px] text-[0.9rem] text-white tracking-[-0.01em]">
				{heading}
			</h4>
			{links.map(link => (
				<Link
					className="mb-3 block text-[0.87rem] transition-[color,transform] hover:translate-x-0.5 hover:text-brand-400 max-[720px]:mb-0.5 max-[720px]:flex max-[720px]:min-h-[42px] max-[720px]:items-center"
					href={link.href}
					key={link.label}
				>
					{link.label}
				</Link>
			))}
		</div>
	)
}

export default function SiteFooter() {
	return (
		<footer className="bg-[var(--ink-900)] pt-[76px] text-white/60 max-[720px]:pt-12 max-[720px]:pb-7">
			<Container className="grid grid-cols-[1.4fr_1fr_1fr_1.3fr] gap-10 pb-[50px] max-[720px]:grid-cols-1 max-[980px]:grid-cols-2 max-[720px]:gap-7">
				<div>
					<Logo className="mb-4" inverted />
					<p className="mb-5 max-w-[260px] text-[0.88rem]">
						LetsUpgrade is where Indian college students, freshers
						and early working professionals enrol in certifications
						to get more skilled and grow in their career.
					</p>
					<div className="flex gap-2.5">
						{SOCIALS.map(social => (
							<a
								aria-label={social.label}
								className="grid size-9 place-items-center rounded-[10px] border border-white/10 bg-white/6 font-bold text-[0.76rem] uppercase transition-colors hover:border-brand-500 hover:bg-brand-500 hover:text-on-brand"
								href={social.href}
								key={social.label}
							>
								{social.short}
							</a>
						))}
					</div>
				</div>
				<FooterLinks heading="Certifications" links={CERTIFICATIONS} />
				<FooterLinks heading="Company" links={COMPANY} />
				<div>
					<h4 className="mb-[18px] text-[0.9rem] text-white tracking-[-0.01em]">
						Get started now
					</h4>
					<p className="mb-4 max-w-[260px] text-[0.85rem]">
						Choose a certification first. Login takes about a minute
						when you enrol.
					</p>
					<Button
						className="min-h-[46px] w-fit hover:translate-y-0 max-[720px]:min-h-[50px] max-[720px]:w-full"
						nativeButton={false}
						render={<Link href="/programs" />}
					>
						Choose a certification
					</Button>
				</div>
			</Container>
			<div className="border-white/10 border-t py-[22px] text-center text-[0.8rem]">
				<Container>
					<p>
						© 2026 LetsUpgrade. All rights reserved. (Part of ITM
						Group)
					</p>
				</Container>
			</div>
		</footer>
	)
}
