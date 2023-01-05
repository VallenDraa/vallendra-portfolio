import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { placement } from "@material-tailwind/react/types/components/menu";

interface IProps {
  Icon: JSX.Element;
  text: string;
  placement?: placement;
}

export default function IconWithTooltip({ Icon, text, placement }: IProps) {
  return (
    <Tooltip
      placement={placement || "bottom"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: placement === "top" ? 25 : -25 },
      }}
      content={text}
    >
      <Button variant="text" color="gray" size="sm">
        {Icon}
      </Button>
    </Tooltip>
  );
}
