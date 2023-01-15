import { ReactNode } from "react";
import NavbarComponent from "../Navbar/Navbar";
import BreathingBackground from "../BreathingBackground";
import Head from "next/head";
import GoToTopBtn from "../GoToTopBtn";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div className="dark flex min-h-screen flex-col">
        <NavbarComponent />
        <BreathingBackground />
        {children}

        {/* back to top button */}
        <GoToTopBtn />
      </div>
    </>
  );
}
