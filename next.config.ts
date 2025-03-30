import type { NextConfig } from 'next';
import withMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // You can add your other Next.js config options here
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  ...withMDX(),
};

export default nextConfig;
