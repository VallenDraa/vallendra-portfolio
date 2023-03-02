import { useState } from "react";
import { Button, Menu, MenuHandler } from "@material-tailwind/react";
import dynamic from "next/dynamic";

type NavbarSubMenuProps = {
  Handler: JSX.Element;
  menuItems: JSX.Element[];
  offset?: number;
};

const MenuItem = dynamic(
  () => import("@material-tailwind/react").then(mod => mod.MenuItem),
  { ssr: false },
);

const MenuList = dynamic(
  () => import("@material-tailwind/react").then(mod => mod.MenuList),
  { ssr: false },
);

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
          className="p-0 text-base font-semibold text-zinc-700 hover:text-indigo-600 dark:text-zinc-200 dark:hover:text-white"
        >
          {Handler}
        </Button>
      </MenuHandler>

      <MenuList className="border-0 bg-zinc-100/90 shadow supports-[backdrop-filter]:bg-zinc-100/30 supports-[backdrop-filter]:backdrop-blur-md dark:bg-zinc-800/90 dark:supports-[backdrop-filter]:bg-zinc-800/30">
        {menuItems.map((menuItem: JSX.Element) => (
          <MenuItem
            className="p-0 text-zinc-700 hover:bg-zinc-50/30 hover:text-indigo-600 focus:bg-zinc-50/30 focus:text-indigo-600 dark:text-zinc-300 dark:hover:text-white"
            key={menuItem.key}
          >
            {menuItem}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
