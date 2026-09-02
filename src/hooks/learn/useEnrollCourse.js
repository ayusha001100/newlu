"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { enrollCourse } from "@/actions/learn"

export const useEnrollCourse = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async payload => {
			const result = await enrollCourse(payload)
			if (result.error) throw new Error(result.message)
			return result.data
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["auth", "session"],
			})
			await queryClient.invalidateQueries({
				queryKey: ["learn", "progress"],
			})
		},
	})
}
