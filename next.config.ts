import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.gamergizmo.com",
      },
      {
        protocol: "https",
        hostname: "www.backend.gamergizmo.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4001",
      },
    ],
    domains: ["gamergizmobucket.s3.eu-north-1.amazonaws.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  webpack(config: any) {
    // Find and modify the rule that handles SVGs
    const fileLoaderRule = config.module.rules.find(
      (rule: any) =>
        rule.test && rule.test instanceof RegExp && rule.test.test(".svg")
    );

    // Exclude SVGs from the default file loader
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Add a new rule for handling SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
