import AuthBanner from "@/organisms/auth-banner"

export default function AuthLayout({ children }) {
	return (
		<main className="relative grid min-h-screen w-full grid-cols-1 bg-[#F8FAFC] lg:grid-cols-[1.1fr_1fr]">
			{/* Left Column: LetsUpgrade Brand Banner with Curved Edge */}
			<div className="hidden size-full min-h-screen overflow-hidden lg:block">
				<AuthBanner />
			</div>

			{/* Right Column: Full-Height Clean Container with Elevated Form Card */}
			<div className="relative flex size-full flex-col justify-center overflow-y-auto p-6 sm:p-8 md:p-12 xl:p-14">
				{/* Ambient background dots */}
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(16,20,27,0.04)_1px,transparent_1px)] bg-size-[24px_24px]" />
				<div className="relative z-10 mx-auto w-full max-w-[460px]">
					{children}
				</div>
			</div>
		</main>
	)
}
