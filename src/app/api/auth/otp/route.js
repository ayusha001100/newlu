import { DEMO_OTP } from "@/lib/data/auth"
import { findUser } from "@/lib/data/auth-users"

export async function POST(request) {
	const body = await request.json()
	const mobile = String(body.mobile || "")

	if (!mobile) {
		return Response.json(
			{ message: "Mobile number is required." },
			{ status: 400 },
		)
	}

	return Response.json({
		message: `OTP sent — use ${DEMO_OTP}`,
		results: {
			demoOtp: DEMO_OTP,
			mobile,
			returning: Boolean(findUser(mobile)),
		},
	})
}
