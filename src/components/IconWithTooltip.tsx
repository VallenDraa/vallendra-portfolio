import { Button, Tooltip, TooltipProps } from "@material-tailwind/react";
import { placement } from "@material-tailwind/react/types/components/menu";
import { forwardRef } from "react";

interface IProps extends Omit<TooltipProps, "children"> {
  icon: JSX.Element;
  text: string;
  placement?: placement;
  isButton?: boolean;
}

const IconWithTooltip = forwardRef<HTMLDivElement, IProps>(
  ({ ref, icon, text, placement, isButton = true, ...props }, forwardedRef) => {
    return (
      <Tooltip
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
          <Button variant="text" color="gray" size="sm">
            {icon}
          </Button>
        ) : (
          <div className="inline-block">{icon}</div>
        )}
      </Tooltip>
    );
  }
);

export default IconWithTooltip;
