import {
  Navbar,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useContext, useRef } from "react";
import { IoCall } from "react-icons/io5";
import { BiMenuAltRight } from "react-icons/bi";
import NavList from "./Navlist";
import NavIsOpenedContext, { INavIsOpened } from "../../context/NavIsOpenedCP";

export default function NavbarComponent() {
  const { navIsOpened, setNavIsOpened } = useContext(
    NavIsOpenedContext
  ) as INavIsOpened;

  const navbarRef = useRef<HTMLDivElement>(null);
  const navToggleRef = useRef<HTMLButtonElement>(null);

  /* refs for navlist
  ================================================ */
  const navListRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(navIsOpened);

    if (navIsOpened && window.innerWidth < 960) {
      overlayRef.current?.classList.add("animate-open-overlay");
      navListRef.current?.classList.add("animate-open-nav");

      setTimeout(() => {
        overlayRef.current?.classList.remove("animate-open-overlay");
        navListRef.current?.classList.remove("animate-open-nav");
      }, 350);
    } else {
      navListRef.current?.classList.remove("animate-close-nav");
      overlayRef.current?.classList.remove("animate-close-overlay");
    }
  }, [navIsOpened]);

  /* open navigation according to screen size
  ============================================= */
  useEffect(() => {
    const navHandler = () => setNavIsOpened(window.innerWidth > 960);

    navHandler();

    window.addEventListener("resize", navHandler);

    return () => window.removeEventListener("resize", navHandler);
  }, []);

  /* for closing the navbar when the user touches things outside of the navbar component
  ====================================================================================== */
  useEffect(() => {
    const closeNavOnOutsideClick = (e: MouseEvent) => {
      if (window.innerWidth >= 960) return;

      const target = e.target as HTMLElement;

      // check if the target element is the nav toggle button
      if (navToggleRef.current?.contains(target)) return;

      // close if target is not the the navbar or its descendant
      if (!navbarRef.current?.contains(target)) {
        setNavIsOpened(false);
      }
    };

    window.addEventListener("click", closeNavOnOutsideClick);

    return () => window.removeEventListener("click", closeNavOnOutsideClick);
  });

  return (
    <Navbar
      ref={navbarRef}
      className="fixed top-0 z-50 min-w-full py-3 px-4 rounded-none dark:bg-gray-800/50 backdrop-blur-md backdrop-saturate-[1.275] border-0 dark:text-white/90"
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
        <NavList navListRef={navListRef} overlayRef={overlayRef} />
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
          className="p-5 text-inherit lg:hidden"
          onClick={() => setNavIsOpened(true)}
        >
          <BiMenuAltRight
            className={`transition duration-200 dark:text-gray-200 text-4xl`}
          />
        </IconButton>
      </div>
    </Navbar>
  );
}
