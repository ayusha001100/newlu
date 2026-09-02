export const EDUCATION_OPTIONS = [
	"Undergraduate (pursuing)",
	"Undergraduate (completed)",
	"Postgraduate (pursuing)",
	"Postgraduate (completed)",
	"Working professional",
	"Other",
]

export const WORKING_PROFESSIONAL = "Working professional"

export const GRADUATION_YEARS = [
	"2024",
	"2025",
	"2026",
	"2027",
	"2028",
	"2029",
	"2030",
]

export const EXPERIENCE_OPTIONS = [
	"0–1 years",
	"1–3 years",
	"3–5 years",
	"5–8 years",
	"8+ years",
]

export const PACKAGE_OPTIONS = [
	"Below 3 LPA",
	"3–6 LPA",
	"6–10 LPA",
	"10–15 LPA",
	"15–25 LPA",
	"25+ LPA",
	"Prefer not to say",
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

export const PRO_GOAL_OPTIONS = [
	{
		badge: "Switch Track",
		detail: "Move into a better role, company, or domain with proof of skill",
		icon: "🔄",
		label: "Get a job switch",
	},
	{
		badge: "Level Up",
		detail: "Grow into a senior / lead role with stronger delivery proof",
		icon: "📈",
		label: "Get a promotion",
	},
	{
		badge: "Skill Upgrade",
		detail: "Learn AI and modern tools to stay competitive at work",
		icon: "⚡",
		label: "Upskill for my current role",
	},
	{
		badge: "Career Pivot",
		detail: "Explore a new path while keeping your professional edge",
		icon: "🧭",
		label: "Exploring next moves",
	},
]

export const INTEREST_OPTIONS = [
	// AI & automation
	"Generative AI",
	"Prompt Engineering",
	"AI Agents & Automation",
	"Machine Learning",
	"AI App Development",
	// Data
	"Data Analytics",
	"Business Analytics",
	"Excel & Spreadsheets",
	"SQL & Databases",
	"Power BI / Tableau",
	// Development
	"Web Development",
	"App Development",
	"Python Programming",
	"Java Programming",
	"React / Frontend",
	"Backend Development",
	// Cloud & security
	"Cloud & DevOps",
	"Cybersecurity",
	"Ethical Hacking",
	// Marketing & growth
	"Digital Marketing",
	"Social Media Marketing",
	"Performance Marketing",
	"SEO & Content SEO",
	"Content Marketing",
	"Brand Marketing",
	"Email Marketing",
	// Creative & editing
	"Content Writing",
	"Video Editing",
	"Photo Editing",
	"Graphic Design",
	"UI / UX Design",
	"Canva & Design Tools",
	"Motion Graphics",
	// Business & career
	"Sales & Business Development",
	"Product Management",
	"Project Management",
	"HR & Talent",
	"Finance & Accounting",
	"Entrepreneurship",
	"Communication Skills",
	"Placement Prep",
]

const SHARED_TAIL = [
	{
		description: "City is enough — we default country to India.",
		fields: ["city"],
		id: "city",
		title: "Where are you based?",
	},
	{
		description: "Pick at least one — you can edit later in Profile.",
		fields: ["interests"],
		id: "interests",
		title: "What are you most interested in?",
	},
]

const STUDENT_PURPOSE_STEP = {
	description: "Personalizes your Learning Centre home and nudges.",
	fields: ["purpose"],
	goals: GOAL_OPTIONS,
	id: "purpose",
	title: "What is your primary goal?",
}

const PRO_PURPOSE_STEP = {
	description: "We’ll tailor Learning Centre nudges for your career move.",
	fields: ["purpose"],
	goals: PRO_GOAL_OPTIONS,
	id: "purpose",
	title: "What’s your next career move?",
}

const BASE_STEPS = [
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
]

const STUDENT_STEPS = [
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
]

const PRO_STEPS = [
	{
		description: "Helps us match role-ready tracks and hiring partners.",
		fields: ["company"],
		id: "company",
		title: "Which company do you work at?",
	},
	{
		description: "We use this to recommend the right skill depth.",
		fields: ["experienceYears"],
		id: "experienceYears",
		title: "How many years of experience?",
	},
	{
		description: "Optional context for career and upskilling advice.",
		fields: ["currentPackage"],
		id: "currentPackage",
		title: "What is your current package?",
	},
]

/** @deprecated use getOnboardSteps — kept for imports that expect a static list */
export const ONBOARD_STEPS = [
	...BASE_STEPS,
	...STUDENT_STEPS,
	SHARED_TAIL[0],
	STUDENT_PURPOSE_STEP,
	SHARED_TAIL[1],
]

export const isWorkingProfessional = education =>
	education === WORKING_PROFESSIONAL

export const getGoalOptions = education =>
	isWorkingProfessional(education) ? PRO_GOAL_OPTIONS : GOAL_OPTIONS

export const getOnboardSteps = education => {
	const isPro = isWorkingProfessional(education)
	return [
		...BASE_STEPS,
		...(isPro ? PRO_STEPS : STUDENT_STEPS),
		SHARED_TAIL[0],
		isPro ? PRO_PURPOSE_STEP : STUDENT_PURPOSE_STEP,
		SHARED_TAIL[1],
	]
}

export const isProfileComplete = user => {
	if (!user) return false
	if (user.profileComplete) return true

	const shared = Boolean(
		user.name?.trim() &&
			user.education &&
			user.city?.trim() &&
			user.purpose &&
			Array.isArray(user.interests) &&
			user.interests.length > 0,
	)
	if (!shared) return false

	if (isWorkingProfessional(user.education)) {
		return Boolean(
			user.company?.trim() && user.experienceYears && user.currentPackage,
		)
	}

	return Boolean(user.college?.trim() && user.year)
}

export const firstNameOf = user => {
	const name = String(user?.name || "").trim()
	if (!name) return "Learner"
	return name.split(/\s+/)[0]
}
