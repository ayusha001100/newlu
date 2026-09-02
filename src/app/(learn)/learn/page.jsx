import { Suspense } from "react"
import Loading from "@/atoms/loading"
import LearnCentre from "@/organisms/learn-centre"

export const metadata = {
	robots: { follow: false, index: false },
	title: "Learning Centre",
}

export default function LearnPage() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-[60vh] items-center justify-center">
					<Loading />
				</div>
			}
		>
			<LearnCentre />
		</Suspense>
	)
}
