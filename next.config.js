/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["image.tmdb.org"],
  },
  env: {
    API_KEY: process.env.API_KEY,
  },
};

module.exports = nextConfig;
