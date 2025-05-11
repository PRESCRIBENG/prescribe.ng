// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


import type { NextConfig } from 'next';

// File: next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ✅ Add image domains here
  images: {
    domains: ['pikaso.cdnpk.net', 's3.af-south-1.amazonaws.com'], // Add any other external image domains as needed
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://gelataskia.prescribe.ng/:path*', // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig