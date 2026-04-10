import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://files.stripe.com/links/**")
    ],
    qualities: [100]
  },
};

export default nextConfig;
