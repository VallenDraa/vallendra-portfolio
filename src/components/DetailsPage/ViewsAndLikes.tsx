import { Typography } from "@material-tailwind/react";
import { useMemo } from "react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { commaSeparator } from "../../utils/client/helpers/formatter";
import Show from "../../utils/client/jsx/Show";

const skeleton =
  "after:h-4 after:w-20 after:animate-pulse after:rounded-full after:bg-white/20";

export default function ViewsAndLikes({
  views,
  likes,
  hasLiked,
  isLoading = false,
}: {
  views: number;
  likes: number;
  hasLiked: boolean;
  isLoading?: boolean;
}) {
  const formattedViews = useMemo(() => commaSeparator.format(views), [views]);
  const formattedLikes = useMemo(() => commaSeparator.format(likes), [likes]);

  return (
    <div className="mt-2.5 flex gap-3 text-indigo-300 dark:text-gray-400">
      <Typography
        variant="paragraph"
        as="span"
        className={`flex items-center gap-1 text-sm font-bold ${
          isLoading ? skeleton : "animate-fade-in"
        }`}
      >
        <AiFillEye />
        <Show when={!isLoading}>{formattedViews} views</Show>
      </Typography>

      <span>&bull;</span>

      <Typography
        variant="paragraph"
        as="span"
        className={`flex items-center gap-1 text-sm font-bold ${
          hasLiked ? "text-red-300" : "text-inherit"
        } ${isLoading ? skeleton : "animate-fade-in"}`}
      >
        <AiFillHeart />
        <Show when={!isLoading}>{formattedLikes} likes</Show>
      </Typography>
    </div>
  );
}
