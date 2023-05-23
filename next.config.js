/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: [
      '42gg-public-test-image.s3.ap-northeast-2.amazonaws.com',
      '42gg-public-image.s3.ap-northeast-2.amazonaws.com',
    ],
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
