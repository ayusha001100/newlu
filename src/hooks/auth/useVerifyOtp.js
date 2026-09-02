"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { verifyOtp } from "@/actions/auth"

export const useVerifyOtp = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async payload => {
			const result = await verifyOtp(payload)
			if (result.error) throw new Error(result.message)
			return result.data
		},
		onSuccess: async data => {
			if (data?.user) {
				queryClient.setQueryData(["auth", "session"], {
					user: data.user,
				})
				await queryClient.invalidateQueries({
					queryKey: ["auth", "session"],
				})
			}
		},
	})
}
