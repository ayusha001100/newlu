"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/ui/button"

const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme()

	return (
		<Button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			size="icon"
			variant="outline"
		>
			{theme === "dark" ? (
				<MoonIcon className="h-4 w-4" />
			) : (
				<SunIcon className="h-4 w-4" />
			)}
		</Button>
	)
}

export default ThemeSwitcher
