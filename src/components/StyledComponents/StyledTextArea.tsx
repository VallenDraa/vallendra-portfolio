import { Textarea, TextareaProps } from "@material-tailwind/react";
import { forwardRef } from "react";

const StyledTextArea = forwardRef<HTMLDivElement, TextareaProps>(
  ({ ref: normalRef, className, ...props }, forwardedRef) => (
    <Textarea
      ref={forwardedRef}
      labelProps={{ className: "text-indigo-500 dark:!text-zinc-500" }}
      color="gray"
      className={`h-12 w-full rounded !border-t-0 !border-transparent bg-zinc-100/60 px-4 text-lg text-indigo-400 outline-none transition-colors focus:!border-zinc-500 focus:bg-zinc-100/80 disabled:cursor-not-allowed disabled:opacity-20 dark:bg-zinc-800/60 dark:text-zinc-300 dark:focus:bg-zinc-800/80 ${
        className || ""
      }`}
      {...props}
    />
  ),
);

export default StyledTextArea;
