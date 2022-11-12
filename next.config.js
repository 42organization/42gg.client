/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/',
        permanent: true,
      },
      {
        source: '/error',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
