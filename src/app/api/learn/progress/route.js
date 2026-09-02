import { findUser } from "@/lib/data/auth-users"
import {
	getCommunity,
	getProgress,
	saveProgramState,
	stateFor,
} from "@/lib/data/progress"
import { Engine } from "@/lib/learning/engine"

const userOf = mobile => {
	const user = mobile ? findUser(mobile) : null
	if (!user) return null
	return user
}

export function GET(request) {
	const mobile = request.nextUrl.searchParams.get("mobile") || ""
	const user = userOf(mobile)
	if (!user) {
		return Response.json({ message: "Not signed in" }, { status: 401 })
	}

	const enrolled = user.enrolled || []
	const states = {}
	enrolled.forEach(slug => {
		states[slug] = stateFor(mobile, slug)
	})

	return Response.json({
		message: "",
		results: {
			community: getCommunity(mobile),
			progress: getProgress(mobile),
			states,
		},
	})
}

export async function POST(request) {
	const body = await request.json()
	const mobile = body.mobile || ""
	const user = userOf(mobile)
	if (!user) {
		return Response.json({ message: "Not signed in" }, { status: 401 })
	}

	const slug = body.slug
	if (!(slug && Engine.courseOf(slug))) {
		return Response.json({ message: "Unknown program" }, { status: 400 })
	}

	const state = saveProgramState(mobile, slug, body.state)
	return Response.json({
		message: "",
		results: { slug, state },
	})
}
