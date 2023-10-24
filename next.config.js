/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",

  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  publicRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
  },
};

module.exports = nextConfig;
