import type { GetStaticProps } from "next";
import type Project from "interfaces/project.interface";
import type Category from "interfaces/category.interface";

import R from "react";
import SearchInput from "components/SearchInput";
import { JSONSerialize } from "utils/server/serialize";
import Observe from "components/Observe";
import fadeIn from "utils/client/helpers/animateOnObserved";
import Seo from "seo/Seo";
import projectsPageSeo from "seo/projectsPage.seo";
import SectionHeading from "components/Typography/SectionHeading";
import MainContent from "components/Showcase/ShowcaseIndexPage/MainContent";
import clsx from "clsx";
import { getAllItems } from "server/service/showcase/showcase.service";
import ProjectModel from "server/mongo/model/project.model";
import { getAllItemCategories } from "server/service/showcase/showcaseCategory.service";
import ProjectCategoryModel from "server/mongo/model/projectCategory.model";

type ProjectsPageProps = {
  projects: Project[];
  categories: Category[];
};

export default function ProjectsPage({
  projects,
  categories,
}: ProjectsPageProps) {
  const [query, setQuery] = R.useState<string>("");
  const [searchIsLoading, setSearchIsLoading] = R.useState(false);

  /* returns active index of showcase items based on search query 
  ================================================================ */
  const activeProjects = R.useMemo(() => {
    const newActiveProjects = projects.reduce((result, project, i) => {
      if (query === "") return [...result, i];

      const hasStringInItemName =
        project.name
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase().trim()) ||
        project.descriptionEN
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase().trim());

      if (hasStringInItemName) return [...result, i];

      return result;
    }, [] as number[]);

    return newActiveProjects;
  }, [query]);

  return (
    <>
      <Seo {...projectsPageSeo} />

      <header
        id="skip-to-content"
        className="fade-bottom relative mb-3 mt-6 w-full after:top-10"
      >
        <div className="layout flex flex-col pt-36">
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
            <div className="mt-4 opacity-0">
              <SearchInput
                defaultValue={query}
                placeholder="Search Projects"
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
          showcaseType="projects"
          currentSearchQuery={query}
          activeShowcaseIndex={activeProjects}
          categories={categories}
          showcaseItems={projects}
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await JSONSerialize(await getAllItems(ProjectModel));
  const categories = await JSONSerialize(
    await getAllItemCategories(ProjectCategoryModel),
  );

  return projects && categories
    ? { props: { projects, categories } }
    : { notFound: true };
};
