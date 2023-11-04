import { ogLinkMaker } from "utils/client/helpers/ogLinkMaker";
import type { SEO } from "./Seo";

const blogsPageSeo: SEO = {
  base: {
    title: "VallenDra | Blog",
    desc: "The section where I express anything that comes in my mind.",
  },
  og: {
    siteName: "Jestine Vallendra Dwi Putra",
    imageUrl: ogLinkMaker({
      title: "Blog",
      shortDesc: "The section where I express anything that comes in my mind.",
    }),
    imageAlt: "A screenshot of the blog page",
    siteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
  },
};

export default blogsPageSeo;
