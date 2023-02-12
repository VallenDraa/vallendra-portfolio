import { ReactElement, ReactNode, useEffect } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import ContextProviders from "../components/Layout/ContextProviders";
import ProgressBar from "../components/ProgressBar";
import useNetworkStatus from "../utils/client/hooks/useNetworkStatus";
import OfflinePage from "../components/OfflinePage";
import consoleEasterEgg from "../utils/easterEgg/consoleEasterEgg";
import StyledScrollbar from "../components/StyledComponents/StyledScrollbar";

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { isOnline } = useNetworkStatus();

  const SiteLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>);

  useEffect(() => consoleEasterEgg(), []);

  return (
    <ContextProviders>
      <ProgressBar />
      <Analytics />
      <StyledScrollbar autoHeight autoHeightMin="100vh" autoHeightMax="100vh">
        {isOnline ? SiteLayout(<Component {...pageProps} />) : <OfflinePage />}
      </StyledScrollbar>
    </ContextProviders>
  );
}
