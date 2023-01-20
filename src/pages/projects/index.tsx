import { Typography } from "@material-tailwind/react";
import SiteFooter from "../../components/SiteFooter";
import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { IProject } from "../../interfaces/projectInterface";
import Show from "../../utils/jsx/Show";
import { useState, useMemo } from "react";
import allProjects from "../../utils/datas/projects/allProjects";
import projectCategories from "../../utils/datas/projects/projectCategories";
import ProjectCategorySection from "../../components/CategorySections/ProjectCategorySection";
import SearchInput from "../../components/SearchInput";
import { useRouter } from "next/router";
import ItemCard from "../../components/Cards/ItemCard";
import ICategory from "../../interfaces/category";
import SearchNotFound from "../../components/SearchNotFound";
import { getImage } from "../../../service/image";

interface IProps {
  projects: IProject[];
  categories: ICategory[];
}

export default function ProjectsPage({ projects, categories }: IProps) {
  const router = useRouter();

  const [isError, setIsError] = useState(projects.length === 0);
  const [query, setQuery] = useState<string>(
    (router.query.find as string) || ""
  );
  const [searchIsLoading, setSearchIsLoading] = useState(false);

  const showedIndex = useMemo<number[]>(() => {
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

    return newShowedIndex;
  }, [query]);

  return (
    <>
      <Head>
        <title>VallenDra | Projects</title>
      </Head>
      <div className="fade-bottom relative flex min-h-[80vh] translate-y-20 flex-col bg-indigo-50 after:-top-20 dark:bg-gray-900">
        <header className="z-60 relative mx-auto mt-6 mb-3 flex w-full max-w-screen-xl flex-col overflow-hidden px-8 xl:px-0">
          {/* heading and searchbar */}
          <section className="relative z-10">
            <div className="relative flex w-fit items-center gap-1">
              <Typography
                as="h2"
                variant="h2"
                className="primary-gradient relative z-40 animate-breathing bg-gradient-to-r bg-gradient bg-clip-text text-start text-5xl font-bold capitalize text-transparent"
              >
                All Projects
              </Typography>
              <span className="text-5xl">💻</span>
            </div>

            <Typography
              as="p"
              variant="paragraph"
              className="mb-5 mt-1 pl-0.5 text-justify font-medium leading-loose text-indigo-700 dark:text-white/80"
            >
              The ultimate showcase of all my projects. Mostly web but there are
              others as well.
            </Typography>

            <SearchInput
              willRedirect
              defaultValue={query}
              placeholder="Search Projects"
              loadingCallback={(isWaiting) => setSearchIsLoading(isWaiting)}
              callback={(query) => setQuery(query)}
            />
          </section>
        </header>

        {/* the projects list */}
        <main
          className={`relative mx-auto w-full max-w-screen-xl grow px-10 pt-5 pb-10 ${
            /* overlay for awaiting search results */
            searchIsLoading
              ? "cursor-not-allowed after:absolute after:inset-0 after:z-20"
              : ""
          }`}
        >
          {/* initial render for projects with categories */}
          <Show when={projects.length > 0 && query === ""}>
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
            when={projects.length > 0 && showedIndex.length > 0 && query !== ""}
          >
            <ul className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {showedIndex.map((idx) => {
                if (projects[idx]) {
                  return (
                    <li key={projects[idx]._id}>
                      <ItemCard
                        imgIsPriority={false}
                        imgSrc={projects[idx].image}
                        itemLikes={projects[idx].likes}
                        itemLink={`/projects/${projects[idx].slug}`}
                        itemName={projects[idx].name}
                        itemShortDesc={projects[idx].shortDescription}
                        itemViews={projects[idx].views}
                        techs={projects[idx].tech}
                      />
                    </li>
                  );
                }
              })}
            </ul>
          </Show>

          {/* for empty search result */}
          <Show when={projects.length > 0 && showedIndex.length === 0}>
            <SearchNotFound />
          </Show>

          {/* fallback for when the projects failed to load */}
          <Show when={projects.length === 0 || !projects || isError}>
            {/* text fallback */}
            <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 space-y-2 px-8 text-center lg:px-0">
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
  allProjects.forEach((proj) => getImage(proj.slug));

  return {
    props: { projects: allProjects, categories: projectCategories },
  };
}
