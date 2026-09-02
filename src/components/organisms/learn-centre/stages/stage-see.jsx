"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, Code2, Eye, Sparkles, Terminal } from "lucide-react"
import { useState } from "react"
import { sound } from "@/lib/learning/micro-audio"
import { Button } from "@/ui/button"

export default function StageSee({ stageData, onStageComplete }) {
	const steps = stageData?.steps || []
	const scenarioTitle =
		stageData?.scenario_title || "Interactive Execution Trace"
	const [activeStepIdx, setActiveStepIdx] = useState(0)

	const currentStep = steps[activeStepIdx] || steps[0]
	const isLastStep = activeStepIdx === steps.length - 1

	const handleNextStep = () => {
		sound.playClick()
		if (!isLastStep) {
			setActiveStepIdx(prev => prev + 1)
		} else {
			sound.playCorrect()
			onStageComplete()
		}
	}

	const handlePrevStep = () => {
		sound.playClick()
		if (activeStepIdx > 0) {
			setActiveStepIdx(prev => prev - 1)
		}
	}

	return (
		<div className="flex flex-col gap-6">
			{/* Simulation Header */}
			<div className="flex flex-col gap-1 rounded-2xl border border-brand-200 bg-amber-50/40 p-4.5">
				<div className="flex items-center justify-between">
					<span className="flex items-center gap-1.5 font-bold font-mono text-[0.68rem] text-brand-ink uppercase tracking-wider">
						<Eye className="size-3.5" />
						Interactive Visual Simulation
					</span>
					<span className="rounded-full bg-brand-100 px-2.5 py-0.5 font-bold font-mono text-[0.66rem] text-brand-ink">
						Step {activeStepIdx + 1} of {steps.length}
					</span>
				</div>
				<h3 className="font-extrabold font-heading text-ink-900 text-lg sm:text-xl">
					{scenarioTitle}
				</h3>
				<p className="text-ink-600 text-xs">
					Walk through the live execution trace below to see how
					inputs, reasoning, and tool calls interact in real time.
				</p>
			</div>

			{/* Timeline Node Stepper Bar */}
			<div className="flex items-center gap-2 overflow-x-auto pb-1">
				{steps.map((step, idx) => {
					const isActive = idx === activeStepIdx
					const isPassed = idx < activeStepIdx
					return (
						<button
							className={`flex min-w-[120px] flex-1 items-center gap-2 rounded-xl border p-2.5 text-left transition-all ${
								isActive
									? "border-brand-500 bg-brand-50 shadow-xs ring-2 ring-brand-200"
									: isPassed
										? "border-emerald-300 bg-emerald-50/50"
										: "border-line bg-white hover:border-brand-200"
							}`}
							key={idx}
							onClick={() => {
								sound.playClick()
								setActiveStepIdx(idx)
							}}
							type="button"
						>
							<span
								className={`grid size-6 shrink-0 place-items-center rounded-lg font-bold font-mono text-xs ${
									isActive
										? "bg-brand-500 text-on-brand"
										: isPassed
											? "bg-emerald-500 text-white"
											: "bg-canvas-muted text-ink-500"
								}`}
							>
								{isPassed ? "✓" : idx + 1}
							</span>
							<span className="truncate font-bold font-heading text-ink-800 text-xs">
								{step.stage_name || `Phase ${idx + 1}`}
							</span>
						</button>
					)
				})}
			</div>

			{/* Interactive Terminal Simulator Box */}
			<AnimatePresence mode="wait">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-xl"
					exit={{ opacity: 0, y: -8 }}
					initial={{ opacity: 0, y: 8 }}
					key={activeStepIdx}
					transition={{ duration: 0.2 }}
				>
					{/* Terminal Top Bar */}
					<div className="flex items-center justify-between border-slate-800 border-b bg-slate-900 px-4 py-3 font-mono text-slate-400 text-xs">
						<div className="flex items-center gap-2">
							<div className="flex gap-1.5">
								<span className="size-2.5 rounded-full bg-rose-500/80" />
								<span className="size-2.5 rounded-full bg-amber-500/80" />
								<span className="size-2.5 rounded-full bg-emerald-500/80" />
							</div>
							<span className="ml-2 flex items-center gap-1.5 text-slate-300">
								<Terminal className="size-3.5 text-brand-400" />
								agent_runtime_trace.log
							</span>
						</div>

						<span className="text-[0.7rem] text-slate-500">
							Actor: {currentStep?.actor || "Agent"}{" "}
							{currentStep?.actor_icon}
						</span>
					</div>

					{/* Terminal Main Output */}
					<div className="flex flex-col gap-4 p-5">
						<div className="space-y-1 font-mono text-xs sm:text-sm">
							<span className="font-bold text-brand-400">
								&gt; {currentStep?.stage_name}
							</span>
							<p className="pt-1 font-sans text-[0.92rem] text-slate-100 leading-relaxed">
								{currentStep?.content}
							</p>
						</div>

						{/* JSON Payload Inspector */}
						{currentStep?.raw_payload && (
							<div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
								<div className="mb-1.5 flex items-center gap-1.5 font-mono text-[0.7rem] text-slate-400">
									<Code2 className="size-3 text-emerald-400" />
									<span>PAYLOAD / STATE SNAPSHOT:</span>
								</div>
								<pre className="overflow-x-auto font-mono text-[0.75rem] text-emerald-300">
									{JSON.stringify(
										currentStep.raw_payload,
										null,
										2,
									)}
								</pre>
							</div>
						)}

						{/* Human Explanation Callout */}
						{currentStep?.explanation && (
							<div className="flex items-start gap-2.5 rounded-xl border-brand-500 border-l-2 bg-slate-900/60 p-3 font-sans text-slate-300 text-xs">
								<Sparkles className="mt-0.5 size-4 shrink-0 text-brand-400" />
								<span>{currentStep.explanation}</span>
							</div>
						)}
					</div>
				</motion.div>
			</AnimatePresence>

			{/* Trace Navigation CTAs */}
			<div className="flex items-center justify-between border-line border-t pt-4">
				<Button
					className="h-11 px-4 font-bold text-xs"
					disabled={activeStepIdx === 0}
					onClick={handlePrevStep}
					type="button"
					variant="outline"
				>
					<ArrowLeft className="mr-1.5 size-3.5" />
					Previous Phase
				</Button>

				<Button
					className="h-11 px-6 font-bold text-xs shadow-md sm:text-sm"
					onClick={handleNextStep}
					type="button"
				>
					<span>
						{isLastStep ? "Complete Simulation ➔" : "Next Phase ➔"}
					</span>
				</Button>
			</div>
		</div>
	)
}
