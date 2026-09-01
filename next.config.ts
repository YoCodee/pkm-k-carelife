import type { NextConfig } from "next";

const isExport = process.env.NEXT_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isExport && {
    output: "export",
    trailingSlash: true,
  }),
  // Eksternalisasi package besar agar tidak di-bundle ke serverless function
  serverExternalPackages: ["@google/generative-ai", "html5-qrcode"],
};

export default nextConfig;
