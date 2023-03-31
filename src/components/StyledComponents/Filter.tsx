import { Popover, Transition } from "@headlessui/react";
import { AiFillFunnelPlot } from "react-icons/ai";
import useStyledRipple from "utils/client/hooks/useStyledRipple";
import { Fragment, ReactElement } from "react";
import clsx from "clsx";

type FilterProps = {
  children?: ReactElement[] | ReactElement;
  dropdownRelativeToToggleBtn?: boolean;
};

/**
 *
 * @param param0 dropdownRelativeToToggleBtn makes sure that the dropdown menu is positioned absolutely, relative to the toggle button
 * @returns
 */
export default function Filter({
  children,
  dropdownRelativeToToggleBtn = true,
}: FilterProps) {
  const [ripple, event] = useStyledRipple();

  return (
    <Popover
      as="div"
      className={clsx(dropdownRelativeToToggleBtn && "relative")}
    >
      {({ open }) => (
        <>
          <Popover.Button
            ref={ripple}
            onMouseDown={event}
            className={clsx(
              "h-full rounded border p-3 transition-colors duration-200",
              open
                ? "border-indigo-400 hover:bg-indigo-500/10"
                : "border-zinc-600 hover:bg-zinc-500/10",
            )}
          >
            <AiFillFunnelPlot
              className={clsx(
                "text-xl",
                open ? "text-indigo-400" : "text-zinc-500 dark:text-zinc-400",
              )}
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute right-0 z-20 mt-4 w-full origin-top space-y-4 rounded-md bg-indigo-50 p-5 shadow-md shadow-indigo-300 focus-visible:outline-none dark:bg-zinc-800 dark:shadow-zinc-800 md:w-[500px] md:origin-top-right">
              <h4 className="text-zinc-800 dark:text-zinc-100">
                Filter Options
              </h4>
              {children}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
