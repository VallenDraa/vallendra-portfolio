import { ThemeProvider as MTThemeProvider } from "@material-tailwind/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { NavIsOpenedCP } from "context/NavIsOpenedCP";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemeProvider
      enableSystem={false}
      enableColorScheme
      attribute="class"
      defaultTheme="dark"
      storageKey="color-theme"
    >
      <MTThemeProvider>
        <NavIsOpenedCP>{children}</NavIsOpenedCP>
      </MTThemeProvider>
    </NextThemeProvider>
  );
}
