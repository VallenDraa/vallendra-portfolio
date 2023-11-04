import { ComponentPropsWithoutRef, forwardRef } from "react";
import clsx from "clsx";

const BlurredBlob = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, forwardedRef) => (
    <div
      {...props}
      ref={forwardedRef}
      className={clsx(
        className,
        "absolute h-72 w-72 rotate-12 skew-x-6 rounded-full bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 opacity-40 blur-2xl transition-transform",
      )}
    />
  ),
);

export default BlurredBlob;
