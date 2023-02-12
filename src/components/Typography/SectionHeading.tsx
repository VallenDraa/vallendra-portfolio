import { Typography } from "@material-tailwind/react";
import { ReactNode } from "react";
import Observe from "../Observe";
import fadeIn, {
  FadeInAnimation,
} from "../../utils/client/helpers/animateOnObserved";
import Show from "../../utils/client/jsx/Show";

interface Props {
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
}

export default function SectionHeading({
  title,
  subTitle = "",
  duration = null,
  willFade = false,
  animation,
}: Props) {
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
          as="h1"
          variant="h1"
          className={`primary-gradient bg-gradient-to-r bg-clip-text text-4xl font-bold !leading-[initial] text-transparent md:text-5xl ${
            willFade ? "opacity-0" : ""
          }`}
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
            className={`mb-4 pl-0.5 text-base font-medium text-indigo-400 dark:text-gray-400 md:text-lg ${
              willFade ? "opacity-0" : ""
            }`}
          >
            {subTitle}
          </Typography>
        </Observe>
      </Show>
    </>
  );
}
