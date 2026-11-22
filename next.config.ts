import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    '172.20.10.2', 
    '192.168.100.38'
  ],
};

export default nextConfig;
