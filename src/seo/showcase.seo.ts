import { ogLinkMaker } from "utils/client/helpers/ogLinkMaker";
import type { ShowcaseType } from "interfaces/showcase.interface";
import type { SEO } from "./Seo";

type ShowcaseSeoArgs = {
  title: string;
  slug: string;
  shortDesc: string;
  type: ShowcaseType;
};

export default function showcaseSeo({
  title,
  slug,
  shortDesc,
  type,
}: ShowcaseSeoArgs): SEO {
  return {
    base: { title: `VallenDra | ${title}`, desc: shortDesc },
    og: {
      siteName: "Jestine Vallendra Dwi Putra",
      imageUrl: ogLinkMaker({ title, shortDesc }),
      imageAlt: `A screenshot of the ${title}.`,
      siteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${slug}`,
    },
  };
}
