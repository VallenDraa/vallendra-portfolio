import { ReactElement, ReactNode } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import ContextProviders from "../components/Layout/ContextProviders";
import ProgressBar from "../components/ProgressBar";
import { Analytics } from '@vercel/analytics/react';


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const SiteLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <ContextProviders>
      <ProgressBar />
      <Analytics />
      {SiteLayout(<Component {...pageProps} />)}
    </ContextProviders>
  );
}
