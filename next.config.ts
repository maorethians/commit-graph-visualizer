import type { NextConfig } from 'next';

const repo = 'commit-graph-visualizer';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
