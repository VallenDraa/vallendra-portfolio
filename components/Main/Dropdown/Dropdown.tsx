import { FC, useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

interface IProps {
  Handler: JSX.Element;
  menuItems: JSX.Element[];
  offset?: number;
}

export default function Dropdown({ Handler, menuItems, offset }: IProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // auto closing the dropdown when the screen resizes
  useEffect(() => {
    window.addEventListener("resize", () => isVisible && setIsVisible(false));

    return () =>
      window.removeEventListener(
        "resize",
        () => isVisible && setIsVisible(false)
      );
  }, []);

  return (
    <Menu
      open={isVisible}
      handler={() => setIsVisible((prev: boolean) => !prev)}
      animate={{ mount: { y: 0 }, unmount: { y: 15 } }}
      dismiss={{ outsidePointerDown: true }}
      offset={offset}
    >
      <MenuHandler>
        <Button
          color="indigo"
          variant="text"
          fullWidth
          className="p-0 text-base font-semibold text-gray-300 hover:text-white transition duration-200"
        >
          {Handler}
        </Button>
      </MenuHandler>

      <MenuList className="bg-gray-800/50 backdrop-blur-md backdrop-saturate-[1.275] shadow border-0">
        {menuItems.map((menuItem: JSX.Element, i) => {
          return (
            <MenuItem
              onClick={() => setIsVisible(false)}
              className="p-0 hover:bg-gray-700/50 active:bg-gray-700/70 text-gray-300 hover:text-white active:text-gray-100"
              key={i}
            >
              {menuItem}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
