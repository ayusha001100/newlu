"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function Dialog({ ...props }) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({ className, ...props }) {
	return (
		<DialogPrimitive.Backdrop
			className={cn(
				"data-open:fade-in-0 data-closed:fade-out-0 fixed inset-0 z-50 bg-black/40 duration-150 data-closed:animate-out data-open:animate-in supports-backdrop-filter:backdrop-blur-sm",
				className,
			)}
			data-slot="dialog-overlay"
			{...props}
		/>
	)
}

function DialogContent({ className, children, dismissible = true, ...props }) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
				<DialogPrimitive.Popup
					className={cn(
						"data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 pointer-events-auto relative max-h-[min(92vh,700px)] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl outline-none duration-150 data-closed:animate-out data-open:animate-in",
						className,
					)}
					data-slot="dialog-content"
					{...props}
				>
					{children}
					{dismissible && (
						<DialogPrimitive.Close
							data-slot="dialog-close"
							render={
								<Button
									className="absolute top-4 right-4"
									size="icon-sm"
									variant="ghost"
								/>
							}
						>
							<XIcon />
							<span className="sr-only">Close</span>
						</DialogPrimitive.Close>
					)}
				</DialogPrimitive.Popup>
			</div>
		</DialogPortal>
	)
}

function DialogHeader({ className, ...props }) {
	return (
		<div
			className={cn("flex flex-col gap-2", className)}
			data-slot="dialog-header"
			{...props}
		/>
	)
}

function DialogFooter({ className, dismissible = false, children, ...props }) {
	return (
		<div
			className={cn(
				"-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
				className,
			)}
			data-slot="dialog-footer"
			{...props}
		>
			{children}
			{dismissible && (
				<DialogPrimitive.Close render={<Button variant="outline" />}>
					Close
				</DialogPrimitive.Close>
			)}
		</div>
	)
}

function DialogTitle({ className, ...props }) {
	return (
		<DialogPrimitive.Title
			className={cn(
				"font-heading font-medium text-base leading-none",
				className,
			)}
			data-slot="dialog-title"
			{...props}
		/>
	)
}

function DialogDescription({ className, ...props }) {
	return (
		<DialogPrimitive.Description
			className={cn(
				"text-muted-foreground text-sm *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
				className,
			)}
			data-slot="dialog-description"
			{...props}
		/>
	)
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
}
