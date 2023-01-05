import { useEffect, useState, useContext, RefObject, Fragment } from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionBody,
} from "@material-tailwind/react";
import MENUS from "../../utils/misc/MenuDatas";
import Show from "../../utils/jsx/Show";
import NavbarSubMenu from "./NavbarSubMenu";
import Link from "next/link";
import NavIsOpenedContext, { INavIsOpened } from "../../context/NavIsOpenedCP";
import { IoClose, IoChevronDown } from "react-icons/io5";
import Line from "../Line/Line";

interface IProps {
  navListRef: RefObject<HTMLUListElement>;
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
      <ul
        ref={navListRef}
        className="flex flex-col gap-1 lg:flex-row lg:items-center fixed z-[70] top-0 left-0 w-72 lg:w-max lg:static bg-gray-900 lg:bg-transparent h-screen lg:h-max shadow-2xl lg:shadow-none"
      >
        {/* close button for small screen nav */}
        <li className="flex justify-between items-center p-3 relative lg:hidden">
          <Typography
            as="span"
            variant="paragraph"
            className="font-semibold text-lg text-gray-300"
          >
            Menu
          </Typography>
          <Button
            onClick={closeNav}
            color="red"
            variant="text"
            className="w-max p-2 flex items-center justify-center text-xl text-red-800 hover:text-white transition duration-200 rounded-full"
          >
            <IoClose />
          </Button>

          <Line className="animate-breathing bg-gradient bg-gradient-to-r from-indigo-300 to-pink-200 absolute bottom-0 inset-x-0 h-[1px] z-40 min-w-full" />
        </li>

        {MENUS.map(
          (menu): React.ReactNode => (
            <Fragment key={menu}>
              <Show when={menu !== "projects"}>
                <Typography as="li" variant="paragraph">
                  <Button
                    color="indigo"
                    variant="text"
                    fullWidth
                    className="p-0 text-base font-semibold text-gray-500 lg:text-white/70 hover:text-white transition duration-200 rounded-none lg:rounded-lg"
                  >
                    <a
                      href={`#${menu}`}
                      className="flex items-center capitalize py-2 px-3"
                    >
                      {menu}
                    </a>
                  </Button>
                </Typography>
              </Show>
              <Show when={menu === "projects"}>
                {/* project menu for large navbar */}
                <Show when={!accordionIsVisible}>
                  <NavbarSubMenu
                    offset={14}
                    Handler={
                      <a className="flex items-center capitalize py-2 px-3">
                        {menu}
                      </a>
                    }
                    menuItems={[
                      <a
                        href="#projects"
                        className="inline-block w-full h-full p-3"
                      >
                        Top Picks
                      </a>,
                      <Link
                        href={`/`}
                        className="inline-block w-full h-full p-3"
                      >
                        All Collection
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
                      className="flex justify-between items-center capitalize py-2 px-3 text-base font-semibold text-gray-500 lg:text-white/70 hover:text-white transition duration-200 rounded-none lg:rounded-lg"
                    >
                      {menu}
                      <IoChevronDown
                        className={`mr-2 w-5 h-5 transition duration-200 ${
                          openedAccordion === 1 ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </Button>
                    <AccordionBody className="py-1.5">
                      <Button
                        color="indigo"
                        variant="text"
                        fullWidth
                        className="p-0 text-base font-semibold text-gray-500 lg:text-white/70 hover:text-white transition duration-200 rounded-none"
                      >
                        <a
                          href="#projects"
                          className="flex items-center capitalize py-2 px-5"
                        >
                          Top Picks
                        </a>
                      </Button>
                      <Button
                        color="indigo"
                        variant="text"
                        fullWidth
                        className="p-0 text-base font-semibold text-gray-500 lg:text-white/70 hover:text-white transition duration-200 rounded-none"
                      >
                        <a
                          href="#projects"
                          className="flex items-center capitalize py-2 px-5"
                        >
                          All Collections
                        </a>
                      </Button>
                    </AccordionBody>
                  </Accordion>
                </Show>
              </Show>
            </Fragment>
          )
        )}

        <li className="self-center pb-6 lg:hidden mt-auto">
          <Typography
            as="span"
            variant="small"
            className="text-xs text-gray-600 font-semibold"
          >
            &copy; {new Date().getFullYear()} VallenDra | Front-End Developer
          </Typography>
        </li>
      </ul>
    </Show>
  );
}
