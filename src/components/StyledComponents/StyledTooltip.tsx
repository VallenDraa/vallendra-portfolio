import type { ITooltip } from "react-tooltip";
import { Tooltip } from "react-tooltip";

export const DEFAULT_DELAY = 250;

export default function StyledTooltip(props: ITooltip) {
  return (
    <Tooltip
      place="bottom"
      {...props}
      className="z-50 animate-fade-in !rounded-md !bg-indigo-50 !text-indigo-500 !shadow-sm !shadow-indigo-200 dark:!bg-zinc-800 dark:!text-zinc-200 dark:!shadow-zinc-600"
    />
  );
}
