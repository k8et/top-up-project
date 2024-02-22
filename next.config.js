/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL || "https://localhost:80",
  },
};

module.exports = nextConfig;
