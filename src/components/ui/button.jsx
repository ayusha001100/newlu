"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
	"group/button relative isolate inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-[12px] border border-transparent font-heading text-[0.94rem] font-bold leading-[1.2] tracking-[-0.01em] whitespace-nowrap no-underline transition-[transform,box-shadow,background-color,color,border-color] duration-[180ms] ease-[ease] outline-none select-none hover:no-underline focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-black/28 active:translate-y-0 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		defaultVariants: {
			rounded: false,
			size: "default",
			variant: "default",
		},
		variants: {
			rounded: {
				false: "rounded-[12px]",
				true: "rounded-full",
			},
			size: {
				default: "px-[26px] py-[13px]",
				icon: "size-8 min-h-0 gap-0 p-0 hover:translate-y-0",
				"icon-lg": "size-9 min-h-0 gap-0 p-0 hover:translate-y-0",
				"icon-sm":
					"size-7 min-h-0 gap-0 rounded-[min(var(--radius-md),12px)] p-0 hover:translate-y-0 in-data-[slot=button-group]:rounded-lg",
				"icon-xs":
					"size-6 min-h-0 gap-0 rounded-[min(var(--radius-md),10px)] p-0 hover:translate-y-0 in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
				lg: "min-h-[50px] px-[30px] py-[15px] text-base",
				sm: "min-h-0 gap-1 px-3.5 py-2 text-[0.82rem]",
				xs: "h-6 min-h-0 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			},
			variant: {
				dark: "bg-ink-900 text-white shadow-[0_8px_20px_rgba(16,20,27,0.22)] hover:-translate-y-[2px] hover:bg-ink-800 after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:w-1/2 after:-translate-x-full after:skew-x-[-20deg] after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] after:animate-shimmer motion-reduce:after:hidden",
				default:
					"bg-[linear-gradient(180deg,var(--brand-400)_0%,var(--brand-500)_55%,var(--brand-550)_100%)] text-on-brand shadow-lu-brand hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(var(--brand-600-rgb),0.38),inset_0_1px_0_rgba(255,255,255,0.6)] after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:w-1/2 after:-translate-x-full after:skew-x-[-20deg] after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)] after:animate-shimmer motion-reduce:after:hidden",
				destructive:
					"bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
				ghost: "bg-transparent text-ink-700 shadow-none hover:bg-canvas-sunken hover:text-ink-900",
				light: "bg-white text-ink-900 shadow-lu-md hover:-translate-y-[2px] after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:w-1/2 after:-translate-x-full after:skew-x-[-20deg] after:bg-[linear-gradient(90deg,transparent,rgba(255,179,0,0.28),transparent)] after:animate-shimmer motion-reduce:after:hidden",
				link: "min-h-0 px-0 py-0 text-brand-ink underline-offset-4 hover:underline",
				outline:
					"border-line-strong bg-white text-ink-900 shadow-lu-sm hover:-translate-y-[2px] hover:border-ink-900 hover:shadow-lu-md",
				secondary:
					"bg-white text-ink-900 shadow-lu-md hover:-translate-y-[2px]",
			},
		},
	},
)

function Button({
	className,
	rounded = false,
	size = "default",
	variant = "default",
	...props
}) {
	return (
		<ButtonPrimitive
			className={cn(
				buttonVariants({ className, rounded, size, variant }),
			)}
			data-slot="button"
			{...props}
		/>
	)
}

export { Button, buttonVariants }
