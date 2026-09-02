"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateLearner } from "@/actions/learn"

export const useUpdateLearner = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async payload => {
			const result = await updateLearner(payload)
			if (result.error) throw new Error(result.message)
			return result.data
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["auth", "session"],
			})
		},
	})
}
