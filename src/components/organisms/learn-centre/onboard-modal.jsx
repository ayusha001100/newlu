"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { initialsOf } from "@/lib/data/learn"
import {
	EDUCATION_OPTIONS,
	EXPERIENCE_OPTIONS,
	GRADUATION_YEARS,
	getGoalOptions,
	getOnboardSteps,
	INTEREST_OPTIONS,
	isProfileComplete,
	isWorkingProfessional,
	PACKAGE_OPTIONS,
} from "@/lib/data/onboarding"
import { cn } from "@/lib/utils"
import { useLearn } from "@/organisms/learn-centre/context"
import { OnboardingSchema } from "@/schemas/onboarding"
import { Button } from "@/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/ui/form"
import { Input } from "@/ui/input"
import { toast } from "@/ui/toast"

const defaultValues = {
	city: "",
	college: "",
	company: "",
	currentPackage: "",
	education: "",
	experienceYears: "",
	interests: [],
	name: "",
	purpose: "",
	year: "",
}

const fieldShell =
	"min-h-[52px] rounded-2xl border border-line bg-white px-4 text-[0.95rem] text-ink-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-[border-color,box-shadow] placeholder:text-ink-300 focus-visible:border-brand-500 focus-visible:ring-[3px] focus-visible:ring-brand-500/20"

const ChoiceCard = ({ selected, onClick, children, className }) => (
	<button
		className={cn(
			"group w-full rounded-2xl border px-4 py-3.5 text-left transition-all duration-200",
			selected
				? "border-brand-500 bg-brand-50 shadow-[0_0_0_3px_rgba(255,179,0,0.18)]"
				: "border-line bg-white hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lu-sm",
			className,
		)}
		onClick={onClick}
		type="button"
	>
		{children}
	</button>
)

