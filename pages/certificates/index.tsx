import { Typography } from "@material-tailwind/react";
import FadeBottom from "../../components/FadePageTranstition/FadeBottom";
import SiteFooter from "../../components/SiteFooter";
import Head from "next/head";
import { GetStaticPropsResult } from "next";
import Show from "../../utils/jsx/Show";
import { useState, useMemo } from "react";
import ICertificate, {
  ICertificateCategory,
} from "../../interfaces/certificateInterface";
import allCertificates from "../../utils/datas/certificates/allCertificates";
import CertificateCategorySection from "../../components/certificates/certificateCategorySection";
import CertificateCard from "../../components/certificates/CertificateCard";
import certificateCategories from "../../utils/datas/certificates/certificateCategories";

interface IProps {
  certificates: ICertificate[];
  categories: ICertificateCategory[];
}

export default function CertificatesPage({ certificates, categories }: IProps) {
  const [isError, setIsError] = useState(certificates.length === 0);
  const [query, setQuery] = useState("");
  const showedIndex = useMemo<number[]>(() => {
    const newShowedIndex: number[] = certificates.reduce(
      (result, certificate, i) => {
        if (query === "") return [...result, i];

        if (
          certificate.name
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
      <div className="relative flex min-h-screen translate-y-40 flex-col dark:bg-gray-900">
        {/* blur */}
        <div className="absolute right-20 top-20 h-80 w-80 rotate-0 skew-x-12 scale-110 rounded-full bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 blur-3xl transition-transform duration-200" />
        <FadeBottom position="-top-20" />

        <header className="relative mx-auto mt-6 mb-3 flex w-full max-w-screen-xl flex-col overflow-hidden px-8">
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
              className="mt-5 pl-0.5 text-justify font-medium leading-loose text-white/80"
            >
              The ultimate showcase of all my certificates
            </Typography>

            <input
              disabled={isError}
              onChange={(e) => setQuery(e.target.value)}
              role="search"
              type="text"
              placeholder={
                isError ? "Please Try Again Later..." : "Search certificates..."
              }
              className="mt-6 h-12 w-full rounded-lg px-4 text-lg outline-none transition-colors disabled:cursor-not-allowed dark:bg-gray-800/70 dark:text-gray-300 dark:focus:bg-gray-800 dark:disabled:bg-gray-700 dark:disabled:hover:bg-gray-800"
            />
          </section>
        </header>

        {/* the certificates list */}
        <main className="relative mx-auto w-full max-w-screen-xl grow px-10 pt-5 pb-10">
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
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {showedIndex.map((idx) => {
                if (certificates[idx]) {
                  return (
                    <li key={certificates[idx]._id}>
                      <CertificateCard
                        imgIsPriority={false}
                        certificate={certificates[idx]}
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
            <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 space-y-2 px-8 text-center">
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
          <Show when={certificates.length === 0 || !certificates}>
            {/* text fallback */}
            <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 space-y-2 px-8 text-center">
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
