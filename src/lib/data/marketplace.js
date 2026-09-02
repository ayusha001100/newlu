import { LUOpportunityData } from "@/lib/data/opportunities"

export const opportunitiesOf = type =>
	LUOpportunityData.filter(item => item.type === type)

export const uniqueValues = (records, field) =>
	[...new Set(records.map(item => item[field]))].sort()

export const postedLabel = days => {
	if (days === 0) return "Posted today"
	if (days === 1) return "Posted yesterday"
	return `Posted ${days} days ago`
}

export function opportunityQuery(values) {
	const params = new URLSearchParams()
	if (values.q) params.set("q", values.q)
	if (values.category) params.set("category", values.category)
	if (values.mode) params.set("mode", values.mode)
	if (values.location) params.set("location", values.location)
	if (values.experience) params.set("experience", values.experience)
	if (values.sort && values.sort !== "newest") {
		params.set("sort", values.sort)
	}
	return params.toString()
}

export function filterOpportunities(records, state) {
	const words = (state.query || "").toLowerCase().split(/\s+/).filter(Boolean)

	const matches = records.filter(item => {
		const haystack = [
			item.title,
			item.industry,
			item.category,
			item.location,
			item.mode,
			item.summary,
			...item.skills,
		]
			.join(" ")
			.toLowerCase()

		return (
			words.every(word => haystack.includes(word)) &&
			(!state.category || item.category === state.category) &&
			(!state.mode || item.mode === state.mode) &&
			(!state.location || item.location === state.location) &&
			(!state.experience || item.experience === state.experience)
		)
	})

	return [...matches].sort((left, right) => {
		if (state.sort === "compensation-high") {
			return right.compensationValue - left.compensationValue
		}
		if (state.sort === "title") {
			return left.title.localeCompare(right.title)
		}
		return left.postedDays - right.postedDays
	})
}

export const MARKETPLACE = {
	internship: {
		breadcrumb: "Internships",
		cardKicker: "How matching works",
		cardTitle: "Skills before labels.",
		ctaKicker: "Apply once. Reuse everywhere.",
		ctaTitle:
			"Your Career Passport carries your skills, projects and certificates.",
		description:
			"Find skill-based internships across AI, data, development, cybersecurity, cloud and marketing.",
		durationLabel: "Duration",
		emptyCopy: "Try a broader skill area or clear the location filter.",
		emptyTitle: "No internships match those filters",
		eyebrow: "Skill-first opportunities",
		filterHelp:
			"Build your Career Passport and let your verified skills explain the match.",
		filterHelpTitle: "Not sure what fits?",
		filterTitle: "Filter internships",
		headline: "Find an internship you are ready to",
		highlight: "prove yourself in.",
		lead: "Search by skill, location and work mode. Open a role to see exactly what you will do and what evidence you should bring.",
		nudgeCopy:
			"Browse roles here. Start a matching certification so your Career Passport has evidence when you apply.",
		nudgeTitle: "Apply with a project, not a blank form",
		path: "/internships",
		points: [
			"Clear role requirements",
			"One-click profile application",
			"No repeated forms",
		],
		pointsLabel: "Internship benefits",
		resultsKicker: "Available now",
		searchLabel: "Search internships",
		sortPay: "Highest stipend",
		steps: [
			{ n: "01", text: "Filter roles around the work you want." },
			{ n: "02", text: "Compare requirements with your projects." },
			{ n: "03", text: "Apply using one reusable career profile." },
		],
		title: "Skill-Based Internships for Students",
	},
	job: {
		breadcrumb: "Fresher jobs",
		cardKicker: "Before you apply",
		cardTitle: "Proof beats a long resume.",
		ctaKicker: "Show evidence, not just claims.",
		ctaTitle: "Build one Career Passport for every job application.",
		description:
			"Find fresher jobs across AI, data, development, cybersecurity, cloud and marketing.",
		durationLabel: "Employment",
		emptyCopy: "Try a broader skill area or clear the location filter.",
		emptyTitle: "No jobs match those filters",
		eyebrow: "Start your career",
		filterHelp:
			"Your Career Passport combines verified skills, projects, certificates and assessments.",
		filterHelpTitle: "Want stronger applications?",
		filterTitle: "Filter jobs",
		headline: "Find a first job built around what you can",
		highlight: "actually do.",
		lead: "Search entry-level roles by skill, location and work mode. Every listing explains the work, evidence and requirements before you apply.",
		nudgeCopy:
			"Browse roles here. Start a matching certification so you apply with a project, not only a resume.",
		nudgeTitle: "First jobs ask for proof",
		path: "/jobs",
		points: [
			"Fresher-friendly roles",
			"Clear skill expectations",
			"Reusable career profile",
		],
		pointsLabel: "Job search benefits",
		resultsKicker: "Fresher roles",
		searchLabel: "Search jobs",
		sortPay: "Highest salary",
		steps: [
			{
				n: "01",
				text: "Choose roles aligned with your strongest skills.",
			},
			{ n: "02", text: "Attach projects that prove those skills." },
			{ n: "03", text: "Prepare around the actual role requirements." },
		],
		title: "Fresher Jobs Across Tech & Business",
	},
}
