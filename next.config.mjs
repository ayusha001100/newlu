/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			allowedOrigins: ["localhost:3000", "127.0.0.1:3000"],
		},
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
