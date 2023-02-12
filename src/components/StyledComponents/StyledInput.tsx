import { Input, InputProps } from "@material-tailwind/react";
import { useTheme } from "next-themes";
import R from "react";

const StyledInput = R.forwardRef<HTMLInputElement, InputProps>(
  (
    { ref: normalRef, className, icon, placeholder, value, ...props },
    forwardedRef,
  ) => {
    const [themeIsDark, setThemeIsDark] = R.useState(false);
    const { theme } = useTheme();

    /* Determine the border color of the input based on theme
    ========================================================= */
    R.useEffect(() => setThemeIsDark(theme === "dark"), [theme]);

    return (
      <Input
        placeholder={placeholder}
        icon={icon}
        inputRef={forwardedRef}
        labelProps={{ className: "text-indigo-500 dark:!text-gray-500" }}
        color={themeIsDark ? "gray" : "indigo"}
        type={props.type || "text"}
        className={`h-12 w-full rounded !bg-indigo-100/50 px-4 text-lg text-indigo-600 outline-none transition-colors focus:border-t-0 focus:bg-indigo-100/60 disabled:cursor-not-allowed disabled:opacity-20 dark:border-gray-700 dark:!bg-gray-800/60 dark:text-gray-300 dark:focus:border-gray-500 dark:focus:bg-gray-800/80 ${
          className || ""
        }`}
        {...props}
      />
    );
  },
);

export default StyledInput;
