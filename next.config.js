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
      'cdn.intra.42.fr',
      'k.kakaocdn.net',
    ],
    unoptimized: true,
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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  compiler: {
    styledComponents: true,  // styled-components 설정 활성화
  },
};

module.exports = nextConfig;
