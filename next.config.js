const { defaultConfig } = require('next/dist/server/config-shared')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    WALLET_CONNECT_PROJECT_ID : process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  },
}

// module.exports = nextConfig

module.exports = nextConfig