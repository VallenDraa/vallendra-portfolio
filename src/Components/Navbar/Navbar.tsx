import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { FC, Key, ReactElement, useEffect, useState } from "react";
import { IoCall, IoChevronDownOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import MENUS from "../../Utils/Misc/Menus";

const NavbarComponent: FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const changeNav = () => window.innerWidth > 540 && setIsNavOpen(false);

  // change navigation according to screen size
  useEffect(() => {
    window.addEventListener("resize", changeNav);
  }, []);

  const NavList: FC = () => (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {MENUS.map((menu: string): ReactElement => {
        return (
          <Typography key={menu as Key} as="li" variant="paragraph">
            <Button
              color="indigo"
              variant="text"
              fullWidth
              className="py-2 px-3 text-sm font-semibold text-gray-300 hover:text-white transition duration-200"
            >
              <Link
                to={`/${menu === "home" ? "" : menu}`}
                className="flex items-center capitalize"
              >
                {menu}
              </Link>
            </Button>
          </Typography>
        );
      })}
    </ul>
  );

  return (
    <Navbar className="min-w-full py-2 px-4 rounded-none bg-transparent backdrop-blur-md backdrop-saturate-[1.275] shadow border-0 text-gray-200">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        {/* name */}
        <Typography
          as="h2"
          className="cursor-pointer font-bold text-lg lg:basis-1/3"
        >
          <span>Jestine Vallendra Dwi Putra</span>
        </Typography>
        {/* the nav list */}
        <div className="hidden lg:flex justify-center basis-1/3">
          <NavList />
        </div>
        {/* cta */}
        <div className="sm:basis-1/3">
          <Button
            variant="filled"
            color="deep-purple"
            size="sm"
            className="group hidden lg:flex items-center relative w-max ml-auto"
          >
            <div className="duration-200 text-center relative w-max flex justify-center items-center">
              <span className="group-hover:pr-5 duration-200">Contact Me</span>
              <IoCall className="absolute right-0 opacity-0 pr-0 group-hover:opacity-100 duration-200" />
            </div>
          </Button>
        </div>
        <IconButton
          variant="text"
          color="indigo"
          className="h-6 w-6 p-4 text-inherit lg:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <IoChevronDownOutline
            className={`transition duration-200 text-gray-200 text-3xl ${
              isNavOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </IconButton>
      </div>
      <MobileNav open={isNavOpen}>
        <NavList />
        <Button
          variant="filled"
          color="deep-purple"
          size="sm"
          fullWidth
          className="group flex items-center justify-center"
        >
          <div className="duration-200 text-center relative w-max flex justify-center items-center">
            <span className="group-hover:pr-5 duration-200">Contact Me</span>
            <IoCall className="absolute right-0 opacity-0 pr-0 group-hover:opacity-100 duration-200" />
          </div>
        </Button>
      </MobileNav>
    </Navbar>
  );
};

export default NavbarComponent;
