import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "caeiro-e-reis.pt" },
      { protocol: "https", hostname: "i.etsystatic.com" },
    ],
  },
};

export default nextConfig;
