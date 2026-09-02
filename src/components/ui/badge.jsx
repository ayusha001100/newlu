import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
	"group/badge inline-flex w-fit shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full border border-transparent font-semibold whitespace-nowrap transition-all focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-black/28 [&>svg]:pointer-events-none [&>svg]:size-3!",
	{
		defaultVariants: {
			variant: "default",
		},
		variants: {
			variant: {
				default:
					"border-line bg-white px-4 py-1.5 text-[0.82rem] text-ink-700 shadow-lu-sm",
				destructive:
					"bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 [a]:hover:bg-destructive/20",
				ghost: "hover:bg-muted hover:text-muted-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				outline:
					"border-line bg-white px-2.5 py-0.5 text-[0.7rem] font-bold text-ink-500",
				secondary:
					"border-brand-100 bg-brand-50 px-[15px] py-1.5 text-[0.76rem] font-bold tracking-[0.08em] text-brand-ink uppercase",
			},
		},
	},
)

function Badge({ className, render, variant = "default", ...props }) {
	return useRender({
		defaultTagName: "span",
		props: mergeProps(
			{
				className: cn(badgeVariants({ variant }), className),
			},
			props,
		),
		render,
		state: {
			slot: "badge",
			variant,
		},
	})
}

export { Badge, badgeVariants }
