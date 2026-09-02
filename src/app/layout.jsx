import { Manrope, Plus_Jakarta_Sans } from "next/font/google"
import { Suspense } from "react"
import { cn } from "@/lib/utils"
import Analytics from "@/providers/analytics"
import QueryProvider from "@/providers/query"
import QueryParamsProvider from "@/providers/queryParams"
import { Toaster } from "@/ui/toast"
import { TooltipProvider } from "@/ui/tooltip"
import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-plus-jakarta",
})

const manrope = Manrope({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-manrope",
})

export const viewport = {
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: "cover",
	width: "device-width",
}

export const metadata = {
	description:
		"Free certifications for Indian college students. Finish a project, then apply to internships and fresher jobs from your Learning Centre.",
	metadataBase: new URL("https://letsupgrade.in"),
	title: {
		default: "LetsUpgrade — Learn Skills. Get Internships. Get Hired.",
		template: "%s | LetsUpgrade",
	},
}

export default function RootLayout({ children }) {
	return (
		<html
			className={cn(manrope.variable, plusJakarta.variable)}
			lang="en"
			suppressHydrationWarning
		>
			<body
				className="min-h-dvh overflow-x-hidden bg-background font-sans text-ink-700 antialiased"
				suppressHydrationWarning
			>
				<Suspense>
					<QueryParamsProvider />
				</Suspense>
				<QueryProvider>
					<TooltipProvider>
						<div className="flex min-h-dvh flex-col">
							{children}
						</div>
						<Toaster />
					</TooltipProvider>
				</QueryProvider>
				<Analytics />
			</body>
		</html>
	)
}