export default function OnboardModal() {
	const {
		onboardAfter,
		saveProfile,
		setOnboardAfter,
		setShowOnboard,
		showOnboard,
		user,
	} = useLearn()

	const required = Boolean(user && !isProfileComplete(user))
	const open = showOnboard || required
	const [step, setStep] = useState(0)
	const [saving, setSaving] = useState(false)
	const [entered, setEntered] = useState(true)

	const form = useForm({
		defaultValues,
		mode: "onTouched",
		resolver: zodResolver(OnboardingSchema),
	})

	const watchedName = useWatch({ control: form.control, name: "name" })
	const watchedEducation = useWatch({
		control: form.control,
		name: "education",
	})
	const watchedInterests = useWatch({
		control: form.control,
		name: "interests",
	})

	const steps = useMemo(
		() => getOnboardSteps(watchedEducation),
		[watchedEducation],
	)
	const goalOptions = useMemo(() => {
		const fromStep = steps.find(item => item.id === "purpose")?.goals
		if (fromStep?.length) return fromStep
		return getGoalOptions(watchedEducation)
	}, [steps, watchedEducation])

	useEffect(() => {
		if (!(open && user)) return
		form.reset({
			city: user.city || "",
			college: user.college || "",
			company: user.company || "",
			currentPackage: user.currentPackage || "",
			education: user.education || "",
			experienceYears: user.experienceYears || "",
			interests: user.interests || [],
			name: user.name || "",
			purpose: user.purpose || "",
			year: user.year || "",
		})
		setStep(0)
		setEntered(true)
	}, [form, open, user])

	useEffect(() => {
		if (step <= steps.length - 1) return
		setStep(Math.max(0, steps.length - 1))
	}, [step, steps.length])

	useEffect(() => {
		const purpose = form.getValues("purpose")
		if (!purpose) return
		const allowed = goalOptions.map(item => item.label)
		if (!allowed.includes(purpose)) form.setValue("purpose", "")
	}, [form, goalOptions])

	const current = steps[step] || steps[0]
	const progress = useMemo(
		() => Math.round(((step + 1) / steps.length) * 100),
		[step, steps.length],
	)
	const initials = initialsOf(watchedName || "Learner")

	const goToStep = nextStep => {
		setEntered(false)
		window.setTimeout(() => {
			setStep(nextStep)
			setEntered(true)
		}, 120)
	}

	const finish = async values => {
		setSaving(true)
		const isPro = isWorkingProfessional(values.education)
		try {
			await saveProfile({
				...values,
				city: values.city,
				college: isPro ? "" : values.college,
				company: isPro ? values.company : "",
				country: "India",
				currentPackage: isPro ? values.currentPackage : "",
				experienceYears: isPro ? values.experienceYears : "",
				profileComplete: true,
				year: isPro ? "" : values.year,
			})
			setShowOnboard(false)
			const after = onboardAfter
			setOnboardAfter(null)
			toast.add({
				title: `Profile ready — welcome, ${values.name.split(" ")[0]}!`,
				type: "success",
			})
			after?.()
		} catch (error) {
			toast.add({
				title: error.message || "Could not save your profile.",
				type: "error",
			})
		} finally {
			setSaving(false)
		}
	}

	const onNext = async () => {
		const valid = await form.trigger(current.fields)
		if (!valid) return

		if (step >= steps.length - 1) {
			await form.handleSubmit(finish)()
			return
		}
		goToStep(step + 1)
	}

	const onBack = () => {
		if (step === 0) return
		goToStep(step - 1)
	}

	return (
		<Dialog
			onOpenChange={next => {
				if (!next && required) return
				setShowOnboard(next)
			}}
			open={open}
		>
			<DialogContent
				className="relative flex max-h-[min(92vh,760px)] max-w-[560px] flex-col overflow-hidden rounded-[28px] border border-line/80 bg-[#FAFBFD] p-0 shadow-[0_30px_80px_rgba(16,20,27,0.22)]"
				dismissible={!required}
			>
				{/* Ambient brand glow */}
				<div className="pointer-events-none absolute -top-24 -right-16 size-56 rounded-full bg-brand-500/20 blur-[70px]" />
				<div className="pointer-events-none absolute -bottom-28 -left-20 size-64 rounded-full bg-[#FF8A00]/10 blur-[80px]" />

				{/* Cosmic header */}
				<div className="relative shrink-0 overflow-hidden bg-[linear-gradient(135deg,#0E131F_0%,#182236_55%,#0B0F19_100%)] px-5 pt-5 pb-5 text-white sm:px-7 sm:pt-6 sm:pb-6">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,179,0,0.08)_1px,transparent_1px)] bg-size-[22px_22px]" />
					<div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500),#f59e0b)]" />

					<div className="relative z-10 flex items-start justify-between gap-4">
						<div className="min-w-0">
							<div className="mb-3 flex flex-wrap items-center gap-2">
								<span className="inline-flex items-center gap-1.5 rounded-full border border-brand-400/35 bg-brand-500/15 px-2.5 py-1 font-bold font-mono text-[0.66rem] text-brand-300 uppercase tracking-wider backdrop-blur-md">
									<span aria-hidden>⚡</span>
									Profile setup
								</span>
								<span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[0.66rem] text-white/70">
									{progress}% complete
								</span>
							</div>
							<p className="font-medium text-[0.78rem] text-slate-300">
								Personalize your Learning Centre in{" "}
								{steps.length} quick steps
							</p>
						</div>

						<div className="relative shrink-0">
							<div className="grid size-14 place-items-center rounded-2xl border border-brand-400/50 bg-[linear-gradient(145deg,var(--brand-400),var(--brand-500))] font-extrabold font-heading text-lg text-on-brand shadow-[0_10px_30px_rgba(255,179,0,0.35)]">
								{initials}
							</div>
							<span className="absolute -right-1 -bottom-1 grid size-5 place-items-center rounded-full border border-[#0E131F] bg-emerald-400 font-bold text-[#052e16] text-[0.65rem]">
								{step + 1}
							</span>
						</div>
					</div>

					{/* Step rail */}
					<div className="relative z-10 mt-5 flex items-center gap-1.5">
						{steps.map((item, index) => {
							const done = index < step
							const active = index === step
							return (
								<button
									aria-label={`Go to ${item.title}`}
									className={cn(
										"h-1.5 flex-1 rounded-full transition-all duration-300",
										done && "bg-brand-400",
										active &&
											"bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500))] shadow-[0_0_12px_rgba(255,179,0,0.55)]",
										!(done || active) && "bg-white/15",
										done &&
											"cursor-pointer hover:bg-brand-300",
										!done && "cursor-default",
									)}
									disabled={!done}
									key={item.id}
									onClick={() => done && goToStep(index)}
									type="button"
								/>
							)
						})}
					</div>
				</div>

				<Form {...form}>
					<form
						className="relative flex min-h-0 flex-1 flex-col"
						onSubmit={event => {
							event.preventDefault()
							onNext()
						}}
					>
						{/* Scrollable step body */}
						<div className="min-h-0 flex-1 overflow-y-auto px-5 pt-5 sm:px-7 sm:pt-6">
							<div
								className={cn(
									"pb-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
									entered
										? "translate-y-0 opacity-100"
										: "translate-y-2 opacity-0",
								)}
								key={`${current.id}-${watchedEducation || "default"}`}
							>
								<div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.64rem] text-brand-ink uppercase">
									Step {step + 1} of {steps.length}
								</div>
								<DialogTitle className="mt-2 font-extrabold font-heading text-[1.45rem] text-ink-900 tracking-tight sm:text-[1.6rem]">
									{current.title}
								</DialogTitle>
								<p className="mt-1.5 max-w-[40ch] text-[0.88rem] text-ink-500 leading-relaxed">
									{current.description}
								</p>

								<div className="mt-5 rounded-[22px] border border-line bg-white p-4 shadow-lu-sm sm:p-5">
									{current.id === "name" ? (
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Full name
													</FormLabel>
													<FormControl>
														<Input
															autoComplete="name"
															autoFocus
															className={
																fieldShell
															}
															placeholder="e.g. Ayush Aryan"
															{...field}
														/>
													</FormControl>
													<p className="text-[0.78rem] text-ink-400">
														Shown on your passport,
														header, and referrals.
													</p>
													<FormMessage />
												</FormItem>
											)}
										/>
									) : null}

									{current.id === "education" ? (
										<FormField
											control={form.control}
											name="education"
											render={({ field }) => (
												<FormItem>
													<div className="grid gap-2">
														{EDUCATION_OPTIONS.map(
															option => {
																const selected =
																	field.value ===
																	option
																return (
																	<ChoiceCard
																		className="px-3.5 py-3"
																		key={
																			option
																		}
																		onClick={() =>
																			field.onChange(
																				option,
																			)
																		}
																		selected={
																			selected
																		}
																	>
																		<div className="flex items-center justify-between gap-3">
																			<span className="font-bold text-[0.88rem] text-ink-900">
																				{
																					option
																				}
																			</span>
																			<span
																				className={cn(
																					"grid size-5 place-items-center rounded-full border text-[0.7rem]",
																					selected
																						? "border-brand-500 bg-brand-500 text-on-brand"
																						: "border-line text-transparent",
																				)}
																			>
																				✓
																			</span>
																		</div>
																	</ChoiceCard>
																)
															},
														)}
													</div>
													<FormMessage />
												</FormItem>
											)}
										/>
									) : null}

									{current.id === "college" ? (
										<FormField
											control={form.control}
											name="college"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														College / University
													</FormLabel>
													<FormControl>
														<Input
															autoFocus
															className={
																fieldShell
															}
															placeholder="e.g. Mumbai University"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									) : null}

									{current.id === "company" ? (
										<FormField
											control={form.control}
											name="company"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Company name
													</FormLabel>
													<FormControl>
														<Input
															autoFocus
															className={
																fieldShell
															}
															placeholder="e.g. Infosys, Flipkart, Startup…"
															{...field}
														/>
													</FormControl>
													<p className="text-[0.78rem] text-ink-400">
														Current employer or the
														company you work with
														most.
													</p>
													<FormMessage />
												</FormItem>
											)}
										/>
									) : null}

									{current.id === "experienceYears" ? (
										<FormField
											control={form.control}
											name="experienceYears"
											render={({ field }) => (
												<FormItem>
													<div className="grid gap-2">
														{EXPERIENCE_OPTIONS.map(
															option => {
																const selected =
																	field.value ===
																	option
																return (
																	<ChoiceCard
																		className="px-3.5 py-3"
																		key={
																			option
																		}
																		onClick={() =>
																			field.onChange(
																				option,
																			)
																		}
																		selected={
																			selected
																		}
																	>
																		<div className="flex items-center justify-between gap-3">
																			<span className="font-bold text-[0.9rem] text-ink-900">
																				{
																					option
																				}
																			</span>
																			<span
																				className={cn(
																					"grid size-5 place-items-center rounded-full border text-[0.7rem]",
																					selected
																						? "border-brand-500 bg-brand-500 text-on-brand"
																						: "border-line text-transparent",
																				)}
																			>
																				✓
																			</span>
																		</div>
																	</ChoiceCard>
																)
															},
														)}
													</div>
													<FormMessage />
												</FormItem>
											)}
										/>
									) : null}

									{current.id === "currentPackage" ? (
										<FormField
											control={form.control}
											name="currentPackage"
											render={({ field }) => (
												<FormItem>
													<div className="grid gap-2 sm:grid-cols-2">
														{PACKAGE_OPTIONS.map(
															option => {
																const selected =
																	field.value ===
																	option
																return (
																	<ChoiceCard
																		className="px-3.5 py-3"
																		key={
																			option
																		}
																		onClick={() =>
																			field.onChange(
																				option,
																			)
																		}
																		selected={
																			selected
																		}
																	>
																		<div className="flex items-center justify-between gap-3">
																			<span className="font-bold text-[0.88rem] text-ink-900">
																				{
																					option
																				}
																			</span>
																			<span
																				className={cn(
																					"grid size-5 place-items-center rounded-full border text-[0.7rem]",
																					selected
																						? "border-brand-500 bg-brand-500 text-on-brand"
																						: "border-line text-transparent",
																				)}
																			>
																				✓
																			</span>
																		</div>
																	</ChoiceCard>
																)
															},
														)}
													</div>
													<FormMessage />
												</FormItem>
											)}
										/>
									) : null}

									{current.id === "year" ? (
										<FormField
											control={form.control}
											name="year"
											render={({ field }) => (
												<FormItem>
													<div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
														{GRADUATION_YEARS.map(
															year => {
																const selected =
																	field.value ===
																	year
																return (
																	<ChoiceCard
																		className="px-3 py-3 text-center"
																		key={
																			year
																		}
																		onClick={() =>
																			field.onChange(
																				year,
																			)
																		}
																		selected={
																			selected
																		}
																	>
																		<span className="font-extrabold font-heading text-[1.05rem] text-ink-900">
																			{
																				year
																			}
																		</span>
																	</ChoiceCard>
																)
															},
														)}
													</div>
													<FormMessage />
												</FormItem>
											)}
										/>
									) : null}

									{current.id === "city" ? (
										<FormField
											control={form.control}
											name="city"
											render={({ field }) => (
												<FormItem>
													<FormLabel>City</FormLabel>
													<FormControl>
														<Input
															autoComplete="address-level2"
															autoFocus
															className={
																fieldShell
															}
															placeholder="e.g. Pune"
															{...field}
														/>
													</FormControl>
													<p className="text-[0.78rem] text-ink-400">
														Country defaults to
														India for this
														prototype.
													</p>
													<FormMessage />
												</FormItem>
											)}
										/>
									) : null}

									{current.id === "purpose" ? (
										<FormField
											control={form.control}
											name="purpose"
											render={({ field }) => (
												<FormItem
													key={`purpose-goals-${watchedEducation || "student"}`}
												>
													<div className="space-y-2.5">
														{(
															current.goals ||
															goalOptions
														).map(item => {
															const selected =
																field.value ===
																item.label
															return (
																<ChoiceCard
																	key={
																		item.label
																	}
																	onClick={() =>
																		field.onChange(
																			item.label,
																		)
																	}
																	selected={
																		selected
																	}
																>
																	<div className="flex items-start gap-3">
																		<span className="grid size-10 shrink-0 place-items-center rounded-xl border border-brand-200 bg-brand-50 text-lg">
																			{
																				item.icon
																			}
																		</span>
																		<span className="min-w-0 flex-1">
																			<span className="flex flex-wrap items-center gap-2">
																				<span className="font-bold text-[0.95rem] text-ink-900">
																					{
																						item.label
																					}
																				</span>
																				<span className="rounded-md border border-brand-200 bg-white px-1.5 py-0.5 font-mono text-[0.62rem] text-brand-ink uppercase">
																					{
																						item.badge
																					}
																				</span>
																			</span>
																			<span className="mt-1 block text-[0.8rem] text-ink-500 leading-snug">
																				{
																					item.detail
																				}
																			</span>
																		</span>
																	</div>
																</ChoiceCard>
															)
														})}
													</div>
													<FormMessage />
												</FormItem>
											)}
										/>
									) : null}

									{current.id === "interests" ? (
										<FormField
											control={form.control}
											name="interests"
											render={({ field }) => (
												<FormItem>
													<div className="flex max-h-[min(42vh,320px)] flex-wrap gap-2.5 overflow-y-auto pr-1">
														{INTEREST_OPTIONS.map(
															option => {
																const selected =
																	field.value?.includes(
																		option,
																	)
																return (
																	<button
																		className={cn(
																			"rounded-full border px-3.5 py-2.5 font-bold text-[0.82rem] transition-all duration-200",
																			selected
																				? "border-brand-500 bg-[linear-gradient(135deg,var(--brand-400),var(--brand-500))] text-on-brand shadow-[0_8px_18px_rgba(255,179,0,0.28)]"
																				: "border-line bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50",
																		)}
																		key={
																			option
																		}
																		onClick={() => {
																			const currentValues =
																				field.value ||
																				[]
																			field.onChange(
																				selected
																					? currentValues.filter(
																							item =>
																								item !==
																								option,
																						)
																					: [
																							...currentValues,
																							option,
																						],
																			)
																		}}
																		type="button"
																	>
																		{selected
																			? "✓ "
																			: ""}
																		{option}
																	</button>
																)
															},
														)}
													</div>
													<p className="text-[0.78rem] text-ink-400">
														{watchedInterests?.length ||
															0}{" "}
														selected · pick at least
														one
													</p>
													<FormMessage />
												</FormItem>
											)}
										/>
									) : null}
								</div>
							</div>
						</div>

						{/* Sticky actions — always visible */}
						<div className="shrink-0 border-line border-t bg-white/95 px-5 py-4 backdrop-blur-md sm:px-7">
							<div className="flex items-center justify-between gap-3">
								<Button
									className="min-w-[96px]"
									disabled={step === 0 || saving}
									onClick={onBack}
									type="button"
									variant="outline"
								>
									← Back
								</Button>
								<div className="flex items-center gap-3">
									<span className="hidden font-mono text-[0.72rem] text-ink-400 sm:inline">
										{step + 1}/{steps.length}
									</span>
									<Button
										className="min-w-[140px] shadow-[0_12px_28px_rgba(255,179,0,0.32)]"
										disabled={saving}
										type="submit"
									>
										{saving
											? "Saving…"
											: step >= steps.length - 1
												? "Finish profile ➔"
												: "Continue ➔"}
									</Button>
								</div>
							</div>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
