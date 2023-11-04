import clsx from "clsx";
import R from "react";

type IconWithTooltipProps = {
  icon: R.ReactNode;
  text: string;
};

export default function IconWithTooltip({ icon, text }: IconWithTooltipProps) {
  return (
    <div
      data-tooltip-content={text}
      className={clsx(
        "icon-tooltip",
        "transition-colors duration-200",
        "group inline-block rounded-md p-3.5",
        "hover:bg-indigo-200/30 dark:hover:bg-zinc-500/30",
      )}
    >
      {icon}
    </div>
  );
}
