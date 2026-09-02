"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "@/ui/toast"

export default function NavLink({ className, item, onSelect }) {
	const styles = cn(
		"flex items-center gap-2 rounded-[10px] px-3 py-2 text-left font-medium text-[0.89rem] text-ink-700 transition-colors hover:bg-[var(--bg-050)] hover:text-ink-900",
		className,
	)

	if (item.soon) {
		return (
			<button
				className={styles}
				onClick={() => {
					toast.add({
						title: `${item.label} is coming soon.`,
						type: "info",
					})
					onSelect?.()
				}}
				type="button"
			>
				{item.label}
				<span className="ml-auto rounded-full bg-canvas-sunken px-[7px] py-0.5 font-bold text-[0.66rem] text-ink-300 uppercase tracking-[0.04em]">
					Soon
				</span>
			</button>
		)
	}

	return (
		<Link className={styles} href={item.href} onClick={onSelect}>
			{item.label}
		</Link>
	)
}
