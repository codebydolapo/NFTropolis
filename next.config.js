const { defaultConfig } = require('next/dist/server/config-shared')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    WALLET_CONNECT_PROJECT_ID : "4c1e28e64004e929ddd865fb5b2534c4",
    ALCHEMY_API_KEY: "PDuY8jYr0QKSsa7gLrdD2SmEv8K5eboV",
  },
}

// module.exports = nextConfig

module.exports = nextConfig