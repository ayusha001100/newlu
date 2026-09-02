"use server"

import { cookies } from "next/headers"
import { fetchApi } from "@/services/fetch"

const SESSION_COOKIE = "lu_session"

const setSession = async mobile => {
	const store = await cookies()
	store.set(SESSION_COOKIE, mobile, {
		httpOnly: true,
		path: "/",
		sameSite: "lax",
	})
}

const clearSession = async () => {
	const store = await cookies()
	store.delete(SESSION_COOKIE)
}

export const sendOtp = async payload =>
	fetchApi("/api/auth/otp", { body: payload, method: "POST" })

export const verifyOtp = async payload => {
	const result = await fetchApi("/api/auth/verify", {
		body: payload,
		method: "POST",
	})
	if (!result.error && result.data?.user?.mobile) {
		await setSession(result.data.user.mobile)
	}
	return result
}

export const getSession = async () => {
	const store = await cookies()
	const mobile = store.get(SESSION_COOKIE)?.value
	if (!mobile) return { data: { user: null }, error: false, message: "" }
	return fetchApi(`/api/auth/session?mobile=${encodeURIComponent(mobile)}`)
}

export const logout = async () => {
	await clearSession()
	return { data: { user: null }, error: false, message: "" }
}
