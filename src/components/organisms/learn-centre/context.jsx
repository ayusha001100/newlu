"use client"

import { createContext, useContext } from "react"

export const LearnContext = createContext(null)

export function useLearn() {
	const value = useContext(LearnContext)
	if (!value) throw new Error("useLearn must be used inside LearnCentre")
	return value
}
