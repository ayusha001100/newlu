import { Suspense } from "react"
import ProgramsCatalogue from "@/organisms/programs-catalogue"
import ProgramsHero from "@/organisms/programs-hero"

export const metadata = {
	alternates: { canonical: "https://letsupgrade.in/programs" },
	description:
		"Browse live career tracks and recorded bootcamps. Filter by format and skill area, then enrol in the program you want.",
	title: "Browse Certifications and Bootcamps",
}

export default function ProgramsPage() {
	return (
		<div className="bg-[var(--bg-050)]">
			<ProgramsHero />
			<Suspense>
				<ProgramsCatalogue />
			</Suspense>
		</div>
	)
}
