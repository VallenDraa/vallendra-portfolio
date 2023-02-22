import { useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

type NavbarSubMenuProps = {
  Handler: JSX.Element;
  menuItems: JSX.Element[];
  offset?: number;
};

export default function NavbarSubMenu({
  Handler,
  menuItems,
  offset,
}: NavbarSubMenuProps) {
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

      <MenuList className="border-0 bg-indigo-100/90 shadow supports-[backdrop-filter]:bg-indigo-100/30 supports-[backdrop-filter]:backdrop-blur-md dark:bg-gray-800/90 dark:supports-[backdrop-filter]:bg-gray-800/30">
        {menuItems.map((menuItem: JSX.Element) => (
          <MenuItem
            className="p-0 text-indigo-500 hover:bg-white/10 hover:text-indigo-600 focus:bg-white/20 dark:text-gray-300 dark:hover:text-white"
            key={menuItem.key}
          >
            {menuItem}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
