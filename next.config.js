/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		// Required for the SQLite database to work properly in production
		serverComponentsExternalPackages: ['better-sqlite3']
	}
};

module.exports = nextConfig;
