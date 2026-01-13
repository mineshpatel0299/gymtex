import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Removed rewrites to legacy site as it's not available
  // If you need to proxy to a legacy site, add the correct domain here
};

export default nextConfig;
