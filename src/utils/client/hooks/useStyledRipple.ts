import { useTheme } from "next-themes";
import useRipple from "use-ripple-hook";

export default function useStyledRipple() {
  const { theme } = useTheme();
  const [ripple, event] = useRipple({
    duration: 500,
    color: theme === "dark" ? "rgba(255, 255, 255, .2)" : "rgba(0, 0, 0, .2)",
    cancelAutomatically: true,
  });

  return [ripple, event] as const;
}
