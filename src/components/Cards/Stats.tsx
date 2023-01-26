import { Typography } from "@material-tailwind/react";
import R from "react";
import Show from "../../utils/client/jsx/Show";
import { compactNumberFormatter } from "../../utils/client/helpers/formatter";

const skeleton =
  "after:h-4 after:w-8 after:animate-pulse after:rounded-full after:bg-white/20";

export default function Stats({
  icon,
  isLoading = false,
  number,
  textColor,
}: {
  icon: R.ReactNode;
  isLoading?: boolean;
  number: number;
  textColor: string;
}) {
  const formattedNumber = R.useMemo(
    () => compactNumberFormatter.format(number),
    [number]
  );

  return (
    <Typography
      variant="paragraph"
      as="span"
      className={`flex items-center gap-1 text-xs font-bold ${textColor} ${
        isLoading ? skeleton : ""
      }`}
    >
      {icon}
      <Show when={!isLoading}>{formattedNumber}</Show>
    </Typography>
  );
}
