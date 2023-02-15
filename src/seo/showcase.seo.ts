import { ShowcaseType } from "types/types";
import { ogLinkMaker } from "utils/client/helpers/ogLinkMaker";
import { SEO } from "interfaces/seo.interface";

interface Args {
  title: string;
  slug: string;
  shortDesc: string;
  type: ShowcaseType;
}

export default function showcaseSeo({
  title,
  slug,
  shortDesc,
  type,
}: Args): SEO {
  return {
    base: { title: `VallenDra | ${title}`, desc: shortDesc },
    og: {
      siteName: "Jestine Vallendra Dwi Putra",
      contentType: `${type} showcase`,
      imageUrl: ogLinkMaker({ title, shortDesc }),
      imageAlt: `A screenshot of the ${title}.`,
      siteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${slug}`,
    },
  };
}
