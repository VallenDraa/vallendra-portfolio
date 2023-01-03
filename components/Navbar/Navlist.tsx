import { FC, ReactElement, Key, Fragment } from "react";
import { Typography, Button, MenuItem } from "@material-tailwind/react";
import MENUS from "../../utils/misc/MenuDatas";
import Show from "../../utils/jsx/Show";
import Dropdown from "../Main/Dropdown/Dropdown";
import Link from "next/link";

const NavList: FC = () => {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {MENUS.map((menu: string): React.ReactNode => {
        return (
          <Fragment key={menu as Key}>
            <Show when={menu !== "projects"}>
              <Typography as="li" variant="paragraph">
                <Button
                  color="indigo"
                  variant="text"
                  fullWidth
                  className="p-0 text-base font-semibold text-gray-300 hover:text-white transition duration-200"
                >
                  <a
                    href={`#${menu}`}
                    className="flex items-center capitalize py-2 px-3"
                  >
                    {menu}
                  </a>
                </Button>
              </Typography>
            </Show>
            <Show when={menu === "projects"}>
              <Dropdown
                Handler={
                  <a className="flex items-center capitalize py-2 px-3">
                    {menu}
                  </a>
                }
                menuItems={[
                  <a
                    href="#projects"
                    className="inline-block w-full h-full p-3"
                  >
                    Top Picks
                  </a>,
                  <Link href={`/`} className="inline-block w-full h-full p-3">
                    All Collection
                  </Link>,
                ]}
              />
            </Show>
          </Fragment>
        );
      })}
    </ul>
  );
};

export default NavList;
