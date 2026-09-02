"use client"

import { cn } from "@/lib/utils"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/ui/input-otp"
import { Label } from "@/ui/label"

export default function OtpField({ error, isUnlocked, onChange, value }) {
	return (
		<div className="relative">
			<div className="mb-2.5 flex items-center justify-between">
				<Label className="font-bold text-[0.82rem] text-ink-700">
					Enter 6-Digit Passcode
				</Label>
				<span
					className={cn(
						"inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-bold font-mono text-[0.7rem] uppercase tracking-wider transition-all duration-300",
						isUnlocked
							? "animate-pulse border border-emerald-400 bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.55)]"
							: value?.length === 6
								? "border border-brand-400 bg-brand-500 text-on-brand shadow-[0_0_10px_rgba(255,179,0,0.5)]"
								: "border border-line bg-canvas-muted text-ink-500",
					)}
				>
					{isUnlocked
						? "🔓 ACCESS GRANTED"
						: value?.length === 6
							? "⚡ VERIFYING"
							: "🔒 VAULT LOCKED"}
				</span>
			</div>

			<InputOTP
				containerClassName="grid w-full grid-cols-6 gap-2 sm:gap-2.5"
				maxLength={6}
				onChange={onChange}
				value={value}
			>
				<InputOTPGroup className="contents rounded-none">
					{["d1", "d2", "d3", "d4", "d5", "d6"].map((id, index) => {
						const isFilled = Boolean(value?.[index])
						return (
							<InputOTPSlot
								className={cn(
									"size-auto h-[58px] w-full rounded-[14px] border-2 font-black font-mono text-[1.35rem] transition-all duration-300 first:rounded-[14px] first:border-l-2 last:rounded-[14px]",
									isUnlocked
										? "scale-[1.04] border-emerald-500 bg-emerald-50/90 text-emerald-700 shadow-[0_0_18px_rgba(16,185,129,0.5)]"
										: isFilled
											? "border-brand-500/80 bg-brand-50/40 text-ink-900 shadow-[0_0_10px_rgba(var(--brand-rgb),0.25)]"
											: "border-line bg-canvas-muted text-ink-400 hover:border-brand-300",
									"data-[active=true]:scale-[1.05] data-[active=true]:border-brand-500 data-[active=true]:bg-white data-[active=true]:shadow-[0_0_18px_rgba(var(--brand-rgb),0.5),0_0_0_2px_var(--brand-400)] data-[active=true]:ring-0",
								)}
								index={index}
								key={id}
							/>
						)
					})}
				</InputOTPGroup>
			</InputOTP>
			<p className="mt-2 min-h-[18px] font-medium text-[#c0392b] text-[0.83rem]">
				{error}
			</p>
		</div>
	)
}
