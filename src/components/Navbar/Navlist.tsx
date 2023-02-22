import { useEffect, useState, useContext, RefObject, Fragment } from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionBody,
} from "@material-tailwind/react";
import Link from "next/link";
import { IoClose, IoChevronDown } from "react-icons/io5";
import menuData from "utils/data/menus";
import Show from "utils/client/jsx/Show";
import NavIsOpenedContext from "context/NavIsOpenedCP";
import NavbarSubMenu from "./NavbarSubMenu";
import NavBtn from "./NavBtn";

type NavListProps = {
  navListRef: RefObject<HTMLDivElement>;
  overlayRef: RefObject<HTMLDivElement>;
};

export default function NavList({ navListRef, overlayRef }: NavListProps) {
  const [accordionIsVisible, setAccordionIsVisible] = useState(false);
  const [openedAccordion, setOpenedAccordion] = useState<number | null>(0);
  const { navIsOpened, setNavIsOpened } = useContext(NavIsOpenedContext);

  function handleOpenAccordion(value: number) {
    setOpenedAccordion(prev => (prev === value ? null : value));
  }

  /* letting the close animation play and then destroying the navlist itself
  ========================================================================== */
  function closeNav() {
    navListRef.current?.classList.add("-translate-x-full");
    overlayRef.current?.classList.add("opacity-0");

    setTimeout(() => setNavIsOpened(false), 310);
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
        className="fixed inset-0 z-[60] h-screen bg-indigo-800/50 opacity-0 transition-opacity duration-300 dark:bg-black/50 lg:hidden"
      />

      {/* the nav list */}
      <nav
        ref={navListRef}
        className="fixed top-0 left-0 z-[70] flex h-screen w-72 -translate-x-full flex-col gap-1 bg-indigo-50 transition-transform duration-300 dark:bg-gray-900 lg:static lg:h-max lg:w-max lg:translate-x-0 lg:animate-fade-in lg:flex-row lg:items-center lg:bg-transparent dark:lg:bg-transparent"
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
        {menuData.map((menu, i) => (
          <Fragment key={menu.name}>
            {menu.subMenus === undefined ? (
              <NavBtn
                onClick={() => window.innerWidth < 960 && closeNav()}
                menu={menu.name}
                href={menu.url}
              />
            ) : (
              <>
                <Show when={!accordionIsVisible}>
                  <NavbarSubMenu
                    offset={14}
                    Handler={
                      <div className="flex items-center py-2 px-5 capitalize lg:px-3">
                        {menu.name}
                      </div>
                    }
                    menuItems={menu.subMenus.map(subMenu => (
                      <Link
                        key={subMenu.url}
                        href={subMenu.url}
                        className="inline-block h-full w-full p-3 capitalize"
                      >
                        {subMenu.name}
                      </Link>
                    ))}
                  />
                </Show>

                {/* project menu for small navbar */}
                <Show when={accordionIsVisible}>
                  <Accordion open={openedAccordion === i}>
                    <Button
                      color="indigo"
                      variant="text"
                      fullWidth
                      onClick={() => handleOpenAccordion(i)}
                      className="flex items-center justify-between rounded-none py-2 px-5 text-base font-semibold capitalize text-indigo-400  duration-200 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-white lg:rounded-lg lg:px-3 dark:lg:text-gray-200"
                    >
                      {menu.name}
                      <IoChevronDown
                        className={`mr-2 h-5 w-5 transition duration-200 ${
                          openedAccordion === i ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </Button>

                    <AccordionBody className="py-1.5">
                      {menu.subMenus.map(subMenu => (
                        <Link key={subMenu.url} href={subMenu.url}>
                          <Button
                            onClick={closeNav}
                            color="indigo"
                            variant="text"
                            fullWidth
                            className="rounded-none py-2 px-7 text-start text-base font-semibold capitalize text-indigo-400 duration-200 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-white dark:lg:text-gray-200"
                          >
                            {subMenu.name}
                          </Button>
                        </Link>
                      ))}
                    </AccordionBody>
                  </Accordion>
                </Show>
              </>
            )}
          </Fragment>
        ))}

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
