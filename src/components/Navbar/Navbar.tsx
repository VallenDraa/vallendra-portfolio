import StyledButton from "components/StyledComponents/StyledButton";
import { useEffect, useContext, useRef } from "react";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";
import dynamic from "next/dynamic";
import NavIsOpenedContext from "context/NavIsOpenedCP";
import ThemeToggler from "./ThemeToggler";

const NavList = dynamic(() => import("./Navlist"), { ssr: false });

export default function NavbarComponent() {
  const { navIsOpened, setNavIsOpened } = useContext(NavIsOpenedContext);

  /* Ref for navbar
  =============================================== */
  const navbarRef = useRef<HTMLDivElement>(null);
  const navToggleRef = useRef<HTMLDivElement>(null);

  /* refs for navlist
  ================================================ */
  const navListRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* add open animation for small navbar
  ================================================ */
  useEffect(() => {
    if (navIsOpened && window.innerWidth < 960) {
      setTimeout(() => {
        navListRef.current?.classList.remove("-translate-x-full");
        overlayRef.current?.classList.remove("opacity-0");
      }, 10);
    } else {
      setTimeout(() => {
        navListRef.current?.classList.add("-translate-x-full");
        overlayRef.current?.classList.add("opacity-0");
      }, 10);
    }
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
      className="sticky top-0 z-[70] min-w-full rounded-none border-0 bg-zinc-100/90 py-3 px-0 backdrop-saturate-150 supports-[backdrop-filter]:bg-zinc-100/30 supports-[backdrop-filter]:backdrop-blur-md dark:bg-zinc-800/90 dark:supports-[backdrop-filter]:bg-zinc-800/30"
    >
      <div className="layout flex items-center justify-between">
        {/* name section */}
        <span className="text-lg font-semibold text-zinc-700 dark:text-zinc-200 md:text-xl lg:basis-1/3">
          <Link href="/">VallenDra</Link>
        </span>

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

          <div ref={navToggleRef}>
            <StyledButton
              aria-label="Navigation menu button"
              onClick={() => setNavIsOpened(true)}
              className="flex h-10 w-10 items-center justify-center rounded-md p-0.5 !text-xl hover:bg-zinc-500/10"
            >
              {/* icon for dark mode */}
              <BiMenu className="h-full w-full text-zinc-700 dark:text-zinc-200" />
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
}
