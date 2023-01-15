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

export default function NavbarSubMenu({ Handler, menuItems, offset }: IProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // auto closing the dropdown when the screen resizes

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
          className="p-0 text-base font-semibold text-white/70 transition duration-200 hover:text-white"
        >
          {Handler}
        </Button>
      </MenuHandler>

      <MenuList className="border-0 bg-gray-800/50 shadow backdrop-blur-md backdrop-saturate-[1.275]">
        {menuItems.map((menuItem: JSX.Element, i) => {
          return (
            <MenuItem
              className="p-0 text-white/70 hover:bg-gray-700/50 hover:text-white active:bg-gray-700/70 active:text-gray-100"
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
