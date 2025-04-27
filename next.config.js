/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  cleanDistDir: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

module.exports = nextConfig 