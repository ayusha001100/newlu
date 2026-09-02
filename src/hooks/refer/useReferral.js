"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { getReferral } from "@/actions/refer"
import { useSession } from "@/hooks/auth/useSession"
import { getGuestCode, localEnrolledFor } from "@/lib/data/refer"

export const useReferral = () => {
	const { data: session } = useSession()
	const signedIn = Boolean(session?.user)
	const query = useQuery({
		enabled: signedIn,
		queryFn: async () => {
			const result = await getReferral()
			if (result.error) throw new Error(result.message)
			return result.data
		},
		queryKey: ["refer", session?.user?.mobile],
	})

	const [guest, setGuest] = useState({ code: "", enrolled: 0 })

	useEffect(() => {
		if (signedIn) return
		const code = getGuestCode()
		setGuest({ code, enrolled: localEnrolledFor(code) })
	}, [signedIn])

	const origin = typeof window === "undefined" ? "" : window.location.origin
	const code = signedIn ? query.data?.code || "" : guest.code
	const enrolled = signedIn ? query.data?.enrolled || 0 : guest.enrolled

	return useMemo(
		() => ({
			code,
			enrolled,
			isPending: signedIn ? query.isPending : !guest.code,
			url: code && origin ? `${origin}/?ref=${code}` : "",
		}),
		[code, enrolled, guest.code, origin, query.isPending, signedIn],
	)
}
