import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/team",
        destination: "/support",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
