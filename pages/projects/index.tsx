import { Typography } from "@material-tailwind/react";
import FadeBottom from "../../components/FadePageTranstition/FadeBottom";
import Line from "../../components/Line/Line";
import SiteFooter from "../../components/SiteFooter/SiteFooter";
import Head from "next/head";
import ProjectCard from "../../components/Projects/ProjectCard";
import { GetStaticPropsResult } from "next";
import { IProject } from "../../interfaces/projectInterfaces";
import Show from "../../utils/jsx/Show";
import { useState, useEffect } from "react";
import allProjects from "../../utils/datas/projects/allProjects";
import projectCategories from "../../utils/datas/projects/projectCategories";

export default function ProjectsPage({ projects }: { projects: IProject[] }) {
  const [isError, setIsError] = useState(projects.length === 0);
  const [query, setQuery] = useState<string>("");
  const [showedIndex, setShowedIndex] = useState<number[]>([]);

  /* Project search filter
  ======================= */
  useEffect(() => {
    const newShowedIndex: number[] = projects.reduce((result, project, i) => {
      if (query === "") return [...result, i];

      if (
        project.name
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase().trim())
      ) {
        return [...result, i];
      }

      return result;
    }, [] as number[]);

    setShowedIndex(newShowedIndex);
  }, [query]);

  return (
    <>
      <Head>
        <title>VallenDra | Projects</title>
      </Head>
      <div className="relative min-h-screen flex flex-col dark:bg-gray-900 translate-y-40">
        {/* blur */}
        <div className="h-80 w-80 scale-110 transition-transform duration-200 blur-3xl rounded-full skew-x-12 rotate-0 bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 absolute right-20 top-20" />
        <FadeBottom position="-top-20" />

        <header className="max-w-screen-2xl px-8 mx-auto flex flex-col w-full relative overflow-hidden">
          {/* heading and searchbar */}
          <section className="pt-6 pb-3 relative z-10">
            <div className="relative flex items-center gap-1">
              <Typography
                as="h2"
                variant="h2"
                className="animate-breathing bg-gradient bg-gradient-to-r from-indigo-300 to-pink-200 text-start text-5xl font-bold text-transparent bg-clip-text capitalize relative z-40"
              >
                All Projects
              </Typography>
              <span className="text-5xl">💻</span>
              <Line className="animate-breathing bg-gradient bg-gradient-to-r from-indigo-300 to-pink-200 rotate-90 scale-y-[6.5] -translate-x-0 left-[130px] -bottom-7 absolute" />
            </div>

            <Typography
              as="p"
              variant="paragraph"
              className="text-white/80 font-medium leading-loose pl-0.5 text-justify mt-5"
            >
              The ultimate showcase of all my projects. Mostly web but there are
              others as well.
            </Typography>

            <input
              disabled={isError}
              onChange={(e) => setQuery(e.target.value)}
              role="search"
              type="text"
              placeholder={
                isError ? "Please Try Again Later..." : "Search Projects..."
              }
              className="disabled:cursor-not-allowed outline-none w-full rounded-lg mt-6 h-12 px-4 dark:bg-gray-800/70 dark:focus:bg-gray-800 dark:disabled:bg-gray-700 dark:disabled:hover:bg-gray-800 dark:text-gray-300 text-lg transition-colors"
            />
          </section>
        </header>

        {/* the projects list */}
        <main className="max-w-screen-2xl px-12 relative mx-auto grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5 pb-10 w-full">
          {/* show project when available  */}
          <Show when={projects.length > 0}>
            <>
              {showedIndex.map((idx) => {
                return (
                  <ProjectCard
                    key={projects[idx]._id}
                    project={projects[idx]}
                  />
                );
              })}
            </>
          </Show>

          {/* for empty search result  */}
          <Show when={projects.length > 0 && showedIndex.length === 0}>
            {/* text fallback */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-center space-y-2 w-full px-8">
              <Typography
                variant="h4"
                as="h2"
                className="dark:text-white/80 text-lg md:text-xl lg:text-2xl"
              >
                Sorry, Can't Find Anything 😕
              </Typography>
              <Typography
                variant="h5"
                as="h3"
                className="dark:text-white/60 text-sm md:text-base lg:text-lg"
              >
                Try searching for something else.
              </Typography>
            </div>
          </Show>

          {/* fallback for when the projects failed to load  */}
          <Show when={projects.length === 0 || !projects}>
            {/* text fallback */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-center space-y-2 w-full px-8">
              <Typography
                variant="h4"
                as="h2"
                className="dark:text-white/80 text-lg md:text-xl lg:text-2xl"
              >
                Sorry, Can't Seem To Load The Projects 😅
              </Typography>
              <Typography
                variant="h5"
                as="h3"
                className="dark:text-white/60 text-sm md:text-base lg:text-lg"
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
  projects: IProject[];
}> {
  return { props: { projects: allProjects } };
}
