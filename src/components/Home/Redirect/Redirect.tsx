import { Button, Typography } from "@material-tailwind/react";
import { IoCall } from "react-icons/io5";
import Link from "next/link";
import fadeIn from "utils/client/helpers/animateOnObserved";
import Observe from "components/Observe";
import clsx from "clsx";

/* redirects the user to a contacts page or to the projects page
================================================================ */
export default function Redirect() {
  return (
    <section className="layout relative z-30 mx-auto flex h-[full] flex-col items-center pb-24 pt-10">
      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in-top", 0)}
      >
        <Typography
          as="h2"
          className="relative z-10 text-center text-4xl font-bold text-indigo-500 opacity-0 dark:text-zinc-200 md:text-5xl lg:text-6xl"
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
            className={clsx(
              "outline-none",
              "flex items-center justify-center gap-2 rounded-full",
              "hover:bg-indigo-500 active:bg-indigo-500 dark:hover:bg-zinc-100 dark:active:bg-white",
              "border border-indigo-500 hover:border-indigo-500 active:border-indigo-500 dark:border-zinc-300 dark:hover:border-white dark:active:border-white",
              "text-xl text-indigo-500 hover:text-indigo-50 active:text-indigo-50 dark:text-zinc-300 dark:hover:text-zinc-900 dark:active:text-zinc-900 lg:text-2xl",
            )}
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
          className="relative z-10 mt-4 inline-block text-sm font-medium capitalize text-indigo-400 underline-offset-4 opacity-0 hover:underline dark:text-zinc-400"
        >
          See my other projects instead
        </Link>
      </Observe>
    </section>
  );
}
