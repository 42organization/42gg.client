/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ['cdn.intra.42.fr'],
    loader: 'akamai',
    path: '',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
