import { Typography } from "@material-tailwind/react";
import Observe from "components/Observe";
import Stats from "components/Showcase/Card/Stats";
import type PostData from "interfaces/blogPost.interface";
import { CldImage } from "next-cloudinary";

import Link from "next/link";
import R from "react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { dateFormatter } from "utils/client/helpers/formatter";
import useGetLikesById from "utils/client/hooks/useGetLikesById";
import useGetViewsById from "utils/client/hooks/useGetViewsById";
import { parsePostSlug } from "utils/client/helpers/blogClientHelper";

export default function BlogCard({ post }: { post: PostData }) {
  const { parsedSlug } = parsePostSlug(post.slug);

  const formattedDate = R.useMemo(
    () => dateFormatter.format(new Date(post.date)),
    [],
  );

  /* Helper state
   ====================== */
  const [willFetch, setWillFetch] = R.useState(false);

  /* Getting the stats
  ====================== */
  const viewsRes = useGetViewsById(parsedSlug, "blog", willFetch);
  const likesRes = useGetLikesById(parsedSlug, "blog", willFetch);

  return (
    <Observe
      freezeOnceVisible
      onIntersectingStatusChange={isIntersecing => {
        setWillFetch(isIntersecing);
      }}
    >
      <Link
        title={post.title}
        href={`/blog/${post.slug}`}
        className="overflow-clip rounded-md border border-indigo-300 shadow transition duration-300 ease-out hover:scale-105 hover:shadow-indigo-300 dark:border-zinc-700 hover:dark:shadow-zinc-700"
      >
        <CldImage
          quality={50}
          width={960}
          height={540}
          crop="fill"
          title={post.bannerSrc}
          src={post.banner}
          alt={post.bannerSrc}
        />

        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-col gap-1.5">
            <time
              dateTime={formattedDate}
              className="text-sm font-medium text-indigo-500 dark:text-indigo-300"
            >
              {formattedDate}
            </time>
            <Typography
              as="h4"
              variant="h4"
              className="text-zinc-700 dark:text-zinc-200"
            >
              {post.title}
            </Typography>
          </div>

          <span className="text-base text-zinc-600 dark:text-zinc-400">
            {post.description}
          </span>

          <div className="flex flex-wrap items-center justify-between gap-x-1 gap-y-4 pt-2">
            <div className="flex items-center gap-3">
              <Stats
                icon={<AiFillEye />}
                textColor="text-teal-400"
                number={viewsRes?.data?.views ?? 0}
                isLoading={
                  !(viewsRes.error && likesRes.error) &&
                  (viewsRes.data?.views === undefined ||
                    likesRes.data?.likes === undefined)
                }
              />

              <Stats
                icon={<AiFillHeart />}
                textColor="text-red-400"
                number={likesRes?.data?.likes ?? 0}
                isLoading={
                  !(viewsRes.error && likesRes.error) &&
                  (viewsRes.data?.views === undefined ||
                    likesRes.data?.likes === undefined)
                }
              />
            </div>

            <ul className="flex flex-wrap items-center justify-center gap-3">
              {post.tags.map(tag => (
                <li
                  key={tag}
                  className="text-xs font-bold capitalize text-indigo-400 dark:text-indigo-300"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </Observe>
  );
}
