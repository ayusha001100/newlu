"use server"

import { cookies } from "next/headers"
import { updateProfileResult } from "@/lib/auth/handlers"
import { fetchApi } from "@/services/fetch"

const SESSION_COOKIE = "lu_session"

export const getLearnProgress = async () => {
	const store = await cookies()
	const mobile = store.get(SESSION_COOKIE)?.value
	if (!mobile) return { data: null, error: true, message: "Not signed in" }
	return fetchApi(`/api/learn/progress?mobile=${encodeURIComponent(mobile)}`)
}

export const saveLearnProgress = async payload => {
	const store = await cookies()
	const mobile = store.get(SESSION_COOKIE)?.value
	if (!mobile) return { data: null, error: true, message: "Not signed in" }
	return fetchApi("/api/learn/progress", {
		body: { ...payload, mobile },
		method: "POST",
	})
}

export const enrollCourse = async payload => {
	const store = await cookies()
	const mobile = store.get(SESSION_COOKIE)?.value
	if (!mobile) return { data: null, error: true, message: "Not signed in" }
	return fetchApi("/api/learn/enroll", {
		body: { ...payload, mobile },
		method: "POST",
	})
}

export const askTutor = async payload => {
	const store = await cookies()
	const mobile = store.get(SESSION_COOKIE)?.value
	if (!mobile) return { data: null, error: true, message: "Not signed in" }
	return fetchApi("/api/learn/tutor", {
		body: { ...payload, mobile },
		method: "POST",
	})
}

export const updateLearner = async payload => {
	const store = await cookies()
	const mobile = store.get(SESSION_COOKIE)?.value
	if (!mobile) return { data: null, error: true, message: "Not signed in" }
	const result = updateProfileResult(mobile, payload)
	return {
		data: result.data,
		error: result.error,
		message: result.message,
	}
}
