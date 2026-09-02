import CourseIcon from "@/atoms/course-icon"
import { cn } from "@/lib/utils"

export default function ProgramPill({ active, onSelect, program, progress }) {
	return (
		<button
			className={cn(
				"flex items-center gap-3 rounded-full border bg-white py-2.5 pr-4 pl-2.5 text-left transition-[border-color,box-shadow]",
				active
					? "border-brand-500 shadow-[0_0_0_3px_var(--brand-050)]"
					: "border-line hover:border-line-strong",
			)}
			onClick={onSelect}
			type="button"
		>
			<CourseIcon program={program} />
			<span>
				<strong className="block font-bold text-[0.86rem]">
					{program.title}
				</strong>
				<small className="text-[0.74rem] text-ink-500">
					{progress}% complete
				</small>
			</span>
		</button>
	)
}
