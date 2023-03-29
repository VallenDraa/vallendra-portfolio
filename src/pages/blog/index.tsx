import type { Language } from "types/types";
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
import LanguageToggle from "components/Showcase/ShowcaseDetailsPage/LanguageToggle";
import Show from "utils/client/jsx/Show";
import dynamic from "next/dynamic";
import { BlogTags, BLOG_TAGS } from "interfaces/blogPost.interface";
import StyledButton from "components/StyledComponents/StyledButton";
import Filter from "components/StyledComponents/Filter";
import StyledScrollbar from "components/StyledComponents/StyledScrollbar";
import {
  getAvailableTags,
  parsePostSlug,
} from "utils/client/helpers/blogClientHelper";

// suppress useLayoutEffect warning
if (typeof window === "undefined") R.useLayoutEffect = R.useEffect;

const SearchNotFound = dynamic(() => import("components/SearchNotFound"));

export default function BlogsPage({
  allPostData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  /* Blog filters
  =============== */
  const [selectedTags, setSelectedTags] = R.useState<BlogTags[]>([]);
  const [query, setQuery] = R.useState("");
  const [activeLanguage, setActiveLanguage] = R.useState<Language>("en");

  const defaultTagsAccordingToLang = R.useMemo(() => {
    const tempTags: BlogTags[] = [];
    const postsInActiveLang = allPostData.filter(p => {
      const { slugPrefix } = parsePostSlug(p.slug);

      return slugPrefix.includes(activeLanguage);
    });

    postsInActiveLang.forEach(({ tags }) => {
      tempTags.push(
        ...tags.reduce<BlogTags[]>((prev, current) => [...prev, current], []),
      );
    });

    return new Set(tempTags);
  }, [activeLanguage]);

  const [availableTags, setAvailableTags] = R.useState<Set<BlogTags>>(
    new Set(),
  );

  const [searchIsLoading, setSearchIsLoading] = R.useState(false);

  /* returns active index of showcase items based on search query 
  ================================================================ */
  const visibleBlogIndexes = R.useMemo(() => {
    const newvisibleBlogIndexes = allPostData.reduce<number[]>(
      (results, post, i) => {
        const tagsAreSelected = selectedTags.every(selectedTag =>
          post.tags.includes(selectedTag),
        );

        if (!tagsAreSelected) return results;

        if (query === "") return [...results, i];

        const hasStringInItemName =
          post.title
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase().trim()) ||
          post.description
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase().trim());

        return hasStringInItemName ? [...results, i] : results;
      },
      [],
    );

    return newvisibleBlogIndexes;
  }, [query, selectedTags]);

  /* Get the available tags based on selected tags and language
  ================================================================ */
  R.useEffect(() => {
    (async () => {
      setAvailableTags(
        await getAvailableTags(selectedTags, allPostData, activeLanguage),
      );
    })();
  }, [selectedTags, activeLanguage]);

  /* Reset tag selection when the language change
  ================================================================ */
  R.useLayoutEffect(() => {
    setSelectedTags([]);
    setAvailableTags(defaultTagsAccordingToLang);
  }, [activeLanguage, defaultTagsAccordingToLang]);

  return (
    <>
      <Seo {...blogsPageSeo} />

      <header
        id="skip-to-content"
        className="fade-bottom relative mb-3 mt-6 w-full after:-top-6"
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
                          disabled={
                            availableTags.size > 0
                              ? !availableTags.has(tag)
                              : !defaultTagsAccordingToLang.has(tag)
                          }
                          onClick={async () => {
                            // push tag if not already selected else filter it out
                            setSelectedTags(tags =>
                              tags.includes(tag)
                                ? tags.filter(oldTag => oldTag !== tag)
                                : [...tags, tag],
                            );
                          }}
                          className={clsx(
                            "rounded border border-pink-400 px-3 py-1.5 text-sm",
                            "disabled:cursor-not-allowed disabled:border-zinc-400 disabled:text-zinc-400 disabled:hover:bg-transparent",
                            selectedTags.includes(tag)
                              ? "border-transparent bg-pink-500 text-white"
                              : "text-pink-400 hover:bg-pink-500/10",
                          )}
                        >
                          {tag}
                        </StyledButton>
                      </li>
                    ))}
                  </StyledScrollbar>
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
          "layout flex min-h-[480px] grow items-center justify-center",
          searchIsLoading &&
            "cursor-not-allowed after:absolute after:inset-0 after:z-20",
        )}
      >
        <Show when={visibleBlogIndexes.length > 0}>
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 500)}
          >
            <ul className="grid grid-cols-1 gap-6 pb-10 pt-5 opacity-0 md:grid-cols-2 lg:grid-cols-3">
              {visibleBlogIndexes.map(idx => {
                const { slugPrefix } = parsePostSlug(allPostData[idx].slug);

                if (!slugPrefix.includes(activeLanguage)) return null;

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
