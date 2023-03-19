import R from "react";
import { useRouter } from "next/router";
import Scrollbars from "react-custom-scrollbars-2";
import dynamic from "next/dynamic";
import NavbarComponent from "components/Navbar/Navbar";
import BreathingBackground from "components/BreathingBackground";
import StyledButton from "components/StyledComponents/StyledButton";

const SiteFooter = dynamic(
  () => import("components/Layout/SiteFooter/SiteFooter"),
  { ssr: false },
);

const GoToTopBtn = dynamic(() => import("components/GoToTopBtn"), {
  ssr: false,
});

const StyledTooltip = dynamic(
  () => import("components/StyledComponents/StyledTooltip"),
  { ssr: false },
);

export default function Layout({ children }: { children: R.ReactNode }) {
  const router = useRouter();

  const scrollbarRef = R.useRef<Scrollbars>(null);

  /* scroll page to top on url change (except hash change)
  ======================================================== */
  R.useEffect(() => {
    if (!router.asPath.includes("#")) {
      scrollbarRef.current?.scrollToTop();
    }
  }, [router.asPath]);

  return (
    <div className="flex min-h-screen flex-col">
      <StyledButton
        href="#skip-to-content"
        hrefTarget="_self"
        className="translate-all fixed top-0 z-[100] h-max w-max -translate-y-full bg-indigo-500 p-3 text-white duration-200 focus-visible:translate-y-0"
      >
        Skip Navigation
      </StyledButton>

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
