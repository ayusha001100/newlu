import Link from "next/link"

export function Example({ children, title }) {
	return (
		<div className="my-[30px] rounded-2xl border border-[var(--brand-200)] bg-[var(--brand-050)] p-6 max-[720px]:p-[19px] [&>p:last-child]:mb-0 [&_strong]:mb-2.5 [&_strong]:block [&_strong]:font-heading [&_strong]:text-[var(--ink-900)]">
			{title ? <strong>{title}</strong> : null}
			{children}
		</div>
	)
}

export function CodeBlock({ children }) {
	return (
		<code className="mt-2 mb-0 block overflow-x-auto whitespace-pre-wrap rounded-[10px] bg-[var(--ink-900)] p-4 font-mono text-[#fff] text-[0.82rem] leading-[1.7]">
			{children}
		</code>
	)
}

export function Checklist({ items, title }) {
	return (
		<div className="my-[30px] rounded-2xl border border-[var(--line)] bg-[var(--bg-050)] p-6 max-[720px]:p-[19px]">
			<strong className="mb-2.5 block font-heading text-[var(--ink-900)]">
				{title}
			</strong>
			<ul className="m-0 grid list-none gap-2.5">
				{items.map(item => (
					<li
						className="relative pl-[27px] before:absolute before:left-0 before:font-extrabold before:text-[var(--success)] before:content-['✓']"
						key={item}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	)
}

export function Callout({ children, title }) {
	return (
		<div className="my-[30px] rounded-2xl border border-[var(--line)] bg-[var(--bg-050)] p-6 max-[720px]:p-[19px]">
			<strong className="mb-2.5 block font-heading text-[var(--ink-900)]">
				{title}
			</strong>
			<div className="[&_p:last-child]:mb-0">{children}</div>
		</div>
	)
}

export function Quote({ children }) {
	return (
		<blockquote className="my-8 rounded-r-[14px] border-[var(--brand-500)] border-l-4 bg-[var(--brand-050)] px-6 py-[22px] font-bold font-heading text-[1.08rem] text-[var(--ink-900)] leading-[1.55]">
			{children}
		</blockquote>
	)
}

export function DataTable({ headers, rows }) {
	return (
		<div className="my-7 overflow-x-auto rounded-[14px] border border-[var(--line)]">
			<table className="w-full border-collapse bg-[var(--bg-000)] text-[0.84rem]">
				<thead>
					<tr>
						{headers.map(header => (
							<th
								className="border-[var(--line)] border-b bg-[var(--bg-050)] px-[15px] py-[13px] text-left align-top font-heading text-[0.76rem] text-[var(--ink-900)]"
								key={header}
								scope="col"
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map(row => (
						<tr
							className="[&:last-child>td]:border-b-0"
							key={row.join("|")}
						>
							{row.map((cell, index) => (
								<td
									className="border-[var(--line)] border-b px-[15px] py-[13px] text-left align-top"
									key={`${headers[index]}-${cell}`}
								>
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export function ArticleFaq({ items }) {
	return (
		<div className="mt-6 grid gap-3" id="faq">
			{items.map(item => (
				<details
					className="rounded-xl border border-[var(--line)] bg-[var(--bg-000)] px-[18px] py-4"
					key={item.question}
				>
					<summary className="cursor-pointer font-bold font-heading text-[0.92rem] text-[var(--ink-900)]">
						{item.question}
					</summary>
					<p className="mt-3 mb-0 text-[0.88rem] text-[var(--ink-500)]">
						{item.answer}
					</p>
				</details>
			))}
		</div>
	)
}

export function Sources({ items }) {
	return (
		<section className="mt-12 border-[var(--line)] border-t pt-7">
			<h2 className="mt-0 mb-[18px] text-[1.25rem]">
				Sources and further reading
			</h2>
			<ul className="mb-6 ml-[22px] grid list-disc gap-2.5 text-[0.8rem]">
				{items.map(item => (
					<li className="pl-1.5" key={item.href}>
						<a
							className="font-bold text-[var(--brand-ink)] underline decoration-[var(--brand-200)] underline-offset-[3px]"
							href={item.href}
							rel="noopener noreferrer"
							target="_blank"
						>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</section>
	)
}

export function Author() {
	return (
		<aside className="mt-[52px] grid grid-cols-[52px_minmax(0,1fr)] gap-4 rounded-2xl border border-[var(--line)] bg-[var(--bg-050)] p-[22px]">
			<span
				aria-hidden="true"
				className="grid size-[52px] place-items-center rounded-[15px] bg-[var(--ink-900)] font-extrabold font-heading text-[0.72rem] text-[var(--brand-400)]"
			>
				LU
			</span>
			<div>
				<h3 className="mb-1 text-[1rem]">LetsUpgrade Editorial Team</h3>
				<p className="m-0 text-[0.8rem] text-[var(--ink-500)] leading-[1.55]">
					Curriculum-backed explainers focused on practical skills,
					proof of work and early-career decisions.
				</p>
			</div>
		</aside>
	)
}

export function InlineLink({ children, href }) {
	const internal = href.startsWith("/")
	const className =
		"font-bold text-[var(--brand-ink)] underline decoration-[var(--brand-200)] underline-offset-[3px]"
	if (internal) {
		return (
			<Link className={className} href={href}>
				{children}
			</Link>
		)
	}
	return (
		<a
			className={className}
			href={href}
			rel="noopener noreferrer"
			target="_blank"
		>
			{children}
		</a>
	)
}
