import R from "react";
import Show from "utils/client/jsx/Show";
import { compactNumberFormatter } from "utils/client/helpers/formatter";
import type { TextSize } from "types/types";
import clsx from "clsx";

const skeleton =
  "after:h-4 after:w-8 after:animate-pulse after:rounded-full after:bg-white/20";

export default function Stats({
  icon,
  isLoading = false,
  number,
  textColor,
  fontSize = "text-xs",
}: {
  icon: R.ReactNode;
  isLoading?: boolean;
  number: number;
  textColor: string;
  fontSize?: TextSize;
}) {
  const formattedNumber = R.useMemo(
    () => compactNumberFormatter.format(number),
    [number],
  );

  return (
    <span
      className={clsx(
        textColor,
        fontSize,
        isLoading ? skeleton : "animate-fade-in",
        "flex items-center gap-1 font-bold",
      )}
    >
      {icon}
      <Show when={!isLoading}>{formattedNumber}</Show>
    </span>
  );
}
