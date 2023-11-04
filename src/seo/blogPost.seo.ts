import { ogLinkMaker } from "utils/client/helpers/ogLinkMaker";
import { SEO } from "./Seo";

type BlogPostArgs = {
  title: string;
  slug: string;
  desc: string;
  publishedAt: Date;
};

export default function blogPostSeo({
  title,
  slug,
  desc,
  publishedAt,
}: BlogPostArgs): SEO {
  return {
    base: { title, desc },
    og: {
      siteName: "Jestine Vallendra Dwi Putra",
      imageUrl: ogLinkMaker({ title, shortDesc: desc }),
      imageAlt: `A screenshot of the ${title}.`,
      siteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
    },
    blog: {
      author: "Jestine Vallendra Dwi Putra",
      publishedAt: publishedAt.toISOString(),
    },
  };
}
