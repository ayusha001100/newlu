import { enrollUser, findUser } from "@/lib/data/auth-users"
import { stateFor } from "@/lib/data/progress"
import { Engine } from "@/lib/learning/engine"

export async function POST(request) {
	const body = await request.json()
	const mobile = body.mobile || ""
	const slug = body.slug || ""
	const user = mobile ? findUser(mobile) : null
	if (!user) {
		return Response.json({ message: "Not signed in" }, { status: 401 })
	}
	if (!Engine.courseOf(slug)) {
		return Response.json({ message: "Unknown program" }, { status: 400 })
	}

	const next = enrollUser(user, slug)
	const state = stateFor(mobile, slug)
	return Response.json({
		message: "Enrolled",
		results: { state, user: next },
	})
}
