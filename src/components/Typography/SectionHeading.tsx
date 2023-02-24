import { Typography } from "@material-tailwind/react";
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
};

export default function SectionHeading({
  titleAs = "h1",
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
        <Typography
          as={titleAs}
          variant="h1"
          className={clsx(
            willFade && "opacity-0",
            "primary-gradient bg-gradient-to-r bg-clip-text text-4xl font-bold !leading-[initial] text-transparent md:text-5xl",
          )}
        >
          {title}
        </Typography>
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
          <Typography
            as="p"
            variant="lead"
            className={clsx(
              willFade && "opacity-0",
              "mt-1 mb-4 pl-0.5 text-base font-medium text-indigo-400 dark:text-gray-400 md:text-lg",
            )}
          >
            {subTitle}
          </Typography>
        </Observe>
      </Show>
    </>
  );
}
