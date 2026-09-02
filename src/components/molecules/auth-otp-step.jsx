"use client"

import { useEffect, useRef } from "react"
import AuthStepDots from "@/atoms/auth-step-dots"
import { DEMO_OTP } from "@/lib/data/auth"
import { cn } from "@/lib/utils"
import OtpField from "@/molecules/otp-field"
import { Button } from "@/ui/button"

export default function AuthOtpStep({
	countryCode,
	digits,
	error,
	onBack,
	onChange,
	onResend,
	onSubmit,
	otp,
	pending,
	resendLeft,
	resendPending,
	success = false,
}) {
	const hasAutoSubmitted = useRef(false)
	const onSubmitRef = useRef(onSubmit)

	useEffect(() => {
		onSubmitRef.current = onSubmit
	}, [onSubmit])

	// Auto-submit once when 6 digits are ready. Keep submit fn in a ref so
	// parent re-renders cannot cancel the timer before it fires.
	useEffect(() => {
		if (otp.length < 6) {
			hasAutoSubmitted.current = false
			return undefined
		}
		if (hasAutoSubmitted.current || pending || success) return undefined

		hasAutoSubmitted.current = true
		const timer = setTimeout(() => {
			onSubmitRef.current({ preventDefault() {} })
		}, 280)
		return () => clearTimeout(timer)
	}, [otp, pending, success])

	useEffect(() => {
		if (error) hasAutoSubmitted.current = false
	}, [error])

	const handleQuickFill = () => {
		hasAutoSubmitted.current = false
		let current = ""
		DEMO_OTP.split("").forEach((digit, index) => {
			setTimeout(() => {
				current += digit
				onChange(current)
			}, index * 65)
		})
	}

	const unlocked =
		success || (pending && otp === DEMO_OTP && otp.length === 6)

	return (
		<div className="relative">
			{unlocked && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -inset-4 z-20 animate-[hero-rise_0.4s_ease-out] rounded-3xl border-2 border-emerald-400 bg-emerald-500/10 shadow-[0_0_50px_rgba(16,185,129,0.35)] backdrop-blur-[1px]"
				/>
			)}

			<AuthStepDots step={1} />
			<button
				className="mb-3.5 inline-flex min-h-11 items-center font-semibold text-[0.85rem] text-ink-500 hover:text-ink-900"
				disabled={pending || success}
				onClick={onBack}
				type="button"
			>
				← Change number
			</button>
			<h1 className="mb-2 font-extrabold font-heading text-[1.5rem] text-ink-900 tracking-tight">
				Verify your number
			</h1>
			<p className="mb-[22px] text-[0.94rem] text-ink-500">
				We sent a 6-digit code to{" "}
				<strong className="font-bold text-ink-900">
					{countryCode} {digits}
				</strong>
			</p>

			<form onSubmit={onSubmit}>
				<OtpField
					error={error}
					isUnlocked={unlocked}
					onChange={onChange}
					value={otp}
				/>

				<Button
					className={cn(
						"mt-4 w-full transition-all duration-300",
						unlocked &&
							"border-emerald-500 bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]",
					)}
					disabled={pending || success || otp.length < 6}
					type="submit"
				>
					{success
						? "🔓 ACCESS GRANTED · CONTINUING…"
						: pending
							? "Verifying code…"
							: "Verify & Continue"}
				</Button>
			</form>

			<div className="mt-4">
				<button
					className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-400/40 bg-brand-500/10 px-3 py-2 font-bold font-heading text-[0.78rem] text-brand-ink transition-all hover:border-brand-500 hover:bg-brand-500/20 active:scale-[0.98] disabled:opacity-50"
					disabled={pending || success}
					onClick={handleQuickFill}
					type="button"
				>
					<span>⚡ Quick Fill Demo Code</span>
					<span className="rounded bg-brand-500 px-1.5 py-0.5 font-mono text-[0.7rem] text-on-brand">
						123456
					</span>
				</button>
			</div>

			<p className="mt-[18px] text-center text-[0.78rem] text-ink-400">
				Didn't get it?{" "}
				<button
					className="font-semibold text-ink-900 underline disabled:cursor-default disabled:text-ink-300 disabled:no-underline"
					disabled={
						resendLeft > 0 || resendPending || pending || success
					}
					onClick={onResend}
					type="button"
				>
					Resend OTP
				</button>
				{resendLeft > 0 ? ` in ${resendLeft}s` : ""}
			</p>
		</div>
	)
}
