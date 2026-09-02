import { z } from "zod"
import {
	EDUCATION_OPTIONS,
	EXPERIENCE_OPTIONS,
	GRADUATION_YEARS,
	getGoalOptions,
	INTEREST_OPTIONS,
	PACKAGE_OPTIONS,
	WORKING_PROFESSIONAL,
} from "@/lib/data/onboarding"

export const OnboardingSchema = z
	.object({
		city: z.string().trim().min(2, "Enter your city."),
		college: z.string().trim().optional().or(z.literal("")),
		company: z.string().trim().optional().or(z.literal("")),
		currentPackage: z.string().optional().or(z.literal("")),
		education: z.enum(EDUCATION_OPTIONS, {
			message: "Select your education level.",
		}),
		experienceYears: z.string().optional().or(z.literal("")),
		interests: z
			.array(z.enum(INTEREST_OPTIONS))
			.min(1, "Pick at least one interest."),
		name: z
			.string()
			.trim()
			.min(2, "Enter your full name.")
			.max(60, "Keep your name under 60 characters."),
		purpose: z.string().min(1, "Select your primary goal."),
		year: z.string().optional().or(z.literal("")),
	})
	.superRefine((value, ctx) => {
		const allowedGoals = getGoalOptions(value.education).map(
			item => item.label,
		)
		if (!allowedGoals.includes(value.purpose)) {
			ctx.addIssue({
				code: "custom",
				message: "Select your primary goal.",
				path: ["purpose"],
			})
		}

		if (value.education === WORKING_PROFESSIONAL) {
			if (!value.company?.trim() || value.company.trim().length < 2) {
				ctx.addIssue({
					code: "custom",
					message: "Enter your company name.",
					path: ["company"],
				})
			}
			if (!EXPERIENCE_OPTIONS.includes(value.experienceYears || "")) {
				ctx.addIssue({
					code: "custom",
					message: "Select your years of experience.",
					path: ["experienceYears"],
				})
			}
			if (!PACKAGE_OPTIONS.includes(value.currentPackage || "")) {
				ctx.addIssue({
					code: "custom",
					message: "Select your current package.",
					path: ["currentPackage"],
				})
			}
			return
		}

		if (!value.college?.trim() || value.college.trim().length < 2) {
			ctx.addIssue({
				code: "custom",
				message: "Enter your college or university.",
				path: ["college"],
			})
		}
		if (!GRADUATION_YEARS.includes(value.year || "")) {
			ctx.addIssue({
				code: "custom",
				message: "Select your graduation year.",
				path: ["year"],
			})
		}
	})
