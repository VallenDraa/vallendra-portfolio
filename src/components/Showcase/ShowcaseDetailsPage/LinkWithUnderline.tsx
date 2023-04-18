import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type LinkWithUnderlineProps = {
  children: ReactNode;
  href: string;
  className?: string;
  title?: string;
} & LinkProps;

export default function LinkWithUnderline({
  children,
  href,
  className,
  ...props
}: LinkWithUnderlineProps) {
  return (
    <Link
      {...props}
      href={href}
      className={`normal-underline relative flex h-fit w-fit items-center gap-1 px-1 text-base text-pink-400 before:bg-transparent before:transition before:duration-200 before:hover:-translate-y-1 before:hover:bg-pink-400 dark:text-pink-300 dark:before:hover:bg-pink-300 ${className}`}
    >
      {children}
    </Link>
  );
}
