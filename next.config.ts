import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/product-comparison/",
        destination: "/pricing/#compare",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
