import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {},
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
