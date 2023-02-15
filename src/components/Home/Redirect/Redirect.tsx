import { Button, Typography } from "@material-tailwind/react";
import { IoCall } from "react-icons/io5";
import Link from "next/link";
import fadeIn from "utils/client/helpers/animateOnObserved";
import Observe from "components/Observe";

/* redirects the user to a contacts page or to my github account
================================================================ */
export default function Redirect() {
  return (
    <section className="relative z-30 mx-auto flex h-[full] max-w-screen-xl flex-col items-center pb-24 pt-10">
      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in-top", 0)}
      >
        <Typography
          as="h2"
          className="relative z-10 text-center text-4xl font-bold text-indigo-500 opacity-0 dark:text-gray-200 md:text-5xl lg:text-6xl"
        >
          Wanna Work Together ?
        </Typography>
      </Observe>

      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in-top", 100)}
      >
        <a
          href="mailto:vallenatwork@gmail.com"
          className="relative z-10 mt-8 opacity-0"
        >
          <Button
            className="flex items-center justify-center gap-2 rounded-full text-xl text-indigo-500 outline outline-2 outline-indigo-500 hover:scale-105 hover:bg-indigo-500 hover:text-indigo-50 hover:outline-indigo-500 focus:text-indigo-500 active:bg-indigo-500 active:text-indigo-50 active:outline-indigo-500 dark:text-gray-300 dark:outline-gray-300 dark:hover:bg-gray-100 dark:hover:text-gray-900 dark:hover:outline-white dark:focus:bg-white dark:focus:text-gray-900 dark:active:bg-white dark:active:text-gray-900 dark:active:outline-white lg:text-2xl"
            variant="text"
          >
            <span>Contact Me</span>
            <IoCall />
          </Button>
        </a>
      </Observe>

      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in-top", 200)}
      >
        <Link
          href="/projects"
          className="relative z-10 mt-4 inline-block opacity-0"
        >
          <Button
            variant="text"
            size="sm"
            color="gray"
            className="rounded-full text-xs text-indigo-300 underline-offset-2 transition-colors duration-200 hover:text-indigo-500 hover:underline dark:text-gray-500 dark:hover:text-gray-300"
          >
            See other projects instead
          </Button>
        </Link>
      </Observe>
    </section>
  );
}
