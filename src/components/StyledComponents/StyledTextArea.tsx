import { Textarea, TextareaProps } from "@material-tailwind/react";
import { useTheme } from "next-themes";
import { forwardRef } from "react";

const StyledTextArea = forwardRef<HTMLDivElement, TextareaProps>(
  ({ ref: normalRef, className, ...props }, forwardRef) => {
    const { theme } = useTheme();

    return (
      <Textarea
        ref={forwardRef}
        labelProps={{ className: "text-indigo-500 dark:!text-gray-500" }}
        color="gray"
        className={`h-12 w-full rounded !border-t-0 !border-transparent bg-indigo-100/60 px-4 text-lg text-indigo-400 outline-none transition-colors focus:!border-gray-500 focus:bg-indigo-100/80 disabled:cursor-not-allowed disabled:opacity-20 dark:bg-gray-800/60 dark:text-gray-300 dark:focus:bg-gray-800/80 ${
          className || ""
        }`}
        {...props}
      />
    );
  }
);

export default StyledTextArea;
