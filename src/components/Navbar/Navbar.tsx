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
import Link from "next/link";

export default function NavbarComponent() {
  const { navIsOpened, setNavIsOpened } = useContext(
    NavIsOpenedContext
  ) as INavIsOpened;

  const navbarRef = useRef<HTMLDivElement>(null);
  const navToggleRef = useRef<HTMLButtonElement>(null);

  /* refs for navlist
  ================================================ */
  const navListRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* add open animation for small navbar
  ================================================ */
  useEffect(() => {
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

  /* disable and enable scroll on nav state change
  ================================================ */
  useEffect(() => {
    if (window.innerWidth >= 960 && navIsOpened) {
      document.body.style.overflowY = "auto";
      return;
    }

    document.body.style.overflowY = navIsOpened ? "hidden" : "auto";
  }, [navIsOpened]);

  /* open navigation according to screen size
  =============================================== */
  useEffect(() => {
    const navHandler = () => {
      setNavIsOpened(window.innerWidth >= 960);
    };

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
  }, []);

  return (
    <div
      ref={navbarRef}
      className="fixed top-0 z-50 min-w-full rounded-none border-0 py-3 px-0 backdrop-blur-md backdrop-saturate-[1.275] dark:bg-gray-800/50 dark:text-white/90"
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-8">
        {/* name */}
        <Typography as="h2" className="text-lg font-bold lg:basis-1/3">
          <span>Jestine Vallendra Dwi Putra</span>
        </Typography>
        {/* the nav list */}
        <NavList navListRef={navListRef} overlayRef={overlayRef} />
        {/* cta */}
        <div className="hidden sm:basis-1/3 lg:block">
          <Link href={"/contacts"} className="ml-auto block w-fit ">
            <Button
              variant="filled"
              color="deep-purple"
              size="md"
              className="group relative flex w-max items-center justify-center gap-2 rounded-full px-4 text-center duration-200"
            >
              <span className="translate-x-2.5 transition-transform duration-200 group-hover:translate-x-0">
                Contact Me
              </span>
              <IoCall className="relative -translate-x-4 text-sm  opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
            </Button>
          </Link>
        </div>
        <IconButton
          ref={navToggleRef}
          variant="text"
          color="indigo"
          className="p-5 text-inherit lg:hidden"
          onClick={() => setNavIsOpened(true)}
        >
          <BiMenuAltRight
            className={`text-4xl transition duration-200 dark:text-gray-200`}
          />
        </IconButton>
      </div>
    </div>
  );
}
