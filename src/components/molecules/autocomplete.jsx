"use client"

import Badge from "@/atoms/badge"
import { getType } from "@/lib"
import { cn } from "@/lib/utils"
import { Command, CommandGroup, CommandItem, CommandList } from "@/ui/command"
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/ui/field"
import { Command as CommandPrimitive } from "cmdk"
import { Check, PlusCircleIcon, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Controller } from "react-hook-form"
import { useDebounce } from "use-debounce"

// ─── Instance config ──────────────────────────────────────────────────────────
// Extend here to add new instance types without touching component logic.
const instanceHooks = {}

// ─── Hook: useInstanceOptions ─────────────────────────────────────────────────
const useInstanceOptions = ({ apiBased, instance, query, initialOptions = [] }) => {
	const { get } = instanceHooks[instance] ?? {}

	const [apiOptions, setApiOptions] = useState([])
	const [isFetching, setIsFetching] = useState(false)
	const [fetchError, setFetchError] = useState(null)
	const [optionCache, setOptionCache] = useState(initialOptions)
	const [fetchTrigger, setFetchTrigger] = useState(0)

	useEffect(() => {
		if (!apiBased || !get) return

		queueMicrotask(() => {
			setIsFetching(true)
			setFetchError(null)
		})

		const fetchOptions = async () => {
			try {
				const { data } = await get({ query })
				const results = data ?? []
				setApiOptions(results)
				setOptionCache(prev => {
					const existingKeys = new Set(prev.map(o => o._id ?? o.title))
					const incoming = results.filter(
						o => !existingKeys.has(o._id ?? o.title)
					)
					return incoming.length ? [...prev, ...incoming] : prev
				})
			} catch (err) {
				setFetchError(err?.message ?? "Failed to load options")
			} finally {
				setIsFetching(false)
			}
		}

		fetchOptions()
	}, [apiBased, instance, get, query, fetchTrigger])

	const invalidate = useCallback(() => setFetchTrigger(n => n + 1), [])

	return { apiOptions, optionCache, isFetching, fetchError, invalidate }
}

// ─── Sub-component: AutocompleteDropdown ─────────────────────────────────────
const AutocompleteDropdown = ({
	name,
	showDropdown,
	showSearching,
	fetchError,
	filteredOptions,
	showAddOption,
	queryValue,
	multiple,
	valueLabel,
	instance,
	searchKey,
	field,
	handleAddOption,
	handleSelect,
}) => {
	if (!showDropdown) return null

	return (
		<div className="animate-in absolute top-0 z-20 max-h-96 w-full min-w-32 overflow-hidden rounded-md border border-neutral-200 bg-white p-1 text-neutral-950 shadow-md outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
			{showAddOption ? (
				<CommandItem
					onMouseDown={e => {
						e.preventDefault()
						e.stopPropagation()
					}}
					onSelect={() => handleAddOption({ title: queryValue })}
					className="relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm select-none"
				>
					<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
						<PlusCircleIcon className="h-4 w-4" />
					</span>
					{queryValue}
				</CommandItem>
			) : null}

			{showSearching ? (
				<div className="relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm select-none">
					Searching...
				</div>
			) : fetchError ? (
				<div className="relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm text-red-500 select-none">
					{fetchError}
				</div>
			) : filteredOptions.length > 0 ? (
				<CommandGroup className="h-full overflow-auto p-0">
					{filteredOptions.map(option => {
						const isSelected = multiple
							? valueLabel?.includes(option.title)
							: valueLabel === option.title
						return (
							<CommandItem
								key={option[searchKey] ?? option.title}
								onMouseDown={e => {
									e.preventDefault()
									e.stopPropagation()
								}}
								onSelect={() => handleSelect(field)(option)}
								className="relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm select-none"
							>
								{isSelected ? (
									<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
										<Check className="h-4 w-4" />
									</span>
								) : null}
								{instance === "tag" && option.icon ? (
									<span className="relative h-3.5 w-3.5">
										<Image
											src={option.icon}
											alt={option.title}
											fill
										/>
									</span>
								) : null}
								{option.title}
							</CommandItem>
						)
					})}
				</CommandGroup>
			) : (
				<div className="relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm select-none">
					No results found
				</div>
			)}
		</div>
	)
}

// ─── Helper: deriveFieldValues ────────────────────────────────────────────────
const deriveFieldValues = ({
	field,
	multiple,
	inputValue,
	searchKey,
	filteredOptions,
	queryValue,
	resolvePool,
	addOption,
	showSearching,
	getLabel,
	getOption,
}) => {
	const valueLabel = multiple
		? (field.value || []).map(getLabel).filter(Boolean)
		: getLabel(field.value)

	const valueOption = multiple
		? (field.value || []).map(getOption).filter(Boolean)
		: getOption(field.value)

	const value = multiple ? inputValue : (valueLabel ?? inputValue)

	const hasSelectedOption = multiple
		? (field.value || []).some(v =>
				filteredOptions.some(option => option[searchKey] === v)
			)
		: filteredOptions.some(option => option[searchKey] === field.value)

	const queryTrimmed = (queryValue ?? "").trim().toLowerCase()
	const hasDuplicateTitle =
		queryTrimmed !== "" &&
		resolvePool.some(
			o => (o?.title ?? "").toLowerCase().trim() === queryTrimmed
		)

	const showAddOption =
		addOption &&
		!!queryValue &&
		!hasSelectedOption &&
		!hasDuplicateTitle &&
		!showSearching

	return { valueLabel, valueOption, value, showAddOption }
}

