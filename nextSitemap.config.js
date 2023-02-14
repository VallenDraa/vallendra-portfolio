/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/api" },
      { userAgent: "*", disallow: "/api/*" },
      { userAgent: "*", allow: "/" },
    ],
  },
  exclude: ["/api/*", "/api"],
  changefreq: "daily",
};
