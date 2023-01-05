import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import { IoCall, IoChevronDownOutline } from "react-icons/io5";
import NavList from "./Navlist";

export default function NavbarComponent() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const navToggleRef = useRef<HTMLButtonElement>(null);

  /* change navigation according to screen size
  ============================================= */
  useEffect(() => {
    const changeNav = () => window.innerWidth > 540 && setIsNavOpen(false);

    window.addEventListener("resize", changeNav);

    return () => window.removeEventListener("resize", changeNav);
  }, []);

  /* for closing the navbar when the user touches things outside of the navbar component
  ====================================================================================== */
  useEffect(() => {
    const closeNavOnOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // check if the target element is the nav toggle button
      if (navToggleRef.current?.contains(target)) return;

      // close if target is not the the navbar or its descendant
      if (!navbarRef.current?.contains(target)) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener("click", closeNavOnOutsideClick);

    return () => window.removeEventListener("click", closeNavOnOutsideClick);
  });

  return (
    <Navbar
      ref={navbarRef}
      className="fixed top-0 z-50 min-w-full py-3 px-4 rounded-none bg-gray-800/50 backdrop-blur-md backdrop-saturate-[1.275] shadow border-0 text-white/90"
    >
      <div className="max-w-screen-2xl px-4 mx-auto flex items-center justify-between">
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
            size="md"
            className="group hidden lg:flex items-center relative w-max ml-auto rounded-full"
          >
            <div className="duration-200 text-center relative w-max flex justify-center items-center">
              <span className="group-hover:pr-5 duration-200">Contact Me</span>
              <IoCall className="absolute right-0 opacity-0 pr-0 group-hover:opacity-100 duration-200" />
            </div>
          </Button>
        </div>
        <IconButton
          ref={navToggleRef}
          variant="text"
          color="indigo"
          className="p-4 text-inherit lg:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <IoChevronDownOutline
            className={`transition duration-200 text-gray-200 text-4xl ${
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
}
