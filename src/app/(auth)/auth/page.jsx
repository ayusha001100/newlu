import { Suspense } from "react"
import AuthCard from "@/organisms/auth-card"

export const metadata = {
	robots: { follow: false, index: false },
	title: "Log in",
}

export default function AuthPage() {
	return (
		<Suspense>
			<AuthCard />
		</Suspense>
	)
}
