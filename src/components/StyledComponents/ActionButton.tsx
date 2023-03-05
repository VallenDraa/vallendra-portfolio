import { Button, ButtonProps } from "@material-tailwind/react";
import clsx from "clsx";
import Link from "next/link";
import { HTMLAttributeAnchorTarget, forwardRef } from "react";
import Show from "utils/client/jsx/Show";

type ActionButtonProps = {
  href?: string;
  icon?: JSX.Element;
  hrefTarget?: HTMLAttributeAnchorTarget;
  anchorClassName?: string;
} & ButtonProps;

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      ref,
      className = "",
      anchorClassName = "",
      children,
      href,
      hrefTarget = "_blank",
      icon,
      variant,
      fullWidth,
      ...props
    },
    forwardedRef,
  ) => {
    const button = (
      <Button
        {...props}
        tabIndex={!href ? 0 : -1}
        fullWidth={fullWidth || true}
        variant={variant || "outlined"}
        ref={forwardedRef}
        className={clsx(
          className,
          "flex items-center justify-center gap-1.5 rounded shadow-sm hover:shadow",
        )}
      >
        {/* when icon is visible */}
        <Show when={!!icon === true}>
          {icon}
          <span>{children}</span>
        </Show>

        {/* when icon is not visible */}
        <Show when={!!icon === false}>{children}</Show>
      </Button>
    );

    return href ? (
      <Link
        className={clsx("inline", anchorClassName)}
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

export default ActionButton;
