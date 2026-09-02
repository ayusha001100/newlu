import { z } from "zod"
import {
	EDUCATION_OPTIONS,
	GOAL_OPTIONS,
	GRADUATION_YEARS,
	INTEREST_OPTIONS,
} from "@/lib/data/onboarding"

const goalLabels = GOAL_OPTIONS.map(item => item.label)

export const OnboardingSchema = z.object({
	city: z.string().trim().min(2, "Enter your city."),
	college: z.string().trim().min(2, "Enter your college or university."),
	education: z.enum(EDUCATION_OPTIONS, {
		message: "Select your education level.",
	}),
	interests: z
		.array(z.enum(INTEREST_OPTIONS))
		.min(1, "Pick at least one interest."),
	name: z
		.string()
		.trim()
		.min(2, "Enter your full name.")
		.max(60, "Keep your name under 60 characters."),
	purpose: z.enum(goalLabels, {
		message: "Select your primary goal.",
	}),
	year: z.enum(GRADUATION_YEARS, {
		message: "Select your graduation year.",
	}),
})
