import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
  reactStrictMode: true,
  compress: true,
  images: { domains: ["localhost", "vallendra.my.id"] },
  async headers() {
    return [
      {
        source: "/(.*)?",
        headers: [{ key: "X-Frame-Options", value: "DENY" }],
      },
    ];
  },
});
