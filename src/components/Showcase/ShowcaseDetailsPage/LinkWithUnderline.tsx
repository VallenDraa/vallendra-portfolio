import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface Props extends LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export default function LinkWithUnderline({
  children,
  href,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={`normal-underline relative flex h-fit w-fit items-center gap-1 px-1 text-pink-300 before:bg-indigo-200 before:transition before:duration-200 before:hover:-translate-y-1 before:hover:bg-pink-300 dark:text-pink-200 dark:before:bg-gray-600 dark:before:hover:bg-pink-200 ${className}`}
    >
      {children}
    </Link>
  );
}
