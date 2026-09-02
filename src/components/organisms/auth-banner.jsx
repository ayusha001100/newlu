"use client"

export default function AuthBanner() {
	return (
		<div className="relative flex size-full min-h-screen flex-col justify-between overflow-hidden rounded-tr-[48px] rounded-br-[48px] bg-[linear-gradient(155deg,#10141B_0%,#18202F_55%,#0C1017_100%)] p-10 text-white shadow-[10px_0_40px_rgba(0,0,0,0.18)] max-[980px]:hidden sm:p-12 lg:p-14 xl:p-18">
			{/* Ambient Glowing Orbs & Matrix Grid */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,179,0,0.08)_1px,transparent_1px)] bg-size-[26px_26px]" />
			<div className="pointer-events-none absolute top-12 left-10 size-72 rounded-full bg-brand-500/15 blur-[90px]" />
			<div className="pointer-events-none absolute right-0 bottom-16 size-80 rounded-full bg-brand-400/12 blur-[100px]" />

			<div />

			{/* Center Inspirational Quote */}
			<div className="relative z-10 my-auto max-w-[500px]">
				<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 font-mono text-[0.7rem] text-brand-300 uppercase tracking-widest backdrop-blur-md">
					<span className="size-1.5 animate-ping rounded-full bg-brand-400" />
					<span>THE PRACTICAL LEARNING COMMUNITY</span>
				</div>

				<h1 className="font-extrabold font-heading text-[2.6rem] text-white leading-[1.12] tracking-tight xl:text-[3.1rem]">
					Let&apos;s build your career{" "}
					<span className="relative inline-block text-brand-400">
						together.
						<span className="absolute inset-x-0 -bottom-1 h-1.5 rounded-full bg-brand-400/40" />
					</span>
				</h1>

				<p className="mt-4 font-serif text-[1.05rem] text-white/75 italic leading-relaxed">
					&ldquo;Building in-demand skills, real-world projects &
					career opportunities across Tech, Data, AI &
					Management.&rdquo;
				</p>

				{/* Active Learner Pill */}
				<div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
					<div className="flex -space-x-2">
						{["RS", "AK", "VJ", "PR"].map((initials, i) => (
							<div
								className="grid size-8 place-items-center rounded-full border-2 border-slate-900 bg-brand-500 font-bold font-mono text-[0.65rem] text-on-brand shadow-sm"
								key={initials}
								style={{ opacity: 1 - i * 0.15 }}
							>
								{initials}
							</div>
						))}
					</div>
					<div className="text-left">
						<strong className="block font-bold text-[0.82rem] text-white">
							250,000+ Learners & Professionals
						</strong>
						<span className="text-[0.7rem] text-white/60">
							Upskilling & getting hired
						</span>
					</div>
				</div>
			</div>

			{/* Bottom Partner Strip */}
			<div className="relative z-10 border-white/10 border-t pt-5">
				<span className="block font-mono text-[0.68rem] text-white/50 uppercase tracking-wider">
					Trusted by learners from Google, Microsoft, Amazon & 450+
					companies
				</span>
			</div>
		</div>
	)
}
