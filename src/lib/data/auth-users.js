import { SEED_USER } from "@/lib/data/auth"
import { codeFromMobile, isRefCode } from "@/lib/data/refer"

const users = new Map([[SEED_USER.mobile, structuredClone(SEED_USER)]])
const referralStats = new Map()

export const findUser = mobile => users.get(mobile) || null

export const saveUser = user => {
	users.set(user.mobile, user)
	return user
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
