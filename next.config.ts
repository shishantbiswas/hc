import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: {
      compilationMode: "all",
      panicThreshold: "ALL_ERRORS",
    },
  },
};

export default nextConfig;
