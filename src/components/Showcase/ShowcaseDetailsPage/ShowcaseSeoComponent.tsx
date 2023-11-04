import Seo from "seo/Seo";
import R from "react";
import showcaseSeo from "seo/showcase.seo";
import type ShowcaseItem from "interfaces/showcase.interface";
import type { Language } from "types/types";

type ShowcaseSeoComponentProps = {
  showcaseItem: ShowcaseItem;
  activeLanguage: Language;
};

export default function ShowcaseSeoComponent({
  showcaseItem,
  activeLanguage,
}: ShowcaseSeoComponentProps) {
  const seoData = R.useMemo(() => {
    const { name, slug, shortDescriptionEN, shortDescriptionID } = showcaseItem;

    return showcaseSeo({
      title: name,
      slug,
      shortDesc:
        activeLanguage === "en" ? shortDescriptionEN : shortDescriptionID,
      type: "certificates",
    });
  }, [showcaseItem, activeLanguage]);

  return <Seo {...seoData} />;
}
