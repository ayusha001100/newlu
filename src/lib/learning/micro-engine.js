/* ============================================================
   Adaptive Microlearning Engine — State & Gamification Engine
   ============================================================ */

import {
	BADGES,
	COURSE_METADATA,
	COURSE_MODULES,
	RANKS,
	REASSURANCE_MESSAGES,
} from "@/lib/data/microlearning-course"

const STORAGE_KEY = "lu_microlearning_state_v1"

export const DEFAULT_STATE = {
	answersHistory: {}, // { [screenId]: { attempts: 1, correct: true, timestamp } }
	careerVaultUnlocks: [],
	completedModules: [],
	completedNodes: [],
	currentModuleIndex: 0,
	currentNodeIndex: 0,
	currentScreenIndex: 0,
	firstTryCount: 0,
	maxStreak: 0,
	remedialCount: 0,
	streak: 0,
	twoPhaseStep: "concept", // 'concept' (Phase 1) | 'interaction' (Phase 2)
	unlockedBadges: [],
	xp: 0,
}

export class MicroEngine {
	static getInitialState() {
		if (typeof window === "undefined") return DEFAULT_STATE
		try {
			const saved = localStorage.getItem(STORAGE_KEY)
			if (saved) {
				return { ...DEFAULT_STATE, ...JSON.parse(saved) }
			}
		} catch {
			// fallback
		}
		return DEFAULT_STATE
	}

	static saveState(state) {
		if (typeof window === "undefined") return
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
		} catch {
			// ignore
		}
	}

	static resetState() {
		if (typeof window !== "undefined") {
			localStorage.removeItem(STORAGE_KEY)
		}
		return DEFAULT_STATE
	}

	static getRank(xp) {
		let currentRank = RANKS[0]
		let nextRank = RANKS[1] || null

		for (let i = 0; i < RANKS.length; i++) {
			if (xp >= RANKS[i].minXp) {
				currentRank = RANKS[i]
				nextRank = RANKS[i + 1] || null
			}
		}

		const prevMin = currentRank.minXp
		const nextMin = nextRank ? nextRank.minXp : prevMin + 1000
		const progressPercent = Math.min(
			100,
			Math.max(
				0,
				Math.round(((xp - prevMin) / (nextMin - prevMin)) * 100),
			),
		)

		return {
			currentRank,
			nextRank,
			progressPercent,
		}
	}

	static checkNewBadges(state) {
		const unlocked = [...(state.unlockedBadges || [])]
		const newlyUnlocked = []

		BADGES.forEach(b => {
			if (!unlocked.includes(b.id) && b.condition(state)) {
				unlocked.push(b.id)
				newlyUnlocked.push(b)
			}
		})

		return {
			newlyUnlocked,
			unlockedBadges: unlocked,
		}
	}

	static getRandomReassurance(isCorrect, streak) {
		if (streak >= 3 && isCorrect) {
			return "🔥 You're ON FIRE! 3+ in a row — unstoppable momentum!"
		}
		if (!isCorrect) {
			return "💡 Tricky concept! Even senior PMs calibrate their intuition on this."
		}
		const idx = Math.floor(Math.random() * REASSURANCE_MESSAGES.length)
		return REASSURANCE_MESSAGES[idx]
	}

	static normalizeText(text) {
		return (text || "")
			.trim()
			.toLowerCase()
			.replace(/[^a-z0-9]/g, "")
	}

	static evaluateAnswer(screen, userAnswer) {
		if (!screen?.interaction) return { isCorrect: true, scoreXp: 15 }

		const { type, correct_answer, correct_keywords, correct_order } =
			screen.interaction

		if (type === "quick_reflection") {
			return { isCorrect: true, scoreXp: 15 }
		}

		if (type === "yes_no") {
			const isCorrect =
				String(userAnswer).toLowerCase() ===
				String(correct_answer).toLowerCase()
			return { isCorrect, scoreXp: isCorrect ? 50 : 0 }
		}

		if (type === "mcq") {
			const isCorrect = String(userAnswer) === String(correct_answer)
			return { isCorrect, scoreXp: isCorrect ? 50 : 0 }
		}

		if (type === "fill_blank") {
			const norm = MicroEngine.normalizeText(userAnswer)
			const matches = (correct_keywords || []).some(
				kw => MicroEngine.normalizeText(kw) === norm,
			)
			return { isCorrect: matches, scoreXp: matches ? 50 : 0 }
		}

		if (type === "arrange_sequence") {
			const isCorrect =
				JSON.stringify(userAnswer) === JSON.stringify(correct_order)
			return { isCorrect, scoreXp: isCorrect ? 50 : 0 }
		}

		return { isCorrect: true, scoreXp: 50 }
	}

	static getCurrentScreen(
		state,
		course = { metadata: COURSE_METADATA, modules: COURSE_MODULES },
	) {
		const moduleObj =
			course.modules[state.currentModuleIndex] || course.modules[0]
		const nodeObj =
			moduleObj?.nodes?.[state.currentNodeIndex] || moduleObj?.nodes?.[0]
		const screenObj =
			nodeObj?.screens?.[state.currentScreenIndex] ||
			nodeObj?.screens?.[0]

		const totalScreensInNode = nodeObj?.screens?.length || 1
		const currentScreenNumber = state.currentScreenIndex + 1
		const nodeProgressPercent = Math.round(
			(currentScreenNumber / totalScreensInNode) * 100,
		)

		return {
			currentScreenNumber,
			module: moduleObj,
			node: nodeObj,
			nodeProgressPercent,
			screen: screenObj,
			totalScreensInNode,
		}
	}
}
