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
    <section className="layout relative z-30 mx-auto flex h-[full] flex-col items-center pb-24 pt-10">
      {/* <BlurredBlob className="top-0 scale-90 opacity-0 sm:-top-8 sm:scale-110 md:scale-125" /> */}

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
              "relative z-10 mt-8 flex items-center justify-center gap-2 rounded-full py-3 px-6",
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
          className="relative z-10 mt-4 inline-block rounded py-1 px-2 text-sm font-medium capitalize text-indigo-500 underline-offset-4 opacity-0 hover:underline dark:text-white/80"
        >
          See my other projects instead
        </Link>
      </Observe>
    </section>
  );
}
