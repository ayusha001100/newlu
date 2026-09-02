"use client"

import { useEffect, useRef, useState } from "react"
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
}) {
	const [isUnlocked, setIsUnlocked] = useState(false)
	const hasAutoSubmitted = useRef(false)

	// Auto-trigger when 6 digits are typed
	useEffect(() => {
		if (otp.length === 6 && !hasAutoSubmitted.current) {
			hasAutoSubmitted.current = true
			if (otp === DEMO_OTP) {
				setIsUnlocked(true)
			}
			const timer = setTimeout(() => {
				const syntheticEvent = { preventDefault: () => {} }
				onSubmit(syntheticEvent)
			}, 380)
			return () => clearTimeout(timer)
		}
		if (otp.length < 6) {
			hasAutoSubmitted.current = false
			setIsUnlocked(false)
		}
	}, [otp, onSubmit])

	// Quick fill demo code
	const handleQuickFill = () => {
		setIsUnlocked(false)
		let current = ""
		const demoDigits = DEMO_OTP.split("")
		demoDigits.forEach((digit, i) => {
			setTimeout(() => {
				current += digit
				onChange(current)
			}, i * 65)
		})
	}

	return (
		<div className="relative">
			{/* ACCESS GRANTED Laser Glow Pulse Wave */}
			{isUnlocked && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -inset-4 z-20 animate-[hero-rise_0.4s_ease-out] rounded-3xl border-2 border-emerald-400 bg-emerald-500/10 shadow-[0_0_50px_rgba(16,185,129,0.35)] backdrop-blur-[1px]"
				/>
			)}

			<AuthStepDots step={1} />
			<button
				className="mb-3.5 inline-flex min-h-11 items-center font-semibold text-[0.85rem] text-ink-500 hover:text-ink-900"
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
					isUnlocked={isUnlocked}
					onChange={onChange}
					value={otp}
				/>

				<Button
					className={cn(
						"mt-4 w-full transition-all duration-300",
						isUnlocked
							? "border-emerald-500 bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]"
							: "",
					)}
					disabled={pending || isUnlocked}
					type="submit"
				>
					{isUnlocked
						? "🔓 ACCESS GRANTED · LOGGING IN…"
						: pending
							? "Verifying code…"
							: "Verify & Continue"}
				</Button>
			</form>

			{/* Quick-Pass Demo Button */}
			<div className="mt-4">
				<button
					className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-400/40 bg-brand-500/10 px-3 py-2 font-bold font-heading text-[0.78rem] text-brand-ink transition-all hover:border-brand-500 hover:bg-brand-500/20 active:scale-[0.98]"
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
					disabled={resendLeft > 0 || resendPending}
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
