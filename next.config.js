/** @type {import('next').NextConfig} */
export default {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  images: {
    domains: ["localhost", "vallendra.my.id", "vallendra-portfolio.vercel.app"],
  },
};
