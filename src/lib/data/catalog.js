import { BOOTCAMPS } from "@/lib/data/bootcamps"
import { PROGRAMS } from "@/lib/data/programs"
import { trackOf } from "@/lib/data/tracks"

export const PROGRAM_SLUGS = Object.keys(PROGRAMS)
export const BOOTCAMP_SLUGS = Object.keys(BOOTCAMPS)

export const CATALOG_AREAS = [
	"AI",
	"Data",
	"Development",
	"Cybersecurity",
	"Cloud",
	"Marketing",
	"Sales",
	"Design",
	"Career",
]

export const CATALOG_FORMATS = [
	{ id: "", label: "All programs" },
	{ id: "live", label: "Live tracks" },
	{ id: "self-paced", label: "Recorded" },
]

export const CATALOG_AREA = {
	"ai-agents": "AI",
	canva: "Design",
	"cloud-devops": "Cloud",
	cybersecurity: "Cybersecurity",
	"data-analytics": "Data",
	"digital-marketing": "Marketing",
	excel: "Data",
	figma: "Design",
	"generative-ai": "AI",
	html: "Development",
	java: "Development",
	photoshop: "Design",
	"placement-prep": "Career",
	"prompt-engineering": "AI",
	python: "Development",
	react: "Development",
	"sales-gtm": "Sales",
	sql: "Data",
	"websites-apps-ai": "Development",
}

export const CATALOGUE = [
	...PROGRAM_SLUGS.map(slug => {
		const item = PROGRAMS[slug]
		return {
			area: CATALOG_AREA[slug] || "General",
			duration: item.duration,
			format: item.format,
			href: `/program/${slug}`,
			icon: item.icon,
			kind: "live",
			level: item.level,
			logo: item.logo,
			search: [
				item.title,
				item.tagline,
				item.certName,
				(item.tools || []).join(" "),
			]
				.join(" ")
				.toLowerCase(),
			slug,
			tagline: item.tagline,
			title: item.title,
		}
	}),
	...BOOTCAMP_SLUGS.map(slug => {
		const item = BOOTCAMPS[slug]
		return {
			area: CATALOG_AREA[slug] || "General",
			duration: item.duration,
			format: item.format,
			href: `/bootcamp/${slug}`,
			icon: item.icon,
			kind: "self-paced",
			level: item.level,
			logo: item.logo,
			search: [
				item.title,
				item.tagline,
				item.credential,
				(item.tools || []).join(" "),
			]
				.join(" ")
				.toLowerCase(),
			slug,
			tagline: item.tagline,
			title: item.title,
		}
	}),
]

export function filterCatalogue({ area = "", format = "", query = "" } = {}) {
	const q = query.trim().toLowerCase()
	return CATALOGUE.filter(item => {
		if (format && item.kind !== format) return false
		if (area && item.area !== area) return false
		if (q && !item.search.includes(q)) return false
		return true
	})
}

export function getProgram(id) {
	return PROGRAMS[id] ?? null
}

export function getBootcamp(id) {
	return BOOTCAMPS[id] ?? null
}

export function trackStyle(slug) {
	const track = trackOf(slug)

	return {
		"--track-050": track[50],
		"--track-100": track[100],
		"--track-200": track[200],
		"--track-400": track[400],
		"--track-500": track[500],
		"--track-600": track[600],
		"--track-ink": track.ink,
		"--track-rgb": track.rgb,
	}
}

export function topicCount(module) {
	const count = (module.sections || []).reduce(
		(total, section) => total + (section.points?.length || 0),
		0,
	)
	return count || 1
}
