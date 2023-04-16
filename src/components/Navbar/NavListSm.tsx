/* eslint-disable react/jsx-no-useless-fragment */
import StyledButton from "components/StyledComponents/StyledButton";
import { useEffect, useContext, Fragment } from "react";
import { Popover, Transition, Dialog } from "@headlessui/react";
import { IoClose, IoChevronDown } from "react-icons/io5";
import menuData from "utils/data/menus";
import NavIsOpenedContext from "context/NavIsOpenedCP";
import clsx from "clsx";
import useStyledRipple from "utils/client/hooks/useStyledRipple";
import LightboxIsActiveContext from "context/LightboxStatusCP";
import NavBtn from "./NavBtn";

export default function NavListSm() {
  const [ripple, event] = useStyledRipple();

  const { navIsOpened, setNavIsOpened } = useContext(NavIsOpenedContext);
  const { lightboxIsActive } = useContext(LightboxIsActiveContext);

  /* open navigation according to screen size
  =============================================== */
  useEffect(() => {
    const navHandler = () => setNavIsOpened(false);

    window.addEventListener("resize", navHandler);

    return () => window.removeEventListener("resize", navHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* For disabling scroll when navbar is opened */
  useEffect(() => {
    if (lightboxIsActive) {
      document.body.style.overflowY = "hidden";
      return;
    }

    document.body.style.overflowY =
      window.innerWidth < 768 && navIsOpened ? "hidden" : "auto";
  }, [navIsOpened, lightboxIsActive]);

  return (
    <Transition show={navIsOpened} as={Fragment}>
      <Dialog as="div" onClose={() => setNavIsOpened(false)}>
        {/* translucent overlay that is showed when navbar is opened */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-[70] bg-zinc-900/50" />
        </Transition.Child>

        {/* the nav list */}
        <Transition.Child
          as={Fragment}
          enter="ease-out transition duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="ease-out transition duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Dialog.Panel
            as="nav"
            className={clsx(
              "fixed left-0 top-0 z-[70]",
              "bg-indigo-50 dark:bg-zinc-900",
              "flex h-screen w-72 flex-col gap-1",
            )}
          >
            {/* close button for small screen nav */}
            <div className="gradient-underline relative mb-3 flex items-center justify-between pb-0.5 pl-5 pr-3 pt-3 lg:hidden lg:px-3">
              <span className="font-medium text-indigo-600 dark:text-zinc-400">
                Menu
              </span>

              <StyledButton
                aria-label="Close menu button"
                onClick={() => setNavIsOpened(false)}
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
                    onClick={() => setNavIsOpened(false)}
                    menu={menu.name}
                    href={menu.url}
                  />
                ) : (
                  <Popover>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          ref={ripple}
                          onMouseDown={event}
                          className="flex w-full items-center justify-between rounded-none px-5 py-2 text-start !text-base font-semibold capitalize text-zinc-800 duration-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-white"
                        >
                          {menu.name}
                          <IoChevronDown
                            className={clsx(
                              open && "rotate-180",
                              "h-5 w-5 transition duration-300",
                            )}
                          />
                        </Popover.Button>

                        <Transition
                          enter="transition duration-200 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-200 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Popover.Panel className="py-1.5">
                            {menu.subMenus.map(subMenu => (
                              <StyledButton
                                key={subMenu.url}
                                hrefTarget="_self"
                                href={subMenu.url}
                                onClick={() => setNavIsOpened(false)}
                                useNormalAnchorTag={subMenu.url.includes("#")}
                                className="w-full rounded-none px-7 py-2 text-start !text-base font-semibold capitalize text-zinc-800 duration-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-white dark:lg:text-zinc-200"
                              >
                                {subMenu.name}
                              </StyledButton>
                            ))}
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                )}
              </Fragment>
            ))}

            <div className="mt-auto self-center pb-6 lg:hidden">
              <span className="text-xs font-semibold text-zinc-500">
                &copy; {new Date().getFullYear()} VallenDra | Front-End
                Developer
              </span>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
