import { SEO } from "../interfaces/seo.interface";
import { ogLinkMaker } from "../utils/client/helpers/ogLinkMaker";

const certificatesPageSeo: SEO = {
  base: {
    title: "VallenDra | Certificates",
    desc: "The page where all of VallenDra's programming certificates are showcased.",
  },
  og: {
    siteName: "Jestine Vallendra Dwi Putra",
    contentType: "certificates showcase",
    imageUrl: ogLinkMaker({
      title: "Certificates",
      shortDesc:
        "The page where all of VallenDra's programming certificates are showcased.",
      imgLink: "pages/certificates-page_wlduyl",
    }),
    imageAlt: "A screenshot of the certificates page",
    siteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/certificates`,
  },
};

export default certificatesPageSeo;
