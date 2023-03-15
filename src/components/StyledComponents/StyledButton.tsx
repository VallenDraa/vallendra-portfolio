/* eslint-disable react/button-has-type */
import clsx from "clsx";
import Link from "next/link";
import R from "react";
import Show from "utils/client/jsx/Show";
import useStyledRipple from "utils/client/hooks/useStyledRipple";

type StyledButtonProps = {
  href?: string;
  hrefTarget?: R.HTMLAttributeAnchorTarget;
  icon?: JSX.Element;
  textClasses?: string;
  iconClasses?: string;
  alwaysShowIcon?: boolean;
} & R.ComponentPropsWithoutRef<"button"> &
  R.ComponentPropsWithoutRef<"a">;

export default function StyledButton({
  href,
  alwaysShowIcon = false,
  hrefTarget = "_blank",
  className = "",
  textClasses = "",
  iconClasses = "",
  icon,
  type,
  children,
  ...props
}: StyledButtonProps) {
  const [ripple, event] = useStyledRipple();

  const pickedClassNames = R.useMemo(() => {
    if (alwaysShowIcon === false) {
      return clsx(
        "uppercase text-xs font-bold group rounded text-center transition",
        icon && "flex items-center justify-center gap-2",
        className,
      );
    }

    return clsx(
      "uppercase text-xs font-bold rounded shadow-sm hover:shadow transition",
      icon && "flex items-center justify-center gap-1.5",
      className,
    );
  }, [className, alwaysShowIcon]);

  const buttonLayout = alwaysShowIcon ? (
    <>
      {/* when icon is visible */}
      <Show when={!!icon === true}>
        <span className={clsx(iconClasses, "text-sm")}>{icon}</span>
        <span className={textClasses}>{children}</span>
      </Show>

      {/* when icon is not visible */}
      <Show when={!!icon === false}>
        <span className={textClasses}>{children}</span>
      </Show>
    </>
  ) : (
    <>
      <Show when={!!icon === true}>
        <span
          className={clsx(
            `translate-x-3.5 transition-transform duration-200 group-hover:translate-x-0`,
            textClasses,
          )}
        >
          {children}
        </span>

        <span
          className={clsx(
            `relative -translate-x-4 text-lg opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100`,
            iconClasses,
          )}
        >
          {icon}
        </span>
      </Show>

      {/* when icon is not provided */}
      <Show when={!!icon === false}>{children}</Show>
    </>
  );

  return href ? (
    <Link
      {...props}
      ref={ripple}
      onMouseDown={event}
      className={clsx("inline-block", pickedClassNames)}
      target={hrefTarget}
      href={href}
    >
      {buttonLayout}
    </Link>
  ) : (
    <button
      {...props}
      ref={ripple}
      onMouseDown={event}
      type={type || "button"}
      className={pickedClassNames}
    >
      {buttonLayout}
    </button>
  );
}
