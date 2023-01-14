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
            className="flex items-center rounded-none py-2 px-5 text-start text-base font-semibold capitalize duration-200 dark:text-gray-500 dark:hover:text-white lg:rounded-md lg:px-3 dark:lg:text-white/70"
          >
            {menu}
          </Button>
        </Link>
      ) : (
        <Button
          color="indigo"
          variant="text"
          fullWidth
          className="flex items-center rounded-none py-2 px-5 text-start text-base font-semibold capitalize duration-200 dark:text-gray-500 dark:hover:text-white lg:rounded-md lg:px-3 dark:lg:text-white/70"
        >
          {menu}
        </Button>
      )}
    </>
  );
}
