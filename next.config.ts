// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: { unoptimized: true },
// };

// module.exports = nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'standalone', // Changed from 'export'
//   images: {
//       remotePatterns: [{
//               protocol: 'https',
//               hostname: 'admin.hyperce.io',
//           },
//           {
//               protocol: 'https',
//               hostname: 'images.unsplash.com',
//           },
//       ],
//   },
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ['admin.hyperce.io'], // Add the domain directly
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'images.unsplash.com',
          },
          {
              protocol: 'http',
              hostname: 'admin.hyperce.io',
          },
          {
              protocol: 'https',
              hostname: 'admin.hyperce.io',
          },
      ],
  },
}

module.exports = nextConfig