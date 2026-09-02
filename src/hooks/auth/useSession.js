"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { getSession } from "@/actions/auth"
import useLUStore from "@/store"

export const useSession = () => {
	const dispatch = useLUStore(store => store.dispatch)
	const query = useQuery({
		queryFn: async () => {
			const result = await getSession()
			if (result.error) throw new Error(result.message)
			return result.data
		},
		queryKey: ["auth", "session"],
	})

	useEffect(() => {
		dispatch({
			payload: {
				isAuthenticated: Boolean(query.data?.user),
				user: query.data?.user ?? null,
			},
			type: "SET_STATE",
		})
	}, [dispatch, query.data])

	return query
}
