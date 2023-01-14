import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface IProps extends LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export default function LinkWithUnderline({
  children,
  href,
  className,
}: IProps) {
  return (
    <Link
      href={href}
      className={`gradient-underline relative flex h-fit w-fit items-center gap-1 px-1 text-pink-200 before:from-gray-600 before:to-gray-600 before:transition before:duration-200 before:hover:-translate-y-1 before:hover:from-pink-200 before:hover:to-pink-200 ${className}`}
    >
      {children}
    </Link>
  );
}
