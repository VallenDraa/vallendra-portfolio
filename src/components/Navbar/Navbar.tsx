import { Typography, IconButton } from "@material-tailwind/react";
import { useEffect, useContext, useRef } from "react";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";
import NavList from "./Navlist";
import { NavIsOpenedContext } from "../../context/NavIsOpenedCP";
import ThemeToggler from "./ThemeToggler";

export default function NavbarComponent() {
  const { navIsOpened, setNavIsOpened } = useContext(NavIsOpenedContext);

  /* Ref for navbar
  =============================================== */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* for closing the navbar when user touches outside of the navbar component
  ========================================================================== */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      ref={navbarRef}
      className="sticky top-0 z-[70] min-w-full rounded-none border-0 bg-indigo-100/90 py-3 px-0 dark:bg-gray-800/90 [@supports(backdrop-filter:blur(12px))]:bg-indigo-100/30 [@supports(backdrop-filter:blur(12px))]:backdrop-blur-md dark:[@supports(backdrop-filter:blur(12px))]:bg-gray-800/30"
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-8 text-indigo-500 dark:text-gray-200 2xl:px-2">
        {/* name section */}
        <Typography as="h2" className="text-lg font-bold lg:basis-1/3">
          <Link href="/">Jestine Vallendra Dwi Putra</Link>
        </Typography>

        {/* the nav list section */}
        <NavList navListRef={navListRef} overlayRef={overlayRef} />

        {/* right section */}
        <div className="hidden items-center justify-end gap-3 sm:basis-1/3 lg:flex">
          {/* theme toggler */}
          <ThemeToggler className="hidden lg:inline-block" />
        </div>

        {/* show when screen is small */}
        <div className="flex items-center justify-end gap-3 lg:hidden">
          <ThemeToggler className="inline-block" />

          <IconButton
            aria-label="Navigation menu button"
            ref={navToggleRef}
            size="md"
            variant="text"
            color="indigo"
            className="text-inherit"
            onClick={() => setNavIsOpened(true)}
          >
            <BiMenu className="text-4xl text-indigo-400 transition duration-200 dark:text-gray-200" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
