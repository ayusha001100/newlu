"use client"

import AuthStepDots from "@/atoms/auth-step-dots"
import { DEMO_OTP } from "@/lib/data/auth"
import PhoneField from "@/molecules/phone-field"
import { Button } from "@/ui/button"

const OUTCOMES = [
	{
		text: "Free to join — no card details required",
		xp: "+100 XP",
	},
	{
		text: "Industry-recognized certificate on completion",
		xp: "+250 XP",
	},
	{
		text: "Direct internship & hiring partner unlock",
		xp: "+500 XP",
	},
]

export default function AuthMobileStep({
	countryCode,
	digits,
	error,
	onCountryChange,
	onDigitsChange,
	onSubmit,
	pending,
	subtitle,
}) {
	const handleFastPass = () => {
		onDigitsChange("9876543210")
	}

	return (
		<div>
			<AuthStepDots step={0} />
			<div className="mb-2">
				<h1 className="font-extrabold font-heading text-[1.75rem] text-ink-900 tracking-tight">
					Log in to Your Account
				</h1>
				<p className="mt-1 text-[0.92rem] text-ink-500">
					{subtitle ||
						"Welcome back! Enter your mobile number to sign in."}
				</p>
			</div>

			{/* Gamified XP Perks List */}
			<ul className="my-5 grid gap-2 rounded-2xl border border-line bg-canvas-muted p-3">
				{OUTCOMES.map(item => (
					<li
						className="flex items-center justify-between gap-2 text-[0.82rem] text-ink-700"
						key={item.text}
					>
						<span className="font-semibold">{item.text}</span>
						<span className="rounded-md border border-brand-200 bg-white px-2 py-0.5 font-extrabold font-mono text-[0.7rem] text-brand-ink shadow-xs">
							{item.xp}
						</span>
					</li>
				))}
			</ul>

			<form onSubmit={onSubmit}>
				<PhoneField
					countryCode={countryCode}
					digits={digits}
					error={error}
					onCountryChange={onCountryChange}
					onDigitsChange={onDigitsChange}
				/>
				<Button
					className="mt-4 w-full"
					disabled={pending}
					type="submit"
				>
					{pending ? "Sending passcode…" : "Send OTP ➔"}
				</Button>
			</form>

			{/* 1-Click Fast Pass Button */}
			<div className="mt-3.5">
				<button
					className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white px-3 py-2 font-bold font-heading text-[0.78rem] text-ink-700 shadow-xs transition-all hover:border-brand-400 hover:bg-brand-50 hover:text-brand-ink active:scale-[0.98]"
					onClick={handleFastPass}
					type="button"
				>
					<span>⚡ Fast-Pass: Fill Demo Number</span>
					<span className="rounded bg-canvas-sunken px-1.5 py-0.5 font-mono text-[0.7rem] text-ink-600">
						9876543210
					</span>
				</button>
			</div>

			<p className="mt-4 text-center text-[0.78rem] text-ink-400">
				By continuing you agree to our Terms of Service and Privacy
				Policy.
			</p>
			<div className="mt-5 rounded-[12px] border border-line border-dashed bg-canvas-muted p-3 text-[0.79rem] text-ink-600">
				<strong className="block font-bold text-ink-900">
					Dummy Login
				</strong>
				Enter any mobile number. Demo OTP is{" "}
				<code className="font-bold text-brand-ink">{DEMO_OTP}</code>.
				After login you’ll set your name and profile answers.
			</div>
		</div>
	)
}
