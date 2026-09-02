"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { SKILL_FIT_PATHS, SKILL_FIT_QUESTIONS } from "@/lib/data/resources"
import { Button } from "@/ui/button"

const LETTERS = ["A", "B", "C", "D"]
const blankScores = () => ({ ai: 0, business: 0, data: 0, development: 0 })

export default function SkillAssessment() {
	const [index, setIndex] = useState(0)
	const [scores, setScores] = useState(blankScores)
	const [done, setDone] = useState(false)

	const total = SKILL_FIT_QUESTIONS.length
	const question = SKILL_FIT_QUESTIONS[index]
	const progress = done ? 100 : ((index + 1) / total) * 100

	const result = useMemo(() => {
		const [best] = Object.entries(scores).sort(
			(left, right) => right[1] - left[1],
		)
		return SKILL_FIT_PATHS[best[0]]
	}, [scores])

	const pick = option => {
		setScores(current => {
			const next = { ...current }
			for (const [path, value] of Object.entries(option.scores)) {
				next[path] += value
			}
			return next
		})
		if (index + 1 < total) setIndex(index + 1)
		else setDone(true)
	}

	const restart = () => {
		setScores(blankScores())
		setIndex(0)
		setDone(false)
	}

	return (
		<div className="mx-auto max-w-[900px] overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--bg-000)] shadow-lu-md">
			<div className="flex items-center justify-between gap-5 border-[var(--line)] border-b px-7 py-6 max-[720px]:flex-col max-[720px]:items-start max-[720px]:p-5">
				<strong className="font-heading">Skill-fit check</strong>
				<div className="min-w-[120px] text-right text-[0.73rem] text-[var(--ink-500)] max-[720px]:w-full max-[720px]:text-left">
					<span>
						{done
							? "Complete"
							: `Question ${index + 1} of ${total}`}
					</span>
					<div className="mt-[7px] h-[5px] overflow-hidden rounded-full bg-[var(--bg-200)] max-[720px]:w-full">
						<span
							className="block h-full rounded-full bg-[var(--brand-500)] transition-[width] duration-200"
							style={{ width: `${progress}%` }}
						/>
					</div>
				</div>
			</div>
			<div className="px-7 py-[34px] max-[720px]:px-5 max-[720px]:py-[26px]">
				{done ? (
					<div className="text-center">
						<span className="mx-auto mb-5 grid size-[72px] place-items-center rounded-[20px] bg-[var(--ink-900)] font-extrabold font-heading text-[1rem] text-[var(--brand-400)]">
							{result.mark}
						</span>
						<span className="mb-[17px] inline-flex items-center gap-2.5 font-extrabold font-heading text-[0.75rem] text-[var(--brand-ink)] uppercase tracking-[0.1em] before:h-0.5 before:w-[26px] before:bg-[var(--brand-500)] before:content-['']">
							Suggested starting direction
						</span>
						<h2 className="mb-2.5 text-[1.8rem]">{result.title}</h2>
						<p className="mx-auto max-w-[600px] text-[0.87rem] text-[var(--ink-500)] leading-[1.65]">
							{result.description} Treat this as a reflection
							prompt, not a formal aptitude or hiring assessment.
						</p>
						<div className="mt-6 flex flex-wrap justify-center gap-2.5 max-[720px]:flex-col max-[720px]:items-stretch">
							<Button
								nativeButton={false}
								render={<Link href={result.href} />}
							>
								{result.action}
							</Button>
							<Button
								onClick={restart}
								type="button"
								variant="outline"
							>
								Retake assessment
							</Button>
						</div>
					</div>
				) : (
					<div>
						<h2 className="mb-[9px] max-w-[720px] text-[1.5rem]">
							{question.text}
						</h2>
						<p className="mb-[22px] text-[0.82rem] text-[var(--ink-500)]">
							{question.hint}
						</p>
						<div className="grid gap-2.5">
							{question.options.map((option, optionIndex) => (
								<button
									className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--bg-000)] px-[17px] py-[15px] text-left text-[0.84rem] text-[var(--ink-700)] hover:border-[var(--brand-200)] hover:bg-[var(--brand-050)]"
									key={option.label}
									onClick={() => pick(option)}
									type="button"
								>
									<b className="grid size-[30px] shrink-0 place-items-center rounded-[9px] bg-[var(--bg-100)] font-bold text-[0.68rem] text-[var(--ink-500)]">
										{LETTERS[optionIndex]}
									</b>
									<span>{option.label}</span>
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
