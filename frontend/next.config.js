/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/IslaMontanaWeb' : ''

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  assetPrefix: isProd ? '/IslaMontanaWeb/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
}

module.exports = withBundleAnalyzer(nextConfig)
