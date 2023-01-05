import { ReactElement, ReactNode } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { IntersectingProjectCP } from "../context/IntersectingProjectCP";
import { ThemeProvider } from "@material-tailwind/react";
import customMaterialStyles from "../material-tailwind.config";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return getLayout(
    <ThemeProvider value={customMaterialStyles}>
      <IntersectingProjectCP>
        <Component {...pageProps} />
      </IntersectingProjectCP>
    </ThemeProvider>
  );
}
