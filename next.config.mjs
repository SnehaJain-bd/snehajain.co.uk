import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // .mdx counts as a page extension so case studies can live in content/
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  images: {
    // Vercel serves these, so real optimisation is on. Source files in
    // public/work are already capped at 2000px by scripts/images.js;
    // Next handles everything below that per device.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 640, 828, 1080, 1200, 1600, 2000],
  },

  // Trailing slashes match how GitHub Pages served the old site, so any
  // links people already have keep working.
  trailingSlash: false,

  async redirects() {
    // The old site used flat .html URLs. Keep them alive.
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/services.html', destination: '/services', permanent: true },
      { source: '/work.html', destination: '/work', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/work/:slug.html', destination: '/work/:slug', permanent: true },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
