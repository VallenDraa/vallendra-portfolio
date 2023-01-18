import { NavIsOpenedCP } from "../../context/NavIsOpenedCP";
import { ThemeProvider } from "@material-tailwind/react";
import customMaterialStyles from "../../../material-tailwind.config";
import { IntersectingProjectCP } from "../../context/IntersectingProjectCP";
import ThemeContextProvider from "../../context/ThemeCP";

export default function ContextProviders({ children }: { children: any }) {
  return (
    <ThemeContextProvider>
      <NavIsOpenedCP>
        <ThemeProvider value={customMaterialStyles}>
          <IntersectingProjectCP>{children}</IntersectingProjectCP>
        </ThemeProvider>
      </NavIsOpenedCP>
    </ThemeContextProvider>
  );
}
