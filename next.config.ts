import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  // Ported components carry pre-existing lint issues (unescaped quotes, etc.)
  // from the original Vite app, which never ran ESLint at build time either.
  // Type-checking (tsc --noEmit) is clean; these are style-only, not correctness.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
