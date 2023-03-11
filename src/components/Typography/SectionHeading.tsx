import clsx from "clsx";
import Observe from "components/Observe";
import { ReactNode } from "react";
import fadeIn from "utils/client/helpers/animateOnObserved";
import type { FadeInAnimation } from "utils/client/helpers/animateOnObserved";
import Show from "utils/client/jsx/Show";

type SectioHeadingProps = {
  title: ReactNode;
  subTitle?: ReactNode;
  willFade?: boolean;
  animation?: {
    title?: FadeInAnimation;
    subTitle?: FadeInAnimation;
  };
  duration?: {
    title?: number;
    subTitle?: number;
  } | null;
};

export default function SectionHeading({
  title,
  subTitle = "",
  duration = null,
  willFade = false,
  animation,
}: SectioHeadingProps) {
  return (
    <>
      <Observe
        freezeOnceVisible
        onEnter={ref =>
          willFade &&
          fadeIn(
            ref,
            animation?.title || "animate-fade-in",
            duration?.title || 0,
          )
        }
      >
        <h1
          className={clsx(
            willFade && "opacity-0",
            "primary-gradient bg-gradient-to-r bg-clip-text font-bold !leading-[initial] text-transparent",
          )}
        >
          {title}
        </h1>
      </Observe>

      <Show when={subTitle !== ""}>
        <Observe
          freezeOnceVisible
          onEnter={ref =>
            willFade &&
            fadeIn(
              ref,
              animation?.subTitle || "animate-fade-in",
              duration?.subTitle || 0,
            )
          }
        >
          <p
            className={clsx(
              willFade && "opacity-0",
              "mb-2 mt-0.5 pl-0.5 text-base font-medium text-zinc-500 dark:text-zinc-300 md:text-lg",
            )}
          >
            {subTitle}
          </p>
        </Observe>
      </Show>
    </>
  );
}
