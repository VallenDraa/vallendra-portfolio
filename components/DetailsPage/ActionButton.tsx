import { Button, ButtonProps } from "@material-tailwind/react";
import Link from "next/link";

interface IProps extends ButtonProps {
  href?: string;
}

export default function ActionButton({
  className,
  children,
  href,
  color,
  variant,
  onClick,
}: IProps) {
  return href ? (
    <Link className="inline-block" target="_blank" href={href}>
      <Button
        onClick={onClick}
        variant={variant}
        color={color}
        className={`flex items-center gap-1.5 shadow-sm hover:shadow py-2 px-4 rounded ${className}`}
      >
        {children}
      </Button>
    </Link>
  ) : (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      className={`flex items-center gap-1.5 shadow-sm hover:shadow py-2 px-4 rounded ${className}`}
    >
      {children}
    </Button>
  );
}
