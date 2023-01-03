import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import { FC } from "react";

interface IProps {
  Icon: JSX.Element;
  text: string;
}

const TechListItem: FC<IProps> = ({ Icon, text }) => {
  return (
    <li>
      <Popover
        placement="bottom"
        dismiss={{
          escapeKey: true,
          outsidePointerDown: true,
          ancestorScroll: true,
        }}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: -25 },
        }}
      >
        <PopoverHandler>
          <Button variant="text" color="gray" size="sm">
            {Icon}
          </Button>
        </PopoverHandler>
        <PopoverContent className="z-20 px-3 py-1 rounded-md bg-gray-700/70 border-0 text-gray-200 font-semibold">
          {text}
        </PopoverContent>
      </Popover>
    </li>
  );
};

export default TechListItem;
