import clsx from "clsx";
import Observe from "components/Observe";
import { ReactNode } from "react";

import fadeIn from "utils/client/helpers/animateOnObserved";
import type { FadeInAnimation } from "utils/client/helpers/animateOnObserved";
import Show from "utils/client/jsx/Show";

type SectioHeadingProps = {
  titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
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
  center?: boolean;
};

const HEADER_CLASS =
  "primary-gradient bg-gradient-to-r bg-clip-text font-bold !leading-[initial] text-transparent text-4xl font-bold md:text-5xl";

export default function SectionHeading({
  titleAs = "h1",
  title,
  subTitle = "",
  duration = null,
  willFade = false,
  center = false,
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
        <div
          className={clsx(center && "text-center", willFade ? "opacity-0" : "")}
        >
          {titleAs === "h1" && <h1 className={HEADER_CLASS}>{title}</h1>}
          {titleAs === "h2" && <h2 className={HEADER_CLASS}>{title}</h2>}
          {titleAs === "h3" && <h3 className={HEADER_CLASS}>{title}</h3>}
          {titleAs === "h4" && <h4 className={HEADER_CLASS}>{title}</h4>}
          {titleAs === "h5" && <h5 className={HEADER_CLASS}>{title}</h5>}
          {titleAs === "h6" && <h6 className={HEADER_CLASS}>{title}</h6>}
        </div>
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
              center && "text-center",
              willFade && "opacity-0",
              "mb-2 mt-1 pl-0.5 text-base font-medium text-zinc-500 dark:text-zinc-300 md:text-lg",
            )}
          >
            {subTitle}
          </p>
        </Observe>
      </Show>
    </>
  );
}
