import { Button, ButtonProps } from "@material-tailwind/react";
import { forwardRef } from "react";
import Show from "utils/client/jsx/Show";

interface Props extends ButtonProps {
  icon?: JSX.Element;
  textClasses?: string;
  iconClasses?: string;
}

const StyledButton = forwardRef<HTMLButtonElement, Props>(
  (
    { ref, className = "", textClasses = "", iconClasses = "", icon, ...props },
    forwardedRef,
  ) => (
    <Button
      ref={forwardedRef}
      className={`group relative flex w-max items-center justify-center gap-2 rounded-full px-4 text-center duration-200 ${className}`}
      {...props}
    >
      {/* when icon is provided */}
      <Show when={!!icon === true}>
        <span
          className={`translate-x-3.5 transition-transform duration-200 group-hover:translate-x-0 ${textClasses}`}
        >
          {props.children}
        </span>

        <span
          className={`relative -translate-x-4 text-lg opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 ${iconClasses}`}
        >
          {icon}
        </span>
      </Show>

      {/* when icon is not provided */}
      <Show when={!!icon === false}>{props.children}</Show>
    </Button>
  ),
);

export default StyledButton;
