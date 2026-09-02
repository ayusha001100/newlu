"use client"

import { AnimatePresence } from "framer-motion"
import { ArrowLeft, Flame, Sparkles, Volume2, VolumeX } from "lucide-react"
import { useEffect, useState } from "react"
import {
	COURSE_METADATA,
	COURSE_MODULES,
} from "@/lib/data/microlearning-course"
import { sound } from "@/lib/learning/micro-audio"
import { MicroEngine } from "@/lib/learning/micro-engine"
import CareerVaultModal from "./career-vault-modal"
import ConceptCard from "./concept-card"
import CourseMapView from "./course-map-view"
import FeedbackDrawer from "./feedback-drawer"
import InteractionCard from "./interaction-card"
import ModuleCompleteCelebration from "./module-complete-celebration"

export default function MicroPlayer() {
	const [state, setState] = useState(() => MicroEngine.getInitialState())
	const [viewMode, setViewMode] = useState("map") // 'map' | 'learn' | 'celebrate'
	const [phase, setPhase] = useState("concept") // 'concept' (Phase 1) | 'interaction' (Phase 2)
	const [feedback, setFeedback] = useState(null) // null | { isCorrect, isReflection, explanation, reassurance, xpGained }
	const [showVault, setShowVault] = useState(false)
	const [isMuted, setIsMuted] = useState(() => sound.isMuted())

	// Persist state changes
	useEffect(() => {
		MicroEngine.saveState(state)
	}, [state])

	const currentContext = MicroEngine.getCurrentScreen(state)
	const {
		module,
		node,
		screen,
		nodeProgressPercent,
		currentScreenNumber,
		totalScreensInNode,
	} = currentContext

	const handleToggleMute = () => {
		const newMuted = sound.toggleMute()
		setIsMuted(newMuted)
	}

	const handleStartModuleNode = (modIdx, nodeIdx = 0) => {
		setState(prev => ({
			...prev,
			currentModuleIndex: modIdx,
			currentNodeIndex: nodeIdx,
			currentScreenIndex: 0,
		}))
		setPhase("concept")
		setFeedback(null)
		setViewMode("learn")
	}

	const handleGotIt = () => {
		sound.playClick()
		setPhase("interaction")
	}

	const handleAnswerSubmit = userAnswer => {
		const evalResult = MicroEngine.evaluateAnswer(screen, userAnswer)
		const isCorrect = evalResult.isCorrect
		const isReflection = screen.interaction?.type === "quick_reflection"

		// Audio feedback
		if (isReflection) {
			sound.playCorrect()
		} else if (isCorrect) {
			sound.playCorrect()
		} else {
			sound.playIncorrect()
		}

		// Calculate XP and streak
		const xpBonus = evalResult.scoreXp
		let newStreak = state.streak
		let newFirstTryCount = state.firstTryCount
		let newRemedialCount = state.remedialCount

		if (isCorrect && !isReflection) {
			newStreak = state.streak + 1
			newFirstTryCount += 1
			if (newStreak >= 3) {
				sound.playStreak()
			}
		} else if (!isCorrect) {
			newStreak = 0
			newRemedialCount += 1
		}

		const newXp = state.xp + xpBonus
		const newMaxStreak = Math.max(state.maxStreak, newStreak)

		const updatedState = {
			...state,
			firstTryCount: newFirstTryCount,
			maxStreak: newMaxStreak,
			remedialCount: newRemedialCount,
			streak: newStreak,
			xp: newXp,
		}

		// Check badges
		const badgeRes = MicroEngine.checkNewBadges(updatedState)
		updatedState.unlockedBadges = badgeRes.unlockedBadges

		setState(updatedState)

		// Set feedback drawer state
		const explanation = isCorrect
			? screen.feedback?.correct
			: screen.feedback?.incorrect
		const reassurance = MicroEngine.getRandomReassurance(
			isCorrect,
			newStreak,
		)

		setFeedback({
			explanation,
			isCorrect,
			isReflection,
			reassuranceMessage: reassurance,
			xpGained: xpBonus,
		})
	}

	const handleRetry = () => {
		setFeedback(null)
	}

	const handleContinueNext = () => {
		setFeedback(null)

		const screensInNode = node?.screens || []
		const isLastScreenInNode =
			state.currentScreenIndex >= screensInNode.length - 1

		if (!isLastScreenInNode) {
			// Advance to next screen in node
			setState(prev => ({
				...prev,
				currentScreenIndex: prev.currentScreenIndex + 1,
			}))
			setPhase("concept")
		} else {
			// Completed node
			const nodesInModule = module?.nodes || []
			const isLastNodeInModule =
				state.currentNodeIndex >= nodesInModule.length - 1

			const completedNodeId = node?.node_id
			const completedNodes = Array.from(
				new Set([...(state.completedNodes || []), completedNodeId]),
			)

			if (!isLastNodeInModule) {
				setState(prev => ({
					...prev,
					completedNodes,
					currentNodeIndex: prev.currentNodeIndex + 1,
					currentScreenIndex: 0,
				}))
				setPhase("concept")
			} else {
				// Completed entire module/day!
				const completedModules = Array.from(
					new Set([...(state.completedModules || []), module.id]),
				)
				const finalXp = state.xp + (module.xp_reward || 100)

				const celebrationState = {
					...state,
					completedModules,
					completedNodes,
					xp: finalXp,
				}
				const badgeRes = MicroEngine.checkNewBadges(celebrationState)
				celebrationState.unlockedBadges = badgeRes.unlockedBadges

				setState(celebrationState)
				setViewMode("celebrate")
			}
		}
	}

	const handleNextModuleFromCelebration = () => {
		const nextModuleIdx = state.currentModuleIndex + 1
		if (nextModuleIdx < COURSE_MODULES.length) {
			handleStartModuleNode(nextModuleIdx, 0)
		} else {
			setViewMode("map")
		}
	}

	const handleReset = () => {
		const clean = MicroEngine.resetState()
		setState(clean)
		setViewMode("map")
		setFeedback(null)
	}

	// 1. Roadmap View
	if (viewMode === "map") {
		return (
			<>
				<CourseMapView
					course={{
						metadata: COURSE_METADATA,
						modules: COURSE_MODULES,
					}}
					isMuted={isMuted}
					onOpenCareerVault={() => setShowVault(true)}
					onResetState={handleReset}
					onSelectModuleNode={handleStartModuleNode}
					onToggleMute={handleToggleMute}
					state={state}
				/>
				<CareerVaultModal
					completedModules={state.completedModules}
					isOpen={showVault}
					modules={COURSE_MODULES}
					onClose={() => setShowVault(false)}
				/>
			</>
		)
	}

	// 2. Celebration View
	if (viewMode === "celebrate") {
		return (
			<>
				<ModuleCompleteCelebration
					module={module}
					onBackToMap={() => setViewMode("map")}
					onNextModule={handleNextModuleFromCelebration}
					onOpenVault={() => setShowVault(true)}
					state={state}
				/>
				<CareerVaultModal
					completedModules={state.completedModules}
					isOpen={showVault}
					modules={COURSE_MODULES}
					onClose={() => setShowVault(false)}
				/>
			</>
		)
	}

	// 3. Active Screen Player
	return (
		<div className="flex min-h-screen w-full flex-col items-center bg-slate-50 pb-32 dark:bg-slate-950">
			{/* Top Bar Header */}
			<header className="sticky top-0 z-30 flex w-full max-w-2xl items-center justify-between gap-3 border-slate-200/80 border-b bg-white/70 px-4 py-3 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/70">
				<button
					className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
					onClick={() => {
						sound.playClick()
						setViewMode("map")
					}}
					title="Back to Roadmap"
					type="button"
				>
					<ArrowLeft className="h-5 w-5" />
				</button>

				{/* Progress bar in center */}
				<div className="flex max-w-xs flex-1 flex-col gap-1">
					<div className="flex items-center justify-between font-bold text-[11px] text-slate-500">
						<span>
							Day {module.day} • {node.title}
						</span>
						<span className="text-amber-500">
							{currentScreenNumber}/{totalScreensInNode}
						</span>
					</div>
					<div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
						<div
							className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
							style={{ width: `${nodeProgressPercent}%` }}
						/>
					</div>
				</div>

				{/* Stats Ribbon (XP & Streak) */}
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 font-black text-amber-500 text-xs shadow-sm">
						<Sparkles className="h-3.5 w-3.5" />
						<span>{state.xp}</span>
					</div>

					<div
						className={`flex items-center gap-1 rounded-full border px-2.5 py-1 font-black text-xs shadow-sm transition-all ${
							state.streak >= 3
								? "animate-pulse border-orange-500/40 bg-orange-500/20 text-orange-500"
								: "border-slate-200 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800"
						}`}
					>
						<Flame
							className={`h-3.5 w-3.5 ${
								state.streak >= 3
									? "text-orange-500"
									: "text-slate-400"
							}`}
						/>
						<span>{state.streak}</span>
					</div>

					<button
						className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
						onClick={handleToggleMute}
						title={isMuted ? "Unmute" : "Mute"}
						type="button"
					>
						{isMuted ? (
							<VolumeX className="h-4 w-4 text-rose-400" />
						) : (
							<Volume2 className="h-4 w-4 text-emerald-400" />
						)}
					</button>
				</div>
			</header>

			{/* Main Card Stage */}
			<main className="flex w-full max-w-xl flex-col items-center px-4 py-8">
				<AnimatePresence mode="wait">
					{phase === "concept" ? (
						<ConceptCard
							key={`concept-${screen.screen_id}`}
							onGotIt={handleGotIt}
							screen={screen}
						/>
					) : (
						<InteractionCard
							disabled={Boolean(feedback)}
							interaction={screen.interaction}
							key={`interaction-${screen.screen_id}`}
							onSubmit={handleAnswerSubmit}
						/>
					)}
				</AnimatePresence>
			</main>

			{/* Animated Feedback Drawer */}
			<AnimatePresence>
				{feedback && (
					<FeedbackDrawer
						explanation={feedback.explanation}
						isCorrect={feedback.isCorrect}
						isReflection={feedback.isReflection}
						onContinue={handleContinueNext}
						onRetry={handleRetry}
						reassuranceMessage={feedback.reassuranceMessage}
						xpGained={feedback.xpGained}
					/>
				)}
			</AnimatePresence>

			{/* Career Vault Modal */}
			<CareerVaultModal
				completedModules={state.completedModules}
				isOpen={showVault}
				modules={COURSE_MODULES}
				onClose={() => setShowVault(false)}
			/>
		</div>
	)
}
