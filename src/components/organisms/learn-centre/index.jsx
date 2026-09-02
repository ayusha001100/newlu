"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Container from "@/atoms/container"
import Loading from "@/atoms/loading"
import { useSession } from "@/hooks/auth/useSession"
import { useEnrollCourse } from "@/hooks/learn/useEnrollCourse"
import { useProgress } from "@/hooks/learn/useProgress"
import { useSaveProgress } from "@/hooks/learn/useSaveProgress"
import { useUpdateLearner } from "@/hooks/learn/useUpdateLearner"
import { enrolledRows, LEARN_TABS, streakDays } from "@/lib/data/learn"
import { firstNameOf, isProfileComplete } from "@/lib/data/onboarding"
import { Engine } from "@/lib/learning/engine"
import { cn } from "@/lib/utils"
import ProgramPill from "@/molecules/program-pill"
import CareerPanel from "@/organisms/learn-centre/career-panel"
import { LearnContext } from "@/organisms/learn-centre/context"
import CourseEntry from "@/organisms/learn-centre/course-entry"
import HomePanel from "@/organisms/learn-centre/home-panel"
import LearnPanel from "@/organisms/learn-centre/learn-panel"
import LearnSidebar from "@/organisms/learn-centre/learn-sidebar"
import ModulePlayer from "@/organisms/learn-centre/module-player"
import OnboardModal from "@/organisms/learn-centre/onboard-modal"
import OpportunitiesPanel from "@/organisms/learn-centre/opportunities-panel"
import ProfilePanel from "@/organisms/learn-centre/profile-panel"
import TutorDrawer from "@/organisms/learn-centre/tutor-drawer"
import LearnHeader from "@/organisms/learn-header"
import { toast } from "@/ui/toast"

const ROUTE = {
	assessments: ["career", "assessments"],
	career: ["career", "passport"],
	community: ["learn", "community"],
	home: ["home"],
	learn: ["learn", "modules"],
	learning: ["learn", "modules"],
	modules: ["learn", "modules"],
	opportunities: ["opportunities"],
	passport: ["career", "passport"],
	practice: ["learn", "practice"],
	profile: ["profile"],
	project: ["learn", "project"],
	skills: ["career", "skills"],
}

