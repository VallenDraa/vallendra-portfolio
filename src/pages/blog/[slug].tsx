import type { LikesOperationBody } from "types/api.types";
import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next/types";

import R from "react";
import {
  getAllPostSlugs,
  getPostData,
  getPrevAndNextPosts,
  // getPrevAndNextPosts,
} from "utils/server/posts";
import { getMDXComponent } from "mdx-bundler/client";
import LinkWithUnderline from "components/Showcase/ShowcaseDetailsPage/LinkWithUnderline";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
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
import { IoLanguage, IoWarning } from "react-icons/io5";
import Seo from "seo/Seo";
import blogPostSeo from "seo/blogPost.seo";
import StyledAlert from "components/StyledComponents/StyledAlert";
import useIncrementViewOnLoad from "utils/client/hooks/useIncrementViewOnLoad";
import useGetViewsById from "utils/client/hooks/useGetViewsById";
import useGetLikesById from "utils/client/hooks/useGetLikesById";
import { commaSeparator } from "utils/client/helpers/formatter";
import useDebounce from "utils/client/hooks/useDebounce";
import { parsePostSlug } from "utils/client/helpers/blogClientHelper";

export default function BlogPost({
  code,
  frontmatter,
  nextPost,
  prevPost,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { slugPrefix, parsedSlug } = parsePostSlug(slug);
  const Component = R.useMemo(() => getMDXComponent(code), [code]);
  const blogPostSeoArg = R.useMemo(
    () => ({
      title: frontmatter.title,
      desc: frontmatter.description,
      publishedAt: new Date(frontmatter.date),
      slug,
    }),
    [code],
  );

  const [showAlert, setShowAlert] = R.useState(false);

  /* add view on load 
  =================== */
  const onIncrementError = R.useCallback(async () => {
    const alertHandler = (await import("utils/client/helpers/alertHandler"))
      .default;

    alertHandler({ setShowAlert });
  }, []);
  const { finishedUpdatingViews } = useIncrementViewOnLoad(
    parsedSlug,
    "blogs",
    onIncrementError,
  );

  /* Dynamic data
  ================== */
  const viewsRes = useGetViewsById(parsedSlug, "blogs", finishedUpdatingViews);
  const likesRes = useGetLikesById(parsedSlug, "blogs", finishedUpdatingViews);

  /* Likes
  ================== */
  const [willSendLike, setWillSendLike] = R.useState(false);
  const [hasLiked, setHasLiked] = R.useState(false);
  const formattedLikes = R.useMemo(
    () =>
      commaSeparator.format(
        likesRes.data?.likes !== undefined ? likesRes.data?.likes : 0,
      ),
    [likesRes.data?.likes],
  );

  const optimisticLikeUpdate = R.useCallback(async () => {
    if (!hasLiked) {
      likesRes.mutate(
        oldData =>
          oldData === undefined
            ? undefined
            : { ...oldData, hasLiked: true, likes: oldData.likes + 1 },
        { revalidate: false },
      );

      setHasLiked(true);
    } else {
      likesRes.mutate(
        oldData =>
          oldData === undefined
            ? undefined
            : { ...oldData, hasLiked: false, likes: oldData.likes - 1 },
        { revalidate: false },
      );

      setHasLiked(false);
    }

    setWillSendLike(true);
  }, [hasLiked]);

  const updateLike = R.useCallback(async () => {
    if (!willSendLike) return;
    const operation: LikesOperationBody = {
      operation: hasLiked ? "increment" : "decrement",
    };

    try {
      await fetch(`/api/blogs/likes/${parsedSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(operation),
      });

      setWillSendLike(false);
    } catch (error) {
      onIncrementError();
    }
  }, [willSendLike, hasLiked]);

  const [, likeUpdateError] = useDebounce(updateLike, 500, [
    willSendLike,
    hasLiked,
  ]);

  R.useEffect(
    () => setHasLiked(likesRes.data?.hasLiked || false),
    [likesRes.data?.hasLiked],
  );

  /* Toggle alert when there is an like error
  =================================================== */
  R.useEffect(() => {
    if (likeUpdateError) setShowAlert(true);
  }, [likeUpdateError]);

  return (
    <>
      <Seo {...blogPostSeo(blogPostSeoArg)} />

      <StyledAlert
        icon={<IoWarning className="text-2xl" />}
        color="red"
        show={showAlert}
        dismissible={{ onClose: () => setShowAlert(false) }}
      >
        Oops, please try to reload or try visiting the page at a later time !
      </StyledAlert>

      <article className="fade-bottom relative mt-6 mb-3 after:-top-6">
        <div className="layout">
          <header>
            <section
              className={clsx(
                "not-prose prose prose-zinc prose-pink dark:prose-invert md:prose-lg lg:prose-xl",
                "mx-auto flex w-full flex-col justify-between border-b-2 border-indigo-200 pt-16 pb-3 dark:border-zinc-700",
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
                  isLoadingStats={
                    !(viewsRes.error && likesRes.error) &&
                    (viewsRes.data?.views === undefined ||
                      likesRes.data?.likes === undefined)
                  }
                  hasLiked={hasLiked}
                  likes={
                    likesRes.data?.likes !== undefined
                      ? likesRes.data?.likes
                      : 0
                  }
                  views={
                    viewsRes.data?.views !== undefined
                      ? viewsRes.data?.views
                      : 0
                  }
                />
                <Show when={!frontmatter.englishOnly}>
                  <ActionButton
                    className="w-full !border-indigo-400 !text-indigo-400 lg:w-max"
                    icon={<IoLanguage />}
                    color="indigo"
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
              "prose prose-zinc dark:prose-invert md:prose-lg lg:prose-xl",
              "prose-a:text-pink-400 dark:prose-a:text-pink-300",
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
              "prose prose-zinc prose-pink dark:prose-invert md:prose-lg lg:prose-xl",
              "mx-auto mb-4 flex flex-col gap-4",
            )}
          >
            <section className="detail-aside-colors mt-3 flex h-fit grow flex-row items-center justify-between gap-4 rounded-md p-4">
              <div className="grow space-y-3">
                <ActionButton
                  icon={<FaGithub className="text-lg" />}
                  href=""
                  color="gray"
                  className="dark:!border-zinc-400 dark:!text-zinc-400"
                >
                  See on Github
                </ActionButton>

                <CopyLinkBtn />
              </div>

              {/* Like button */}
              <LikeButton
                showSkeleton={
                  !(viewsRes.error && likesRes.error) &&
                  (viewsRes.data?.views === undefined ||
                    likesRes.data?.likes === undefined)
                }
                revealButton={
                  !(viewsRes.error && likesRes.error) &&
                  viewsRes.data?.views !== undefined &&
                  likesRes.data?.likes !== undefined
                }
                hasLikedShowcase={hasLiked}
                formattedLikes={formattedLikes}
                onClick={optimisticLikeUpdate}
              />
            </section>

            <Comment />

            {/* links to previous and next projects */}
            <div className="not-prose mt-5 flex w-full justify-between gap-8 text-base">
              {/* link to previous listed projects */}
              <LinkWithUnderline
                className="grow sm:flex-grow-0"
                href={`/blog/${prevPost}`}
              >
                <BsArrowLeft />
                Previous Post
              </LinkWithUnderline>

              {/* link to next listed projects */}
              <LinkWithUnderline
                className="grow justify-end sm:flex-grow-0"
                href={`/blog/${nextPost}`}
              >
                Next Post
                <BsArrowRight />
              </LinkWithUnderline>
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostSlugs("article");

  return { fallback: false, paths };
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const postData = await getPostData(ctx.params?.slug as string, "article");
  const prevAndNextSlug = await getPrevAndNextPosts(
    ctx.params?.slug as string,
    "article",
  );

  return { props: { ...postData, ...prevAndNextSlug } };
}
