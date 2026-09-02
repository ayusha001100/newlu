import { cn } from "@/lib/utils"

const icons = {
	calendar: (
		<>
			<rect height="15" rx="3" width="17" x="3.5" y="5" />
			<path d="M3.5 10h17M8 3v4M16 3v4M8.5 14.5h3" />
		</>
	),
	file: (
		<>
			<path d="M6 3h7l5 5v13H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
			<path d="M13 3v5h5M8.5 13h7M8.5 17h4.5" />
		</>
	),
	layers: (
		<>
			<path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" />
			<path d="M4 12l8 4.5 8-4.5M4 16.5L12 21l8-4.5" />
		</>
	),
	link: (
		<>
			<path d="M10.5 13.5a3.5 3.5 0 0 1 0-5l2-2a3.5 3.5 0 0 1 5 5l-1 1" />
			<path d="M13.5 10.5a3.5 3.5 0 0 1 0 5l-2 2a3.5 3.5 0 0 1-5-5l1-1" />
		</>
	),
	people: (
		<>
			<circle cx="9" cy="8" r="3.4" />
			<path d="M3 20a6 6 0 0 1 12 0" />
			<path d="M16.5 5.2a3.4 3.4 0 0 1 0 6.4M18 20a6 6 0 0 0-2.4-4.8" />
		</>
	),
	target: (
		<>
			<circle cx="12" cy="12" r="8" />
			<circle cx="12" cy="12" r="3.4" />
			<path d="M12 4V2M12 22v-2M4 12H2M22 12h-2" />
		</>
	),
}

export default function FeatureIcon({ className, name }) {
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
			{icons[name]}
		</svg>
	)
}
