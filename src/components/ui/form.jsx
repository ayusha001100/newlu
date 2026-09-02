"use client"

import {
	cloneElement,
	createContext,
	isValidElement,
	useContext,
	useId,
} from "react"
import { Controller, FormProvider, useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"

const Form = FormProvider

const FormFieldContext = createContext({})
const FormItemContext = createContext({})

const FormField = props => (
	<FormFieldContext.Provider value={{ name: props.name }}>
		<Controller {...props} />
	</FormFieldContext.Provider>
)

const useFormField = () => {
	const fieldContext = useContext(FormFieldContext)
	const itemContext = useContext(FormItemContext)
	const { getFieldState, formState } = useFormContext()

	if (!fieldContext?.name) {
		throw new Error("useFormField should be used within <FormField>")
	}

	const fieldState = getFieldState(fieldContext.name, formState)

	return {
		formDescriptionId: `${itemContext.id}-form-item-description`,
		formItemId: `${itemContext.id}-form-item`,
		formMessageId: `${itemContext.id}-form-item-message`,
		id: itemContext.id,
		name: fieldContext.name,
		...fieldState,
	}
}

const FormItem = ({ className, ...props }) => {
	const id = useId()
	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				className={cn("grid gap-2", className)}
				data-slot="form-item"
				{...props}
			/>
		</FormItemContext.Provider>
	)
}

const FormLabel = ({ className, ...props }) => {
	const { error, formItemId } = useFormField()
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: htmlFor is bound to FormControl via formItemId
		<label
			className={cn(
				"font-semibold text-[0.82rem] text-ink-700",
				error && "text-[#c0392b]",
				className,
			)}
			data-slot="form-label"
			htmlFor={formItemId}
			{...props}
		/>
	)
}

const FormControl = ({ children }) => {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField()

	if (!isValidElement(children)) return children

	return cloneElement(children, {
		"aria-describedby": error
			? `${formDescriptionId} ${formMessageId}`
			: formDescriptionId,
		"aria-invalid": Boolean(error),
		id: formItemId,
	})
}

const FormDescription = ({ className, ...props }) => {
	const { formDescriptionId } = useFormField()
	return (
		<p
			className={cn("text-[0.78rem] text-ink-400", className)}
			data-slot="form-description"
			id={formDescriptionId}
			{...props}
		/>
	)
}

const FormMessage = ({ className, children, ...props }) => {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error.message ?? "") : children
	if (!body) return null
	return (
		<p
			className={cn(
				"min-h-[18px] text-[#c0392b] text-[0.83rem]",
				className,
			)}
			data-slot="form-message"
			id={formMessageId}
			{...props}
		>
			{body}
		</p>
	)
}

export {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
}
