"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import Logo from "@/atoms/logo"
import { useSendOtp } from "@/hooks/auth/useSendOtp"
import { useSession } from "@/hooks/auth/useSession"
import { useVerifyOtp } from "@/hooks/auth/useVerifyOtp"
import { afterAuthPath, countryByCode, DEMO_OTP } from "@/lib/data/auth"
import { BOOTCAMPS } from "@/lib/data/bootcamps"
import { PROGRAMS } from "@/lib/data/programs"
import { clearPendingRef, getGuestCode, readPendingRef } from "@/lib/data/refer"
import AuthMobileStep from "@/molecules/auth-mobile-step"
import AuthOtpStep from "@/molecules/auth-otp-step"
import { toast } from "@/ui/toast"

const catalogTitle = slug =>
	PROGRAMS[slug]?.title || BOOTCAMPS[slug]?.title || ""

export default function AuthCard() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const enroll = catalogTitle(searchParams.get("enroll") || "")
		? searchParams.get("enroll")
		: null
	const returnTo = searchParams.get("return")

	const { data: session } = useSession()
	const sendOtp = useSendOtp()
	const verifyOtp = useVerifyOtp()

	const [step, setStep] = useState("mobile")
	const [countryCode, setCountryCode] = useState("+91")
	const [digits, setDigits] = useState("")
	const [mobile, setMobile] = useState("")
	const [otp, setOtp] = useState("")
	const [resendLeft, setResendLeft] = useState(0)
	const [mobileError, setMobileError] = useState("")
	const [otpError, setOtpError] = useState("")
	const [verifySuccess, setVerifySuccess] = useState(false)

	const country = useMemo(() => countryByCode(countryCode), [countryCode])
	const subtitle = enroll
		? `Log in to enrol in ${catalogTitle(enroll)}. Then continue in your Learning Centre.`
		: returnTo
			? "Log in once to continue your opportunity application."
			: "Dummy login only. Use the demo OTP to open the Learning Centre."

	useEffect(() => {
		if (verifySuccess) return
		if (!session?.user) return
		router.replace(afterAuthPath({ enroll, returnTo, user: session.user }))
	}, [enroll, returnTo, router, session?.user, verifySuccess])

	useEffect(() => {
		if (resendLeft <= 0) return undefined
		const timer = setInterval(() => {
			setResendLeft(left => (left <= 1 ? 0 : left - 1))
		}, 1000)
		return () => clearInterval(timer)
	}, [resendLeft])

	const goNext = useCallback(
		user => {
			const path = afterAuthPath({ enroll, returnTo, user })
			router.replace(path)
		},
		[enroll, returnTo, router],
	)

	const onSendOtp = useCallback(
		event => {
			event.preventDefault()
			setMobileError("")
			if (digits.length !== country.len) {
				setMobileError(
					`Please enter a valid ${country.len}-digit mobile number.`,
				)
				return
			}

			const nextMobile = `${country.code}${digits}`
			sendOtp.mutate(
				{ countryCode: country.code, digits, mobile: nextMobile },
				{
					onError: error => setMobileError(error.message),
					onSuccess: () => {
						setMobile(nextMobile)
						setOtp("")
						setOtpError("")
						setVerifySuccess(false)
						setStep("otp")
						setResendLeft(30)
						toast.add({
							title: `OTP sent to ${country.code} ${digits} — use ${DEMO_OTP}`,
						})
					},
				},
			)
		},
		[country.code, country.len, digits, sendOtp],
	)

	const onVerify = useCallback(
		event => {
			event.preventDefault()
			if (verifyOtp.isPending || verifySuccess) return
			setOtpError("")

			const nextMobile =
				mobile || (digits ? `${country.code}${digits}` : "")
			if (!nextMobile) {
				setOtpError("Mobile number is missing. Go back and try again.")
				return
			}
			if (otp.length !== 6) {
				setOtpError("Please enter all 6 digits.")
				return
			}

			verifyOtp.mutate(
				{
					enroll,
					guestCode: getGuestCode(),
					mobile: nextMobile,
					otp,
					referredBy:
						readPendingRef() ||
						(searchParams.get("ref") || "").trim().toUpperCase(),
				},
				{
					onError: error => {
						setVerifySuccess(false)
						setOtpError(
							error.message ||
								"Could not verify OTP. Please try again.",
						)
					},
					onSuccess: data => {
						setVerifySuccess(true)
						clearPendingRef()
						const first = data.user?.name?.split(" ")[0]
						toast.add({
							title: first
								? `Welcome back, ${first}!`
								: "You're in — next, set up your profile.",
						})
						goNext(data.user)
					},
				},
			)
		},
		[
			country.code,
			digits,
			enroll,
			goNext,
			mobile,
			otp,
			searchParams,
			verifyOtp,
			verifySuccess,
		],
	)

	return (
		<div className="flex min-h-full flex-col justify-between py-2">
			<div className="mb-6 flex items-center justify-center lg:justify-start">
				<Logo
					className="justify-start [&_img]:h-[38px] [&_img]:w-auto"
					priority={true}
				/>
			</div>

			<div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-[0_15px_45px_rgba(0,0,0,0.06)] transition-all duration-300 sm:p-8 md:p-9">
				<div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500),var(--ink-900))]" />

				{step === "mobile" && (
					<AuthMobileStep
						countryCode={countryCode}
						digits={digits}
						error={mobileError}
						onCountryChange={value => {
							setCountryCode(value)
							setMobileError("")
						}}
						onDigitsChange={value => {
							setDigits(value)
							setMobileError("")
						}}
						onSubmit={onSendOtp}
						pending={sendOtp.isPending}
						subtitle={subtitle}
					/>
				)}
				{step === "otp" && (
					<AuthOtpStep
						countryCode={country.code}
						digits={digits}
						error={otpError}
						onBack={() => {
							setOtp("")
							setOtpError("")
							setVerifySuccess(false)
							setStep("mobile")
						}}
						onChange={value => {
							setOtp(value.replace(/\D/g, "").slice(0, 6))
							setOtpError("")
							setVerifySuccess(false)
						}}
						onResend={() => {
							sendOtp.mutate(
								{
									countryCode: country.code,
									digits,
									mobile:
										mobile || `${country.code}${digits}`,
								},
								{
									onSuccess: () => {
										setResendLeft(30)
										toast.add({
											title: `OTP resent — use ${DEMO_OTP}`,
										})
									},
								},
							)
						}}
						onSubmit={onVerify}
						otp={otp}
						pending={verifyOtp.isPending}
						resendLeft={resendLeft}
						resendPending={sendOtp.isPending}
						success={verifySuccess}
					/>
				)}
			</div>

			<div className="mt-8 flex items-center justify-between border-line border-t pt-4 text-[0.78rem] text-ink-400">
				<span>© 2026 LetsUpgrade</span>
				<Link
					className="font-medium transition-colors hover:text-ink-900"
					href="/"
				>
					← Back to homepage
				</Link>
			</div>
		</div>
	)
}
