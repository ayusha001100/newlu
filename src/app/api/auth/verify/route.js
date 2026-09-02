import { DEMO_OTP, SEED_USER } from "@/lib/data/auth"
import { attachReferral, enrollUser, findUser } from "@/lib/data/auth-users"

export async function POST(request) {
	const body = await request.json()
	const otp = String(body.otp || "")
	const enroll = body.enroll || null

	if (otp.length !== 6) {
		return Response.json(
			{ message: "Please enter all 6 digits." },
			{ status: 400 },
		)
	}

	if (otp !== DEMO_OTP) {
		return Response.json(
			{ message: `Incorrect OTP. For this mockup, use ${DEMO_OTP}.` },
			{ status: 400 },
		)
	}

	const enrolled = enrollUser(findUser(SEED_USER.mobile) || SEED_USER, enroll)
	const user = attachReferral(enrolled, {
		guestCode: body.guestCode || "",
		referredBy: body.referredBy || "",
	})
	return Response.json({
		message: `Welcome back, ${user.name.split(" ")[0]}!`,
		results: { returning: true, user },
	})
}
