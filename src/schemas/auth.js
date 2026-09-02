import { z } from "zod"
import { COUNTRIES } from "@/lib/data/auth"

export const MobileSchema = z
	.object({
		countryCode: z.string(),
		digits: z.string().regex(/^\d+$/, "Enter digits only"),
	})
	.superRefine((value, ctx) => {
		const country = COUNTRIES.find(item => item.code === value.countryCode)
		const expected = country?.len || 10
		if (value.digits.length !== expected) {
			ctx.addIssue({
				code: "custom",
				message: `Please enter a valid ${expected}-digit mobile number.`,
				path: ["digits"],
			})
		}
	})

export const OtpSchema = z.object({
	mobile: z.string().min(8),
	otp: z.string().length(6, "Please enter all 6 digits."),
})
