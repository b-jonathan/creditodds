/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for production builds (S3/CloudFront/Amplify static deployment)
  // Disabled in dev mode to allow on-demand rendering
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),

  images: {
    // For static export, use unoptimized images
    unoptimized: process.env.NODE_ENV === 'production',
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
