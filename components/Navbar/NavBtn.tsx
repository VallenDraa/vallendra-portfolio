import { Button } from "@material-tailwind/react";
import Link from "next/link";

export default function NavBtn({
  menu,
  href,
}: {
  menu: string;
  href?: string;
}) {
  return (
    <Button
      color="indigo"
      variant="text"
      fullWidth
      className={`${
        href ? "p-0" : "flex items-center capitalize py-2 px-5 lg:px-3"
      } text-base font-semibold dark:text-gray-500 dark:lg:text-white/70 dark:hover:text-white transition duration-200 rounded-none lg:rounded-lg`}
    >
      {href ? (
        <Link
          href={href}
          className="flex items-center capitalize py-2 px-5 lg:px-3"
        >
          {menu}
        </Link>
      ) : (
        menu
      )}
    </Button>
  );
}
