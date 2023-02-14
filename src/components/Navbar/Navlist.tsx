import { useEffect, useState, useContext, RefObject, Fragment } from "react";
import { Typography, Button } from "@material-tailwind/react";
import Link from "next/link";
import { IoClose, IoChevronDown } from "react-icons/io5";
import MENUS from "../../utils/data/menus";
import Show from "../../utils/client/jsx/Show";
import NavbarSubMenu from "./NavbarSubMenu";
import NavIsOpenedContext from "../../context/NavIsOpenedCP";
import NavBtn from "./NavBtn";

interface Props {
  navListRef: RefObject<HTMLDivElement>;
  overlayRef: RefObject<HTMLDivElement>;
}

export default function NavList({ navListRef, overlayRef }: Props) {
  const [accordionIsVisible, setAccordionIsVisible] = useState(false);
  const [openedAccordion, setOpenedAccordion] = useState(0);
  const { navIsOpened, setNavIsOpened } = useContext(NavIsOpenedContext);

  function handleOpenAccordion(value: number) {
    setOpenedAccordion(openedAccordion === value ? 0 : value);
  }

  function closeNav() {
    navListRef.current?.classList.add("animate-close-nav");
    overlayRef.current?.classList.add("animate-close-overlay");

    setTimeout(() => {
      navListRef.current?.classList.add("opacity-0");
      overlayRef.current?.classList.add("opacity-0");
    }, 340);

    setTimeout(() => {
      setNavIsOpened(false);
    }, 345);
  }

  /* for handling accordion visibility
  ==================================== */
  useEffect(() => {
    setAccordionIsVisible(!(window.innerWidth >= 960));

    function menuAccordionHandler() {
      setAccordionIsVisible(!(window.innerWidth >= 960));
    }

    window.addEventListener("resize", menuAccordionHandler);

    return () => window.removeEventListener("resize", menuAccordionHandler);
  }, []);

  /* for closing accordion when screen size is large
  ================================================== */
  useEffect(() => {
    if (!navIsOpened) setOpenedAccordion(0);
  }, [navIsOpened]);

  return (
    <Show when={navIsOpened}>
      {/* translucent overlay that is showed when navbar is opened */}
      <div
        role="none"
        onClick={closeNav}
        ref={overlayRef}
        className="fixed inset-0 z-[60] h-screen bg-indigo-800/30 dark:bg-black/40 lg:hidden"
      />

      {/* the nav list */}
      <nav
        ref={navListRef}
        className="navlist-underlay fixed top-0 left-0 z-[70] flex h-screen w-72 flex-col gap-1 bg-indigo-50 shadow-none dark:bg-gray-900 dark:shadow-2xl dark:shadow-gray-900 lg:static lg:h-max lg:w-max lg:animate-fade-in lg:flex-row lg:items-center lg:bg-transparent dark:lg:bg-transparent dark:lg:shadow-none"
      >
        {/* close button for small screen nav */}
        <div className="gradient-underline gradient-underline--primary relative mb-3 flex items-center justify-between px-5 pt-3 pb-0.5 lg:hidden lg:px-3">
          <Typography
            as="span"
            variant="paragraph"
            className="font-medium text-indigo-500 dark:text-gray-400"
          >
            Menu
          </Typography>

          <Button
            aria-label="Close menu button"
            onClick={closeNav}
            color="red"
            variant="text"
            className="flex w-max items-center justify-center rounded-full p-2 text-xl text-red-800 transition duration-200 dark:hover:text-white"
          >
            <IoClose />
          </Button>
        </div>

        {/* menu lists */}
        {MENUS.map(
          (menu): React.ReactNode => (
            <Fragment key={menu}>
              {/* menu for other than projects and certicates */}
              <Show when={menu !== "projects" && menu !== "certificates"}>
                <NavBtn
                  onClick={() => window.innerWidth < 960 && closeNav()}
                  menu={menu}
                  href={`/#${menu}`}
                />
              </Show>

              {/* for certticates page menu */}
              <Show when={menu === "certificates"}>
                <NavBtn
                  onClick={() => window.innerWidth < 960 && closeNav()}
                  menu={menu}
                  href={`/${menu}`}
                />
              </Show>

              {/* for project menu link */}
              <Show when={menu === "projects"}>
                {/* project menu for large navbar */}
                <Show when={!accordionIsVisible}>
                  <NavbarSubMenu
                    offset={14}
                    Handler={
                      <div className="flex items-center py-2 px-5 capitalize lg:px-3">
                        {menu}
                      </div>
                    }
                    menuItems={[
                      <Link
                        key="/#top-picks"
                        href="/#top-picks"
                        className="inline-block h-full w-full p-3"
                      >
                        Top Picks
                      </Link>,
                      <Link
                        key="/projects"
                        href="/projects"
                        className="inline-block h-full w-full p-3"
                      >
                        All Projects
                      </Link>,
                    ]}
                  />
                </Show>

                {/* project menu for small navbar */}
                <Show when={accordionIsVisible}>
                  <details>
                    <summary
                      onClick={() => handleOpenAccordion(1)}
                      className="flex cursor-pointer items-center justify-between rounded-none py-2 px-5 text-base font-semibold capitalize text-indigo-400  transition-colors duration-200 hover:bg-indigo-500/10 hover:text-indigo-500 active:bg-indigo-500/20 dark:text-gray-400 dark:hover:text-white lg:rounded-lg lg:px-3 dark:lg:text-gray-200"
                    >
                      Projects
                      <IoChevronDown
                        className={`mr-2 h-5 w-5 transition duration-200 ${
                          openedAccordion === 1 ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </summary>
                    <div className="py-1.5">
                      <Link href="/#top-picks">
                        <Button
                          onClick={closeNav}
                          color="indigo"
                          variant="text"
                          fullWidth
                          className="rounded-none py-2 px-7 text-start text-base font-semibold capitalize text-indigo-400 duration-200 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-white dark:lg:text-gray-300"
                        >
                          Top Picks
                        </Button>
                      </Link>
                      <Link href="/projects">
                        <Button
                          onClick={closeNav}
                          color="indigo"
                          variant="text"
                          fullWidth
                          className="rounded-none py-2 px-7 text-start text-base font-semibold capitalize text-indigo-400 duration-200 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-white dark:lg:text-gray-300"
                        >
                          All Collections
                        </Button>
                      </Link>
                    </div>
                  </details>
                </Show>
              </Show>
            </Fragment>
          ),
        )}

        <div className="mt-auto self-center pb-6 lg:hidden">
          <Typography
            as="span"
            variant="small"
            className="text-xs font-semibold text-indigo-300 dark:text-gray-600"
          >
            &copy; {new Date().getFullYear()} VallenDra | Front-End Developer
          </Typography>
        </div>
      </nav>
    </Show>
  );
}
