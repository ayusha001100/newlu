import Link from "next/link"
import PanelKicker from "@/atoms/panel-kicker"
import { Button } from "@/ui/button"

export default function EmptyProgram({ title }) {
	return (
		<div className="rounded-xl border border-line-strong border-dashed px-8 py-11 text-center">
			<PanelKicker>{title}</PanelKicker>
			<h2 className="mb-2 text-[1.2rem]">Enrol in a program first</h2>
			<p className="mb-[18px] text-ink-500">
				Your modules, practice and matched openings appear here once a
				certification is on your dashboard.
			</p>
			<Button nativeButton={false} render={<Link href="/programs" />}>
				Browse career tracks
			</Button>
		</div>
	)
}
