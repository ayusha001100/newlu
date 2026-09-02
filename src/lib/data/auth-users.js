import { isProfileComplete } from "@/lib/data/onboarding"
import { codeFromMobile, isRefCode } from "@/lib/data/refer"

const users = new Map()
const referralStats = new Map()

export const createBlankUser = mobile => ({
	city: "",
	college: "",
	country: "India",
	education: "",
	enrolled: [],
	goals: {},
	interests: [],
	mobile,
	name: "",
	profileComplete: false,
	purpose: "",
	state: "",
	year: "",
})

export const findUser = mobile => users.get(mobile) || null

export const saveUser = user => {
	users.set(user.mobile, user)
	return user
}

export const getOrCreateUser = mobile => {
	const existing = findUser(mobile)
	if (existing) return existing
	return saveUser(createBlankUser(mobile))
}

export const enrolledFor = code =>
	(code && referralStats.get(code)?.enrolled) || 0

export const ensureReferralCode = (user, guestCode) => {
	if (!user) return user
	if (!user.referralCode) {
		user.referralCode = guestCode || codeFromMobile(user.mobile)
	}
	return saveUser(user)
}

export const attachReferral = (user, { guestCode, referredBy } = {}) => {
	if (!user) return user
	ensureReferralCode(user, guestCode)
	const code = String(referredBy || "")
		.trim()
		.toUpperCase()
	if (isRefCode(code) && code !== user.referralCode && !user.referredBy) {
		user.referredBy = code
		const prev = referralStats.get(code) || { enrolled: 0 }
		referralStats.set(code, { enrolled: prev.enrolled + 1 })
	}
	return saveUser(user)
}

export const enrollUser = (user, slug) => {
	if (!user) return user
	user.enrolled = user.enrolled || []
	user.goals = user.goals || {}
	if (slug && !user.enrolled.includes(slug)) user.enrolled.push(slug)
	return saveUser(user)
}

export const updateUserProfile = (mobile, patch = {}) => {
	const user = findUser(mobile)
	if (!user) return null

	const next = {
		...user,
		city: patch.city ?? user.city,
		college: patch.college ?? user.college,
		country: patch.country ?? user.country ?? "India",
		education: patch.education ?? user.education,
		interests: patch.interests ?? user.interests,
		name: patch.name ?? user.name,
		purpose: patch.purpose ?? user.purpose,
		state: patch.state ?? user.state,
		year: patch.year ?? user.year,
	}

	if (patch.profileComplete != null) {
		next.profileComplete = patch.profileComplete
	} else {
		next.profileComplete = isProfileComplete(next)
	}

	return saveUser(next)
}
