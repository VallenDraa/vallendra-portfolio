import type { ReactElement, ComponentPropsWithoutRef } from "react";

import { Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import clsx from "clsx";
import StyledButton from "./StyledButton";

type StyledAlertProps = {
  color: "green" | "red" | "indigo";
  show: boolean;
  icon: ReactElement;
  onClose: () => void;
} & ComponentPropsWithoutRef<"div">;

export default function StyledAlert({
  show,
  className,
  icon,
  color,
  children,
  onClose,
  ...props
}: StyledAlertProps) {
  const [isShowing, setIsShowing] = useState(show);

  /* To hide the alert automatically after 2000ms
  =============================================== */
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!show) {
      setIsShowing(false);
    } else {
      timer = setTimeout(() => setIsShowing(false), 2000);
    }

    return () => clearTimeout(timer);
  }, [show]);

  return (
    <Transition
      as={Fragment}
      show={isShowing}
      enter="transition ease-out duration-100"
      enterFrom="transform translate-y-full"
      enterTo="transform translate-y-0"
      leave="transition ease-out duration-100"
      leaveFrom="transform translate-y-0"
      leaveTo="transform translate-y-full"
    >
      <div
        {...props}
        className={clsx(
          color === "green" && "bg-green-500",
          color === "indigo" && "bg-indigo-500",
          color === "red" && "bg-red-500",
          "fixed bottom-0 z-[55] flex w-full items-center justify-between rounded-none p-3 font-medium text-zinc-100",
          className,
        )}
        color={color}
      >
        <div className="flex items-center gap-2">
          {icon}
          {children}
        </div>

        <StyledButton
          onClick={onClose}
          className={clsx(
            "!flex h-10 w-10 items-center justify-center rounded-md p-2 text-center !text-xl",
            "hover:bg-white/10",
          )}
        >
          <HiXMark />
        </StyledButton>
      </div>
    </Transition>
  );
}
