"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout } from "@/actions/auth"
import useLUStore from "@/store"

export const useLogout = () => {
	const queryClient = useQueryClient()
	const dispatch = useLUStore(store => store.dispatch)

	return useMutation({
		mutationFn: async () => {
			const result = await logout()
			if (result.error) throw new Error(result.message)
			return result.data
		},
		onSuccess: async () => {
			dispatch({
				payload: { isAuthenticated: false, user: null },
				type: "SET_STATE",
			})
			await queryClient.invalidateQueries({
				queryKey: ["auth", "session"],
			})
		},
	})
}
