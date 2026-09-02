export const REF_CODE_RE = /^LU[A-Z0-9]{4,12}$/

export const GUEST_REF_KEY = "lu_guest_ref"
export const PENDING_REF_KEY = "lu_pending_ref"
export const REF_STATS_KEY = "lu_ref_stats"

export const REFER = {
	canonical: "https://letsupgrade.in/refer",
	ctaCopy:
		"Referrals land better when you are already in a track. Pick one, then share.",
	ctaLabel: "Choose a free certification",
	ctaTitle: "Have not started your own certification yet?",
	description:
		"Invite a classmate to a free LetsUpgrade certification. When they enrol, the invite is recorded on your Refer & Earn dashboard.",
	headline: "Bring a classmate. You both start",
	highlight: "free.",
	lead: "Share your personal link. When they enrol in a certification, the invite is counted on your dashboard. Reward fulfilment is confirmed in the Learning Centre — this page does not invent a cash amount.",
	ogDescription:
		"Share your link. Classmates start a free certification. You both get referral credit on your profile.",
	steps: [
		{
			copy: "It is unique to you. Login binds a guest link to your account so invites are not lost.",
			n: "01",
			title: "Copy your link",
		},
		{
			copy: "WhatsApp works. Tell them the certification is free and they pick the track themselves.",
			n: "02",
			title: "Send it to a classmate",
		},
		{
			copy: "They start a certification. You keep learning — and the invite shows on your profile.",
			n: "03",
			title: "They enrol. You both move.",
		},
	],
	title: "Refer & Earn",
}

export const isRefCode = value =>
	REF_CODE_RE.test(
		String(value || "")
			.trim()
			.toUpperCase(),
	)

export const codeFromMobile = mobile =>
	`LU${
		String(mobile || "")
			.replace(/\D/g, "")
			.slice(-6) || "GUEST"
	}`

export const makeGuestCode = () =>
	`LU${Math.random().toString(36).slice(2, 8).toUpperCase()}`

export const shareMessage = url =>
	`I'm doing a free LetsUpgrade certification. Start with me: ${url}`

export const whatsappShareHref = url =>
	`https://wa.me/?text=${encodeURIComponent(shareMessage(url))}`

export const capturePendingRef = raw => {
	if (typeof window === "undefined") return
	const code = String(raw || "")
		.trim()
		.toUpperCase()
	if (!isRefCode(code)) return
	sessionStorage.setItem(PENDING_REF_KEY, code)
}

export const readPendingRef = () => {
	if (typeof window === "undefined") return ""
	return (sessionStorage.getItem(PENDING_REF_KEY) || "").trim().toUpperCase()
}

export const clearPendingRef = () => {
	if (typeof window === "undefined") return
	sessionStorage.removeItem(PENDING_REF_KEY)
}

export const getGuestCode = () => {
	if (typeof window === "undefined") return ""
	let code = localStorage.getItem(GUEST_REF_KEY)
	if (!code) {
		code = makeGuestCode()
		localStorage.setItem(GUEST_REF_KEY, code)
	}
	return code
}

export const localEnrolledFor = code => {
	if (typeof window === "undefined" || !code) return 0
	try {
		const stats = JSON.parse(localStorage.getItem(REF_STATS_KEY) || "{}")
		return Number(stats[code]?.enrolled) || 0
	} catch {
		return 0
	}
}
