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
      onClick={() => onClick && onClick()}
      color="indigo"
      variant="text"
      fullWidth
      className="flex items-center rounded-none py-2 px-5 text-start text-base font-semibold capitalize text-indigo-400 duration-200 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-white lg:rounded-md lg:px-3 dark:lg:text-gray-200"
    >
      {menu}
    </Button>
  );

  return href ? <Link href={href}>{ButtonElement}</Link> : ButtonElement;
}
