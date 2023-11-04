import R from "react";
import dynamic from "next/dynamic";
import NavbarComponent from "components/Navbar/Navbar";
import BreathingBackground from "components/BreathingBackground";
import SiteFooter from "components/Layout/SiteFooter/SiteFooter";
import StyledTooltip from "components/StyledComponents/StyledTooltip";

const GoToTopBtn = dynamic(() => import("components/GoToTopBtn"), {
  ssr: false,
});

export default function Layout({ children }: { children: R.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#skip-to-content"
        className="translate-all fixed left-1/2 top-0 z-[100] h-max w-max -translate-x-1/2 -translate-y-full bg-indigo-500 p-3 text-white opacity-0 duration-200 focus-visible:translate-y-0 focus-visible:opacity-100 md:left-0 md:translate-x-0"
      >
        Skip Navigation
      </a>

      <NavbarComponent />
      <BreathingBackground />

      {children}

      <SiteFooter />

      {/* back to top button */}
      <GoToTopBtn />

      {/* tooltip declarartions */}
      <StyledTooltip anchorSelect=".icon-tooltip" />
    </div>
  );
}
