"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// GSAP Power3.Out equivalent easing: cubic-bezier(0.16, 1, 0.3, 1)
export const GSAP_EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

export function getVariantStyles(
	variant = "fade-up",
	inView = false,
	distance = 36,
) {
	const base = {
		transform: "translate3d(0, 0, 0)",
		transitionProperty: "opacity, transform, filter",
		transitionTimingFunction: GSAP_EASE,
		willChange: "transform, opacity, filter",
	}

	if (inView) {
		return {
			...base,
			filter: "blur(0px)",
			opacity: 1,
			transform: "translate3d(0, 0, 0) scale(1)",
		}
	}

	switch (variant) {
		case "fade-down":
			return {
				...base,
				filter: "blur(0px)",
				opacity: 0,
				transform: `translate3d(0, -${distance}px, 0)`,
			}
		case "fade-left":
			return {
				...base,
				filter: "blur(0px)",
				opacity: 0,
				transform: `translate3d(${distance}px, 0, 0)`,
			}
		case "fade-right":
			return {
				...base,
				filter: "blur(0px)",
				opacity: 0,
				transform: `translate3d(-${distance}px, 0, 0)`,
			}
		case "zoom-in":
		case "scale-up":
			return {
				...base,
				filter: "blur(0px)",
				opacity: 0,
				transform: `translate3d(0, ${Math.round(distance / 2)}px, 0) scale(0.92)`,
			}
		case "blur-up":
			return {
				...base,
				filter: "blur(10px)",
				opacity: 0,
				transform: `translate3d(0, ${distance}px, 0)`,
			}
		default:
			return {
				...base,
				filter: "blur(0px)",
				opacity: 0,
				transform: `translate3d(0, ${distance}px, 0) scale(0.97)`,
			}
	}
}

const VARIANT_HIDDEN_CLASSES = {
	"blur-up": "translate-y-[36px] opacity-0 blur-[8px]",
	"fade-down": "-translate-y-[36px] opacity-0",
	"fade-left": "translate-x-[36px] opacity-0",
	"fade-right": "-translate-x-[36px] opacity-0",
	"scale-up": "translate-y-[20px] scale-[0.93] opacity-0",
	"zoom-in": "translate-y-[20px] scale-[0.93] opacity-0",
}

export function revealClassName(inView, variant = "fade-up") {
	const hiddenClass =
		VARIANT_HIDDEN_CLASSES[variant] ||
		"translate-y-[36px] scale-[0.97] opacity-0"

	return cn(
		"motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:blur-none",
		"transform-gpu transition-[opacity,transform,filter] duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
		inView
			? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0"
			: hiddenClass,
	)
}

export function useReveal({
	once = true,
	rootMargin = "0px 0px -50px 0px",
	threshold = 0.08,
} = {}) {
	const ref = useRef(null)
	const [inView, setInView] = useState(false)

	useEffect(() => {
		const node = ref.current
		if (!node) return
		if (
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			setInView(true)
			return
		}

		const observer = new IntersectionObserver(
			entries => {
				const entry = entries[0]
				if (!entry) return

				if (entry.isIntersecting) {
					setInView(true)
					if (once) {
						observer.disconnect()
					}
				} else if (!once) {
					setInView(false)
				}
			},
			{ rootMargin, threshold },
		)

		observer.observe(node)
		return () => observer.disconnect()
	}, [once, rootMargin, threshold])

	return { inView, ref }
}

export default function Reveal({
	as: Comp = "div",
	className,
	delay = 0,
	distance = 36,
	duration = 750,
	once = true,
	rootMargin = "0px 0px -50px 0px",
	style,
	threshold = 0.08,
	variant = "fade-up",
	...props
}) {
	const { inView, ref } = useReveal({ once, rootMargin, threshold })
	const variantStyles = getVariantStyles(variant, inView, distance)

	return (
		<Comp
			{...props}
			className={cn(
				"motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:!filter-none",
				className,
			)}
			data-in-view={inView ? "" : undefined}
			ref={ref}
			style={{
				...variantStyles,
				...style,
				transitionDelay: `${delay}ms`,
				transitionDuration: `${duration}ms`,
			}}
		/>
	)
}
