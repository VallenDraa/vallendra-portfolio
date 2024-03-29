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
} from "utils/server/mdxProcessor";
import { getMDXComponent } from "mdx-bundler/client";
import LinkWithUnderline from "components/Showcase/ShowcaseDetailsPage/LinkWithUnderline";
import { BsArrowLeft } from "react-icons/bs";
import SectionHeading from "components/Typography/SectionHeading";
import ShowcaseStats from "components/Showcase/ShowcaseDetailsPage/ShowcaseStats";
import ShowcaseImage from "components/Showcase/ShowcaseDetailsPage/ShowcaseImage";
import clsx from "clsx";
import CopyLinkBtn from "components/Showcase/ShowcaseDetailsPage/CopyLinkBtn";
import LikeButton from "components/Showcase/ShowcaseDetailsPage/LikeButton";
import { FaGithub } from "react-icons/fa";
import Show from "utils/client/jsx/Show";
import { IoLanguage, IoWarning } from "react-icons/io5";
import Seo from "seo/Seo";
import TagChip from "components/Mdx/TagChip";
import blogPostSeo from "seo/blogPost.seo";
import StyledAlert from "components/StyledComponents/StyledAlert";
import useIncrementViewOnLoad from "utils/client/hooks/useIncrementViewOnLoad";
import useGetViewsById from "utils/client/hooks/useGetViewsById";
import useGetLikesById from "utils/client/hooks/useGetLikesById";
import { commaSeparator } from "utils/client/helpers/formatter";
import useDebounce from "utils/client/hooks/useDebounce";
import { parsePostSlug } from "utils/client/helpers/blogClientHelper";
import DetailFooter from "components/Showcase/ShowcaseDetailsPage/DetailFooter";
import StyledButton from "components/StyledComponents/StyledButton";
import dynamic from "next/dynamic";

const TableOfContents = dynamic(
  () => import("components/Mdx/TableOfContents"),
  { ssr: false },
);

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
    "blog",
    onIncrementError,
  );

  /* Dynamic data
  ================== */
  const viewsRes = useGetViewsById(parsedSlug, "blog", finishedUpdatingViews);
  const likesRes = useGetLikesById(parsedSlug, "blog", finishedUpdatingViews);

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
      await fetch(`/api/blog/likes/${parsedSlug}`, {
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
        onClose={() => setShowAlert(false)}
      >
        <span>
          Oops, please try to reload or try visiting the page at a later time !
        </span>
      </StyledAlert>

      <article className="fade-bottom relative mb-3 mt-6 after:top-10">
        <div className="layout overflow-x-hidden">
          <header id="skip-to-content">
            <section
              className={clsx(
                "not-prose prose prose-zinc prose-pink dark:prose-invert md:prose-lg",
                "mx-auto flex w-full flex-col justify-between border-b-2 border-indigo-200 pb-3 pt-36 dark:border-zinc-700",
              )}
            >
              {/* back to project button */}
              <LinkWithUnderline href="/blog">
                <BsArrowLeft />
                Back To Blog
              </LinkWithUnderline>

              {/* title */}
              <div className="mt-4">
                <SectionHeading
                  title={frontmatter.title}
                  subTitle={frontmatter.description}
                />
              </div>

              {/* tags */}
              <div>
                {frontmatter.tags.map((tag: string, i: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TagChip key={`${tag}-${i}`} tag={tag} />
                ))}
              </div>

              <div className="mt-2 flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
                <ShowcaseStats
                  dateString={frontmatter.date}
                  isLoadingStats={
                    !(viewsRes.error && likesRes.error) &&
                    (viewsRes.data?.views === undefined ||
                      likesRes.data?.likes === undefined)
                  }
                  hasLiked={hasLiked}
                  likes={likesRes.data?.likes ?? 0}
                  views={viewsRes.data?.views ?? 0}
                />
                <Show when={!frontmatter.englishOnly}>
                  <StyledButton
                    alwaysShowIcon
                    className="w-full border border-indigo-400 px-6 py-3 text-indigo-400 hover:bg-indigo-500/10 lg:w-max"
                    icon={<IoLanguage />}
                    hrefTarget="_self"
                    href={
                      slugPrefix === "en-"
                        ? `id-${parsedSlug}`
                        : `en-${parsedSlug}`
                    }
                  >
                    Read In {slugPrefix === "en-" ? "Indonesian" : "English"}
                  </StyledButton>
                </Show>
              </div>
            </section>
          </header>
          <main
            className={clsx(
              "blog-content",
              "prose prose-zinc dark:prose-invert md:prose-lg",
              "prose-a:text-pink-400 dark:prose-a:text-pink-300",
              "mx-auto my-4",
            )}
          >
            <ShowcaseImage
            key={frontmatter.title}
              cldImageSrc={frontmatter.banner}
              title={frontmatter.bannerSrc}
              titleAsCaption
            />

            <TableOfContents slug={slug} />
            <Component />
          </main>
          <footer
            className={clsx(
              "prose prose-zinc prose-pink dark:prose-invert md:prose-lg",
              "mx-auto mb-4 flex flex-col gap-4",
            )}
          >
            <section className="detail-aside-colors not-prose mt-3 flex h-fit grow items-center justify-between gap-4 rounded-md border-2 p-4">
              <div className="grow space-y-3">
                <StyledButton
                  alwaysShowIcon
                  icon={<FaGithub className="text-lg" />}
                  href={frontmatter.githubLink}
                  hrefTarget="_blank"
                  className="w-full border border-zinc-500 px-6 py-3 text-zinc-500 hover:bg-zinc-500/10 dark:border-zinc-400 dark:text-zinc-400"
                >
                  See On Github
                </StyledButton>

                <CopyLinkBtn />
              </div>

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

            <DetailFooter
              showcaseType="blog"
              nextShowcase={{ name: "Next Post", slug: nextPost }}
              prevShowcase={{ name: "Previous Post", slug: prevPost }}
              className="not-prose"
            />
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
