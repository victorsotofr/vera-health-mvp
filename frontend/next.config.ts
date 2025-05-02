import { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.py$/,
      use: "raw-loader",
    });
    return config;
  },
};

export default nextConfig;

