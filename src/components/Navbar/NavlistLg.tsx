/* eslint-disable react/jsx-no-useless-fragment */
import StyledButton from "components/StyledComponents/StyledButton";
import menuData from "utils/data/menus";
import NavbarSubMenu from "components/Navbar/NavbarSubMenu";
import { Fragment } from "react";
import clsx from "clsx";
import NavBtn from "components/Navbar/NavBtn";

export default function NavListLg() {
  return (
    <nav className="hidden animate-fade-in items-center gap-1 md:flex">
      {/* menu lists */}
      {menuData.map(menu => (
        <Fragment key={menu.name}>
          {menu.subMenus === undefined ? (
            <NavBtn menu={menu.name} href={menu.url} />
          ) : (
            <NavbarSubMenu
              Handler={<>{menu.name}</>}
              menuItems={menu.subMenus.map(subMenu => (
                <StyledButton
                  key={subMenu.url}
                  hrefTarget="_self"
                  href={subMenu.url}
                  className={clsx(
                    "p-3",
                    "!text-left !text-sm !font-medium !capitalize text-zinc-800 hover:text-indigo-600 dark:text-zinc-300 hover:dark:text-white",
                    "hover:bg-indigo-500/10 hover:dark:bg-zinc-50/10",
                  )}
                >
                  {subMenu.name}
                </StyledButton>
              ))}
            />
          )}
        </Fragment>
      ))}
    </nav>
  );
}
