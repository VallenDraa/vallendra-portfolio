import { Button, Typography } from "@material-tailwind/react";
import { IoCall } from "react-icons/io5";
import Link from "next/link";

/* redirects the user to a contacts page or to my github account
================================================================ */
export default function Redirect() {
  return (
    <section className="relative z-20 h-[full] bg-indigo-50 dark:bg-gray-900">
      <div className="relative mx-auto max-w-screen-xl px-2 py-24 lg:px-8 xl:px-0">
        <div className="relative z-30 flex flex-col items-center">
          <Typography
            as="h2"
            className="pt-6 text-4xl font-bold text-indigo-500 dark:text-gray-200 md:text-5xl lg:text-6xl"
          >
            Wanna Work Together ?
          </Typography>
          <Link href="/contacts" className="mt-8">
            <Button
              className="group flex items-center justify-center gap-2 rounded-full text-xl text-indigo-500 outline outline-2 outline-indigo-500 focus:text-indigo-500 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 hover:text-indigo-50 hover:outline-indigo-500 active:bg-white active:text-indigo-500 active:outline-white dark:text-gray-300 dark:outline-gray-300 dark:focus:bg-white dark:focus:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 dark:hover:outline-white dark:active:text-gray-900 lg:text-2xl"
              variant="text"
            >
              <span className="duration-200">Contact Me</span>
              <IoCall className="duration-200" />
            </Button>
          </Link>
          <Link href="/projects" className="mt-4 inline-block">
            <Button
              variant="text"
              size="sm"
              color="gray"
              className="rounded-full text-xs text-indigo-300 underline-offset-2 transition-colors duration-200 hover:text-indigo-500 hover:underline dark:text-gray-500 dark:hover:text-gray-300"
            >
              See other projects instead
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
