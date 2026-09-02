import { findUser, saveUser } from "@/lib/data/auth-users"

export async function POST(request) {
	const body = await request.json()
	const mobile = body.mobile || ""
	const user = mobile ? findUser(mobile) : null
	if (!user) {
		return Response.json({ message: "Not signed in" }, { status: 401 })
	}

	const next = saveUser({
		...user,
		college: body.college ?? user.college,
		degree: body.degree ?? user.degree,
		interests: body.interests ?? user.interests,
		lifeStage: body.lifeStage ?? user.lifeStage,
		purpose: body.purpose ?? user.purpose,
		year: body.year ?? user.year,
	})

	return Response.json({
		message: "",
		results: { user: next },
	})
}
