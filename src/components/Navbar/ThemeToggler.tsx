import StyledButton from "components/StyledComponents/StyledButton";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function ThemeToggler({
  className = "",
}: {
  className?: string;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <StyledButton
      aria-label="Theme toggle button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={clsx(
        "!flex h-10 w-10 items-center justify-center rounded-md p-2 text-center !text-xl",
        theme === "light"
          ? "text-zinc-700 hover:bg-zinc-500/10"
          : "text-yellow-500 hover:bg-yellow-500/30",
        className,
      )}
    >
      {/* icon for dark mode */}
      {theme === "dark" ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
    </StyledButton>
  );
}
