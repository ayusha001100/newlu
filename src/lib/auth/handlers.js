import { DEMO_OTP } from "@/lib/data/auth"
import {
	attachReferral,
	enrollUser,
	findUser,
	getOrCreateUser,
	updateUserProfile,
} from "@/lib/data/auth-users"
import { firstNameOf, isProfileComplete } from "@/lib/data/onboarding"

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
	const mobile = String(body?.mobile || "")

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

	if (!mobile) {
		return {
			data: null,
			error: true,
			message: "Mobile number is required.",
			status: 400,
		}
	}

	const existing = findUser(mobile)
	const base = getOrCreateUser(mobile)
	const enrolled = enrollUser(base, enroll)
	const user = attachReferral(enrolled, {
		guestCode: body?.guestCode || "",
		referredBy: body?.referredBy || "",
	})

	const complete = isProfileComplete(user)
	const greeting = complete
		? `Welcome back, ${firstNameOf(user)}!`
		: "You're in — finish your profile to personalize Learning Centre."

	return {
		data: {
			needsOnboarding: !complete,
			returning: Boolean(existing),
			user,
		},
		error: false,
		message: greeting,
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

export const updateProfileResult = (mobile, body) => {
	const user = updateUserProfile(mobile, body)
	if (!user) {
		return {
			data: null,
			error: true,
			message: "Not signed in",
			status: 401,
		}
	}

	return {
		data: { user },
		error: false,
		message: "",
		status: 200,
	}
}
