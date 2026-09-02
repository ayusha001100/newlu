"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import {
	EDUCATION_OPTIONS,
	GOAL_OPTIONS,
	GRADUATION_YEARS,
	INTEREST_OPTIONS,
	isProfileComplete,
	ONBOARD_STEPS,
} from "@/lib/data/onboarding"
import { cn } from "@/lib/utils"
import { useLearn } from "@/organisms/learn-centre/context"
import { OnboardingSchema } from "@/schemas/onboarding"
import { Button } from "@/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/ui/form"
import { Input } from "@/ui/input"
import { NativeSelect, NativeSelectOption } from "@/ui/native-select"
import { toast } from "@/ui/toast"

const defaultValues = {
	city: "",
	college: "",
	education: "",
	interests: [],
	name: "",
	purpose: "",
	year: "",
}

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

	const form = useForm({
		defaultValues,
		mode: "onTouched",
		resolver: zodResolver(OnboardingSchema),
	})

	useEffect(() => {
		if (!(open && user)) return
		form.reset({
			city: user.city || "",
			college: user.college || "",
			education: user.education || "",
			interests: user.interests || [],
			name: user.name || "",
			purpose: user.purpose || "",
			year: user.year || "",
		})
		setStep(0)
	}, [form, open, user])

	const current = ONBOARD_STEPS[step]
	const progress = useMemo(
		() => Math.round(((step + 1) / ONBOARD_STEPS.length) * 100),
		[step],
	)

	const finish = async values => {
		setSaving(true)
		try {
			await saveProfile({
				...values,
				country: "India",
				profileComplete: true,
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
		const fields = current.fields
		const valid = await form.trigger(fields)
		if (!valid) return

		if (step >= ONBOARD_STEPS.length - 1) {
			await form.handleSubmit(finish)()
			return
		}
		setStep(value => value + 1)
	}

	const onBack = () => {
		if (step === 0) return
		setStep(value => value - 1)
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
				className="relative max-w-[520px] overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-2xl sm:p-6"
				dismissible={!required}
			>
				<div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500),#f59e0b)]" />

				<DialogHeader className="space-y-1 text-left">
					<div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-300 bg-brand-50 px-2.5 py-0.5 font-bold font-mono text-[0.66rem] text-brand-ink uppercase">
						<span>⚡</span>
						<span>
							STEP {step + 1} OF {ONBOARD_STEPS.length}
						</span>
					</div>
					<DialogTitle className="font-extrabold font-heading text-[1.35rem] text-ink-900 tracking-tight">
						{current.title}
					</DialogTitle>
					<p className="text-[0.84rem] text-ink-500 leading-normal">
						{current.description}
					</p>
				</DialogHeader>

				<div className="mt-3 h-1.5 overflow-hidden rounded-full bg-canvas-muted">
					<div
						className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500))] transition-all duration-300"
						style={{ width: `${progress}%` }}
					/>
				</div>

				<Form {...form}>
					<form
						className="mt-4 space-y-4"
						onSubmit={event => {
							event.preventDefault()
							onNext()
						}}
					>
						{current.id === "name" ? (
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full name</FormLabel>
										<FormControl>
											<Input
												autoComplete="name"
												className="min-h-[46px]"
												placeholder="e.g. Ayush Aryan"
												{...field}
											/>
										</FormControl>
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
										<FormLabel>Education level</FormLabel>
										<FormControl>
											<NativeSelect
												className="w-full [&_select]:min-h-[46px] [&_select]:w-full [&_select]:rounded-[10px] [&_select]:border-line [&_select]:bg-white [&_select]:py-[13px] [&_select]:pr-8 [&_select]:pl-3 [&_select]:text-[0.92rem]"
												onChange={event =>
													field.onChange(
														event.target.value,
													)
												}
												value={field.value}
											>
												<NativeSelectOption value="">
													Select education
												</NativeSelectOption>
												{EDUCATION_OPTIONS.map(
													option => (
														<NativeSelectOption
															key={option}
															value={option}
														>
															{option}
														</NativeSelectOption>
													),
												)}
											</NativeSelect>
										</FormControl>
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
												className="min-h-[46px]"
												placeholder="e.g. Mumbai University"
												{...field}
											/>
										</FormControl>
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
										<FormLabel>Graduation year</FormLabel>
										<FormControl>
											<NativeSelect
												className="w-full [&_select]:min-h-[46px] [&_select]:w-full [&_select]:rounded-[10px] [&_select]:border-line [&_select]:bg-white [&_select]:py-[13px] [&_select]:pr-8 [&_select]:pl-3 [&_select]:text-[0.92rem]"
												onChange={event =>
													field.onChange(
														event.target.value,
													)
												}
												value={field.value}
											>
												<NativeSelectOption value="">
													Select year
												</NativeSelectOption>
												{GRADUATION_YEARS.map(year => (
													<NativeSelectOption
														key={year}
														value={year}
													>
														{year}
													</NativeSelectOption>
												))}
											</NativeSelect>
										</FormControl>
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
												className="min-h-[46px]"
												placeholder="e.g. Pune"
												{...field}
											/>
										</FormControl>
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
									<FormItem>
										<div className="space-y-2.5">
											{GOAL_OPTIONS.map(item => {
												const selected =
													field.value === item.label
												return (
													<button
														className={cn(
															"flex w-full items-start gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all",
															selected
																? "border-brand-500 bg-brand-50 shadow-xs"
																: "border-line bg-white hover:border-brand-300",
														)}
														key={item.label}
														onClick={() =>
															field.onChange(
																item.label,
															)
														}
														type="button"
													>
														<span className="text-xl">
															{item.icon}
														</span>
														<span className="min-w-0 flex-1">
															<span className="flex flex-wrap items-center gap-2">
																<span className="font-bold text-[0.92rem] text-ink-900">
																	{item.label}
																</span>
																<span className="rounded-md border border-brand-200 bg-white px-1.5 py-0.5 font-mono text-[0.64rem] text-brand-ink uppercase">
																	{item.badge}
																</span>
															</span>
															<span className="mt-0.5 block text-[0.78rem] text-ink-500">
																{item.detail}
															</span>
														</span>
													</button>
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
										<div className="flex flex-wrap gap-2">
											{INTEREST_OPTIONS.map(option => {
												const selected =
													field.value?.includes(
														option,
													)
												return (
													<button
														className={cn(
															"rounded-full border px-3.5 py-2 font-bold text-[0.8rem] transition-all",
															selected
																? "border-brand-500 bg-brand-50 text-brand-ink"
																: "border-line bg-white text-ink-700 hover:border-brand-300",
														)}
														key={option}
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
														{option}
													</button>
												)
											})}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						) : null}

						<div className="flex items-center justify-between gap-3 pt-2">
							<Button
								disabled={step === 0 || saving}
								onClick={onBack}
								type="button"
								variant="outline"
							>
								Back
							</Button>
							<Button disabled={saving} type="submit">
								{saving
									? "Saving…"
									: step >= ONBOARD_STEPS.length - 1
										? "Save profile ➔"
										: "Continue ➔"}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
