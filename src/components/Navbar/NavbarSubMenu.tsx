import { useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import MENUS from "utils/data/menus";

interface Props {
  Handler: JSX.Element;
  menuItems: JSX.Element[];
  offset?: number;
}

export default function NavbarSubMenu({ Handler, menuItems, offset }: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
          className="p-0 text-base font-semibold text-indigo-400 hover:text-indigo-500 dark:text-gray-200 dark:hover:text-white"
        >
          {Handler}
        </Button>
      </MenuHandler>

      <MenuList className="border-0 bg-indigo-100/90 shadow dark:bg-gray-800/90 [@supports(backdrop-filter:blur(12px))]:bg-indigo-100/30 [@supports(backdrop-filter:blur(12px))]:backdrop-blur-md dark:[@supports(backdrop-filter:blur(12px))]:bg-gray-800/30">
        {menuItems.map((menuItem: JSX.Element, i) => (
          <MenuItem
            className="p-0 text-indigo-500 hover:bg-white/10 hover:text-indigo-600 focus:bg-white/20 dark:text-gray-300 dark:hover:text-white"
            key={MENUS[i]}
          >
            {menuItem}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
