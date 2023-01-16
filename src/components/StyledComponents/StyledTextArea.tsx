import { Textarea, TextareaProps } from "@material-tailwind/react";
import { forwardRef } from "react";

const StyledTextArea = forwardRef<HTMLDivElement, TextareaProps>(
  ({ ref: normalRef, ...props }, forwardRef) => {
    return (
      <Textarea
        ref={forwardRef}
        labelProps={{ className: "!text-gray-500" }}
        color="gray"
        role="search"
        className={`h-12 w-full rounded !border-t-0 !border-transparent px-4 text-lg outline-none transition-colors focus:!border-gray-500 disabled:cursor-not-allowed dark:bg-gray-800/60 dark:text-gray-300 dark:focus:bg-gray-800/80 disabled:opacity-20${
          props.className || ""
        }`}
        {...props}
      />
    );
  }
);

export default StyledTextArea;
