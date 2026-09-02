import CareerTicker from "@/organisms/career-ticker"
import CareerTracks from "@/organisms/career-tracks"
import CtaBanner from "@/organisms/cta-banner"
import EntryBootcamps from "@/organisms/entry-bootcamps"
import FaqAccordion from "@/organisms/faq-accordion"
import Hero from "@/organisms/hero"
import HiringDemand from "@/organisms/hiring-demand"
import InternshipsPreview from "@/organisms/internships-preview"
import ReferStrip from "@/organisms/refer-strip"
import StudentJourney from "@/organisms/student-journey"
import StudentReviews from "@/organisms/student-reviews"
import WhyUs from "@/organisms/why-us"

export const metadata = {
	alternates: { canonical: "https://letsupgrade.in/" },
	description:
		"Free certifications for Indian college students. Finish a project, then apply to internships and fresher jobs from your Learning Centre.",
	openGraph: {
		description:
			"Free live certification tracks across AI, data, cloud, cybersecurity, development, marketing and sales.",
		images: [
			{
				alt: "Students learning career skills with LetsUpgrade",
				url: "/assets/letsupgrade-students-cutout.png",
			},
		],
		siteName: "LetsUpgrade",
		title: "Learn Skills. Build Projects. Get Hired. | LetsUpgrade",
		type: "website",
		url: "https://letsupgrade.in/",
	},
	title: "LetsUpgrade — Learn Skills. Get Internships. Get Hired.",
	twitter: {
		card: "summary_large_image",
		description:
			"Free live certifications with projects, assessments and career opportunities.",
		images: ["/assets/letsupgrade-students-cutout.png"],
		title: "Learn Skills. Build Projects. Get Hired. | LetsUpgrade",
	},
}

export default function Home() {
	return (
		<>
			<Hero />
			<CareerTicker />
			<HiringDemand />
			<CareerTracks />
			<EntryBootcamps />
			<StudentJourney />
			<WhyUs />
			<InternshipsPreview />
			<StudentReviews />
			<ReferStrip />
			<CtaBanner />
			<FaqAccordion />
		</>
	)
}
