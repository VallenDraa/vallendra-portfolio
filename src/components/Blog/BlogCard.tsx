import { Typography } from "@material-tailwind/react";
import Stats from "components/Showcase/Card/Stats";
import type PostData from "interfaces/blogPost.interface";
import { CldImage } from "next-cloudinary";

import Link from "next/link";
import R from "react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { dateFormatter } from "utils/client/helpers/formatter";

export default function BlogCard({ post }: { post: PostData }) {
  const formattedDate = R.useMemo(
    () => dateFormatter.format(new Date(post.date)),
    [],
  );

  return (
    <Link
      title={post.title}
      href={`/blog/${post.slug}`}
      className="flex flex-col gap-3 rounded-md border border-indigo-200 p-4 shadow transition-colors duration-200 hover:shadow-indigo-200 dark:border-gray-700 hover:dark:shadow-gray-700"
    >
      <CldImage
        className="rounded"
        quality={50}
        width={960}
        height={540}
        crop="fill"
        title={post.bannerSrc}
        src={post.banner}
        alt={post.bannerSrc}
      />

      <div className="flex flex-col gap-1">
        <time
          dateTime={formattedDate}
          className="text-sm font-medium text-pink-300 dark:text-pink-200"
        >
          {formattedDate}
        </time>
        <Typography
          as="h4"
          variant="h4"
          className="text-indigo-500 dark:text-gray-200"
        >
          {post.title}
        </Typography>
      </div>

      <span className="text-base text-indigo-300 dark:text-gray-400">
        {post.description}
      </span>

      <div className="flex items-center gap-3">
        <Stats
          icon={<AiFillEye />}
          textColor="text-teal-300"
          isLoading={false}
          number={10000}
        />

        <Stats
          icon={<AiFillHeart />}
          textColor="text-red-300"
          isLoading={false}
          number={2000}
        />
      </div>
    </Link>
  );
}
