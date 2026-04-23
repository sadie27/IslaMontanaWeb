/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/IslaMontanaWeb',
  assetPrefix: '/IslaMontanaWeb/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
