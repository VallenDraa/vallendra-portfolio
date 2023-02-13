import { Typography } from "@material-tailwind/react";
import { useMemo } from "react";
import { AiFillCalendar, AiFillEye, AiFillHeart } from "react-icons/ai";
import { commaSeparator } from "../../utils/client/helpers/formatter";
import Show from "../../utils/client/jsx/Show";

const skeleton =
  "after:h-4 after:w-20 after:animate-pulse after:rounded-full after:bg-white/20";

interface Props {
  timestampMessage?: string;
  views: number;
  likes: number;
  hasLiked: boolean;
  isLoadingStats?: boolean;
  dateString?: string;
  unixTime?: number;
}

export default function ShowcaseStats({
  dateString = new Date().toISOString(),
  unixTime = Date.now(),
  timestampMessage = "",
  views,
  likes,
  hasLiked,
  isLoadingStats = false,
}: Props) {
  const formattedDate = useMemo(() => {
    const dateObj = new Date(dateString || unixTime);

    return new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateObj);
  }, [dateString, unixTime]);

  const formattedViews = useMemo(() => commaSeparator.format(views), [views]);
  const formattedLikes = useMemo(() => commaSeparator.format(likes), [likes]);

  return (
    <div className="flex flex-wrap gap-3 text-indigo-300 dark:text-gray-500">
      <Typography
        variant="small"
        as="span"
        className="flex items-center gap-1 font-medium"
      >
        <AiFillCalendar />
        {timestampMessage}
        {formattedDate}
      </Typography>

      <span>&bull;</span>

      <Typography
        variant="small"
        as="span"
        className={`flex items-center gap-1 font-medium ${
          isLoadingStats ? skeleton : "animate-fade-in"
        }`}
      >
        <AiFillEye />
        <Show when={!isLoadingStats}>{formattedViews} views</Show>
      </Typography>

      <span>&bull;</span>

      <Typography
        variant="small"
        as="span"
        className={`flex items-center gap-1 font-medium ${
          hasLiked ? "text-red-300" : "text-inherit"
        } ${isLoadingStats ? skeleton : "animate-fade-in"}`}
      >
        <AiFillHeart />
        <Show when={!isLoadingStats}>{formattedLikes} likes</Show>
      </Typography>
    </div>
  );
}
