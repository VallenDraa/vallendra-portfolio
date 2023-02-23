import { Tooltip, ITooltip } from "react-tooltip";

export default function StyledTooltip(props: ITooltip) {
  return (
    <Tooltip
      place="bottom"
      {...props}
      className="z-50 animate-fade-in !rounded-md !bg-indigo-50 !text-indigo-700 !shadow !shadow-indigo-200 dark:!bg-gray-800 dark:!text-gray-200 dark:!shadow-gray-700"
    />
  );
}

export const DEFAULT_DELAY = 250;
