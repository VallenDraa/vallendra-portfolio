import clsx from "clsx";
import R from "react";

export type StyledInputProps = {
  icon: R.ReactNode;
} & R.ComponentPropsWithRef<"input">;

const StyledInput = R.forwardRef<HTMLInputElement, StyledInputProps>(
  ({ className, icon, placeholder, value, ...props }, forwardedRef) => {
    const inputId = R.useId();

    /* Determine the border color of the input based on theme
    ========================================================= */
    return (
      <div className="relative">
        <div className="absolute right-4 top-1/2 -translate-y-1/2">{icon}</div>

        <input
          {...props}
          type="text"
          id={inputId}
          ref={forwardedRef}
          placeholder={placeholder}
          className={clsx(
            "placeholder:text-transparent",
            "peer h-10 w-full rounded-md px-10 pl-4",
            "transition-colors",
            "text-lg text-zinc-600 dark:text-zinc-300",
            "border border-zinc-600 outline-none focus:border-indigo-400",
            "bg-transparent disabled:cursor-not-allowed disabled:opacity-20",
            className,
          )}
        />
        <label
          className={clsx(
            "px-1",
            "transition-all",
            "absolute left-2.5 -top-1.5 translate-y-0",
            "text-xs text-indigo-500",
            "bg-indigo-50 dark:bg-zinc-900",
            "peer-focus:-top-1.5 peer-focus:left-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-indigo-500 dark:peer-focus:text-indigo-300",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:backdrop-blur-none dark:peer-placeholder-shown:text-zinc-400",
          )}
          htmlFor={inputId}
        >
          <span>{placeholder}</span>
        </label>
      </div>
    );
  },
);

export default StyledInput;
