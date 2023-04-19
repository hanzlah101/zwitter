/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["pbs.twimg.com", "th.bing.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
