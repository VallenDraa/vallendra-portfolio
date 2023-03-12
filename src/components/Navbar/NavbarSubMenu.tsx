import { Popover, Transition } from "@headlessui/react";
import { useTheme } from "next-themes";
import useRipple from "use-ripple-hook";
import R from "react";

type NavbarSubMenuProps = {
  Handler: JSX.Element;
  menuItems: JSX.Element[];
};

export default function NavbarSubMenu({
  Handler,
  menuItems,
}: NavbarSubMenuProps) {
  const { theme } = useTheme();
  const [ripple, event] = useRipple({
    duration: 500,
    color: theme === "dark" ? "rgba(255, 255, 255, .2)" : "rgba(0, 0, 0, .2)",
    cancelAutomatically: true,
  });

  return (
    <Popover className="relative">
      <Popover.Button
        ref={ripple}
        onMouseDown={event}
        className="flex items-center rounded-none py-2 px-5 text-start !text-base font-semibold capitalize text-zinc-700 duration-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-white lg:justify-center lg:!rounded-md lg:px-3 dark:lg:text-zinc-200"
      >
        {Handler}
      </Popover.Button>

      <Transition
        as={R.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform translate-y-3 opacity-0"
        enterTo="transform opacity-100 translate-y-0"
        leave="transition ease-out duration-100"
        leaveFrom="transform opacity-100 translate-y-0"
        leaveTo="transform opacity-0 translate-y-3"
      >
        <Popover.Panel className="absolute left-1/2 mt-4 flex w-44 -translate-x-1/2 flex-col rounded-md bg-zinc-100/90 p-3 shadow supports-[backdrop-filter]:bg-zinc-100/30 supports-[backdrop-filter]:backdrop-blur-md dark:bg-zinc-800/90 dark:supports-[backdrop-filter]:bg-zinc-800/30">
          {menuItems.map((menuItem: JSX.Element) => menuItem)}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
