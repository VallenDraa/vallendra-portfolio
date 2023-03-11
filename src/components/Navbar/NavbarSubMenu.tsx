import { useState } from "react";
import { Menu, MenuHandler } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import StyledButton from "components/StyledComponents/StyledButton";

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
        <div>
          <StyledButton className="flex items-center rounded-none py-2 px-5 text-start !text-base font-semibold capitalize text-zinc-700 duration-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-white lg:justify-center lg:!rounded-md lg:px-3 dark:lg:text-zinc-200">
            {Handler}
          </StyledButton>
        </div>
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
