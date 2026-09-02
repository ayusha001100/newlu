/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		viewTransition: true,
	},
	images: {
		remotePatterns: [
			{
				hostname: "frontend-assets.supabase.com",
				protocol: "https",
			},
			{
				hostname: "lucdn.letsupgrade.net",
				protocol: "https",
			},
		],
	},
}

export default nextConfig
