import clsx from "clsx";
import R from "react";
import { AiFillCalendar, AiFillEye, AiFillHeart } from "react-icons/ai";
import { commaSeparator, dateFormatter } from "utils/client/helpers/formatter";
import Show from "utils/client/jsx/Show";

const dateSkeleton =
  "after:h-4 after:w-44 after:animate-pulse after:rounded-full after:bg-zinc-500/20 dark:after:bg-white/20";

const skeleton =
  "after:h-4 after:w-20 after:animate-pulse after:rounded-full after:bg-zinc-500/20 dark:after:bg-white/20";

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
  const [dateIsLoading, setDateIsLoading] = R.useState(true);
  const [formattedDate, setFormattedData] = R.useState("");

  const formattedViews = R.useMemo(() => commaSeparator.format(views), [views]);
  const formattedLikes = R.useMemo(() => commaSeparator.format(likes), [likes]);

  /* Format the date client side to prevent hydration mismatch
  ============================================================ */
  R.useEffect(() => {
    setFormattedData(dateFormatter.format(new Date(dateString ?? unixTime)));
  }, [dateString, unixTime]);

  R.useEffect(() => setDateIsLoading(formattedDate === ""), [formattedDate]);

  return (
    <div className="flex flex-wrap gap-3 text-zinc-500 dark:text-zinc-400">
      <time
        className={clsx(
          "flex items-center gap-1 text-sm font-medium",
          isLoadingStats && dateIsLoading ? dateSkeleton : "animate-fade-in",
        )}
        dateTime={formattedDate}
      >
        <AiFillCalendar />

        <Show when={!isLoadingStats && !dateIsLoading}>
          {timestampMessage}
          {formattedDate}
        </Show>
      </time>

      <span>&bull;</span>

      <span
        className={clsx(
          "flex items-center gap-1 text-sm font-medium",
          isLoadingStats && dateIsLoading ? skeleton : "animate-fade-in",
        )}
      >
        <AiFillEye />
        <Show when={!isLoadingStats && !dateIsLoading}>
          {formattedViews} views
        </Show>
      </span>

      <span>&bull;</span>

      <span
        className={clsx(
          "flex items-center gap-1 text-sm font-medium ",
          hasLiked ? "text-red-400" : "text-inherit",
          isLoadingStats && dateIsLoading ? skeleton : "animate-fade-in",
        )}
      >
        <AiFillHeart className={hasLiked ? "text-red-400" : "text-inherit"} />
        <Show when={!isLoadingStats && !dateIsLoading}>
          {formattedLikes} likes
        </Show>
      </span>
    </div>
  );
}
