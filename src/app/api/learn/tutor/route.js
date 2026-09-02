import { findUser } from "@/lib/data/auth-users"
import { stateFor } from "@/lib/data/progress"
import { Engine } from "@/lib/learning/engine"

export async function POST(request) {
	const body = await request.json()
	const mobile = body.mobile || ""
	const slug = body.slug || ""
	const question = String(body.question || "").trim()
	const user = mobile ? findUser(mobile) : null
	if (!user) {
		return Response.json({ message: "Not signed in" }, { status: 401 })
	}
	if (!Engine.courseOf(slug)) {
		return Response.json({
			message: "",
			results: {
				body: [
					"Enrol in a certification and I can help with its topics, your progress and what to revise.",
				],
				source: null,
			},
		})
	}
	if (!question) {
		return Response.json({ message: "Ask a question" }, { status: 400 })
	}

	const reply = Engine.tutorReply(slug, stateFor(mobile, slug), question)
	return Response.json({
		message: "",
		results: reply,
	})
}