// ─── Sub-component: AutocompleteField ─────────────────────────────────────────
const AutocompleteField = ({
	field,
	fieldState,
	label,
	description,
	name,
	open,
	inputValue,
	inputRef,
	multiple,
	instance,
	searchKey,
	placeholder,
	showDropdown,
	showSearching,
	fetchError,
	filteredOptions,
	queryValue,
	resolvePool,
	addOption,
	handleInputChange,
	handleKeyDown,
	handleSelect,
	handleUnselect,
	handleAddOption,
	setOpen,
	getLabel,
	getOption,
}) => {
	const { valueLabel, valueOption, value, showAddOption } = deriveFieldValues({
		field, multiple, inputValue, searchKey, filteredOptions,
		queryValue, resolvePool, addOption, showSearching, getLabel, getOption,
	})

	return (
		<Field data-invalid={fieldState.invalid} className={cn(label && description && "gap-2")}>
			<div className="flex flex-col gap-1">
				{label ? <FieldLabel>{label}</FieldLabel> : null}
				{description ? (
					<FieldDescription>{description}</FieldDescription>
				) : null}
			</div>
			<Command shouldFilter={false} className="overflow-visible bg-transparent">
				<div
					aria-expanded={open}
					aria-haspopup="listbox"
					className="flex w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
				>
					<div className="flex w-full flex-wrap gap-2">
						{multiple &&
							valueOption?.map(option => (
								<Badge key={option[searchKey] ?? option.title}>
									{instance === "tag" && option.icon ? (
										<span className="relative h-3.5 w-3.5">
											<Image
												src={option.icon}
												alt={option.title}
												fill
											/>
										</span>
									) : null}
									{option.title}
									<button
										type="button"
										aria-label={`Remove ${option.title}`}
										className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
										onMouseDown={e => {
											e.preventDefault()
											e.stopPropagation()
										}}
										onClick={() =>
											handleUnselect(field)(option)
										}
									>
										<X className="hover:text-foreground h-3 w-3 text-neutral-500" />
									</button>
								</Badge>
							))}
						<CommandPrimitive.Input
							ref={inputRef}
							value={value}
							onValueChange={handleInputChange}
							onKeyDown={handleKeyDown(field)}
							onBlur={() => setOpen(false)}
							onFocus={() => setOpen(true)}
							placeholder={placeholder}
							aria-autocomplete="list"
							aria-controls={
								showDropdown
									? `${name}-autocomplete-list`
									: undefined
							}
							className="h-5 flex-1 bg-transparent outline-none placeholder:text-neutral-500"
						/>
					</div>
				</div>
				<div className="relative mt-2">
					<CommandList id={`${name}-autocomplete-list`}>
						<AutocompleteDropdown
							name={name}
							showDropdown={showDropdown}
							showSearching={showSearching}
							fetchError={fetchError}
							filteredOptions={filteredOptions}
							showAddOption={showAddOption}
							queryValue={queryValue}
							multiple={multiple}
							valueLabel={valueLabel}
							instance={instance}
							searchKey={searchKey}
							field={field}
							handleAddOption={handleAddOption}
							handleSelect={handleSelect}
						/>
					</CommandList>
				</div>
			</Command>
			{fieldState.invalid && (
				<FieldError errors={[fieldState.error]} />
			)}
		</Field>
	)
}

// ─── Component ────────────────────────────────────────────────────────────────

