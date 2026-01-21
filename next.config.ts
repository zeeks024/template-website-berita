import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com', // Legacy support
      },
    ],
  },
  // Allow LAN access for mobile testing
  // allowedDevOrigins: ["0.0.0.0"], // Next.js doesn't support wildcard here directly, but we can rely on hostname -I
};

export default nextConfig;
