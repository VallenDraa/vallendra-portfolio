import { Tooltip, ITooltip } from "react-tooltip";

export default function StyledTooltip(props: ITooltip) {
  return (
    <Tooltip
      place="bottom"
      {...props}
      className="z-50 animate-fade-in !rounded-md !bg-indigo-50 !text-zinc-800 !shadow-sm !shadow-indigo-200 dark:!bg-zinc-800 dark:!text-zinc-200 dark:!shadow-zinc-600"
    />
  );
}

export const DEFAULT_DELAY = 250;
