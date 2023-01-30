import { SEO } from "../interfaces/seo.interface";
import { ogLinkMaker } from "../utils/client/helpers/ogLinkMaker";

const projectsPageSeo: SEO = {
  base: {
    title: "VallenDra | Projects",
    desc: "The page where all of VallenDra's programming projects are showcased.",
  },
  og: {
    siteName: "Jestine Vallendra Dwi Putra",
    contentType: "programming projects showcase",
    imageUrl: ogLinkMaker({
      title: "Projects",
      shortDesc:
        "The page where all of VallenDra's programming projects are showcased.",
      imgLink: "pages/projects-page_wkiz3c",
    }),
    imageAlt: "A screenshot of the projects page",
    siteUrl: `${process.env.BASE_URL}/projects`,
  },
};

export default projectsPageSeo;
