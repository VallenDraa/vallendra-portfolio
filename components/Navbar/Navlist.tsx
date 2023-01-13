import { useEffect, useState, useContext, RefObject, Fragment } from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionBody,
} from "@material-tailwind/react";
import MENUS from "../../utils/datas/menus";
import Show from "../../utils/jsx/Show";
import NavbarSubMenu from "./NavbarSubMenu";
import Link from "next/link";
import NavIsOpenedContext, { INavIsOpened } from "../../context/NavIsOpenedCP";
import { IoClose, IoChevronDown } from "react-icons/io5";
import NavBtn from "./NavBtn";

interface IProps {
  navListRef: RefObject<HTMLDivElement>;
  overlayRef: RefObject<HTMLDivElement>;
}

export default function NavList({ navListRef, overlayRef }: IProps) {
  const [accordionIsVisible, setAccordionIsVisible] = useState(false);
  const [openedAccordion, setOpenedAccordion] = useState(0);
  const { navIsOpened, setNavIsOpened } = useContext(
    NavIsOpenedContext
  ) as INavIsOpened;

  function handleOpenAccordion(value: number) {
    setOpenedAccordion(openedAccordion === value ? 0 : value);
  }

  function closeNav() {
    navListRef.current?.classList.add("animate-close-nav");
    overlayRef.current?.classList.add("animate-close-overlay");

    setTimeout(() => setNavIsOpened(false), 340);
  }

  /* for handling accordion visibility
  ==================================== */
  useEffect(() => {
    setAccordionIsVisible(!(window.innerWidth > 960));

    function menuAccordionHandler() {
      window.innerWidth > 960
        ? setAccordionIsVisible(false)
        : setAccordionIsVisible(true);
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
        onClick={closeNav}
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-black/40 h-screen overlay lg:hidden"
      />

      {/* the nav list */}
      <nav
        ref={navListRef}
        className="flex flex-col gap-1 lg:flex-row lg:items-center fixed z-[70] top-0 left-0 w-72 lg:w-max lg:static dark:bg-gray-900 dark:lg:bg-transparent h-screen lg:h-max shadow-2xl lg:shadow-none lg:animate-fade-in navlist-underlay"
      >
        {/* close button for small screen nav */}
        <div className="flex justify-between items-center mb-3 pt-3 pb-0.5 px-5 lg:px-3 relative lg:hidden gradient-underline gradient-underline--indigo-to-pink">
          <Typography
            as="span"
            variant="paragraph"
            className="font-semibold text-lg dark:text-gray-300"
          >
            Menu
          </Typography>
          <Button
            onClick={closeNav}
            color="red"
            variant="text"
            className="w-max p-2 flex items-center justify-center text-xl text-red-800 dark:hover:text-white transition duration-200 rounded-full"
          >
            <IoClose />
          </Button>
        </div>

        {MENUS.map(
          (menu): React.ReactNode => (
            <Fragment key={menu}>
              {/* menu for other than projects and certicates */}
              <Show when={menu !== "projects" && menu !== "certificates"}>
                <NavBtn menu={menu} href={`/#${menu}`} />
              </Show>

              {/* for certticates page menu */}
              <Show when={menu === "certificates"}>
                <NavBtn menu={menu} href={`/${menu}`} />
              </Show>

              {/* for project menu link */}
              <Show when={menu === "projects"}>
                {/* project menu for large navbar */}
                <Show when={!accordionIsVisible}>
                  <NavbarSubMenu
                    offset={14}
                    Handler={
                      <div className="flex items-center capitalize py-2 px-5 lg:px-3">
                        {menu}
                      </div>
                    }
                    menuItems={[
                      <Link
                        href="/#top-picks"
                        className="inline-block w-full h-full p-3"
                      >
                        Top Picks
                      </Link>,
                      <Link
                        href="/projects"
                        className="inline-block w-full h-full p-3"
                      >
                        All Projects
                      </Link>,
                    ]}
                  />
                </Show>

                {/* project menu for small navbar */}
                <Show when={accordionIsVisible}>
                  <Accordion open={openedAccordion === 1}>
                    <Button
                      color="indigo"
                      variant="text"
                      fullWidth
                      onClick={() => handleOpenAccordion(1)}
                      className="flex justify-between items-center capitalize py-2 px-5 lg:px-3 text-base font-semibold dark:text-gray-500 dark:lg:text-white/70 dark:hover:text-white transition duration-200 rounded-none lg:rounded-lg"
                    >
                      {menu}
                      <IoChevronDown
                        className={`mr-2 w-5 h-5 transition duration-200 ${
                          openedAccordion === 1 ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </Button>
                    <AccordionBody className="py-1.5">
                      <Link href="/#top-picks">
                        <Button
                          color="indigo"
                          variant="text"
                          fullWidth
                          className="capitalize py-2 px-7 text-start text-base font-semibold dark:text-gray-500 dark:lg:text-white/70 dark:hover:text-white transition duration-200 rounded-none"
                        >
                          Top Picks
                        </Button>
                      </Link>
                      <Link href="/projects">
                        <Button
                          color="indigo"
                          variant="text"
                          fullWidth
                          className="capitalize py-2 px-7 text-start text-base font-semibold dark:text-gray-500 dark:lg:text-white/70 dark:hover:text-white transition duration-200 rounded-none"
                        >
                          All Collections
                        </Button>
                      </Link>
                    </AccordionBody>
                  </Accordion>
                </Show>
              </Show>
            </Fragment>
          )
        )}

        <div className="self-center pb-6 lg:hidden mt-auto">
          <Typography
            as="span"
            variant="small"
            className="text-xs dark:text-gray-600 font-semibold"
          >
            &copy; {new Date().getFullYear()} VallenDra | Front-End Developer
          </Typography>
        </div>
      </nav>
    </Show>
  );
}
