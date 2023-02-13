import R from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Show from "../../utils/client/jsx/Show";
import SearchInput from "../../components/SearchInput";
import Certificate from "../../interfaces/certificate.interface";
import CertificateCategorySection from "../../components/CategorySections/CertificateCategorySection";
import ItemCard from "../../components/Cards/ItemCard";
import Category from "../../interfaces/category.interface";
import { getAllCertificates } from "../../server/service/certificates/certificates.service";
import { getAllCertificateCategories } from "../../server/service/certificates/certificateCategory.service";
import { JSONSerialize } from "../../utils/server/serialize";
import Observe from "../../components/Observe";
import fadeIn from "../../utils/client/helpers/animateOnObserved";
import Seo from "../../seo/Seo";
import certificatesPageSeo from "../../seo/certificatePage.seo";
import SectionHeading from "../../components/Typography/SectionHeading";

interface Props {
  certificates: Certificate[];
  categories: Category[];
}

const SiteFooter = dynamic(() => import("../../components/SiteFooter"), {
  ssr: false,
});

const FailToLoad = dynamic(
  () => import("../../components/ShowcaseIndexPage/FailToLoad"),
  { ssr: false },
);

const SearchNotFound = dynamic(
  () => import("../../components/SearchNotFound"),
  { ssr: false },
);

export default function ProjectsPage({ certificates, categories }: Props) {
  const router = useRouter();

  const [isError, setIsError] = R.useState(certificates.length === 0);
  const [query, setQuery] = R.useState<string>(
    (router.query.find as string) || "",
  );
  const [searchIsLoading, setSearchIsLoading] = R.useState(false);

  const showedIndex = R.useMemo<number[]>(() => {
    const newShowedIndex: number[] = certificates.reduce(
      (result, project, i) => {
        if (query === "") return [...result, i];

        if (
          project.name
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase().trim())
        ) {
          return [...result, i];
        }

        return result;
      },
      [] as number[],
    );

    return newShowedIndex;
  }, [query]);

  R.useEffect(
    () => setIsError(certificates.length === 0),
    [certificates.length],
  );

  return (
    <>
      <Seo base={certificatesPageSeo.base} og={certificatesPageSeo.og} />

      <div className="fade-bottom relative flex min-h-[80vh] translate-y-20 flex-col after:-top-20">
        <header className="mx-auto mt-6 mb-3 flex w-full max-w-screen-xl flex-col px-8 2xl:px-2">
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
            <div className="opacity-0">
              <SearchInput
                defaultValue={query}
                placeholder="Search Certificates"
                loadingCallback={isWaiting => setSearchIsLoading(isWaiting)}
                callback={newQuery => setQuery(newQuery)}
              />
            </div>
          </Observe>
        </header>

        {/* the certificates list */}
        <main
          className={`relative mx-auto w-full max-w-screen-xl grow px-10 pt-5 pb-10 2xl:px-2 ${
            /* overlay for awaiting search results */
            searchIsLoading
              ? "cursor-not-allowed after:absolute after:inset-0 after:z-20"
              : ""
          }`}
        >
          {/* initial render for certificates with categories */}
          <Show when={certificates.length > 0 && query === ""}>
            <div className="space-y-10">
              {categories.map((category, i) => (
                // index is used for determining the image priority prop
                <CertificateCategorySection
                  categoryIndex={i}
                  key={category._id}
                  category={category}
                  certificates={certificates}
                />
              ))}
            </div>
          </Show>

          {/* search results */}
          <Show
            when={
              certificates.length > 0 && showedIndex.length > 0 && query !== ""
            }
          >
            <ul className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3">
              {showedIndex.map(idx => (
                <li key={certificates[idx]._id}>
                  <ItemCard
                    _id={certificates[idx]._id}
                    type="certificates"
                    imgIsPriority={false}
                    imgSrc={certificates[idx].image}
                    itemLikes={certificates[idx].likes}
                    itemLink={`/certificates/${certificates[idx].slug}`}
                    itemName={certificates[idx].name}
                    itemShortDesc={certificates[idx].shortDescriptionEN}
                    itemViews={certificates[idx].views}
                  />
                </li>
              ))}
            </ul>
          </Show>

          {/* for empty search result */}
          <Show when={certificates.length > 0 && showedIndex.length === 0}>
            <SearchNotFound />
          </Show>

          {/* fallback for when the certificates failed to load */}
          <Show when={certificates.length === 0 || !certificates || isError}>
            <FailToLoad />
          </Show>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const certificates = await JSONSerialize(await getAllCertificates());
  const categories = await JSONSerialize(await getAllCertificateCategories());

  return certificates && categories
    ? { props: { certificates, categories } }
    : { notFound: true };
}
