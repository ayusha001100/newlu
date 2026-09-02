import { isProfileComplete } from "@/lib/data/onboarding"

export const DEMO_OTP = "123456"

export const COUNTRIES = [
	{
		code: "+91",
		digitsOnly: true,
		flag: "🇮🇳",
		iso: "in",
		len: 10,
		name: "India",
		postalLabel: "Pincode",
		postalLen: 6,
	},
	{
		code: "+1",
		digitsOnly: true,
		flag: "🇺🇸",
		iso: "us",
		len: 10,
		name: "USA",
		postalLabel: "ZIP code",
		postalLen: 5,
	},
	{
		code: "+44",
		digitsOnly: false,
		flag: "🇬🇧",
		iso: "gb",
		len: 10,
		name: "UK",
		postalLabel: "Postcode",
		postalLen: 7,
	},
	{
		code: "+971",
		digitsOnly: true,
		flag: "🇦🇪",
		iso: null,
		len: 9,
		name: "UAE",
		postalLabel: "Pincode",
		postalLen: 6,
	},
	{
		code: "+65",
		digitsOnly: true,
		flag: "🇸🇬",
		iso: null,
		len: 8,
		name: "Singapore",
		postalLabel: "Postal code",
		postalLen: 6,
	},
	{
		code: "+61",
		digitsOnly: true,
		flag: "🇦🇺",
		iso: "au",
		len: 9,
		name: "Australia",
		postalLabel: "Postcode",
		postalLen: 4,
	},
	{
		code: "+49",
		digitsOnly: true,
		flag: "🇩🇪",
		iso: "de",
		len: 11,
		name: "Germany",
		postalLabel: "Postcode",
		postalLen: 5,
	},
	{
		code: "+81",
		digitsOnly: true,
		flag: "🇯🇵",
		iso: null,
		len: 10,
		name: "Japan",
		postalLabel: "Postal code",
		postalLen: 7,
	},
	{
		code: "+880",
		digitsOnly: true,
		flag: "🇧🇩",
		iso: null,
		len: 10,
		name: "Bangladesh",
		postalLabel: "Postcode",
		postalLen: 4,
	},
	{
		code: "+977",
		digitsOnly: true,
		flag: "🇳🇵",
		iso: null,
		len: 10,
		name: "Nepal",
		postalLabel: "Postal code",
		postalLen: 5,
	},
]

export const STATES = [
	"Andhra Pradesh",
	"Arunachal Pradesh",
	"Assam",
	"Bihar",
	"Chhattisgarh",
	"Delhi",
	"Goa",
	"Gujarat",
	"Haryana",
	"Himachal Pradesh",
	"Jharkhand",
	"Karnataka",
	"Kerala",
	"Madhya Pradesh",
	"Maharashtra",
	"Manipur",
	"Meghalaya",
	"Mizoram",
	"Nagaland",
	"Odisha",
	"Punjab",
	"Rajasthan",
	"Sikkim",
	"Tamil Nadu",
	"Telangana",
	"Tripura",
	"Uttar Pradesh",
	"Uttarakhand",
	"West Bengal",
	"Jammu & Kashmir",
	"Ladakh",
	"Puducherry",
	"Chandigarh",
	"Andaman & Nicobar Islands",
]

export const EDUCATION_LEVELS = [
	"Class 10 / Secondary",
	"Class 12 / Higher Secondary",
	"Diploma",
	"Undergraduate (pursuing)",
	"Undergraduate (completed)",
	"Postgraduate (pursuing)",
	"Postgraduate (completed)",
	"PhD / Doctorate",
]

export const INDIA_PIN_FALLBACK = {
	110001: { city: "New Delhi", state: "Delhi" },
	226001: { city: "Lucknow", state: "Uttar Pradesh" },
	302001: { city: "Jaipur", state: "Rajasthan" },
	380001: { city: "Ahmedabad", state: "Gujarat" },
	400001: { city: "Mumbai", state: "Maharashtra" },
	400051: { city: "Mumbai", state: "Maharashtra" },
	411001: { city: "Pune", state: "Maharashtra" },
	500001: { city: "Hyderabad", state: "Telangana" },
	560001: { city: "Bengaluru", state: "Karnataka" },
	560034: { city: "Bengaluru", state: "Karnataka" },
	600001: { city: "Chennai", state: "Tamil Nadu" },
	700001: { city: "Kolkata", state: "West Bengal" },
}

export const SEED_USER = {
	city: "Mumbai",
	college: "Mumbai University",
	country: "India",
	education: "Undergraduate (pursuing)",
	enrolled: ["generative-ai", "data-analytics"],
	goals: { "generative-ai": ["Get a job", "Certificate"] },
	interests: ["Generative AI", "Data Analytics"],
	mobile: "+919876543210",
	name: "Riya Sharma",
	pincode: "400001",
	profileComplete: true,
	purpose: "Get an internship",
	state: "Maharashtra",
	year: "2025",
}

export const ALLOWED_RETURN_PATHS = [
	"/learn",
	"/programs",
	"/internships",
	"/jobs",
]

export const countryByCode = code =>
	COUNTRIES.find(country => country.code === code) || COUNTRIES[0]

export const afterAuthPath = ({ enroll, returnTo, user }) => {
	if (enroll) return `/learn?course=${encodeURIComponent(enroll)}`
	if (user && !isProfileComplete(user)) return "/learn"
	const path = (returnTo || "").split("?")[0]
	if (path && ALLOWED_RETURN_PATHS.includes(path)) return returnTo
	if (user?.enrolled?.length) return "/learn"
	return "/programs"
}
