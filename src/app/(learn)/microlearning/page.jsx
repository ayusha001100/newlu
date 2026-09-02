import { Suspense } from "react"
import Loading from "@/atoms/loading"
import MicroPlayer from "@/organisms/microlearning"

export const metadata = {
	description:
		"Interactive, gamified 7-day adaptive microlearning sprint for AI Product Management and Generative AI.",
	title: "AI Product Management — Adaptive Microlearning Engine | LetsUpgrade",
}

export default function MicrolearningPage() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-[60vh] items-center justify-center">
					<Loading />
				</div>
			}
		>
			<MicroPlayer />
		</Suspense>
	)
}
