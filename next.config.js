/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
    compress: false,
  };
  
  module.exports = nextConfig;
  