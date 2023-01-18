import {
  useEffect,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export type theme = "dark" | "light";

interface ITheme {
  theme: theme;
  setTheme: Dispatch<SetStateAction<theme>>;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ITheme>({
  theme: "dark",
  setTheme() {},
  toggleTheme() {},
});

export default function ThemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  /* dark mode state 
  ================================================ */
  const [theme, setTheme] = useState<theme>("dark");

  /* system preferred theme listener
  ================================================ */
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    function systemThemeHandler(e: MediaQueryListEvent) {
      setTheme(e.matches ? "dark" : "light");
    }

    prefersDark.addEventListener("change", systemThemeHandler);

    return () => prefersDark.removeEventListener("change", systemThemeHandler);
  }, []);

  /* theme button handler
  ====================== */

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
