import { ogLinkMaker } from "utils/client/helpers/ogLinkMaker";
import type { SEO } from "./Seo";

const defaultSeo: SEO = {
  base: {
    title: "Jestine Vallendra Dwi Putra",
    desc: "A Portfolio made by Jestine Vallendra Dwi Putra. This site showcases his past programming projects and also the certificates that he had managed to collect.",
  },
  og: {
    siteName: "Jestine Vallendra Dwi Putra",
    imageUrl: ogLinkMaker({
      title: "VallenDra",
      shortDesc:
        "My portfolio website where I showcase my projects and certificates.",
    }),
    imageAlt: "A screenshot of the home page",
    siteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  },
};

export default defaultSeo;
