import Image from "next/image"
import Link from "next/link"

const joinTracks = tracks => {
	if (tracks.length === 1) return tracks[0]
	if (tracks.length === 2)
		return (
			<>
				{tracks[0]} and {tracks[1]}
			</>
		)
	return (
		<>
			{tracks[0]}, {tracks[1]}, and {tracks[2]}
		</>
	)
}

export default function HiringCard({ company }) {
	const links = company.tracks.map(track => (
		<Link
			className="font-bold text-ink-900 underline decoration-1 decoration-brand-200 underline-offset-2 hover:decoration-brand-500"
			href={track.href}
			key={track.href}
		>
			{track.label}
		</Link>
	))

	return (
		<article className="flex w-[248px] shrink-0 flex-col rounded-xl border border-line bg-[var(--bg-050)] p-[18px_16px_16px] max-[720px]:w-[220px] max-[720px]:p-[16px_14px_14px]">
			<div className="mb-3 flex h-[52px] items-center justify-center">
				<Image
					alt={company.name}
					className="h-auto max-h-[42px] w-auto max-w-[168px] object-contain"
					height={42}
					src={company.logo}
					width={160}
				/>
			</div>
			<span className="mb-2.5 inline-flex self-start rounded-full border border-line bg-white px-2 py-[3px] font-bold text-[0.68rem] text-ink-500 uppercase tracking-[0.08em]">
				{company.kind}
			</span>
			<p className="text-[0.84rem] text-ink-700 leading-[1.45]">
				{company.name} has openings in {joinTracks(links)}.
			</p>
		</article>
	)
}
