import { Typography } from "@material-tailwind/react";
import R from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import SiteFooter from "../../components/SiteFooter";
import Project from "../../interfaces/project.interface";
import Show from "../../utils/client/jsx/Show";
import ProjectCategorySection from "../../components/CategorySections/ProjectCategorySection";
import SearchInput from "../../components/SearchInput";
import ItemCard from "../../components/Cards/ItemCard";
import Category from "../../interfaces/category.interface";
import SearchNotFound from "../../components/SearchNotFound";
import { getAllProjects } from "../../server/service/projects/projects.service";
import { getAllProjectCategories } from "../../server/service/projects/projectCategory.service";
import { JSONSerialize } from "../../utils/server/serialize";
import Observe from "../../components/Observe";
import fadeIn from "../../utils/client/helpers/animateOnObserved";
import Seo from "../../seo/Seo";
import projectsPageSeo from "../../seo/projectsPage.seo";
import SectionHeading from "../../components/Typography/SectionHeading";

interface Props {
  projects: Project[];
  categories: Category[];
}

export default function ProjectsPage({ projects, categories }: Props) {
  const router = useRouter();

  const [isError, setIsError] = R.useState(projects.length === 0);
  const [query, setQuery] = R.useState<string>(
    (router.query.find as string) || "",
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

  R.useEffect(() => setIsError(projects.length === 0), [projects.length]);

  return (
    <>
      <Seo base={projectsPageSeo.base} og={projectsPageSeo.og} />

      <div className="fade-bottom relative flex min-h-[80vh] translate-y-20 flex-col after:-top-20">
        <header className="relative z-[45] mx-auto mt-6 mb-3 flex w-full max-w-screen-xl flex-col overflow-hidden px-8 2xl:px-2">
          {/* heading */}
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 0)}
          >
            <div className="opacity-0">
              <SectionHeading
                title="Projects"
                subTitle="Things that I've made throughout my journey on programming
                and web development."
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
                placeholder="Search Projects"
                loadingCallback={isWaiting => setSearchIsLoading(isWaiting)}
                callback={newQuery => setQuery(newQuery)}
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
              {categories.map((category, i) => (
                // index is used for determining the image priority prop
                <ProjectCategorySection
                  categoryIndex={i}
                  key={category._id}
                  category={category}
                  projects={projects}
                />
              ))}
            </div>
          </Show>

          {/* search results */}
          <Show
            when={projects.length > 0 && showedIndex.length > 0 && query !== ""}
          >
            <ul className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3">
              {showedIndex.map(idx => (
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
              ))}
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
                Sorry, Can&apos;t Seem To Load The Projects 😅
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
