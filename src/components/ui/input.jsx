"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

function Input({ className, enableShowPassword, type, value = "", ...props }) {
	const [showPassword, setShowPassword] = useState(false)

	const inputType =
		enableShowPassword && type === "password"
			? showPassword
				? "text"
				: "password"
			: type

	return (
		<div className="relative w-full">
			<input
				className={cn(
					"h-auto min-h-[46px] w-full min-w-0 rounded-[10px] border border-line bg-white px-4 py-[13px] font-sans text-[0.95rem] text-ink-900 outline-none transition-[border-color,box-shadow] file:inline-flex file:h-6 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-ink-300 focus-visible:border-brand-500 focus-visible:shadow-[0_0_0_3px_rgba(var(--brand-rgb),0.18)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-canvas-muted disabled:opacity-50 aria-invalid:border-destructive md:text-[0.95rem]",
					className,
					enableShowPassword && type === "password" ? "pr-10" : "",
				)}
				data-slot="input"
				type={inputType}
				value={value ?? ""}
				{...props}
			/>
			{enableShowPassword && type === "password" && (
				<button
					aria-label={
						showPassword ? "Hide password" : "Show password"
					}
					className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-500 hover:text-ink-900 focus:outline-none"
					onClick={() => setShowPassword(!showPassword)}
					tabIndex={-1}
					type="button"
				>
					{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
				</button>
			)}
		</div>
	)
}

export { Input }
