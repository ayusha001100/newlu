"use client"

import { motion } from "framer-motion"
import {
	BookOpen,
	Briefcase,
	CheckCircle2,
	Flame,
	Lock,
	Play,
	RotateCcw,
	Sparkles,
	Trophy,
	Volume2,
	VolumeX,
} from "lucide-react"
import { BADGES } from "@/lib/data/microlearning-course"
import { sound } from "@/lib/learning/micro-audio"
import { MicroEngine } from "@/lib/learning/micro-engine"
import { Button } from "@/ui/button"

export default function CourseMapView({
	course,
	state,
	onSelectModuleNode,
	onOpenCareerVault,
	onResetState,
	isMuted,
	onToggleMute,
}) {
	const rankInfo = MicroEngine.getRank(state.xp)
	const completedCount = state.completedModules?.length || 0
	const overallProgress = Math.round(
		(completedCount / course.modules.length) * 100,
	)

	return (
		<div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6">
			{/* Top Header Card */}
			<div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 text-white shadow-2xl sm:p-8">
				<div className="relative z-10 flex flex-col gap-4">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<span className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/20 px-3 py-1 font-bold text-amber-400 text-xs uppercase tracking-wider">
							<Sparkles className="h-3.5 w-3.5" />
							{course.metadata.bannerTag}
						</span>

						{/* Audio & Reset Controls */}
						<div className="flex items-center gap-2">
							<button
								className="rounded-xl border border-slate-700/50 bg-slate-800/80 p-2 text-slate-300 transition-colors hover:bg-slate-700"
								onClick={onToggleMute}
								title={isMuted ? "Unmute Audio" : "Mute Audio"}
								type="button"
							>
								{isMuted ? (
									<VolumeX className="h-4 w-4 text-rose-400" />
								) : (
									<Volume2 className="h-4 w-4 text-emerald-400" />
								)}
							</button>

							<button
								className="rounded-xl border border-slate-700/50 bg-slate-800/80 p-2 text-slate-400 transition-colors hover:bg-rose-950/40 hover:text-rose-400"
								onClick={() => {
									if (
										confirm(
											"Reset all progress and XP to start fresh from Day 1?",
										)
									) {
										onResetState()
									}
								}}
								title="Reset Progress"
								type="button"
							>
								<RotateCcw className="h-4 w-4" />
							</button>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<h1 className="font-black text-2xl text-white tracking-tight sm:text-3xl">
							{course.metadata.title}
						</h1>
						<p className="max-w-xl text-slate-300 text-xs leading-relaxed sm:text-sm">
							{course.metadata.subtitle} •{" "}
							{course.metadata.duration}
						</p>
					</div>

					{/* Player Stats Ribbon */}
					<div className="grid grid-cols-3 gap-2.5 pt-2">
						{/* XP */}
						<div className="flex flex-col items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-800/60 p-3 text-center">
							<span className="flex items-center gap-1 font-black text-amber-400 text-xl">
								<Sparkles className="h-4 w-4" />
								{state.xp}
							</span>
							<span className="font-bold text-[10px] text-slate-400 uppercase">
								Total XP
							</span>
						</div>

						{/* Streak */}
						<div className="flex flex-col items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-800/60 p-3 text-center">
							<span className="flex items-center gap-1 font-black text-orange-400 text-xl">
								<Flame className="h-4 w-4" />
								{state.streak}
							</span>
							<span className="font-bold text-[10px] text-slate-400 uppercase">
								Day Streak
							</span>
						</div>

						{/* Rank */}
						<div className="flex flex-col items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-800/60 p-3 text-center">
							<span className="max-w-full truncate font-bold text-purple-300 text-sm sm:text-base">
								{rankInfo.currentRank.emoji}{" "}
								{rankInfo.currentRank.title}
							</span>
							<span className="font-bold text-[10px] text-slate-400 uppercase">
								Rank Tier
							</span>
						</div>
					</div>

					{/* Course Progress */}
					<div className="flex flex-col gap-1.5 pt-1">
						<div className="flex items-center justify-between font-medium text-slate-400 text-xs">
							<span>Overall Curriculum Completion</span>
							<span className="font-bold text-amber-400">
								{completedCount} of {course.modules.length} Days
								({overallProgress}%)
							</span>
						</div>
						<div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
							<div
								className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-700"
								style={{ width: `${overallProgress}%` }}
							/>
						</div>
					</div>

					{/* Career Vault Button */}
					<button
						className="mt-2 flex w-full cursor-pointer items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 font-bold text-emerald-300 text-xs transition-colors hover:bg-emerald-500/20"
						onClick={onOpenCareerVault}
						type="button"
					>
						<span className="flex items-center gap-2">
							<Briefcase className="h-4 w-4 text-emerald-400" />
							<span>
								Career Vault (Internships & Unlocked Assets)
							</span>
						</span>
						<span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px]">
							{state.completedModules?.length || 0} Unlocked →
						</span>
					</button>
				</div>
			</div>

			{/* 7-Day Roadmap Path */}
			<div className="flex flex-col gap-4">
				<h2 className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-slate-100">
					<BookOpen className="h-5 w-5 text-amber-500" />
					<span>7-Day Adaptive Learning Roadmap</span>
				</h2>

				<div className="space-y-3">
					{course.modules.map((mod, idx) => {
						const isCompleted = state.completedModules?.includes(
							mod.id,
						)
						const isCurrent =
							state.currentModuleIndex === idx && !isCompleted
						const isLocked =
							idx > 0 &&
							!state.completedModules?.includes(
								course.modules[idx - 1].id,
							) &&
							!isCompleted &&
							!isCurrent

						return (
							<motion.div
								className={`rounded-2xl border p-4 transition-all sm:p-5 ${
									isCurrent
										? "border-amber-500 bg-amber-500/5 shadow-amber-500/10 shadow-lg ring-2 ring-amber-500/20 dark:bg-amber-500/10"
										: isCompleted
											? "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10"
											: isLocked
												? "border-slate-200 bg-slate-100/50 opacity-60 dark:border-slate-800 dark:bg-slate-900/40"
												: "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
								}`}
								key={mod.id}
								whileHover={{ scale: isLocked ? 1 : 1.01 }}
							>
								<div className="flex items-start justify-between gap-4 sm:items-center">
									<div className="flex items-start gap-3.5">
										<div
											className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-bold ${
												isCompleted
													? "bg-emerald-500 font-black text-slate-950 shadow-emerald-500/20 shadow-md"
													: isCurrent
														? "animate-pulse bg-amber-500 font-black text-slate-950 shadow-amber-500/20 shadow-md"
														: isLocked
															? "bg-slate-200 text-slate-400 dark:bg-slate-800"
															: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
											}`}
										>
											{isCompleted ? (
												<CheckCircle2 className="h-6 w-6" />
											) : isLocked ? (
												<Lock className="h-4 w-4" />
											) : (
												<span>D{mod.day}</span>
											)}
										</div>

										<div className="flex flex-col gap-0.5">
											<div className="flex items-center gap-2">
												<span className="font-bold text-[11px] text-amber-500 uppercase tracking-wider">
													Day {mod.day} •{" "}
													{mod.nodes?.length || 1}{" "}
													Micro-Lessons
												</span>
												{isCompleted && (
													<span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-bold text-[10px] text-emerald-600 dark:text-emerald-400">
														COMPLETED
													</span>
												)}
											</div>
											<h3 className="font-bold text-base text-slate-900 sm:text-lg dark:text-slate-100">
												{mod.title}
											</h3>
											<p className="line-clamp-1 text-slate-500 text-xs dark:text-slate-400">
												{mod.tagline}
											</p>
										</div>
									</div>

									{/* Action CTA */}
									<div className="flex shrink-0 items-center">
										{isLocked ? (
											<span className="flex items-center gap-1 font-medium text-slate-400 text-xs">
												<Lock className="h-3.5 w-3.5" />
												<span className="hidden sm:inline">
													Locked
												</span>
											</span>
										) : (
											<Button
												className={`flex h-10 items-center gap-1.5 rounded-xl px-4 font-bold text-xs shadow-sm sm:text-sm ${
													isCurrent
														? "bg-amber-500 text-slate-950 shadow-amber-500/20 hover:bg-amber-600"
														: isCompleted
															? "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
															: "bg-amber-500/90 text-slate-950 hover:bg-amber-500"
												}`}
												onClick={() => {
													sound.playClick()
													onSelectModuleNode(idx, 0)
												}}
												type="button"
											>
												<span>
													{isCompleted
														? "Review"
														: "Start"}
												</span>
												<Play className="h-3.5 w-3.5 fill-current" />
											</Button>
										)}
									</div>
								</div>
							</motion.div>
						)
					})}
				</div>
			</div>

			{/* Badges Collection Showcase */}
			<div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/60 p-5 dark:border-slate-800 dark:bg-slate-900/60">
				<div className="flex items-center justify-between">
					<h3 className="flex items-center gap-2 font-bold text-slate-900 text-sm dark:text-slate-100">
						<Trophy className="h-4 w-4 text-amber-500" />
						<span>Earned Achievement Badges</span>
					</h3>
					<span className="font-semibold text-slate-500 text-xs">
						{state.unlockedBadges?.length || 0} / {BADGES.length}
					</span>
				</div>

				<div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
					{BADGES.map(badge => {
						const isUnlocked = state.unlockedBadges?.includes(
							badge.id,
						)
						return (
							<div
								className={`flex items-center gap-2.5 rounded-xl border p-2.5 transition-all ${
									isUnlocked
										? "border-amber-500/40 bg-amber-500/10 text-slate-900 dark:text-slate-100"
										: "border-slate-200 bg-slate-100/40 text-slate-400 opacity-60 dark:border-slate-800/60 dark:bg-slate-800/20"
								}`}
								key={badge.id}
							>
								<div className="shrink-0 text-lg">
									{isUnlocked
										? badge.title.split(" ").pop()
										: "🔒"}
								</div>
								<div className="flex min-w-0 flex-col">
									<span className="truncate font-bold text-xs">
										{badge.title.split(" ")[0]}
									</span>
									<span className="line-clamp-1 text-[10px] text-slate-500">
										{badge.desc}
									</span>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
