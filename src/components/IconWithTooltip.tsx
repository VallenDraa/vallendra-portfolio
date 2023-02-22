import { Button, Tooltip, TooltipProps } from "@material-tailwind/react";
import { placement } from "@material-tailwind/react/types/components/menu";
import R from "react";

type IconWithTooltipProps = {
  withPadding?: boolean;
  icon: R.ReactNode;
  text: string;
  tooltipPlacement?: placement;
  isButton?: boolean;
} & Omit<TooltipProps, "children">;

const IconWithTooltip = R.forwardRef<HTMLDivElement, IconWithTooltipProps>(
  (
    {
      "aria-label": ariaLabel,
      ref,
      icon,
      text,
      tooltipPlacement,
      className,
      isButton = false,
      withPadding = true,
      ...props
    },
    forwardedRef,
  ) => (
    <Tooltip
      className={className}
      ref={forwardedRef}
      placement={tooltipPlacement || "bottom"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: tooltipPlacement === "top" ? 15 : -15 },
      }}
      content={text}
      {...props}
    >
      {isButton ? (
        <Button
          aria-label={ariaLabel}
          variant="text"
          color="gray"
          size="sm"
          className={withPadding ? "p-3.5" : "p-0"}
        >
          {icon}
        </Button>
      ) : (
        <div
          className={`group inline-block rounded-md transition-colors duration-200 hover:bg-indigo-200/30 dark:hover:bg-gray-500/30 ${
            withPadding ? "p-3.5" : "p-0"
          }`}
        >
          {icon}
        </div>
      )}
    </Tooltip>
  ),
);

export default IconWithTooltip;
