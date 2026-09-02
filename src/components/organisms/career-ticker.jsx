import { TICKER_WORDS } from "@/lib/data/home"

function TickerGroup({ hidden = false }) {
	const words = TICKER_WORDS.concat(TICKER_WORDS, TICKER_WORDS).map(
		(word, position) => ({
			id: `${hidden ? "dup" : "src"}-${word}-${position}`,
			word,
		}),
	)

	return (
		<p
			aria-hidden={hidden || undefined}
			className="m-0 flex shrink-0 items-center gap-0 whitespace-nowrap py-3 max-[720px]:py-2.5"
		>
			{words.map(item => (
				<span
					className="inline-flex items-center font-extrabold font-heading text-[clamp(0.95rem,1.5vw,1.25rem)] tracking-[-0.02em] after:mx-[22px] after:size-[5px] after:rotate-45 after:rounded-[2px] after:bg-brand-500 after:content-[''] max-[720px]:after:mx-4 [&:nth-child(3n+2)]:text-brand-500"
					key={item.id}
				>
					{item.word}
				</span>
			))}
		</p>
	)
}

export default function CareerTicker() {
	return (
		<section
			aria-label="LetsUpgrade career journey"
			className="relative w-full overflow-hidden border-brand-500 border-b-2 bg-[var(--ink-900)] text-white before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-[2] before:w-[90px] before:bg-[linear-gradient(90deg,var(--ink-900),transparent)] before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-[2] after:w-[90px] after:bg-[linear-gradient(270deg,var(--ink-900),transparent)] after:content-['']"
		>
			<div className="flex w-max animate-ticker will-change-transform motion-reduce:animate-none hover:[animation-play-state:paused]">
				<TickerGroup />
				<TickerGroup hidden />
			</div>
		</section>
	)
}
