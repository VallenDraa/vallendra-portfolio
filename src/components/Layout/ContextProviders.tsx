import { NavIsOpenedCP } from "../../context/NavIsOpenedCP";
import customMaterialStyles from "../../../materialTailwind.config";
import { IntersectingProjectCP } from "../../context/IntersectingProjectCP";
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
          <IntersectingProjectCP>{children}</IntersectingProjectCP>
        </MTThemeProvider>
      </NavIsOpenedCP>
    </NextThemeProvider>
  );
}
