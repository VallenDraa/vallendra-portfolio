import { useEffect, useState, useContext, RefObject, Fragment } from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionBody,
} from "@material-tailwind/react";
import MENUS from "../../utils/datas/menus";
import Show from "../../utils/client/jsx/Show";
import NavbarSubMenu from "./NavbarSubMenu";
import Link from "next/link";
import NavIsOpenedContext from "../../context/NavIsOpenedCP";
import { IoClose, IoChevronDown, IoCall } from "react-icons/io5";
import NavBtn from "./NavBtn";
import StyledButton from "../StyledComponents/StyledButton";

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
      window.innerWidth >= 960
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
            className="text-lg font-semibold text-indigo-500 dark:text-gray-300"
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
                        href="/#top-picks"
                        className="inline-block h-full w-full p-3"
                      >
                        Top Picks
                      </Link>,
                      <Link
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
                  <Accordion open={openedAccordion === 1}>
                    <Button
                      color="indigo"
                      variant="text"
                      fullWidth
                      onClick={() => handleOpenAccordion(1)}
                      className="flex items-center justify-between rounded-none py-2 px-5 text-base font-semibold capitalize text-indigo-400  duration-200 hover:text-indigo-500 dark:text-gray-500 dark:hover:text-white lg:rounded-lg lg:px-3 dark:lg:text-white/70"
                    >
                      {menu}
                      <IoChevronDown
                        className={`mr-2 h-5 w-5 transition duration-200 ${
                          openedAccordion === 1 ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </Button>

                    <AccordionBody className="py-1.5">
                      <Link href="/#top-picks">
                        <Button
                          onClick={closeNav}
                          color="indigo"
                          variant="text"
                          fullWidth
                          className="rounded-none py-2 px-7 text-start text-base font-semibold capitalize text-indigo-400 duration-200 hover:text-indigo-500 dark:text-gray-500 dark:hover:text-white dark:lg:text-white/70"
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
                          className="rounded-none py-2 px-7 text-start text-base font-semibold capitalize text-indigo-400 duration-200 hover:text-indigo-500 dark:text-gray-500 dark:hover:text-white dark:lg:text-white/70"
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

        <Link
          onClick={closeNav}
          href={"/contacts"}
          className="mx-auto mt-2 block w-11/12 lg:hidden"
        >
          <StyledButton
            icon={<IoCall />}
            variant="filled"
            color="deep-purple"
            size="md"
            fullWidth
            className="w-full"
          >
            Contact Me
          </StyledButton>
        </Link>

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
