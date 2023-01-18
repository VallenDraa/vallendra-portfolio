import { Typography } from "@material-tailwind/react";
import SiteFooter from "../../components/SiteFooter";
import Head from "next/head";
import { GetStaticPropsResult } from "next";
import Show from "../../utils/jsx/Show";
import { useState, useMemo } from "react";
import SearchInput from "../../components/SearchInput";
import { useRouter } from "next/router";
import ICertificate from "../../interfaces/certificateInterface";
import CertificateCategorySection from "../../components/CategorySections/CertificateCategorySection";
import allCertificates from "../../utils/datas/certificates/allCertificates";
import certificateCategories from "../../utils/datas/certificates/certificateCategories";
import ItemCard from "../../components/Cards/ItemCard";
import ICategory from "../../interfaces/category";

interface IProps {
  certificates: ICertificate[];
  categories: ICategory[];
}

export default function ProjectsPage({ certificates, categories }: IProps) {
  const router = useRouter();

  const [isError, setIsError] = useState(certificates.length === 0);
  const [query, setQuery] = useState<string>(
    (router.query.find as string) || ""
  );
  const [searchIsLoading, setSearchIsLoading] = useState(false);

  const showedIndex = useMemo<number[]>(() => {
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
      [] as number[]
    );

    return newShowedIndex;
  }, [query]);

  return (
    <>
      <Head>
        <title>VallenDra | Certificates</title>
      </Head>
      <div className="fade-bottom relative flex min-h-screen translate-y-20 flex-col after:-top-20 dark:bg-gray-900">
        {/* blur */}
        <div
          className={`absolute right-20 top-20 h-80 w-80 rotate-0 skew-x-12 scale-110 rounded-full bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 blur-3xl transition-transform duration-200`}
        />

        <header className="z-60 relative mx-auto mt-6 mb-3 flex w-full max-w-screen-xl flex-col overflow-hidden px-8 xl:px-0">
          {/* heading and searchbar */}
          <section className="relative z-10">
            <div className="gradient-underline gradient-underline--indigo-to-pink relative flex w-fit items-center gap-1">
              <Typography
                as="h2"
                variant="h2"
                className="relative z-40 animate-breathing bg-gradient-to-r from-indigo-300 to-pink-200 bg-gradient bg-clip-text text-start text-5xl font-bold capitalize text-transparent"
              >
                My Certificates
              </Typography>
              <span className="text-5xl">📃</span>
            </div>

            <Typography
              as="p"
              variant="paragraph"
              className="my-5 pl-0.5 text-justify font-medium leading-loose text-white/80"
            >
              The ultimate showcase of all my certificates
            </Typography>

            <SearchInput
              willRedirect
              defaultValue={query}
              placeholder="Search Certificates"
              loadingCallback={(isWaiting) => setSearchIsLoading(isWaiting)}
              callback={(query) => setQuery(query)}
            />
          </section>
        </header>

        {/* the certificates list */}
        <main
          className={`relative mx-auto w-full max-w-screen-xl grow px-10 pt-5 pb-10 ${
            /* overlay for awaiting search results */
            searchIsLoading
              ? "cursor-not-allowed after:absolute after:inset-0 after:z-20"
              : ""
          }`}
        >
          {/* initial render for certificates with categories */}
          <Show when={certificates.length > 0 && query === ""}>
            <div className="space-y-10">
              {categories.map((category, i) => {
                return (
                  // index is used for determining the image priority prop
                  <CertificateCategorySection
                    categoryIndex={i}
                    key={category._id}
                    category={category}
                    certificates={certificates}
                  />
                );
              })}
            </div>
          </Show>

          {/* search results */}
          <Show
            when={
              certificates.length > 0 && showedIndex.length > 0 && query !== ""
            }
          >
            <ul className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {showedIndex.map((idx) => {
                if (certificates[idx]) {
                  return (
                    <li key={certificates[idx]._id}>
                      <ItemCard
                        imgIsPriority={false}
                        imgSrc={certificates[idx].image}
                        itemLikes={certificates[idx].likes}
                        itemLink={`/certificates/${certificates[idx].slug}`}
                        itemName={certificates[idx].name}
                        itemShortDesc={certificates[idx].shortDescription}
                        itemViews={certificates[idx].views}
                      />
                    </li>
                  );
                }
              })}
            </ul>
          </Show>

          {/* for empty search result */}
          <Show when={certificates.length > 0 && showedIndex.length === 0}>
            {/* text fallback */}
            <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 space-y-2 px-8 text-center lg:px-0">
              <Typography
                variant="h4"
                as="h2"
                className="text-lg dark:text-white/80 md:text-xl lg:text-2xl"
              >
                Sorry, Can't Find Anything 😕
              </Typography>
              <Typography
                variant="h5"
                as="h3"
                className="text-sm dark:text-white/60 md:text-base lg:text-lg"
              >
                Try searching for something else.
              </Typography>
            </div>
          </Show>

          {/* fallback for when the certificates failed to load */}
          <Show when={certificates.length === 0 || !certificates || isError}>
            {/* text fallback */}
            <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 space-y-2 px-8 text-center lg:px-0">
              <Typography
                variant="h4"
                as="h2"
                className="text-lg dark:text-white/80 md:text-xl lg:text-2xl"
              >
                Sorry, Can't Seem To Load The certificates 😅
              </Typography>
              <Typography
                variant="h5"
                as="h3"
                className="text-sm dark:text-white/60 md:text-base lg:text-lg"
              >
                Try reloading the page. If the problem persists, please try
                again later.
              </Typography>
            </div>
          </Show>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

export function getServerSideProps(): GetStaticPropsResult<IProps> {
  return {
    props: { certificates: allCertificates, categories: certificateCategories },
  };
}