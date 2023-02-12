/** @type {import('next').NextConfig} */
export default {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  images: {
    domains: ["localhost", "vallendra.my.id"],
  },
  async headers() {
    return [
      {
        source: "/(.*)?",
        headers: [{ key: "X-Frame-Options", value: "DENY" }],
      },
    ];
  },
};
