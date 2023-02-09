import { RefObject } from "react";

type FadeInAnimation =
  | "animate-fade-in"
  | "animate-fade-in-left"
  | "animate-fade-in-right"
  | "animate-fade-in-bottom"
  | "animate-fade-in-top";

/**
 * PLEASE ADD OPACITY-0 BEFORE USING THIS (ONLY USE THIS ALONGSIDE THE OBSERVE COMPONENT)
 */

export default function fadeIn<T extends HTMLElement>(
  ref: RefObject<T>,
  animation: FadeInAnimation,
  delay = 0,
) {
  setTimeout(() => {
    ref.current?.classList.remove("opacity-0");
    ref.current?.classList.add(animation);
  }, delay);
}
