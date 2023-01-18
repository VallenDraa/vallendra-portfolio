import { IconButton } from "@material-tailwind/react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
    <IconButton
      size="md"
      variant="text"
      color={theme === "light" ? "gray" : "amber"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`text-lg ${className} `}
    >
      {/* icon for dark mode */}
      {theme === "dark" ? (
        <BsFillSunFill />
      ) : (
        <BsFillMoonStarsFill className="text-gray-700" />
      )}
    </IconButton>
  );
}
