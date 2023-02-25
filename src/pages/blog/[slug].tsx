import type { GetStaticPaths, GetStaticProps } from "next/types";
import type { FrontMatter } from "interfaces/blogPost.interface";

import R from "react";
import { getAllPostSlugs, getPostData } from "utils/server/posts";
import { getMDXComponent } from "mdx-bundler/client";
import LinkWithUnderline from "components/Showcase/ShowcaseDetailsPage/LinkWithUnderline";
import { BsArrowLeft } from "react-icons/bs";
import SectionHeading from "components/Typography/SectionHeading";
import ShowcaseStats from "components/Showcase/ShowcaseDetailsPage/ShowcaseStats";
import ShowcaseImage from "components/Showcase/ShowcaseDetailsPage/ShowcaseImage";
import clsx from "clsx";
import Comment from "components/Showcase/ShowcaseDetailsPage/Comment";
import CopyLinkBtn from "components/Showcase/ShowcaseDetailsPage/CopyLinkBtn";
import LikeButton from "components/Showcase/ShowcaseDetailsPage/LikeButton";
import ActionButton from "components/StyledComponents/ActionButton";
import { FaGithub } from "react-icons/fa";
import Show from "utils/client/jsx/Show";
import { parsePostSlug } from "utils/data/blogHelper";
import { useRouter } from "next/router";
import { IoLanguage } from "react-icons/io5";

type BlogPostProps = {
  code: string;
  frontmatter: FrontMatter;
};

export default function BlogPost({ code, frontmatter }: BlogPostProps) {
  const router = useRouter();
  const Component = R.useMemo(() => getMDXComponent(code), [code]);

  const { slugPrefix, parsedSlug } = parsePostSlug(router.query.slug as string);

  return (
    <article className="fade-bottom relative mt-6 mb-3 after:-top-7">
      <div className="layout">
        <header>
          <section
            className={clsx(
              "not-prose prose prose-pink dark:prose-invert md:prose-lg lg:prose-xl",
              "mx-auto flex w-full flex-col justify-between border-b-2 border-indigo-100 pt-16 pb-3 dark:border-white/30",
            )}
          >
            {/* back to project button */}
            <LinkWithUnderline href="/blog">
              <BsArrowLeft />
              Back To Blog
            </LinkWithUnderline>

            {/* title */}
            <div className="pt-4">
              <SectionHeading
                title={frontmatter.title}
                subTitle={frontmatter.description}
              />
            </div>

            <div className="flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
              <ShowcaseStats
                dateString={frontmatter.date}
                isLoadingStats={false}
                hasLiked
                likes={200}
                views={1024}
              />
              <Show when={!frontmatter.englishOnly}>
                <ActionButton
                  className="w-full lg:w-max"
                  icon={<IoLanguage />}
                  color="teal"
                  hrefTarget="_self"
                  href={
                    slugPrefix === "en-"
                      ? `id-${parsedSlug}`
                      : `en-${parsedSlug}`
                  }
                >
                  Read In {slugPrefix === "en-" ? "Indonesian" : "English"}
                </ActionButton>
              </Show>
            </div>
          </section>
        </header>
        <main
          className={clsx(
            "prose prose-pink dark:prose-invert md:prose-lg lg:prose-xl",
            "my-4 mx-auto",
          )}
        >
          <ShowcaseImage
            cldImageSrc={frontmatter.banner}
            title={frontmatter.bannerSrc}
            titleAsCaption
          />
          <Component />
        </main>
        <footer
          className={clsx(
            "prose prose-pink dark:prose-invert md:prose-lg lg:prose-xl",
            "mx-auto mb-4 flex flex-col gap-4",
          )}
        >
          <section className="detail-aside-colors sticky top-20  mt-3 flex h-fit grow flex-row items-center justify-between gap-4 rounded-md p-4">
            <div className="grow space-y-3">
              <ActionButton
                icon={<FaGithub className="text-lg" />}
                href=""
                color="gray"
              >
                See on Github
              </ActionButton>

              <CopyLinkBtn />
            </div>

            {/* Like button */}
            <LikeButton
              showSkeleton={false}
              revealButton
              hasLikedShowcase
              formattedLikes="2000"
              onClick={console.log}
            />
          </section>

          <Comment />
        </footer>
      </div>
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostSlugs();

  return { fallback: false, paths };
};
export const getStaticProps: GetStaticProps = async ctx => {
  const postData = await getPostData(ctx.params?.slug as string);

  return { props: { ...postData } };
};
