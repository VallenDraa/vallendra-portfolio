import { ReactNode, useState, useEffect, useRef } from "react";
import NavbarComponent from "../Navbar/Navbar";
import { IconButton } from "@material-tailwind/react";
import { VscTriangleUp } from "react-icons/vsc";
import BreathingBackground from "../BreathingBackground/BreathingBackground";
import Head from "next/head";

export default function Layout({ children }: { children: ReactNode }) {
  const goUpBtnRef = useRef<HTMLButtonElement>(null);
  const scrollPercentage = useRef<number>(0);

  /* For showing and hiding go up button
  ===================================== */
  useEffect(() => {
    const height = document.documentElement;

    function goUpBtnViewHandler() {
      scrollPercentage.current =
        (height.scrollTop / (height.scrollHeight - height.clientHeight)) * 100;

      scrollPercentage.current > 5
        ? goUpBtnRef.current?.classList.remove("translate-x-[200%]")
        : goUpBtnRef.current?.classList.add("translate-x-[200%]");
    }

    window.addEventListener("scroll", goUpBtnViewHandler);

    return () => {
      window.removeEventListener("scroll", goUpBtnViewHandler);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div className="h-screen flex flex-col dark">
        <NavbarComponent />
        <BreathingBackground />
        {children}

        {/* back to top button */}
        <IconButton
          ref={goUpBtnRef}
          size="lg"
          ripple={false}
          variant="filled"
          color="deep-purple"
          className={`fixed bottom-5 z-40 right-10 translate-x-[200%] opacity-30 hover:opacity-100 transition duration-500`}
        >
          <a href="#" className="block p-2">
            <VscTriangleUp className="text-xl" />
          </a>
        </IconButton>
      </div>
    </>
  );
}
