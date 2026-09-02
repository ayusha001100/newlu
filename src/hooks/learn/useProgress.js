"use client"

import { useQuery } from "@tanstack/react-query"
import { getLearnProgress } from "@/actions/learn"

export const useProgress = enabled =>
	useQuery({
		enabled,
		queryFn: async () => {
			const result = await getLearnProgress()
			if (result.error) throw new Error(result.message)
			return result.data
		},
		queryKey: ["learn", "progress"],
	})
