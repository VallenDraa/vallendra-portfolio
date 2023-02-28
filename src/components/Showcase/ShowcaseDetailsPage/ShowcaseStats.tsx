import { Typography } from "@material-tailwind/react";
import clsx from "clsx";
import R from "react";
import { AiFillCalendar, AiFillEye, AiFillHeart } from "react-icons/ai";
import { commaSeparator, dateFormatter } from "utils/client/helpers/formatter";
import Show from "utils/client/jsx/Show";

const dateSkeleton =
  "after:h-4 after:w-44 after:animate-pulse after:rounded-full after:bg-white/20";

const skeleton =
  "after:h-4 after:w-20 after:animate-pulse after:rounded-full after:bg-white/20";

type ShowcaseStatsProps = {
  timestampMessage?: string;
  views: number;
  likes: number;
  hasLiked: boolean;
  isLoadingStats?: boolean;
  dateString?: string;
  unixTime?: number;
};

export default function ShowcaseStats({
  dateString = new Date().toISOString(),
  unixTime = Date.now(),
  timestampMessage = "",
  views,
  likes,
  hasLiked,
  isLoadingStats = false,
}: ShowcaseStatsProps) {
  const [dateIsLoaded, setDateIsLoaded] = R.useState(false);
  const [formattedDate, setFormattedData] = R.useState("");

  const formattedViews = R.useMemo(() => commaSeparator.format(views), [views]);
  const formattedLikes = R.useMemo(() => commaSeparator.format(likes), [likes]);

  /* Format the date client side to prevent hydration mismatch
  ============================================================ */
  R.useEffect(() => {
    setFormattedData(dateFormatter.format(new Date(dateString || unixTime)));
  }, [dateString, unixTime]);

  R.useEffect(() => setDateIsLoaded(formattedDate !== ""), [formattedDate]);

  return (
    <div className="flex flex-wrap gap-3 text-indigo-400">
      <time
        className={clsx(
          "flex items-center gap-1 text-sm font-medium",
          !dateIsLoaded && dateSkeleton,
        )}
      >
        <AiFillCalendar />

        <Show when={dateIsLoaded}>
          {timestampMessage}
          {formattedDate}
        </Show>
      </time>

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
          hasLiked ? "text-red-400" : "text-inherit"
        } ${isLoadingStats ? skeleton : "animate-fade-in"}`}
      >
        <AiFillHeart />
        <Show when={!isLoadingStats}>{formattedLikes} likes</Show>
      </Typography>
    </div>
  );
}
