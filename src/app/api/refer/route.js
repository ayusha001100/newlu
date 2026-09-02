import {
	enrolledFor,
	ensureReferralCode,
	findUser,
} from "@/lib/data/auth-users"

export function GET(request) {
	const mobile = request.nextUrl.searchParams.get("mobile") || ""
	const user = mobile ? findUser(mobile) : null
	if (!user) {
		return Response.json({ message: "Not signed in" }, { status: 401 })
	}

	const next = ensureReferralCode(user)
	return Response.json({
		message: "",
		results: {
			code: next.referralCode,
			enrolled: enrolledFor(next.referralCode),
		},
	})
}
