"use client"

import { revealClassName, useReveal } from "@/atoms/reveal"
import { cn } from "@/lib/utils"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/ui/accordion"

function FaqItem({ delay, item }) {
	const { inView, ref } = useReveal()

	return (
		<AccordionItem
			className={cn(
				revealClassName(inView),
				"rounded-xl border border-line not-last:border-b bg-white data-open:border-brand-100 data-open:shadow-lu-sm",
			)}
			ref={ref}
			style={{ transitionDelay: `${delay}ms` }}
			value={item.question}
		>
			<AccordionTrigger className="px-[22px] py-5 font-bold font-heading text-[0.98rem] text-ink-900 hover:no-underline focus-visible:border-transparent focus-visible:ring-0 **:data-[slot=accordion-trigger-icon]:hidden">
				{item.question}
				<span className="ml-4 grid size-7 shrink-0 place-items-center rounded-[8px] border border-brand-100 bg-brand-50 font-medium text-[1.15rem] text-brand-ink transition-[transform,background-color,color] group-aria-expanded/accordion-trigger:rotate-45 group-aria-expanded/accordion-trigger:bg-brand-500 group-aria-expanded/accordion-trigger:text-on-brand">
					+
				</span>
			</AccordionTrigger>
			<AccordionContent className="px-[22px] pb-5 text-[0.93rem] text-ink-500 leading-[1.6]">
				<p>{item.answer}</p>
			</AccordionContent>
		</AccordionItem>
	)
}

export default function FaqList({ className, items }) {
	return (
		<Accordion className={cn("gap-3", className)}>
			{items.map((item, index) => (
				<FaqItem
					delay={(index % 4) * 80}
					item={item}
					key={item.question}
				/>
			))}
		</Accordion>
	)
}