const Autocomplete = ({
	form,
	name,
	label,
	description,
	placeholder,
	multiple = false,
	options,
	apiBased = false,
	initializedFromValue = false,
	asDefault,
	searchKey = "_id",
	instance = "company",
	filterKeys = ["_id"],
	addOption = false,
	onSelect = () => {},
	onUnselect = () => {},
	initialOptions,
}) => {
	const syncFromValue = initializedFromValue || asDefault

	const inputRef = useRef(null)
	const [open, setOpen] = useState(false)
	const [inputValue, setInputValue] = useState("")
	const [queryValue, setQueryValue] = useState("")
	const [query] = useDebounce(queryValue, 1000)

	const { apiOptions, optionCache, isFetching, fetchError } =
		useInstanceOptions({ apiBased, instance, query, initialOptions })

	const formValue = form.watch(name)

	// ── Derived option pools ──────────────────────────────────────────────────
	const optionsToUse = useMemo(
		() => (apiBased ? apiOptions : options) ?? [],
		[apiBased, apiOptions, options]
	)

	const resolvePool = useMemo(
		() => (apiBased ? optionCache : optionsToUse),
		[apiBased, optionCache, optionsToUse]
	)

	// ── Label / option resolution ─────────────────────────────────────────────
	const getLabel = useCallback(
		val => {
			if (val == null || val === "") return undefined
			const key = getType(val) === "Object" ? val[searchKey] : val
			const byKey = resolvePool.find(o => o[searchKey] === key)
			if (byKey) return byKey.title
			const byTitle = resolvePool.find(
				o => o.title === (getType(val) === "Object" ? val.title : val)
			)
			if (byTitle) return byTitle.title
			return getType(val) === "String" ? val : undefined
		},
		[resolvePool, searchKey]
	)

	const getOption = useCallback(
		val => {
			if (val == null || val === "") return undefined
			const key = getType(val) === "Object" ? val[searchKey] : val
			return (
				resolvePool.find(o => o[searchKey] === key) ??
				resolvePool.find(
					o =>
						o.title ===
						(getType(val) === "Object" ? val.title : val)
				)
			)
		},
		[resolvePool, searchKey]
	)

	// ── Filtered options ──────────────────────────────────────────────────────
	const filteredOptions = useMemo(() => {
		if (apiBased) return optionsToUse
		return optionsToUse.filter(option =>
			filterKeys.some(key => {
				const value = key
					.split(".")
					.reduce(
						(acc, k) => (acc != null ? acc[k] : undefined),
						option
					)
				return value
					?.toString()
					?.toLowerCase()
					.includes(inputValue?.toLowerCase())
			})
		)
	}, [apiBased, optionsToUse, filterKeys, inputValue])

	// ── Sync display value when form value changes ────────────────────────────
	useEffect(() => {
		const display = multiple
			? ""
			: (syncFromValue
					? (formValue?.title ?? formValue)
					: getLabel(formValue)) || ""
		queueMicrotask(() => {
			setInputValue(display)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
		// biome-ignore lint/correctness/useExhaustiveDependencies: intentional — only sync display when formValue changes
	}, [formValue])

	// ── Input handlers ────────────────────────────────────────────────────────
	const handleInputChange = useCallback(value => {
		setInputValue(value)
		setQueryValue(value)
	}, [])

	const handleKeyDown = useCallback(
		field => e => {
			const input = inputRef.current
			if (!input) return
			if (e.key === "Backspace") {
				if (multiple) {
					if (input.value.trim().length === 0)
						field.onChange([...(field.value || [])].slice(0, -1))
				} else {
					field.onChange("")
					setQueryValue("")
				}
			} else if (e.key === "Escape") {
				input.blur()
			}
		},
		[multiple]
	)

	// ── Selection handlers ────────────────────────────────────────────────────
	const handleSelect = useCallback(
		field => option => {
			setInputValue("")
			onSelect(field.value, option)
			if (!multiple) inputRef.current?.blur()
		},
		[multiple, onSelect]
	)

	const handleUnselect = useCallback(
		field => option => {
			onUnselect(field.value, option)
		},
		[onUnselect]
	)

	// ── Add-new-option shell ──────────────────────────────────────────────────
	const handleAddOption = useCallback(
		newOptionData => {
			const body = {
				...newOptionData,
				createdBy: "",
				updatedBy: "",
			}
			console.log("[Autocomplete] add option:", body)
		},
		[instance]
	)

	// ── Dropdown visibility ───────────────────────────────────────────────────
	const showDropdown = open && (apiBased ? !!queryValue : true)
	const queryTrimmedForSearch = (queryValue ?? "").trim()
	const isWaitingForDebounce =
		apiBased && queryTrimmedForSearch !== "" && queryValue !== query
	const showSearching =
		apiBased &&
		queryTrimmedForSearch !== "" &&
		(isWaitingForDebounce || isFetching)

	return (
		<Controller
			control={form.control}
			name={name}
			render={({ field, fieldState }) => (
				<AutocompleteField
					field={field}
					fieldState={fieldState}
					label={label}
					description={description}
					name={name}
					open={open}
					inputValue={inputValue}
					inputRef={inputRef}
					multiple={multiple}
					instance={instance}
					searchKey={searchKey}
					placeholder={placeholder}
					showDropdown={showDropdown}
					showSearching={showSearching}
					fetchError={fetchError}
					filteredOptions={filteredOptions}
					queryValue={queryValue}
					resolvePool={resolvePool}
					addOption={addOption}
					showSearchingFlag={showSearching}
					handleInputChange={handleInputChange}
					handleKeyDown={handleKeyDown}
					handleSelect={handleSelect}
					handleUnselect={handleUnselect}
					handleAddOption={handleAddOption}
					setOpen={setOpen}
					getLabel={getLabel}
					getOption={getOption}
				/>
			)}
		/>
	)
}

export default Autocomplete
