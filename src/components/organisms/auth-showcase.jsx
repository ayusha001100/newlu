"use client"

import Logo from "@/atoms/logo"

const PARTNERS = ["Google", "Microsoft", "Amazon", "Razorpay", "Cred", "Swiggy"]

const STATS = [
	{ label: "Active Learners", value: "250K+" },
	{ label: "Projects Built", value: "85K+" },
	{ label: "Hiring Partners", value: "450+" },
]

export default function AuthShowcase() {
	return (
		<div className="flex flex-col justify-between py-2 lg:py-6">
			{/* Top Branding */}
			<div>
				<div className="mb-6 flex items-center gap-2">
					<Logo className="[&_img]:h-[36px] [&_img]:w-auto" />
					<span className="rounded-full border border-brand-400/40 bg-brand-500/10 px-2.5 py-0.5 font-bold font-mono text-[0.68rem] text-brand-ink uppercase tracking-wider">
						QUEST GATEWAY
					</span>
				</div>

				<h1 className="mb-3 max-w-[480px] font-extrabold font-heading text-[2.2rem] text-ink-900 leading-[1.12] tracking-tight sm:text-[2.6rem]">
					Level up your skills with{" "}
					<span className="relative inline-block text-brand-600">
						real projects.
						<span className="absolute inset-x-0 -bottom-1 h-1.5 rounded-full bg-brand-400/40" />
					</span>
				</h1>

				<p className="max-w-[440px] text-[0.98rem] text-ink-600 leading-[1.6]">
					Join 250,000+ developers building verified proof-of-work
					portfolios, earning certificates, and cracking tech
					interviews.
				</p>
			</div>

			{/* Gamified Live Quest Card */}
			<div className="my-7 overflow-hidden rounded-2xl border border-brand-500/25 bg-ink-900 p-5 text-white shadow-[0_20px_45px_rgba(0,0,0,0.25),0_0_25px_rgba(255,179,0,0.06)] [background-image:radial-gradient(320px_180px_at_100%_0%,rgba(var(--brand-rgb),0.25),transparent_70%)]">
				<div className="mb-4 flex items-center justify-between border-white/10 border-b pb-3.5">
					<div className="flex items-center gap-3">
						<div className="relative">
							<div className="grid size-11 place-items-center rounded-xl border border-brand-400/40 bg-brand-500/20 font-black font-mono text-[1.1rem] text-brand-400">
								RS
							</div>
							<span className="absolute -top-1 -right-1 flex size-3">
								<span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
								<span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
							</span>
						</div>
						<div>
							<div className="flex items-center gap-2">
								<strong className="font-extrabold text-[0.96rem] text-white">
									Riya Sharma
								</strong>
								<span className="rounded bg-brand-500/20 px-1.5 py-0.5 font-bold font-mono text-[0.65rem] text-brand-400">
									LVL 03
								</span>
							</div>
							<span className="font-mono text-[0.74rem] text-white/60">
								AI & Full Stack Builder
							</span>
						</div>
					</div>

					<div className="text-right">
						<span className="block font-black font-mono text-[0.95rem] text-brand-400">
							+850 XP
						</span>
						<span className="font-mono text-[0.65rem] text-white/50 uppercase">
							Rank: Silver ★
						</span>
					</div>
				</div>

				{/* Progress XP Bar */}
				<div>
					<div className="mb-1.5 flex items-center justify-between text-[0.72rem]">
						<span className="font-bold text-white/70">
							Next Milestone: LVL 04 Senior Architect
						</span>
						<span className="font-mono text-brand-400">85% XP</span>
					</div>
					<div className="h-2 overflow-hidden rounded-full bg-white/10">
						<div className="h-full w-[85%] rounded-full bg-[linear-gradient(90deg,var(--brand-400),var(--brand-500))] shadow-[0_0_10px_var(--brand-500)]" />
					</div>
				</div>

				{/* Mini Live Quote */}
				<p className="mt-3.5 border-white/8 border-t pt-3 font-serif text-[0.82rem] text-white/75 italic">
					&ldquo;Completed my capstone project and got referred to
					Razorpay within 2 weeks!&rdquo;
				</p>
			</div>

			{/* Bottom Hiring Network & Stats */}
			<div>
				<div className="mb-3 flex items-center justify-between">
					<span className="font-extrabold text-[0.72rem] text-ink-500 uppercase tracking-wider">
						Our Students Work At
					</span>
					<span className="font-bold text-[0.72rem] text-brand-600">
						450+ Companies
					</span>
				</div>
				<div className="flex flex-wrap gap-2">
					{PARTNERS.map(brand => (
						<span
							className="rounded-lg border border-line bg-white/80 px-2.5 py-1 font-bold text-[0.76rem] text-ink-700 shadow-xs"
							key={brand}
						>
							{brand}
						</span>
					))}
				</div>

				<div className="mt-5 grid grid-cols-3 gap-3 border-line border-t pt-4">
					{STATS.map(stat => (
						<div key={stat.label}>
							<strong className="block font-black font-heading text-[1.2rem] text-ink-900">
								{stat.value}
							</strong>
							<span className="text-[0.72rem] text-ink-500">
								{stat.label}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
