import { Button, ButtonProps } from "@material-tailwind/react";
import clsx from "clsx";
import Link from "next/link";
import { forwardRef, HTMLAttributeAnchorTarget } from "react";
import Show from "utils/client/jsx/Show";

type StyledButtonProps = {
  href?: string;
  hrefTarget?: HTMLAttributeAnchorTarget;
  icon?: JSX.Element;
  textClasses?: string;
  anchorClasses?: string;
  iconClasses?: string;
} & ButtonProps;

const StyledButton = forwardRef<HTMLButtonElement, StyledButtonProps>(
  (
    {
      ref,
      href,
      hrefTarget = "_blank",
      className = "",
      textClasses = "",
      iconClasses = "",
      anchorClasses,
      icon,
      ...props
    },
    forwardedRef,
  ) => {
    const button = (
      <Button
        ref={forwardedRef}
        tabIndex={!href ? 0 : -1}
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
    );

    return href ? (
      <Link
        className={clsx("inline", anchorClasses)}
        target={hrefTarget}
        href={href}
      >
        {button}
      </Link>
    ) : (
      button
    );
  },
);

export default StyledButton;
