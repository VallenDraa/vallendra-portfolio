import { SEO } from "interfaces/seo.interface";
import { ogLinkMaker } from "utils/client/helpers/ogLinkMaker";

const projectsPageSeo: SEO = {
  base: {
    title: "VallenDra | Guestbook",
    desc: "This is where user post messages about this site, vallendra, or just about anything they want.",
  },
  og: {
    siteName: "Jestine Vallendra Dwi Putra",
    imageUrl: ogLinkMaker({
      title: "Guestbook",
      shortDesc:
        "This is where user post messages about this site, vallendra, or just about anything they want.",
    }),
    imageAlt: "A screenshot of the guestbook page",
    siteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/guestbook`,
  },
};

export default projectsPageSeo;
