"use client"

import { useMutation } from "@tanstack/react-query"
import { askTutor } from "@/actions/learn"

export const useAskTutor = () =>
	useMutation({
		mutationFn: async payload => {
			const result = await askTutor(payload)
			if (result.error) throw new Error(result.message)
			return result.data
		},
	})
