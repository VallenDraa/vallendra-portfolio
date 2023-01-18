import { Button, Typography } from "@material-tailwind/react";
import { IoCall } from "react-icons/io5";
import Link from "next/link";
import BlurredBlob from "../../BlurredBlob";
import { useTheme } from "next-themes";

/* redirects the user to a contacts page or to my github account
================================================================ */
export default function Redirect() {
  const { theme } = useTheme();

  return (
    <section className="relative z-20 h-[full] bg-indigo-50 dark:bg-gray-900">
      <div className="relative mx-auto max-w-screen-xl overflow-visible px-2 py-24 lg:px-8 xl:px-0">
        {/* blur */}
        <BlurredBlob
          left="left-1/2"
          top="top-3/4"
          translateX="-translate-x-1/2"
          translateY="-translate-y-3/4"
        />

        <div className="relative z-30 flex flex-col items-center">
          <Typography
            as="h2"
            className="pt-6 text-3xl font-bold text-indigo-700/90 dark:text-white/90 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Wanna Work Together ?
          </Typography>
          <Link href="/contacts" className="mt-10">
            <Button
              className="group flex items-center justify-center gap-2 rounded-full text-xl text-indigo-600 outline outline-2 outline-indigo-600 focus:text-indigo-600 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-50 hover:outline-indigo-50 active:bg-white active:text-indigo-600 active:outline-white dark:text-gray-300 dark:outline-gray-300 dark:focus:bg-white dark:focus:text-gray-900 dark:hover:text-gray-900 dark:hover:outline-white dark:active:text-gray-900 lg:text-2xl"
              variant="text"
            >
              <span className="duration-200">Contact Me</span>
              <IoCall className="duration-200" />
            </Button>
          </Link>
          <Link
            href="https://github.com/vallendraa"
            target="_blank"
            className="mt-4 inline-block"
          >
            <Button
              variant="text"
              size="sm"
              color={theme === "dark" ? "gray" : "indigo"}
              className="rounded-full text-xs text-indigo-300 underline-offset-2 transition-colors duration-200 hover:text-gray-300 hover:underline dark:text-gray-500"
            >
              Visit My Github Instead
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
