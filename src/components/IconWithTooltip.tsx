import { Button, Tooltip, TooltipProps } from "@material-tailwind/react";
import { placement } from "@material-tailwind/react/types/components/menu";
import { forwardRef } from "react";

interface IProps extends Omit<TooltipProps, "children"> {
  withPadding?: boolean;
  icon: JSX.Element;
  text: string;
  placement?: placement;
  isButton?: boolean;
}

const IconWithTooltip = forwardRef<HTMLDivElement, IProps>(
  (
    {
      ["aria-label"]: ariaLabel,
      ref,
      icon,
      text,
      placement,
      className,
      isButton = false,
      withPadding = true,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <Tooltip
        className={className}
        ref={forwardedRef}
        placement={placement || "bottom"}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: placement === "top" ? 25 : -25 },
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
            className={`inline-block rounded-md transition-colors duration-200 hover:bg-indigo-200/30 active:bg-indigo-200/50 dark:hover:bg-gray-500/30 dark:active:bg-gray-500/50 ${
              withPadding ? "p-3.5" : "p-0"
            }`}
          >
            {icon}
          </div>
        )}
      </Tooltip>
    );
  }
);

export default IconWithTooltip;
