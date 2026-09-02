"use client"

import { useState } from "react"
import { handleCopy } from "@/lib/utils"

export default function CopyArticleLink() {
	const [copied, setCopied] = useState(false)

	return (
		<button
			className="min-h-[38px] rounded-[9px] border border-[var(--line)] bg-[var(--bg-000)] px-3 font-bold text-[0.72rem] text-[var(--ink-700)] hover:border-[var(--brand-200)] hover:text-[var(--brand-ink)]"
			onClick={() =>
				handleCopy({
					setCopy: setCopied,
					text: window.location.href,
				})
			}
			type="button"
		>
			{copied ? "Link copied" : "Copy article link"}
		</button>
	)
}
