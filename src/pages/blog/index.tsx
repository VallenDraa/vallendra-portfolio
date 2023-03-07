import type { InferGetStaticPropsType } from "next";

import { getBlogPostData } from "utils/server/posts";
import Observe from "components/Observe";
import SectionHeading from "components/Typography/SectionHeading";
import fadeIn from "utils/client/helpers/animateOnObserved";
import SearchInput from "components/SearchInput";
import Seo from "seo/Seo";
import blogsPageSeo from "seo/blogPage.seo";
import R from "react";
import clsx from "clsx";
import BlogCard from "components/Blog/BlogCard";
import { Language } from "types/types";
import LanguageToggle from "components/Showcase/ShowcaseDetailsPage/LanguageToggle";
import Show from "utils/client/jsx/Show";
import dynamic from "next/dynamic";

const SearchNotFound = dynamic(() => import("components/SearchNotFound"));

export default function BlogsPage({
  allPostData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [query, setQuery] = R.useState<string>("");
  const [searchIsLoading, setSearchIsLoading] = R.useState(false);
  const [activeLanguage, setActiveLanguage] = R.useState<Language>("en");

  /* returns active index of showcase items based on search query 
  ================================================================ */
  const visibleBlogIndexes = R.useMemo(() => {
    const newvisibleBlogIndexes = allPostData.reduce((result, post, i) => {
      if (query === "") return [...result, i];

      const hasStringInItemName = post.title
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase().trim());

      if (hasStringInItemName) return [...result, i];

      return result;
    }, [] as number[]);

    return newvisibleBlogIndexes;
  }, [query]);

  return (
    <>
      <Seo {...blogsPageSeo} />

      <header
        id="skip-to-content"
        className="fade-bottom relative mt-6 mb-3 w-full after:-top-6"
      >
        <div className="layout flex flex-col pt-20">
          {/* heading */}
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 0)}
          >
            <div className="opacity-0">
              <SectionHeading
                title="Blog"
                subTitle="The section where I express anything that comes in my mind."
              />
            </div>
          </Observe>

          {/* searchbar */}
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 100)}
          >
            <div className="mt-4 opacity-0">
              <SearchInput
                defaultValue={query}
                placeholder="Search Posts"
                loadingCallback={isWaiting => setSearchIsLoading(isWaiting)}
                callback={newQuery => setQuery(newQuery)}
              />
            </div>
          </Observe>

          {/* blog filters */}
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 300)}
          >
            <div className="mt-5 opacity-0">
              <LanguageToggle
                activeLanguage={activeLanguage}
                setActiveLanguage={setActiveLanguage}
              />
            </div>
          </Observe>
        </div>
      </header>

      <main
        className={clsx(
          "layout grow",
          searchIsLoading &&
            "cursor-not-allowed after:absolute after:inset-0 after:z-20",
        )}
      >
        <Show when={visibleBlogIndexes.length > 0}>
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 500)}
          >
            <ul className="grid grid-cols-1 gap-6 pt-5 pb-10 opacity-0 md:grid-cols-2 lg:grid-cols-3">
              {visibleBlogIndexes.map(idx => {
                if (!allPostData[idx].slug.includes(activeLanguage))
                  return null;

                return (
                  <BlogCard
                    post={allPostData[idx]}
                    key={`${allPostData[idx].slug}-${allPostData[idx].date}`}
                  />
                );
              })}
            </ul>
          </Observe>
        </Show>

        <Show when={visibleBlogIndexes.length === 0}>
          <SearchNotFound />
        </Show>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const allPostData = await getBlogPostData("article");

  return { props: { allPostData } };
}
