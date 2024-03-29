import type Certificate from "interfaces/certificate.interface";
import type Category from "interfaces/category.interface";

import R from "react";
import SearchInput from "components/SearchInput";
import { JSONSerialize } from "utils/server/serialize";
import Observe from "components/Observe";
import fadeIn from "utils/client/helpers/animateOnObserved";
import Seo from "seo/Seo";
import certificatesPageSeo from "seo/certificatePage.seo";
import SectionHeading from "components/Typography/SectionHeading";
import MainContent from "components/Showcase/ShowcaseIndexPage/MainContent";
import clsx from "clsx";
import { getAllItems } from "server/service/showcase/showcase.service";
import CertificateModel from "server/mongo/model/certificate.model";
import { getAllItemCategories } from "server/service/showcase/showcaseCategory.service";
import CertificateCategoryModel from "server/mongo/model/certificateCategory.model";

type CertificatePageProps = {
  certificates: Certificate[];
  categories: Category[];
};

export default function CertificatePage({
  certificates,
  categories,
}: CertificatePageProps) {
  const [query, setQuery] = R.useState<string>("");
  const [searchIsLoading, setSearchIsLoading] = R.useState(false);

  /* returns active index of showcase items based on search query 
  ================================================================ */
  const activeCertificates = R.useMemo(() => {
    const newActiveCertificates = certificates.reduce(
      (result, certificate, i) => {
        if (query === "") return [...result, i];

        const hasStringInItemName =
          certificate.name
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase().trim()) ||
          certificate.descriptionEN
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase().trim());

        if (hasStringInItemName) return [...result, i];

        return result;
      },
      [] as number[],
    );

    return newActiveCertificates;
  }, [query]);

  return (
    <>
      <Seo {...certificatesPageSeo} />

      <header
        id="skip-to-content"
        className="fade-bottom relative mb-3  mt-6 w-full after:top-10"
      >
        <div className="layout flex flex-col pt-36">
          {/* heading */}
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 0)}
          >
            <div className="opacity-0">
              <SectionHeading
                title="Certificates"
                subTitle='These are the "certified" resources that I&apos;ve
                used to learn about programming other than youtube.'
              />
            </div>
          </Observe>

          {/* searchbar */}
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 200)}
          >
            <div className="mt-4 opacity-0">
              <SearchInput
                defaultValue={query}
                placeholder="Search Certificates"
                loadingCallback={isWaiting => setSearchIsLoading(isWaiting)}
                callback={newQuery => setQuery(newQuery)}
              />
            </div>
          </Observe>
        </div>
      </header>

      <main
        className={clsx(
          "layout flex min-h-[480px] grow items-center justify-center pb-10 pt-5",
          searchIsLoading &&
            "cursor-not-allowed after:absolute after:inset-0 after:z-20",
        )}
      >
        <MainContent
          showcaseType="certificates"
          currentSearchQuery={query}
          activeShowcaseIndex={activeCertificates}
          categories={categories}
          showcaseItems={certificates}
        />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const certificates = await JSONSerialize(await getAllItems(CertificateModel));
  const categories = await JSONSerialize(
    await getAllItemCategories(CertificateCategoryModel),
  );

  return certificates && categories
    ? { props: { certificates, categories } }
    : { notFound: true };
}
