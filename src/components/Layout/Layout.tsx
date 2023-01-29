import { ReactNode } from "react";
import NavbarComponent from "../Navbar/Navbar";
import BreathingBackground from "../BreathingBackground";
import Head from "next/head";
import GoToTopBtn from "../GoToTopBtn";
import Seo from "../../seo/Seo";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Seo />
      <div className="flex flex-col">
        <NavbarComponent />
        <BreathingBackground />

        {children}

        {/* back to top button */}
        <GoToTopBtn />
      </div>
    </>
  );
}
