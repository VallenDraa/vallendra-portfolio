import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NavIsOpenedCP } from "context/NavIsOpenedCP";
import { LightboxIsActiveCP } from "context/LightboxStatusCP";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      enableSystem={false}
      enableColorScheme
      attribute="class"
      defaultTheme="dark"
      storageKey="color-theme"
    >
      <LightboxIsActiveCP>
        <NavIsOpenedCP>{children}</NavIsOpenedCP>
      </LightboxIsActiveCP>
    </NextThemesProvider>
  );
}
