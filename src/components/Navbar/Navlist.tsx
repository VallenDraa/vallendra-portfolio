/* eslint-disable react/jsx-no-useless-fragment */
import StyledButton from "components/StyledComponents/StyledButton";
import { useEffect, useState, useContext, RefObject, Fragment } from "react";
import { Popover } from "@headlessui/react";
import { IoClose, IoChevronDown } from "react-icons/io5";
import menuData from "utils/data/menus";
import Show from "utils/client/jsx/Show";
import NavIsOpenedContext from "context/NavIsOpenedCP";
import clsx from "clsx";
import NavbarSubMenu from "./NavbarSubMenu";
import NavBtn from "./NavBtn";

type NavListProps = {
  navListRef: RefObject<HTMLDivElement>;
  overlayRef: RefObject<HTMLDivElement>;
};

export default function NavList({ navListRef, overlayRef }: NavListProps) {
  const [accordionIsVisible, setAccordionIsVisible] = useState(false);
  const { navIsOpened, setNavIsOpened } = useContext(NavIsOpenedContext);

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

  return (
    <Show when={navIsOpened}>
      {/* translucent overlay that is showed when navbar is opened */}
      <div
        role="none"
        onClick={closeNav}
        ref={overlayRef}
        className="fixed inset-0 z-[60] h-screen bg-zinc-800/50 opacity-0 transition-opacity duration-300 dark:bg-black/50 lg:hidden"
      />

      {/* the nav list */}
      <nav
        ref={navListRef}
        className="fixed top-0 left-0 z-[70] flex h-screen w-72 -translate-x-full flex-col gap-1 bg-indigo-50 transition-transform duration-300 dark:bg-zinc-900 lg:static lg:h-max lg:w-max lg:translate-x-0 lg:animate-fade-in lg:flex-row lg:items-center lg:bg-transparent dark:lg:bg-transparent"
      >
        {/* close button for small screen nav */}
        <div className="gradient-underline gradient-underline--primary relative mb-3 flex items-center justify-between pl-5 pr-3 pt-3 pb-0.5 lg:hidden lg:px-3">
          <span className="font-medium text-indigo-600 dark:text-zinc-300">
            Menu
          </span>

          <StyledButton
            aria-label="Close menu button"
            onClick={closeNav}
            className="flex w-max items-center justify-center rounded-full p-1.5 !text-xl text-red-600 transition duration-200 hover:bg-red-500/30"
          >
            <IoClose />
          </StyledButton>
        </div>

        {/* menu lists */}
        {menuData.map(menu => (
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
                    Handler={<>{menu.name}</>}
                    menuItems={menu.subMenus.map(subMenu => (
                      <StyledButton
                        key={subMenu.url}
                        hrefTarget="_self"
                        href={subMenu.url}
                        className={clsx(
                          "p-3",
                          "!text-left !text-sm !font-medium !capitalize text-zinc-700 hover:text-indigo-600 dark:text-zinc-300 hover:dark:text-white",
                          "hover:bg-indigo-500/10 hover:dark:bg-zinc-50/10",
                        )}
                      >
                        {subMenu.name}
                      </StyledButton>
                    ))}
                  />
                </Show>

                {/* project menu for small navbar */}
                <Show when={accordionIsVisible}>
                  <Popover>
                    {({ open }) => (
                      <>
                        <Popover.Button className="flex w-full items-center justify-between rounded-none py-2 px-5 text-start !text-base font-semibold capitalize text-zinc-700 duration-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-white">
                          {menu.name}
                          <IoChevronDown
                            className={clsx(
                              open && "rotate-180",
                              "h-5 w-5 transition duration-200",
                            )}
                          />
                        </Popover.Button>

                        <Popover.Panel className="py-1.5">
                          {menu.subMenus.map(subMenu => (
                            <StyledButton
                              key={subMenu.url}
                              hrefTarget="_self"
                              href={subMenu.url}
                              onClick={closeNav}
                              className="w-full rounded-none py-2 px-7 text-start !text-base font-semibold capitalize text-zinc-700 duration-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-white dark:lg:text-zinc-200"
                            >
                              {subMenu.name}
                            </StyledButton>
                          ))}
                        </Popover.Panel>
                      </>
                    )}
                  </Popover>
                </Show>
              </>
            )}
          </Fragment>
        ))}

        <div className="mt-auto self-center pb-6 lg:hidden">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} VallenDra | Front-End Developer
          </span>
        </div>
      </nav>
    </Show>
  );
}
