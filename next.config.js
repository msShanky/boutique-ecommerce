/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["legumfivysflstxpzgou.supabase.co"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				// port: "",
				// pathname: "/account123/**",
			},
		],
	},
};

module.exports = nextConfig;
