import { cn } from "@/lib/utils"

const icons = {
	"ai-agents": (
		<>
			<rect height="12" rx="3" width="16" x="4" y="8" />
			<path d="M12 4v4M9 14h.01M15 14h.01M9.5 17.5h5M2 12v3M22 12v3" />
		</>
	),
	"cloud-devops": (
		<path d="M7 18h9.5a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.6-1.2A4 4 0 0 0 7 18z" />
	),
	cybersecurity: (
		<>
			<path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3z" />
			<path d="M9.2 12.2l2 2 3.6-3.9" />
		</>
	),
	"data-analytics": (
		<>
			<path d="M4 20h16" />
			<rect height="6" rx="1" width="3.4" x="5" y="12" />
			<rect height="10" rx="1" width="3.4" x="10.3" y="8" />
			<rect height="14" rx="1" width="3.4" x="15.6" y="4" />
		</>
	),
	"digital-marketing": (
		<>
			<path d="M4 10v4a1 1 0 0 0 1 1h3l6 4V5L8 9H5a1 1 0 0 0-1 1z" />
			<path d="M18 9.5a3.5 3.5 0 0 1 0 5" />
		</>
	),
	"generative-ai": (
		<>
			<path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" />
			<path d="M18 15l.8 2L21 17.8l-2.2.8L18 21l-.8-2.4-2.2-.8L17.2 17z" />
		</>
	),
	"sales-gtm": (
		<>
			<rect height="12.5" rx="2.5" width="18" x="3" y="7.5" />
			<path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 12.5h18" />
		</>
	),
	"websites-apps-ai": (
		<path d="M8.5 8.5L5 12l3.5 3.5M15.5 8.5L19 12l-3.5 3.5M13.5 5l-3 14" />
	),
}

export default function TrackIcon({ className, slug }) {
	return (
		<svg
			aria-hidden="true"
			className={cn("size-[22px]", className)}
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.7"
			viewBox="0 0 24 24"
		>
			{icons[slug]}
		</svg>
	)
}
