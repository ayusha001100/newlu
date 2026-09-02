import { LUOpportunityData } from "@/lib/data/opportunities"
import { Engine } from "@/lib/learning/engine"

export const LEARN_TABS = [
	{ icon: "⚡", id: "home", label: "Dashboard" },
	{ icon: "📖", id: "learn", label: "Learn & Modules" },
	{ icon: "💼", id: "opportunities", label: "Job Matches" },
	{ icon: "🏆", id: "career", label: "Report Card" },
	{ icon: "👤", id: "profile", label: "Profile" },
]

export const LEARN_SUBS = {
	career: [
		{ id: "passport", label: "Report Card" },
		{ id: "skills", label: "Skills" },
		{ id: "assessments", label: "Assessments" },
	],
	learn: [
		{ id: "modules", label: "Modules" },
		{ id: "practice", label: "Practice" },
		{ id: "project", label: "Project" },
		{ id: "community", label: "Community" },
	],
}

export const PROGRAM_MARKET = {
	"ai-agents": "AI",
	"cloud-devops": "Cloud",
	cybersecurity: "Cybersecurity",
	"data-analytics": "Data",
	"digital-marketing": "Marketing",
	"generative-ai": "AI",
	"sales-gtm": "Marketing",
	"websites-apps-ai": "Development",
}

export const PURPOSES = [
	{
		detail: "I want to be good at something specific",
		label: "Learn a skill",
	},
	{ detail: "I need real experience on my CV", label: "Get an internship" },
	{ detail: "I'm applying for full-time roles", label: "Get a job" },
	{ detail: "Show me what's possible", label: "Not sure yet" },
]

export const initialsOf = name =>
	(name || "LU")
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map(part => part[0].toUpperCase())
		.join("") || "LU"

export const todayKey = () => new Date().toISOString().slice(0, 10)

export function streakDays(state) {
	let count = 0
	const day = new Date()
	for (;;) {
		const key = day.toISOString().slice(0, 10)
		if (!state?.activity?.[key]) break
		count += 1
		day.setDate(day.getDate() - 1)
	}
	return count
}

export function logActivity(state) {
	const key = todayKey()
	state.activity = state.activity || {}
	state.activity[key] = (state.activity[key] || 0) + 1
	return state
}

export function completeStage(state, moduleIndex, stageId) {
	const key = String(moduleIndex)
	const done = new Set(state.stages[key] || [])
	const wasNew = !done.has(stageId)
	done.add(stageId)
	state.stages[key] = [...done]
	if (wasNew) logActivity(state)
	return state
}

export function marketStats(slug) {
	if (Engine.isSelfPaced(slug)) {
		return {
			category: "Beginner",
			internships: 0,
			jobs: 0,
			listings: 0,
			openings: 0,
		}
	}
	const category = PROGRAM_MARKET[slug] || "General"
	const matches = LUOpportunityData.filter(item => item.category === category)
	const jobs = matches.filter(item => item.type === "job").length
	const internships = matches.filter(
		item => item.type === "internship",
	).length
	const openings = matches.reduce(
		(sum, item) => sum + (Number(item.openings) || 1),
		0,
	)
	return { category, internships, jobs, listings: matches.length, openings }
}

export function enrolledRows(enrolled, states) {
	return (enrolled || [])
		.filter(slug => Engine.courseOf(slug))
		.map(slug => {
			const progress = Engine.learningPct(
				slug,
				states[slug] || Engine.blankState(),
			)
			const market = marketStats(slug)
			return {
				...market,
				program: Engine.courseOf(slug),
				progress,
				remaining: Math.max(0, 100 - progress),
				score: Engine.isSelfPaced(slug)
					? progress * 2
					: progress * 2 + market.openings * 18,
				slug,
			}
		})
}

export function focusProgram(rows) {
	return [...rows].sort(
		(left, right) =>
			right.score - left.score ||
			right.progress - left.progress ||
			right.openings - left.openings,
	)[0]
}

export function focusReason(focus, rows) {
	if (Engine.isSelfPaced(focus.slug)) {
		return `Continue ${focus.program.title}. It is an entry-level recorded program — finish the playlist, then pick a live track if you want internships and a graded capstone.`
	}
	const others = rows.filter(row => row.slug !== focus.slug)
	const aheadOfOthers =
		others.length &&
		focus.progress > Math.max(...others.map(row => row.progress))
	const mostOpenings =
		!others.length ||
		focus.openings >= Math.max(...others.map(row => row.openings))
	const jobLabel = `${focus.openings} listed internship${focus.openings === 1 ? "" : "s"} and job${focus.openings === 1 ? "" : "s"} in ${focus.category}`
	if (aheadOfOthers && mostOpenings) {
		return `Our suggestion is you continue ${focus.program.title}. ${jobLabel} are already on the board, and you are ${focus.progress}% through — further than your other enrolled programs — so finishing this one is the shortest path to applying.`
	}
	if (aheadOfOthers) {
		return `Our suggestion is you continue ${focus.program.title}. You are already ${focus.progress}% complete, further than your other tracks, so the remaining work here gets you job-ready sooner.`
	}
	if (mostOpenings && focus.progress > 0) {
		return `Our suggestion is you continue ${focus.program.title}. ${jobLabel} are listed against this skill, and you already have ${focus.progress}% progress — that combination is the fastest route from here to an application.`
	}
	if (mostOpenings) {
		return `Our suggestion is you start with ${focus.program.title}. ${jobLabel} are listed against this skill, so time spent here converts into applications sooner than your other enrolled tracks.`
	}
	return `Our suggestion is you continue ${focus.program.title}. You are ${focus.progress}% through, with ${focus.remaining}% left before this becomes a complete job story.`
}

export function topicTotal(lesson) {
	return (lesson.sections || []).reduce(
		(n, section) => n + (section.points?.length || 0),
		0,
	)
}
