import { NavIsOpenedCP } from "../../context/NavIsOpenedCP";
import { ThemeProvider } from "@material-tailwind/react";
import customMaterialStyles from "../../../material-tailwind.config";
import { IntersectingProjectCP } from "../../context/IntersectingProjectCP";

export default function ContextProviders({ children }: { children: any }) {
  return (
    <NavIsOpenedCP>
      <ThemeProvider value={customMaterialStyles}>
        <IntersectingProjectCP>{children}</IntersectingProjectCP>
      </ThemeProvider>
    </NavIsOpenedCP>
  );
}
