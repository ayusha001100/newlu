"use server"

import { cookies } from "next/headers"
import {
	sendOtpResult,
	sessionResult,
	verifyOtpResult,
} from "@/lib/auth/handlers"

const SESSION_COOKIE = "lu_session"

const toClientResult = ({ status, ...result }) => result

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

export const sendOtp = async payload => toClientResult(sendOtpResult(payload))

export const verifyOtp = async payload => {
	const result = toClientResult(verifyOtpResult(payload))
	if (!result.error && result.data?.user?.mobile) {
		await setSession(result.data.user.mobile)
	}
	return result
}

export const getSession = async () => {
	const store = await cookies()
	const mobile = store.get(SESSION_COOKIE)?.value
	if (!mobile) return { data: { user: null }, error: false, message: "" }
	return toClientResult(sessionResult(mobile))
}

export const logout = async () => {
	await clearSession()
	return { data: { user: null }, error: false, message: "" }
}
