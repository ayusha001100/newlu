"use client"

import { motion } from "framer-motion"
import {
	Briefcase,
	CheckCircle,
	ExternalLink,
	Lock,
	Sparkles,
	X,
} from "lucide-react"
import { sound } from "@/lib/learning/micro-audio"
import { Button } from "@/ui/button"

export default function CareerVaultModal({
	isOpen,
	onClose,
	modules,
	completedModules = [],
}) {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
			<motion.div
				animate={{ opacity: 1, scale: 1 }}
				className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
				exit={{ opacity: 0, scale: 0.95 }}
				initial={{ opacity: 0, scale: 0.95 }}
			>
				{/* Modal Header */}
				<div className="flex items-center justify-between border-slate-100 border-b bg-gradient-to-r from-amber-500/10 via-transparent to-purple-500/10 p-6 dark:border-slate-800">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-500">
							<Briefcase className="h-5 w-5" />
						</div>
						<div>
							<h2 className="flex items-center gap-2 font-bold text-slate-900 text-xl dark:text-slate-100">
								<span>Career Vault Unlocks</span>
								<span className="rounded-full bg-amber-500/20 px-2 py-0.5 font-semibold text-amber-600 text-xs dark:text-amber-400">
									{completedModules.length} Unlocked
								</span>
							</h2>
							<p className="text-slate-500 text-xs dark:text-slate-400">
								Real-world internships, PRDs, and portfolio
								deliverables unlocked as you complete modules.
							</p>
						</div>
					</div>

					<button
						className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
						onClick={() => {
							sound.playClick()
							onClose()
						}}
						type="button"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Unlock Items List */}
				<div className="space-y-4 divide-y divide-slate-100 overflow-y-auto p-6 dark:divide-slate-800/60">
					{modules.map(mod => {
						const isUnlocked = completedModules.includes(mod.id)
						const item = mod.career_unlock

						if (!item) return null

						return (
							<div
								className={`flex flex-col items-start justify-between gap-4 rounded-2xl border p-4 pt-4 transition-all first:pt-0 sm:flex-row sm:items-center ${
									isUnlocked
										? "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10"
										: "border-slate-200 bg-slate-50/50 opacity-70 dark:border-slate-800 dark:bg-slate-900/30"
								}`}
								key={mod.id}
							>
								<div className="flex items-start gap-3.5">
									<div
										className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
											isUnlocked
												? "bg-emerald-500 font-bold text-slate-950"
												: "bg-slate-200 text-slate-400 dark:bg-slate-800"
										}`}
									>
										{isUnlocked ? (
											<CheckCircle className="h-5 w-5" />
										) : (
											<Lock className="h-4 w-4" />
										)}
									</div>

									<div className="flex flex-col gap-1">
										<div className="flex items-center gap-2">
											<span className="font-bold text-[11px] text-amber-500 uppercase tracking-wider">
												Day {mod.day} • {mod.title}
											</span>
										</div>
										<h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
											{item.title}
										</h4>
										<p className="text-slate-500 text-xs dark:text-slate-400">
											{item.company} •{" "}
											<strong className="text-slate-700 dark:text-slate-300">
												{item.stipend}
											</strong>
										</p>

										<div className="mt-1.5 flex flex-wrap gap-1.5">
											{item.skills?.map((sk, i) => (
												<span
													className="rounded bg-slate-200/80 px-2 py-0.5 font-medium text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300"
													key={i}
												>
													{sk}
												</span>
											))}
										</div>
									</div>
								</div>

								<div className="w-full shrink-0 sm:w-auto">
									{isUnlocked ? (
										<Button
											className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-4 font-bold text-slate-950 text-xs shadow-sm hover:bg-emerald-600 sm:w-auto"
											onClick={() => {
												sound.playClick()
												alert(
													`🎉 Accessing: ${item.title}`,
												)
											}}
											type="button"
										>
											<span>Claim Asset</span>
											<ExternalLink className="h-3.5 w-3.5" />
										</Button>
									) : (
										<span className="flex items-center gap-1 font-semibold text-slate-400 text-xs">
											<Lock className="h-3.5 w-3.5" />
											<span>Complete Day {mod.day}</span>
										</span>
									)}
								</div>
							</div>
						)
					})}
				</div>

				{/* Modal Footer */}
				<div className="flex items-center justify-between border-slate-100 border-t bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
					<div className="flex items-center gap-1.5 text-slate-500 text-xs">
						<Sparkles className="h-4 w-4 text-amber-500" />
						<span>
							Complete lessons to automatically unlock new
							opportunities.
						</span>
					</div>

					<Button
						className="rounded-xl font-bold text-xs"
						onClick={() => {
							sound.playClick()
							onClose()
						}}
						type="button"
						variant="outline"
					>
						Close
					</Button>
				</div>
			</motion.div>
		</div>
	)
}
