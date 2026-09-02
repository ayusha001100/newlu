"use server"

import { cookies } from "next/headers"
import { fetchApi } from "@/services/fetch"

const SESSION_COOKIE = "lu_session"

export const getReferral = async () => {
	const store = await cookies()
	const mobile = store.get(SESSION_COOKIE)?.value
	if (!mobile) return { data: null, error: true, message: "Not signed in" }
	return fetchApi(`/api/refer?mobile=${encodeURIComponent(mobile)}`)
}
