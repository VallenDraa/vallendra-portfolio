import { SEO } from "../interfaces/seo.interface";
import { ogLinkMaker } from "../utils/client/helpers/ogLinkMaker";

const contactsPageSeo: SEO = {
  base: {
    title: "VallenDra | Contacts",
    desc: "The page where visitor can contact vallendra through email or others means that are provided.",
  },
  og: {
    siteName: "Jestine Vallendra Dwi Putra",
    contentType: "contacts page",
    imageUrl: ogLinkMaker({
      title: "Contacts",
      shortDesc:
        "The page where visitor can contact vallendra through email or others means that are provided.",
      imgLink: "pages/contacts-page_mipiu7",
    }),
    imageAlt: "A screenshot of the contacts page",
    siteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/contacts`,
  },
};

export default contactsPageSeo;
