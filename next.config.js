/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Apparently, next 13 automatically allows images from upload.wikimedia.org. However, 
  // here, we are defining anyway just in case.
  images: {
    domains: ['upload.wikimedia.org']
  },
  experimental: {
    appDir: true,
  },
}
