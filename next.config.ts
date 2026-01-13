import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Removed rewrites to legacy site as it's not available
  // If you need to proxy to a legacy site, add the correct domain here
};

export default nextConfig;
