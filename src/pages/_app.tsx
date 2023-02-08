import { ReactElement, ReactNode, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import ContextProviders from "../components/Layout/ContextProviders";
import ProgressBar from "../components/ProgressBar";
import { Analytics } from "@vercel/analytics/react";
import useNetworkStatus from "../utils/client/hooks/useNetworkStatus";
import OfflinePage from "../components/OfflinePage";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { isOnline } = useNetworkStatus();

  const SiteLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>);

  return (
    <ContextProviders>
      <ProgressBar />
      <Analytics />
      {isOnline ? SiteLayout(<Component {...pageProps} />) : <OfflinePage />}
    </ContextProviders>
  );
}
