"use client"

import { useMutation } from "@tanstack/react-query"
import { sendOtp } from "@/actions/auth"

export const useSendOtp = () =>
	useMutation({
		mutationFn: async payload => {
			const result = await sendOtp(payload)
			if (result.error) throw new Error(result.message)
			return result.data
		},
	})
