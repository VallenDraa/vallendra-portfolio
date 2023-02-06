import { Typography } from "@material-tailwind/react";
import SiteFooter from "../../components/SiteFooter";
import Project from "../../interfaces/project.interface";
import Show from "../../utils/client/jsx/Show";
import R from "react";
import ProjectCategorySection from "../../components/CategorySections/ProjectCategorySection";
import SearchInput from "../../components/SearchInput";
import { useRouter } from "next/router";
import ItemCard from "../../components/Cards/ItemCard";
import Category from "../../interfaces/category.interface";
import SearchNotFound from "../../components/SearchNotFound";
import { GetStaticProps } from "next";
import { getAllProjects } from "../../server/service/projects/projects.service";
import { getAllProjectCategories } from "../../server/service/projects/projectCategory.service";
import { JSONSerialize } from "../../utils/server/serialize";
import Observe from "../../components/Observe";
import fadeIn from "../../utils/client/helpers/animateOnObserved";
import Seo from "../../seo/Seo";
import projectsPageSeo from "../../seo/projectsPage.seo";

interface Props {
  projects: Project[];
  categories: Category[];
}

export default function ProjectsPage({ projects, categories }: Props) {
  const router = useRouter();

  const [isError, setIsError] = R.useState(projects.length === 0);
  const [query, setQuery] = R.useState<string>(
    (router.query.find as string) || ""
  );
  const [searchIsLoading, setSearchIsLoading] = R.useState(false);

  const showedIndex = R.useMemo<number[]>(() => {
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
      <Seo base={projectsPageSeo.base} og={projectsPageSeo.og} />

      <div className="fade-bottom relative flex min-h-[80vh] translate-y-20 flex-col after:-top-20">
        <header className="relative z-[45] mx-auto mt-6 mb-3 flex w-full max-w-screen-xl flex-col overflow-hidden px-8 2xl:px-2">
          {/* heading */}
          <Observe
            freezeOnceVisible
            onEnter={(ref) => fadeIn(ref, "animate-fade-in-top", 0)}
          >
            <div className="relative z-10 opacity-0">
              <div className="relative flex w-fit items-center gap-1">
                <Typography
                  as="h2"
                  variant="h2"
                  className="primary-gradient relative z-40 w-fit animate-breathing bg-gradient-to-r bg-gradient bg-clip-text text-start text-4xl font-bold capitalize !leading-[initial] text-transparent md:text-5xl"
                >
                  All Projects
                </Typography>
                <span className="text-4xl md:text-5xl">💻</span>
              </div>
              <Typography
                as="p"
                variant="paragraph"
                className="mb-5 mt-1 pl-0.5 text-justify text-base font-medium leading-loose text-indigo-700 dark:text-gray-300 md:text-lg"
              >
                The ultimate showcase of all my projects. Mostly web but there
                are others too.
              </Typography>
            </div>
          </Observe>

          {/* searchbar */}
          <Observe
            freezeOnceVisible
            onEnter={(ref) => fadeIn(ref, "animate-fade-in-top", 200)}
          >
            <div className="opacity-0">
              <SearchInput
                willRedirect
                defaultValue={query}
                placeholder="Search Projects"
                loadingCallback={(isWaiting) => setSearchIsLoading(isWaiting)}
                callback={(query) => setQuery(query)}
              />
            </div>
          </Observe>
        </header>

        {/* the projects list */}
        <main
          className={`relative mx-auto w-full max-w-screen-xl grow px-10 pt-5 pb-10 2xl:px-2 ${
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
                        _id={projects[idx]._id}
                        type="projects"
                        imgIsPriority={false}
                        imgSrc={projects[idx].image}
                        itemLikes={projects[idx].likes}
                        itemLink={`/projects/${projects[idx].slug}`}
                        itemName={projects[idx].name}
                        itemShortDesc={projects[idx].shortDescriptionEN}
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
            <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 animate-fade-in space-y-2 px-8 text-center lg:px-0">
              <Typography
                variant="h4"
                as="h2"
                className="text-lg dark:text-gray-300 md:text-xl lg:text-2xl"
              >
                Sorry, Can't Seem To Load The Projects 😅
              </Typography>
              <Typography
                variant="h5"
                as="h3"
                className="text-sm dark:text-gray-500 md:text-base lg:text-lg"
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

export const getStaticProps: GetStaticProps = async () => {
  const projects = await JSONSerialize(await getAllProjects());
  const categories = await JSONSerialize(await getAllProjectCategories());

  return projects && categories
    ? { props: { projects, categories } }
    : { notFound: true };
};
