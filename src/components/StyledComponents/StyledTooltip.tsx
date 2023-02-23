import { forwardRef } from "react";
import { Tooltip, ITooltip } from "react-tooltip";

const StyledTooltip = forwardRef<typeof Tooltip, ITooltip>(props => (
  <Tooltip
    place="bottom"
    {...props}
    className="z-50 animate-fade-in !rounded-md !bg-indigo-50 !text-indigo-700 !shadow !shadow-indigo-200 dark:!bg-gray-800 dark:!text-gray-200 dark:!shadow-gray-700"
  />
));

export const DEFAULT_DELAY = 250;

export default StyledTooltip;
