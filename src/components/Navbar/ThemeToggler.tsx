import { IconButton } from "@material-tailwind/react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeCP";
import Show from "../../utils/jsx/Show";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

export default function ThemeToggler({
  className = "",
}: {
  className?: string;
}) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <IconButton
      size="md"
      variant="text"
      color={theme === "light" ? "gray" : "amber"}
      onClick={toggleTheme}
      className={`text-lg ${className}`}
    >
      {/* icon for dark mode */}
      <Show when={theme === "dark"}>
        <BsFillSunFill />
      </Show>

      {/* icon for light mode */}
      <Show when={theme === "light"}>
        <BsFillMoonStarsFill />
      </Show>
    </IconButton>
  );
}
