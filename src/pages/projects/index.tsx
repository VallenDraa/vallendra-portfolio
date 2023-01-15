import { Typography } from "@material-tailwind/react";
import FadeBottom from "../../components/FadePageTranstition/FadeBottom";
import SiteFooter from "../../components/SiteFooter";
import Head from "next/head";
import ProjectCard from "../../components/Projects/ProjectCard";
import { GetStaticPropsResult } from "next";
import { IProjectCategory, IProject } from "../../interfaces/projectInterface";
import Show from "../../utils/jsx/Show";
import { useState, useMemo } from "react";
import allProjects from "../../utils/datas/projects/allProjects";
import projectCategories from "../../utils/datas/projects/projectCategories";
import ProjectCategorySection from "../../components/Projects/ProjectCategorySection";
import useDebounce from "../../utils/hooks/useDebounce";
import { AiOutlineLoading } from "react-icons/ai";

interface IProps {
  projects: IProject[];
  categories: IProjectCategory[];
}

export default function ProjectsPage({ projects, categories }: IProps) {
  const [isError, setIsError] = useState(projects.length === 0);
  const [query, setQuery] = useState("");
  const [finalQuery, setFinalQuery] = useState("");

  /* Querying projects
  =================== */
  const [isWaitingResult, searchError] = useDebounce(
    () => setFinalQuery(query),
    600,
    [query]
  );
  const showedIndex = useMemo<number[]>(() => {
    const newShowedIndex: number[] = projects.reduce((result, project, i) => {
      if (finalQuery === "") return [...result, i];

      if (
        project.name
          .toLocaleLowerCase()
          .includes(finalQuery.toLocaleLowerCase().trim())
      ) {
        return [...result, i];
      }

      return result;
    }, [] as number[]);

    return newShowedIndex;
  }, [finalQuery]);

  return (
    <>
      <Head>
        <title>VallenDra | Projects</title>
      </Head>
      <div className="relative flex min-h-screen translate-y-40 flex-col dark:bg-gray-900">
        {/* blur */}
        <div
          className={`absolute right-20 top-20  h-80 w-80 rotate-0 skew-x-12 scale-110 rounded-full bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 blur-3xl transition-transform duration-200 ${
            isWaitingResult ? "z-30" : ""
          }`}
        />
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
                All Projects
              </Typography>
              <span className="text-5xl">💻</span>
            </div>

            <Typography
              as="p"
              variant="paragraph"
              className="mt-5 pl-0.5 text-justify font-medium leading-loose text-white/80"
            >
              The ultimate showcase of all my projects. Mostly web but there are
              others as well.
            </Typography>

            <div className="relative mt-6">
              <input
                disabled={isError || !!searchError}
                onChange={(e) => setQuery(e.target.value)}
                role="search"
                type="text"
                placeholder={
                  isError || !!searchError
                    ? "Please Try Again Later..."
                    : "Search Projects..."
                }
                className="h-12 w-full rounded-lg px-4 text-lg outline-none transition-colors disabled:cursor-not-allowed dark:bg-gray-800/70 dark:text-gray-300 dark:focus:bg-gray-800 dark:disabled:bg-gray-700 dark:disabled:hover:bg-gray-800"
              />

              <Show when={isWaitingResult}>
                <AiOutlineLoading className="absolute right-4 top-1/3 animate-spin text-lg dark:text-gray-300" />
              </Show>
            </div>
          </section>
        </header>

        {/* the projects list */}
        <main
          className={`relative mx-auto w-full max-w-screen-xl grow px-10 pt-5 pb-10 ${
            /* overlay for awaiting search results */
            isWaitingResult
              ? "after:absolute after:inset-0 after:z-20 after:animate-fade-in dark:after:bg-gray-900/50"
              : ""
          }`}
        >
          {/* initial render for projects with categories */}
          <Show when={projects.length > 0 && finalQuery === ""}>
            <div className="space-y-10">
              {categories.map((category, i) => {
                return (
                  // index is used for determining the image priority prop
                  <ProjectCategorySection
                    categoryIndex={i}
                    key={category._id}
                    category={category}
                    projects={projects}
                  />
                );
              })}
            </div>
          </Show>

          {/* search results */}
          <Show
            when={
              projects.length > 0 && showedIndex.length > 0 && finalQuery !== ""
            }
          >
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {showedIndex.map((idx) => {
                if (projects[idx]) {
                  return (
                    <li key={projects[idx]._id}>
                      <ProjectCard
                        imgIsPriority={false}
                        project={projects[idx]}
                      />
                    </li>
                  );
                }
              })}
            </ul>
          </Show>

          {/* for empty search result */}
          <Show when={projects.length > 0 && showedIndex.length === 0}>
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

          {/* fallback for when the projects failed to load */}
          <Show when={projects.length === 0 || !projects}>
            {/* text fallback */}
            <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 space-y-2 px-8 text-center">
              <Typography
                variant="h4"
                as="h2"
                className="text-lg dark:text-white/80 md:text-xl lg:text-2xl"
              >
                Sorry, Can't Seem To Load The Projects 😅
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
    props: { projects: allProjects, categories: projectCategories },
  };
}
