import Image from "next/image"
import Link from "next/link"
import Container from "@/atoms/container"
import GoogleMark from "@/atoms/google-mark"
import Highlight from "@/atoms/highlight"
import LearnerCount from "@/atoms/learner-count"
import StarRating from "@/atoms/star-rating"
import { GOOGLE_RATING, GOOGLE_REVIEWS } from "@/lib/data/home"
import { Button } from "@/ui/button"

const PROOF = [
	{ icon: "✨", label: "Free to join" },
	{ icon: "📜", label: "Certificate on finish" },
	{ icon: "🚀", label: "Apply with a project" },
	{ icon: "👥", label: "Refer a classmate" },
]

export default function Hero() {
	return (
		<section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--brand-050)_0%,#ffffff_62%)] pt-[148px] pb-[120px] max-[720px]:pt-[112px] max-[720px]:pb-16">
			<div
				aria-hidden="true"
				className="mask-[linear-gradient(180deg,#000_0%,transparent_72%)] pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(16,20,27,0.07)_1px,transparent_1px)] bg-size-[26px_26px]"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-[260px] -right-[180px] size-[680px] animate-glow-drift bg-[radial-gradient(circle,rgba(var(--brand-rgb),0.28),transparent_68%)] blur-[20px] motion-reduce:animate-none"
			/>
			<Container className="relative grid grid-cols-[1.05fr_0.95fr] items-center gap-20 max-[980px]:grid-cols-1 max-[720px]:gap-10">
				<div>
					<p className="mb-[22px] inline-flex animate-hero-badge items-center gap-2 rounded-full border border-line bg-white py-[7px] pr-4 pl-2.5 font-semibold text-[0.82rem] text-ink-700 shadow-lu-sm motion-reduce:animate-none max-[720px]:py-1.5 max-[720px]:pr-[13px] max-[720px]:pl-[9px] max-[720px]:text-[0.76rem]">
						<span
							aria-hidden="true"
							className="size-2 rounded-full bg-success shadow-[0_0_0_3px_rgba(var(--success-rgb),0.16)]"
						/>
						Free certifications · then internships and jobs
					</p>
					<h1 className="mb-5 animate-hero-title text-[clamp(2.35rem,4.4vw,3.6rem)] leading-[1.08] tracking-[-0.035em] motion-reduce:animate-none max-[720px]:text-[clamp(2.25rem,11vw,3.1rem)] max-[720px]:leading-[1.05]">
						Learn a skill. Finish a project.{" "}
						<Highlight>Get hired.</Highlight>
					</h1>
					<p className="mb-[30px] max-w-[520px] animate-hero-sub text-[1.08rem] text-ink-500 motion-reduce:animate-none max-[720px]:mb-6 max-[720px]:text-base max-[720px]:leading-[1.65]">
						Pick one free certification. Internships and fresher
						jobs open from the same dashboard — after you have work
						to show.
					</p>
					<div className="mb-2 flex animate-hero-cta flex-wrap items-center gap-3 motion-reduce:animate-none max-[720px]:flex-col max-[720px]:items-stretch">
						<Button
							className="max-[720px]:min-h-[50px] max-[720px]:w-full"
							nativeButton={false}
							render={<Link href="/programs" />}
						>
							Choose a free certification
						</Button>
						<Button
							className="max-[720px]:min-h-[50px] max-[720px]:w-full"
							nativeButton={false}
							render={<Link href="#internships" />}
							variant="outline"
						>
							See internships
						</Button>
					</div>
					<div className="mt-5 grid w-fit max-w-[500px] animate-hero-proof grid-cols-2 gap-x-4 gap-y-2 border-line border-t pt-4 font-semibold text-[0.78rem] text-ink-700 motion-reduce:animate-none max-[720px]:grid-cols-1 max-[720px]:gap-2 max-[720px]:pt-3.5">
						{PROOF.map(item => (
							<div
								className="group inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-white/90 px-2.5 py-1 shadow-[0_1px_2px_rgba(16,20,27,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-400/60 hover:bg-white hover:shadow-sm"
								key={item.label}
							>
								<span
									aria-hidden="true"
									className="size-1.5 shrink-0 rotate-45 rounded-[1px] bg-brand-500 shadow-[0_0_3px_rgba(255,179,0,0.8)] transition-transform duration-200 group-hover:scale-125"
								/>
								<span className="whitespace-nowrap transition-colors group-hover:text-ink-950">
									{item.label}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="group relative isolate aspect-[1.5] w-full animate-hero-visual motion-reduce:animate-none max-[980px]:mx-auto max-[720px]:mt-1 max-[980px]:mt-3 max-[720px]:aspect-auto max-[720px]:h-auto max-[980px]:max-w-[680px]">
					<div
						aria-hidden="true"
						className="absolute -inset-x-[2%] -inset-y-[4%] bottom-[6%] -z-1 rounded-full bg-[radial-gradient(circle_at_52%_46%,rgba(var(--brand-rgb),0.3),rgba(var(--brand-rgb),0.12)_48%,transparent_72%)] blur-[8px]"
					/>
					<figure className="relative block size-full">
						<Image
							alt="Three students ready to learn and build their careers"
							className="mask-[linear-gradient(180deg,#000_78%,transparent_97%)] size-full object-contain object-bottom drop-shadow-[0_4px_8px_rgba(16,20,27,0.14)] transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
							fetchPriority="high"
							height={682}
							priority
							src="/assets/letsupgrade-students-cutout.webp"
							width={1024}
						/>
					</figure>
					<aside
						aria-label="Students registered on LetsUpgrade"
						className="absolute bottom-[-10px] left-[-22px] z-[2] flex max-w-[280px] rotate-[-2.4deg] animate-sticker flex-col items-start gap-0.5 rounded-[18px] border-2 border-white bg-white px-5 pt-4 pb-3.5 shadow-lu-lg ring-[3px] ring-brand-500 motion-reduce:animate-none max-[720px]:relative max-[720px]:inset-auto max-[720px]:mt-4 max-[720px]:max-w-none max-[720px]:rotate-0 max-[720px]:animate-none"
					>
						<span className="mb-1.5 inline-flex items-center gap-1.5 font-extrabold text-[#047857] text-[0.68rem] uppercase tracking-[0.08em]">
							<span
								aria-hidden="true"
								className="size-2 animate-pulse-dot rounded-full bg-success motion-reduce:animate-none"
							/>
							Live
						</span>
						<LearnerCount />
						<p className="mt-1.5 font-semibold text-[0.8rem] text-ink-500">
							students registered
						</p>
					</aside>
					<div className="absolute top-[46%] right-[-18px] flex animate-float-y-late flex-col items-start gap-1.5 rounded-[18px] border border-white/70 bg-white/92 px-[18px] py-3.5 shadow-lu-lg backdrop-blur-md motion-reduce:animate-none max-[720px]:relative max-[720px]:inset-auto max-[720px]:mt-2.5 max-[720px]:animate-none">
						<span className="flex items-center gap-2">
							<GoogleMark size={18} />
							<strong className="font-extrabold font-heading text-base text-ink-900">
								{GOOGLE_RATING} / 5
							</strong>
						</span>
						<StarRating rating={GOOGLE_RATING} />
						<span className="text-[0.74rem] text-ink-500">
							{GOOGLE_REVIEWS.toLocaleString("en-IN")} reviews on
							Google
						</span>
					</div>
				</div>
			</Container>
		</section>
	)
}
