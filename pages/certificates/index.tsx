import { Typography } from "@material-tailwind/react";
import FadeBottom from "../../components/FadePageTranstition/FadeBottom";
import Line from "../../components/Line";
import SiteFooter from "../../components/SiteFooter";
import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { IProject } from "../../interfaces/projectInterfaces";
import Show from "../../utils/jsx/Show";
import { useState, useEffect } from "react";
import certificates from "../../utils/datas/certificates";

export default function CertificatesPage({
  certificates,
}: {
  certificates: IProject[];
}) {
  const [isError, setIsError] = useState(certificates.length === 0);
  const [query, setQuery] = useState<string>("");
  const [showedIndex, setShowedIndex] = useState<number[]>([]);

  /* Project search filter
  ======================= */
  useEffect(() => {
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

    setShowedIndex(newShowedIndex);
  }, [query]);

  return (
    <>
      <Head>
        <title>VallenDra | Certificates</title>
      </Head>
      <div className="relative mt-40 flex min-h-screen flex-col dark:bg-gray-900">
        {/* blur */}
        <FadeBottom position="-top-20" />

        <header className="relative mx-auto flex w-full max-w-screen-xl flex-col px-8 ">
          <div className="absolute right-5 top-5 h-80 w-80 rotate-0 skew-x-12 scale-110 rounded-full bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 blur-3xl transition-transform duration-200" />

          {/* heading and searchbar */}
          <section className="relative z-10 pt-6 pb-3">
            <div className="relative flex items-center gap-1">
              <Typography
                as="h2"
                variant="h2"
                className="relative z-40 animate-breathing bg-gradient-to-r from-indigo-300 to-pink-200 bg-gradient bg-clip-text text-start text-5xl font-bold capitalize text-transparent"
              >
                My Certificates
              </Typography>
              <span className="text-5xl">🧾</span>
              <Line className="absolute left-[130px] -bottom-7 -translate-x-0 rotate-90 scale-y-[6.5] animate-breathing bg-gradient-to-r from-indigo-300 to-pink-200 bg-gradient" />
            </div>

            <Typography
              as="p"
              variant="paragraph"
              className="mt-5 pl-0.5 text-justify font-medium leading-loose text-white/80"
            >
              The ultimate showcase of all my projects. Mostly web but there is
              game and desktop app too.
            </Typography>

            <input
              disabled={isError}
              onChange={(e) => setQuery(e.target.value)}
              role="search"
              type="text"
              placeholder={
                isError ? "Please Try Again Later..." : "Search Projects..."
              }
              className="mt-6 h-12 w-full rounded-lg px-4 text-lg outline-none transition-colors disabled:cursor-not-allowed dark:bg-gray-800/70 dark:text-gray-300 dark:focus:bg-gray-800 dark:disabled:bg-gray-700 dark:disabled:hover:bg-gray-800"
            />
          </section>
        </header>

        {/* the certificates list */}
        <main className="relative mx-auto grid w-full max-w-screen-xl grow grid-cols-1 gap-6 overflow-hidden px-12 py-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* show project when available  */}
          <Show when={certificates.length > 0}>
            {/* {showedIndex.map((idx) => {
              return (
               
              );
            })} */}
          </Show>

          {/* show project when available  */}
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

          {/* show project when available  */}
          <Show when={certificates.length === 0 || !certificates}>
            {/* text fallback */}
            <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 space-y-2 px-8 text-center">
              <Typography
                variant="h4"
                as="h2"
                className="text-lg dark:text-white/80 md:text-xl lg:text-2xl"
              >
                Sorry, Can't Seem To Load The Certificates 😅
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

export function getStaticProps(): GetStaticPropsResult<{
  certificates: any[];
}> {
  return { props: { certificates } };
}