export default function LearnCentre() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const session = useSession()
	const progress = useProgress(Boolean(session.data?.user))
	const saveProgress = useSaveProgress()
	const enrollCourse = useEnrollCourse()
	const updateLearner = useUpdateLearner()
	const enrolledRef = useRef(false)

	const user = session.data?.user
	const [localStates, setStates] = useState({})
	const [community, setCommunity] = useState([])
	const [activeSlug, setActiveSlug] = useState(null)
	const [tab, setTabState] = useState("home")
	const [subTab, setSubTabState] = useState({
		career: "passport",
		learn: "modules",
	})
	const [screen, setScreen] = useState("dashboard")
	const [courseView, setCourseView] = useState("entry")
	const [moduleIndex, setModuleIndex] = useState(0)
	const [stageId, setStageId] = useState("concept")
	const [tutorOpen, setTutorOpen] = useState(false)
	const [tutorSeed, setTutorSeed] = useState("")
	const [showOnboard, setShowOnboard] = useState(false)
	const [onboardAfter, setOnboardAfter] = useState(null)

	const states = useMemo(() => {
		const next = {}
		;(user?.enrolled || []).forEach(slug => {
			next[slug] = Engine.normalise(
				localStates[slug] ||
					progress.data?.progress?.[slug] ||
					progress.data?.states?.[slug],
			)
		})
		return next
	}, [localStates, progress.data, user?.enrolled])

	useEffect(() => {
		if (!progress.data) return
		setCommunity(progress.data.community || [])
	}, [progress.data])

	useEffect(() => {
		if (!user?.enrolled?.length) {
			setActiveSlug(null)
			return
		}
		setActiveSlug(current =>
			current && user.enrolled.includes(current)
				? current
				: user.enrolled[0],
		)
	}, [user?.enrolled])

	const applyRoute = useCallback(route => {
		if (!route?.length) return
		setTabState(route[0])
		if (route[1]) {
			setSubTabState(prev => ({ ...prev, [route[0]]: route[1] }))
		}
	}, [])

	const setTab = useCallback(
		name => {
			const route = ROUTE[name] || [name]
			applyRoute(route)
			setScreen("dashboard")
			if (typeof window !== "undefined") {
				window.history.replaceState(null, "", `#${name}`)
				window.scrollTo({ top: 0 })
			}
		},
		[applyRoute],
	)

	const setSubTab = useCallback((panel, name) => {
		setSubTabState(prev => ({ ...prev, [panel]: name }))
	}, [])

	useEffect(() => {
		if (session.isLoading) return
		if (!user) router.replace("/auth?returnTo=/learn")
	}, [router, session.isLoading, user])

	useEffect(() => {
		if (!user) return
		if (!isProfileComplete(user)) setShowOnboard(true)
	}, [user])

	useEffect(() => {
		const course = searchParams.get("course")
		if (!course) return
		if (!user) return
		if (enrolledRef.current) return
		enrolledRef.current = true
		enrollCourse.mutate(
			{ slug: course },
			{
				onError: error => {
					toast.add({ title: error.message, type: "error" })
				},
				onSuccess: () => {
					setActiveSlug(course)
					setTab("learn")
					setScreen("dashboard")
					router.replace("/learn")
					if (Engine.isSelfPaced(course)) return
					setScreen("course")
					setCourseView("entry")
				},
			},
		)
	}, [enrollCourse, router, searchParams, setTab, user])

	useEffect(() => {
		const syncFromHash = () => {
			const hash = window.location.hash.replace("#", "")
			if (!hash) return
			applyRoute(ROUTE[hash])
		}
		syncFromHash()
		window.addEventListener("hashchange", syncFromHash)
		return () => window.removeEventListener("hashchange", syncFromHash)
	}, [applyRoute])

	const saveState = useCallback(
		async (slug, updater) => {
			const current = states[slug] || Engine.blankState()
			const next =
				typeof updater === "function"
					? updater(structuredClone(current))
					: updater
			setStates(prev => ({ ...prev, [slug]: next }))
			await saveProgress.mutateAsync({ slug, state: next })
		},
		[saveProgress, states],
	)

	const saveProfile = useCallback(
		async payload => {
			await updateLearner.mutateAsync(payload)
		},
		[updateLearner],
	)

	const firstOpenStage = useCallback(
		index => {
			const state = states[activeSlug] || Engine.blankState()
			const done = Engine.stagesDone(state, index)
			const stage = Engine.STAGES.find(item => !done.has(item.id))
			return stage ? stage.id : "concept"
		},
		[activeSlug, states],
	)

	const openModule = useCallback(
		(index, stage) => {
			if (!activeSlug) return
			if (Engine.isSelfPaced(activeSlug)) {
				saveState(activeSlug, current => {
					const next = structuredClone(current)
					next.activeVideo = index
					return next
				})
				setTab("learn")
				setSubTab("learn", "modules")
				return
			}

			const start = () => {
				setModuleIndex(index)
				setStageId(stage || firstOpenStage(index))
				setScreen("course")
				setCourseView("player")
				window.scrollTo({ top: 0 })
			}

			if (!user?.purpose) {
				setOnboardAfter(() => start)
				setShowOnboard(true)
				return
			}
			start()
		},
		[
			activeSlug,
			firstOpenStage,
			saveState,
			setSubTab,
			setTab,
			user?.purpose,
		],
	)

	const openCourse = useCallback(
		slug => {
			setActiveSlug(slug)
			if (Engine.isSelfPaced(slug)) {
				setTab("learn")
				setSubTab("learn", "modules")
				setScreen("dashboard")
				return
			}
			setScreen("course")
			setCourseView("entry")
			window.scrollTo({ top: 0 })
		},
		[setSubTab, setTab],
	)

	const closeCourse = useCallback(() => {
		setScreen("dashboard")
		setCourseView("entry")
	}, [])

	const openTutor = useCallback((seed = "") => {
		setTutorSeed(seed)
		setTutorOpen(true)
	}, [])

	const closeTutor = useCallback(() => {
		setTutorOpen(false)
		setTutorSeed("")
	}, [])

	const rows = useMemo(
		() => (user ? enrolledRows(user.enrolled, states) : []),
		[states, user],
	)

	const contextValue = useMemo(
		() => ({
			activeSlug,
			closeCourse,
			closeTutor,
			community,
			courseView,
			moduleIndex,
			onboardAfter,
			openCourse,
			openModule,
			openTutor,
			saveProfile,
			saveState,
			screen,
			setActiveSlug,
			setCommunity,
			setOnboardAfter,
			setShowOnboard,
			setStageId,
			setSubTab,
			setTab,
			showOnboard,
			stageId,
			states,
			subTab,
			tab,
			tutorOpen,
			tutorSeed,
			user,
		}),
		[
			activeSlug,
			closeCourse,
			closeTutor,
			community,
			courseView,
			moduleIndex,
			onboardAfter,
			openCourse,
			openModule,
			openTutor,
			saveProfile,
			saveState,
			screen,
			showOnboard,
			stageId,
			setSubTab,
			setTab,
			states,
			subTab,
			tab,
			tutorOpen,
			tutorSeed,
			user,
		],
	)

	if (session.isLoading || (user && progress.isLoading && !progress.data)) {
		return (
			<div className="flex min-h-[60vh] items-center justify-center pt-[76px]">
				<Loading />
			</div>
		)
	}

	if (!user) return null

	const state = activeSlug ? states[activeSlug] || Engine.blankState() : null
	const streak = state ? streakDays(state) : 0
	const nudges = activeSlug ? Engine.nudges(activeSlug, state) : []
	const activeTabMeta =
		LEARN_TABS.find(item => item.id === tab) || LEARN_TABS[0]

	const onNotif = () => {
		toast.add({
			title: nudges.length
				? nudges[0].text
				: "Nothing needs your attention right now.",
			type: "info",
		})
		setTab("home")
	}

	return (
		<LearnContext.Provider value={contextValue}>
			<LearnHeader
				onNotif={onNotif}
				onOpenTutor={() => openTutor()}
				onSettings={() => setTab("profile")}
				user={user}
			/>

			{screen === "dashboard" ? (
				<div className="flex min-h-[calc(100vh-76px)] w-full justify-center bg-[#FAFAFC] pt-[76px]">
					<div className="flex min-h-full w-full max-w-[1600px]">
						{/* Left-Anchored Dedicated Gamified Sidebar */}
						<LearnSidebar onTabChange={setTab} tab={tab} />

						{/* Right Main Content Area */}
						<main className="min-w-0 flex-1 p-5 sm:p-7 md:p-9 lg:p-10">
							{/* Top Welcome & Track Selector */}
							<div className="mb-7 flex flex-wrap items-start justify-between gap-5">
								<div className="min-w-0 flex-1">
									<div className="mb-2 flex flex-wrap items-center gap-2">
										<span className="rounded-full border border-brand-300 bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.68rem] text-brand-ink uppercase tracking-[0.08em]">
											{activeTabMeta.label}
										</span>
										<span className="font-medium text-[0.78rem] text-ink-400">
											Learning Centre
										</span>
									</div>
									<h1 className="font-extrabold font-heading text-[1.7rem] text-ink-900 tracking-tight sm:text-[1.85rem]">
										{isProfileComplete(user)
											? `Hey ${firstNameOf(user)}, ready to level up?`
											: "Let’s set up your profile"}
									</h1>
									<p className="mt-1.5 max-w-[560px] text-[0.88rem] text-ink-500 leading-relaxed">
										{!isProfileComplete(user)
											? "Answer a few questions so we can personalize your Learning Centre."
											: !activeSlug
												? [
														user.purpose &&
															`Goal: ${user.purpose}`,
														user.interests
															?.length &&
															`Interests: ${user.interests.slice(0, 2).join(", ")}`,
														"Pick a program below to get started.",
													]
														.filter(Boolean)
														.join(" · ")
												: tab === "home"
													? [
															`${user.enrolled.length} enrolled program${user.enrolled.length === 1 ? "" : "s"}`,
															user.purpose &&
																`Goal: ${user.purpose}`,
														]
															.filter(Boolean)
															.join(" · ")
													: [
															user.purpose &&
																`Goal: ${user.purpose}`,
															user.city &&
																user.city,
															streak
																? `${streak}-day streak`
																: null,
														]
															.filter(Boolean)
															.join(" · ")}
									</p>
								</div>
								<div className="flex flex-wrap items-center gap-2">
									{tab !== "home" && rows.length ? (
										rows.map(row => (
											<ProgramPill
												active={row.slug === activeSlug}
												key={row.slug}
												onSelect={() =>
													setActiveSlug(row.slug)
												}
												program={row.program}
												progress={row.progress}
											/>
										))
									) : (
										<div className="flex items-center gap-2">
											<span className="rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-xs">
												<span className="block font-mono text-[0.65rem] text-ink-400 uppercase tracking-wide">
													Streak
												</span>
												<span className="font-extrabold font-heading text-[0.95rem] text-ink-900">
													{streak || 3} days
												</span>
											</span>
											<span className="rounded-2xl border border-brand-200 bg-[linear-gradient(180deg,#FFF8E8,var(--brand-50))] px-3.5 py-2.5 shadow-xs">
												<span className="block font-mono text-[0.65rem] text-brand-ink/70 uppercase tracking-wide">
													XP
												</span>
												<span className="font-extrabold font-heading text-[0.95rem] text-brand-ink">
													750
												</span>
											</span>
										</div>
									)}
								</div>
							</div>

							{/* Mobile Navigation Bar */}
							<nav
								aria-label="Mobile Learning sections"
								className="mb-6 flex flex-row flex-wrap gap-2 border-line border-b pb-4 lg:hidden"
							>
								{LEARN_TABS.map(item => (
									<button
										className={cn(
											"flex items-center gap-2 rounded-xl border px-3.5 py-2 text-left font-bold text-[0.84rem] transition-all",
											tab === item.id
												? "border-brand-500 bg-brand-50 text-brand-ink shadow-xs"
												: "border-line bg-white text-ink-600",
										)}
										key={item.id}
										onClick={() => setTab(item.id)}
										type="button"
									>
										<span>{item.icon}</span>
										<span>{item.label}</span>
									</button>
								))}
							</nav>

							{/* Active Tab Panel */}
							<div key={tab}>
								{tab === "home" ? <HomePanel /> : null}
								{tab === "learn" ? <LearnPanel /> : null}
								{tab === "opportunities" ? (
									<OpportunitiesPanel />
								) : null}
								{tab === "career" ? <CareerPanel /> : null}
								{tab === "profile" ? <ProfilePanel /> : null}
							</div>
						</main>
					</div>
				</div>
			) : (
				<Container className="pt-[calc(76px+28px)] pb-16">
					{courseView === "entry" ? <CourseEntry /> : null}
					{courseView === "player" ? <ModulePlayer /> : null}
				</Container>
			)}

			<TutorDrawer />
			<OnboardModal />
		</LearnContext.Provider>
	)
}
