import { Button } from "@material-tailwind/react";
import Link from "next/link";

export default function NavBtn({
  menu,
  href,
  onClick,
}: {
  menu: string;
  href?: string;
  onClick?: () => void;
}) {
  const ButtonElement = (
    <Button
      tabIndex={!href ? 0 : -1}
      onClick={() => onClick && onClick()}
      color="indigo"
      variant="text"
      fullWidth
      className="flex items-center rounded-none py-2 px-5 text-start text-base font-semibold capitalize text-zinc-700 duration-200 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-white lg:rounded-md lg:px-3 dark:lg:text-zinc-200"
    >
      {menu}
    </Button>
  );

  return href ? (
    <Link href={href} className="lg:rounded-md">
      {ButtonElement}
    </Link>
  ) : (
    ButtonElement
  );
}
