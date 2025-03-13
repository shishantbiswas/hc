import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: {
      compilationMode: "all",
      panicThreshold: "ALL_ERRORS",
    },
  },
  pageExtensions: ['ts', 'tsx']
};

export default nextConfig;
