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
    <>
      {href ? (
        <Link href={href}>
          <Button
            color="indigo"
            variant="text"
            fullWidth
            className="flex items-center capitalize py-2 px-5 lg:px-3 text-start text-base font-semibold dark:text-gray-500 dark:lg:text-white/70 dark:hover:text-white duration-200 rounded-none lg:rounded-md"
          >
            {menu}
          </Button>
        </Link>
      ) : (
        <Button
          color="indigo"
          variant="text"
          fullWidth
          className="flex items-center capitalize py-2 px-5 lg:px-3 text-start text-base font-semibold dark:text-gray-500 dark:lg:text-white/70 dark:hover:text-white duration-200 rounded-none lg:rounded-md"
        >
          {menu}
        </Button>
      )}
    </>
  );
}
