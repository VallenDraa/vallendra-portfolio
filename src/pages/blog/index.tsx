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
import { RadioGroup } from "@headlessui/react";
import { BLOG_TAGS } from "interfaces/blogPost.interface";
import {
  BlogSortIcons,
  BlogSortBy,
  BLOG_SORT_BY,
} from "components/MappedComponents/BlogSort";
import StyledButton from "components/StyledComponents/StyledButton";
import Filter from "components/StyledComponents/Filter";
import StyledScrollbar from "components/StyledComponents/StyledScrollbar";

const SearchNotFound = dynamic(() => import("components/SearchNotFound"));

export default function BlogsPage({
  allPostData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  /* Blog filters
  =============== */
  const [selectedTags, setSelectedTags] = R.useState<string[]>([]);
  const [sortBy, setSortBy] = R.useState<BlogSortBy>("date");
  const [query, setQuery] = R.useState("");
  const [activeLanguage, setActiveLanguage] = R.useState<Language>("en");

  const [searchIsLoading, setSearchIsLoading] = R.useState(false);

  /* returns active index of showcase items based on search query 
  ================================================================ */
  const visibleBlogIndexes = R.useMemo(() => {
    const newvisibleBlogIndexes = allPostData.reduce((result, post, i) => {
      const tagsAreSelected =
        selectedTags.length > 0
          ? post.tags.join(",") === selectedTags.join(",")
          : true;

      if (!tagsAreSelected) return result;

      if (query === "") return [...result, i];

      const hasStringInItemName = post.title
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase().trim());

      if (hasStringInItemName) return [...result, i];

      return result;
    }, [] as number[]);

    return newvisibleBlogIndexes;
  }, [query, selectedTags]);

  return (
    <>
      <Seo {...blogsPageSeo} />

      <header
        id="skip-to-content"
        className="fade-bottom relative mt-6 mb-3 w-full after:-top-6"
      >
        <div className="layout relative flex flex-col pt-20">
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
            <div className="mt-4 flex items-center gap-2 opacity-0">
              <SearchInput
                defaultValue={query}
                placeholder="Search Posts"
                loadingCallback={isWaiting => setSearchIsLoading(isWaiting)}
                callback={newQuery => setQuery(newQuery)}
              />

              <Filter dropdownRelativeToToggleBtn={false}>
                <div className="space-y-2">
                  <h6 className="text-zinc-700 dark:text-zinc-300">Tags</h6>
                  <StyledScrollbar
                    autoHeight
                    autoHeightMin="100%"
                    autoHeightMax="90px"
                    renderView={props => (
                      <ul {...props} className="flex flex-wrap gap-2" />
                    )}
                  >
                    {BLOG_TAGS.map(tag => (
                      <li key={tag}>
                        <StyledButton
                          onClick={() =>
                            // push tag if not already selected else filter it out
                            setSelectedTags(tags =>
                              tags.includes(tag)
                                ? tags.filter(oldTag => oldTag !== tag)
                                : [...tags, tag],
                            )
                          }
                          className={clsx(
                            "rounded border border-zinc-200 py-1.5 px-3 text-sm",
                            selectedTags.includes(tag)
                              ? "border-transparent bg-zinc-100 text-zinc-900"
                              : "text-zinc-200 hover:bg-zinc-500/10",
                          )}
                        >
                          {tag}
                        </StyledButton>
                      </li>
                    ))}
                  </StyledScrollbar>
                </div>

                <div className="space-y-2">
                  <h6 className="text-zinc-700 dark:text-zinc-300">Order</h6>
                  <RadioGroup
                    value={sortBy}
                    onChange={setSortBy}
                    className="flex flex-wrap gap-3"
                  >
                    <RadioGroup.Label className="sr-only">
                      Blog Sort
                    </RadioGroup.Label>

                    {BLOG_SORT_BY.map(type => (
                      <RadioGroup.Option
                        value={type}
                        key={type}
                        as={R.Fragment}
                      >
                        {({ checked }) => (
                          <div className="grow">
                            <StyledButton
                              alwaysShowIcon
                              icon={BlogSortIcons[type]()}
                              className={clsx(
                                checked
                                  ? "bg-pink-500 text-white"
                                  : "hover:bg-pink-500/10",
                                "w-full border border-pink-500 py-2 px-4 text-pink-500",
                              )}
                            >
                              Sort By {type}
                            </StyledButton>
                          </div>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <h6 className="text-zinc-700 dark:text-zinc-300">Language</h6>
                  <LanguageToggle
                    className="lg:!w-full"
                    activeLanguage={activeLanguage}
                    setActiveLanguage={setActiveLanguage}
                  />
                </div>
              </Filter>
            </div>
          </Observe>
        </div>
      </header>

      <main
        className={clsx(
          "layout flex grow items-center justify-center",
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
