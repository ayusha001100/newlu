"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { capturePendingRef } from "@/lib/data/refer"
import useLUStore from "@/store"

const QueryParamsProvider = () => {
	const searchParams = useSearchParams()

	const dispatch = useLUStore(store => store.dispatch)

	// biome-ignore lint/correctness/useExhaustiveDependencies: intentional — only re-sync on searchParams change
	useEffect(() => {
		dispatch({
			payload: { queryParams: Object.fromEntries(searchParams) },
			type: "SET_STATE",
		})
		capturePendingRef(searchParams.get("ref"))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

	return null
}

export default QueryParamsProvider
