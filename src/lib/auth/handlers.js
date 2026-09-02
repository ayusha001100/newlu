import { DEMO_OTP, SEED_USER } from "@/lib/data/auth"
import { attachReferral, enrollUser, findUser } from "@/lib/data/auth-users"

export const sendOtpResult = body => {
	const mobile = String(body?.mobile || "")

	if (!mobile) {
		return {
			data: null,
			error: true,
			message: "Mobile number is required.",
			status: 400,
		}
	}

	return {
		data: {
			demoOtp: DEMO_OTP,
			mobile,
			returning: Boolean(findUser(mobile)),
		},
		error: false,
		message: `OTP sent — use ${DEMO_OTP}`,
		status: 200,
	}
}

export const verifyOtpResult = body => {
	const otp = String(body?.otp || "")
	const enroll = body?.enroll || null

	if (otp.length !== 6) {
		return {
			data: null,
			error: true,
			message: "Please enter all 6 digits.",
			status: 400,
		}
	}

	if (otp !== DEMO_OTP) {
		return {
			data: null,
			error: true,
			message: `Incorrect OTP. For this mockup, use ${DEMO_OTP}.`,
			status: 400,
		}
	}

	const enrolled = enrollUser(findUser(SEED_USER.mobile) || SEED_USER, enroll)
	const user = attachReferral(enrolled, {
		guestCode: body?.guestCode || "",
		referredBy: body?.referredBy || "",
	})

	return {
		data: { returning: true, user },
		error: false,
		message: `Welcome back, ${user.name.split(" ")[0]}!`,
		status: 200,
	}
}

export const sessionResult = mobile => {
	const value = String(mobile || "")
	const user = value ? findUser(value) : null

	return {
		data: { user },
		error: false,
		message: "",
		status: 200,
	}
}
