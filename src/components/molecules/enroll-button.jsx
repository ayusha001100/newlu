"use client"

import { useRouter } from "next/navigation"
import { useSession } from "@/hooks/auth/useSession"
import { useEnrollCourse } from "@/hooks/learn/useEnrollCourse"
import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import { toast } from "@/ui/toast"

export default function EnrollButton({
	children = "Enrol Free",
	className,
	kind = "program",
	slug,
	variant = "default",
	...props
}) {
	const router = useRouter()
	const { data } = useSession()
	const enroll = useEnrollCourse()
	const signedIn = Boolean(data?.user)

	const onEnroll = () => {
		if (!signedIn) {
			toast.add({
				title:
					kind === "bootcamp"
						? "Please log in to enrol in this free program."
						: "Please log in to register for this free certification.",
				type: "info",
			})
			router.push(`/auth?enroll=${encodeURIComponent(slug)}`)
			return
		}

		enroll.mutate(
			{ slug },
			{
				onError: error => {
					toast.add({ title: error.message, type: "error" })
				},
				onSuccess: () => {
					toast.add({
						title:
							kind === "bootcamp"
								? "Enrolled! Opening your lessons…"
								: "Enrolled! Opening your learning centre…",
						type: "success",
					})
					router.push(`/learn?course=${encodeURIComponent(slug)}`)
				},
			},
		)
	}

	return (
		<Button
			className={cn(className)}
			disabled={enroll.isPending}
			onClick={onEnroll}
			type="button"
			variant={variant}
			{...props}
		>
			{children}
		</Button>
	)
}
