/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // See: https://tsh.io/blog/how-to-keep-your-lighthouse-score-high-in-next-js-applications-a-checklist/
  // @todo: not working in this Next.js version. Pls fix
  /* optimization: {
    mergeDuplicateChunks: true,
  }, */

  images: {
    domains: [
      'localhost',
      'apod.nasa.gov',
      //'staging-liminal-health-foundation.s3.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
