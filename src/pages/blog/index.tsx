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

export default function BlogsPage({
  allPostData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [query, setQuery] = R.useState<string>("");
  const [searchIsLoading, setSearchIsLoading] = R.useState(false);
  const [activeLanguage, setActiveLanguage] = R.useState<Language>("en");

  return (
    <>
      <Seo {...blogsPageSeo} />

      <header className="fade-bottom relative mt-6 mb-3 w-full after:-top-6">
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
          "layout relative",
          searchIsLoading &&
            "cursor-not-allowed after:absolute after:inset-0 after:z-20",
        )}
      >
        <Observe
          freezeOnceVisible
          onEnter={ref => fadeIn(ref, "animate-fade-in-top", 500)}
        >
          <ul className="grid grid-cols-1 gap-6 pt-5 pb-10 opacity-0 md:grid-cols-2 lg:grid-cols-3">
            {allPostData.map(post => {
              if (!post.slug.includes(activeLanguage)) return null;

              return <BlogCard post={post} key={`${post.slug}-${post.date}`} />;
            })}
          </ul>
        </Observe>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const allPostData = await getBlogPostData();

  return { props: { allPostData } };
}
