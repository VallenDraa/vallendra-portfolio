import { Input, InputProps } from "@material-tailwind/react";
import { forwardRef } from "react";

const StyledInput = forwardRef<HTMLInputElement, InputProps>(
  ({ ref: normalRef, ...props }, forwardRef) => {
    return (
      <Input
        ref={forwardRef}
        labelProps={{ className: "!text-gray-500" }}
        color="gray"
        type={props.type || "text"}
        className={`h-12 w-full rounded !border-t-0 !border-transparent px-4 text-lg outline-none transition-colors focus:!border-gray-500 disabled:cursor-not-allowed disabled:opacity-20 dark:bg-gray-800/70 dark:text-gray-300 dark:focus:bg-gray-800/80 ${
          props.className || ""
        }`}
        {...props}
      />
    );
  }
);

export default StyledInput;
