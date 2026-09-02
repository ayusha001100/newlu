export const EDUCATION_OPTIONS = [
	"Undergraduate (pursuing)",
	"Undergraduate (completed)",
	"Postgraduate (pursuing)",
	"Postgraduate (completed)",
	"Working professional",
	"Other",
]

export const GRADUATION_YEARS = [
	"2024",
	"2025",
	"2026",
	"2027",
	"2028",
	"2029",
	"2030",
]

export const GOAL_OPTIONS = [
	{
		badge: "Skill Quest",
		detail: "Master tools, write working code & build hands-on projects",
		icon: "🎯",
		label: "Learn a skill",
	},
	{
		badge: "Portfolio Boost",
		detail: "Gain practical project evidence & verified work for my CV",
		icon: "💼",
		label: "Get an internship",
	},
	{
		badge: "Fast Referral",
		detail: "Prepare for high-growth tech & business roles at 450+ partners",
		icon: "🚀",
		label: "Get a job",
	},
	{
		badge: "Explore Path",
		detail: "Discover in-demand career paths and learn at my own pace",
		icon: "🧭",
		label: "Not sure yet",
	},
]

export const INTEREST_OPTIONS = [
	"Generative AI",
	"Data Analytics",
	"Web Development",
	"Cybersecurity",
	"Cloud & DevOps",
	"Digital Marketing",
	"Prompt Engineering",
	"UI / Design",
]

export const ONBOARD_STEPS = [
	{
		description: "This is how we greet you across Learning Centre.",
		fields: ["name"],
		id: "name",
		title: "What should we call you?",
	},
	{
		description: "Helps us tailor tracks and career guidance.",
		fields: ["education"],
		id: "education",
		title: "Where are you in your education?",
	},
	{
		description: "Shown on your student profile and career passport.",
		fields: ["college"],
		id: "college",
		title: "Which college or university?",
	},
	{
		description: "Used for internship and fresher-job timing tips.",
		fields: ["year"],
		id: "year",
		title: "Expected graduation year?",
	},
	{
		description: "City is enough — we default country to India.",
		fields: ["city"],
		id: "city",
		title: "Where are you based?",
	},
	{
		description: "Personalizes your Learning Centre home and nudges.",
		fields: ["purpose"],
		id: "purpose",
		title: "What is your primary goal?",
	},
	{
		description: "Pick at least one — you can edit later in Profile.",
		fields: ["interests"],
		id: "interests",
		title: "What are you most interested in?",
	},
]

export const isProfileComplete = user => {
	if (!user) return false
	if (user.profileComplete) return true
	return Boolean(
		user.name?.trim() &&
			user.education &&
			user.college?.trim() &&
			user.year &&
			user.city?.trim() &&
			user.purpose &&
			Array.isArray(user.interests) &&
			user.interests.length > 0,
	)
}

export const firstNameOf = user => {
	const name = String(user?.name || "").trim()
	if (!name) return "Learner"
	return name.split(/\s+/)[0]
}
