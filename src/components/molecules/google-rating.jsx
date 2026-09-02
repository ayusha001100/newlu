import GoogleMark from "@/atoms/google-mark"
import StarRating from "@/atoms/star-rating"
import { GOOGLE_LISTING, GOOGLE_RATING, GOOGLE_REVIEWS } from "@/lib/data/home"
import { cn } from "@/lib/utils"

export default function GoogleRating({ className, cta = "View listing" }) {
	return (
		<a
			className={cn(
				"group flex max-w-full items-center gap-5 rounded-[18px] bg-[#fff] px-[26px] py-[18px] shadow-lu-lg transition-transform hover:-translate-y-[3px] max-[720px]:flex-wrap max-[720px]:justify-center max-[720px]:gap-x-4 max-[720px]:gap-y-3 max-[720px]:p-5",
				className,
			)}
			href={GOOGLE_LISTING}
			rel="noopener noreferrer"
			target="_blank"
		>
			<GoogleMark />
			<span className="whitespace-nowrap font-heading font-semibold text-[0.95rem] text-ink-500">
				<strong className="mr-0.5 font-extrabold text-[2rem] text-ink-900 tracking-[-0.03em]">
					{GOOGLE_RATING}
				</strong>{" "}
				/ 5
			</span>
			<span className="flex flex-col gap-0.5">
				<StarRating rating={GOOGLE_RATING} />
				<small className="whitespace-nowrap text-[0.8rem] text-ink-500">
					{GOOGLE_REVIEWS.toLocaleString("en-IN")} reviews on Google
				</small>
			</span>
			<span className="ml-0.5 inline-flex items-center gap-1.5 whitespace-nowrap border-line border-l pl-5 font-bold font-heading text-[0.86rem] text-ink-900 transition-[gap] group-hover:gap-2.5 max-[720px]:mt-0 max-[720px]:w-full max-[720px]:justify-center max-[720px]:border-t max-[720px]:border-l-0 max-[720px]:pt-3 max-[720px]:pl-0">
				{cta} <span aria-hidden="true">→</span>
			</span>
		</a>
	)
}
