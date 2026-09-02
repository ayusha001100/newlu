"use server"

import { cookies } from "next/headers"
import { updateProfileResult } from "@/lib/auth/handlers"
import { enrollUser, findUser, getOrCreateUser } from "@/lib/data/auth-users"
import {
	getCommunity,
	getProgress,
	saveProgramState,
	stateFor,
} from "@/lib/data/progress"
import { Engine } from "@/lib/learning/engine"

const SESSION_COOKIE = "lu_session"

const getUserFromSession = async () => {
	const store = await cookies()
	const mobile = store.get(SESSION_COOKIE)?.value
	if (!mobile) return null
	return findUser(mobile) || getOrCreateUser(mobile)
}

export const getLearnProgress = async () => {
	const user = await getUserFromSession()
	if (!user) return { data: null, error: true, message: "Not signed in" }

	const mobile = user.mobile
	const enrolled = user.enrolled || []
	const states = {}
	enrolled.forEach(slug => {
		states[slug] = stateFor(mobile, slug)
	})

	return {
		data: {
			community: getCommunity(mobile),
			progress: getProgress(mobile),
			states,
		},
		error: false,
		message: "",
	}
}

export const saveLearnProgress = async payload => {
	const user = await getUserFromSession()
	if (!user) return { data: null, error: true, message: "Not signed in" }

	const mobile = user.mobile
	const slug = payload?.slug
	if (!(slug && Engine.courseOf(slug))) {
		return { data: null, error: true, message: "Unknown program" }
	}

	const state = saveProgramState(mobile, slug, payload.state)
	return {
		data: { slug, state },
		error: false,
		message: "",
	}
}

export const enrollCourse = async payload => {
	const user = await getUserFromSession()
	if (!user) return { data: null, error: true, message: "Not signed in" }

	const slug = payload?.slug || ""
	if (!Engine.courseOf(slug)) {
		return { data: null, error: true, message: "Unknown program" }
	}

	const next = enrollUser(user, slug)
	const state = stateFor(user.mobile, slug)
	return {
		data: { state, user: next },
		error: false,
		message: "Enrolled",
	}
}

export const askTutor = async payload => {
	const user = await getUserFromSession()
	if (!user) return { data: null, error: true, message: "Not signed in" }

	const slug = payload?.slug || ""
	const question = payload?.question || ""
	const state = stateFor(user.mobile, slug)
	const reply = Engine.tutorReply(slug, state, question)

	return {
		data: { reply },
		error: false,
		message: "",
	}
}

export const updateLearner = async payload => {
	const user = await getUserFromSession()
	if (!user) return { data: null, error: true, message: "Not signed in" }
	const result = updateProfileResult(user.mobile, payload)
	return {
		data: result.data,
		error: result.error,
		message: result.message,
	}
}
