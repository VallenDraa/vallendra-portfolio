import { ReactNode } from "react";
import NavbarComponent from "../Navbar/Navbar";
import BreathingBackground from "../BreathingBackground";
import Head from "next/head";
import GoToTopBtn from "../GoToTopBtn";
import { useTheme } from "next-themes";

export default function Layout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={"#37474f"}
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="theme-color"
          content={"#c5cae9"}
          media="(prefers-color-scheme: light)"
        />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col">
        <NavbarComponent />
        <BreathingBackground />
        {children}

        {/* back to top button */}
        <GoToTopBtn />
      </div>
    </>
  );
}
