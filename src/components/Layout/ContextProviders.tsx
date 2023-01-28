import customMaterialStyles from "../../../materialTailwind.config";
import { NavIsOpenedCP } from "../../context/NavIsOpenedCP";
import { ThemeProvider as MTThemeProvider } from "@material-tailwind/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export default function ContextProviders({ children }: { children: any }) {
  return (
    <NextThemeProvider
      enableSystem={false}
      enableColorScheme
      attribute="class"
      defaultTheme="dark"
      storageKey="color-theme"
    >
      <NavIsOpenedCP>
        <MTThemeProvider value={customMaterialStyles}>
          {children}
        </MTThemeProvider>
      </NavIsOpenedCP>
    </NextThemeProvider>
  );
}
