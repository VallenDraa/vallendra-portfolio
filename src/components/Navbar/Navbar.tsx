import StyledButton from "components/StyledComponents/StyledButton";
import { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import NavIsOpenedContext from "context/NavIsOpenedCP";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import NavListLg from "./NavlistLg";
import NavListSm from "./NavListSm";

export default function NavbarComponent() {
  const { setNavIsOpened } = useContext(NavIsOpenedContext);

  return (
    <div className="fixed top-0 z-[70] min-w-full rounded-none border-0 bg-zinc-100/90 px-0 py-3 backdrop-saturate-150 supports-[backdrop-filter]:bg-zinc-100/30 supports-[backdrop-filter]:backdrop-blur-md dark:bg-zinc-800/90 dark:supports-[backdrop-filter]:bg-zinc-800/30">
      <div className="layout flex items-center justify-between">
        {/* name section */}
        <span className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 md:basis-1/3">
          <Link href="/">VallenDra</Link>
        </span>

        {/* the nav list section */}
        <NavListLg />
        <NavListSm />

        {/* right section */}
        <div className="hidden items-center justify-end gap-3 sm:basis-1/3 md:flex">
          {/* theme toggler */}
          <ThemeToggler className="hidden md:inline-block" />
        </div>

        {/* show when screen is small */}
        <div className="flex items-center justify-end gap-3 md:hidden">
          <ThemeToggler className="inline-block" />

          <StyledButton
            aria-label="Navigation menu button"
            onClick={() => setNavIsOpened(true)}
            className="flex h-10 w-10 items-center justify-center rounded-md p-0.5 !text-xl hover:bg-zinc-500/10"
          >
            {/* icon for dark mode */}
            <BiMenu className="h-full w-full text-zinc-800 dark:text-zinc-200" />
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
