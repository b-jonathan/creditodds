/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for S3/CloudFront deployment
  // Comment out for Amplify deployment (which supports SSR/ISR)
  output: 'export',

  images: {
    // For static export, use unoptimized images
    // Remove this line if using Amplify
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3ay3etzd1512y.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'credit-card-data-site.s3.us-east-2.amazonaws.com',
        pathname: '/**',
      },
    ],
    // Optimize image formats
    formats: ['image/avif', 'image/webp'],
  },

  // Enable compression
  compress: true,

  // Powered by header removal for security
  poweredByHeader: false,

  // Security and caching headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache static assets
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
