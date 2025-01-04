import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs', // Ensure the build output is in the `docs` folder
  basePath: '/Kawaeee.github.io',
  assetPrefix: '/Kawaeee.github.io/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
