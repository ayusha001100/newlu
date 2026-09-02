"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { saveLearnProgress } from "@/actions/learn"

export const useSaveProgress = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async payload => {
			const result = await saveLearnProgress(payload)
			if (result.error) throw new Error(result.message)
			return result.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["learn", "progress"] })
		},
	})
}
