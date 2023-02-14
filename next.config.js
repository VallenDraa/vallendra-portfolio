import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  images: {
    domains: [
      "localhost",
      "vallendra.my.id",
      "vallendra-portfolio-git-dev-vallendraa.vercel.app",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)?",
        headers: [{ key: "X-Frame-Options", value: "DENY" }],
      },
    ];
  },
});
