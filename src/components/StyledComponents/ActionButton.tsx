import { Button, ButtonProps } from "@material-tailwind/react";
import Link from "next/link";
import { forwardRef } from "react";
import Show from "../../utils/client/jsx/Show";

interface Props extends ButtonProps {
  href?: string;
  icon?: JSX.Element;
}

const ActionButton = forwardRef<HTMLButtonElement, Props>(
  (
    { ref, className = "", children, href, icon, variant, fullWidth, ...props },
    forwardedRef,
  ) => {
    const button = (
      <Button
        fullWidth={fullWidth || true}
        variant={variant || "outlined"}
        ref={forwardedRef}
        className={`flex items-center justify-center gap-1.5 rounded  shadow-sm hover:shadow ${className}`}
        {...props}
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
      <Link className="inline-block" target="_blank" href={href}>
        {button}
      </Link>
    ) : (
      button
    );
  },
);

export default ActionButton;
