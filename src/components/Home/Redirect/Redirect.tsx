import { IoCall } from "react-icons/io5";
import Link from "next/link";
import fadeIn from "utils/client/helpers/animateOnObserved";
import Observe from "components/Observe";
import clsx from "clsx";
import useRipple from "use-ripple-hook";
import { useTheme } from "next-themes";

/* redirects the user to a contacts page or to the projects page
================================================================ */
export default function Redirect() {
  const { theme } = useTheme();

  const [ripple, event] = useRipple({
    duration: 700,
    color: theme === "dark" ? "rgba(0, 0, 0, .2)" : "rgba(255, 255, 255, .2)",
    cancelAutomatically: true,
  });

  return (
    <section
      aria-label="redirect-to-contacts-or-projects-section"
      className="layout relative z-30 mx-auto flex h-[full] flex-col items-center pb-24 pt-10"
    >
      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in-top", 50)}
      >
        <h2 className="relative z-10 text-center text-4xl font-bold text-indigo-500/90 opacity-0 dark:text-zinc-100/90 md:text-5xl lg:text-6xl">
          Wanna Work Together ?
        </h2>
      </Observe>

      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in-top", 100)}
      >
        <div className="opacity-0">
          <a
            ref={ripple}
            onMouseDown={event}
            href="mailto:vallenatwork@gmail.com"
            className={clsx(
              "font-bold uppercase",
              "outline-none transition-colors duration-200",
              "relative z-10 mt-8 flex items-center justify-center gap-2 rounded-full px-6 py-3",
              "hover:bg-indigo-500 dark:hover:bg-zinc-100",
              "border border-indigo-500 hover:border-transparent active:border-transparent dark:border-white/80",
              "text-xl text-indigo-500 hover:text-indigo-50 dark:text-white/80 dark:hover:text-zinc-900 lg:text-2xl",
            )}
          >
            <span>Contact Me</span>
            <IoCall />
          </a>
        </div>
      </Observe>

      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in-top", 200)}
      >
        <Link
          href="/projects"
          className="normal-underline relative z-10 mt-4 inline-block rounded py-1 text-sm font-medium capitalize text-indigo-400 opacity-0 duration-200 before:transition before:duration-200 hover:text-pink-400 before:hover:-translate-y-1 before:hover:bg-pink-400 dark:text-white/80 dark:hover:text-pink-300 dark:before:hover:bg-pink-300"
        >
          See my other projects instead
        </Link>
      </Observe>
    </section>
  );
}
