import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i-kolobrzeg.pl",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
