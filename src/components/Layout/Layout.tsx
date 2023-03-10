import R from "react";
import { useRouter } from "next/router";
import Scrollbars from "react-custom-scrollbars-2";
import dynamic from "next/dynamic";
import StyledScrollbar from "components/StyledComponents/StyledScrollbar";
import NavbarComponent from "components/Navbar/Navbar";
import BreathingBackground from "components/BreathingBackground";
import ActionButton from "components/StyledComponents/ActionButton";
import clsx from "clsx";

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

  const [goTopBtnIsVisible, setGoTopBtnIsVisible] = R.useState(false);

  const scrollbarRef = R.useRef<Scrollbars>(null);

  /* scroll page to top on url change (except hash change)
  ======================================================== */
  R.useEffect(() => {
    if (!router.asPath.includes("#")) {
      scrollbarRef.current?.scrollToTop();
    }
  }, [router.asPath]);

  return (
    <StyledScrollbar
      autoHeight
      ref={scrollbarRef}
      autoHeightMin="100vh"
      autoHeightMax="100vh"
      onScrollFrame={values => {
        setGoTopBtnIsVisible(values.scrollTop > 0.3);
      }}
      renderView={props => (
        <div
          {...props}
          className={clsx(
            "flex flex-col",
            router.route === "/" && "scroll-smooth",
          )}
        />
      )}
    >
      <ActionButton
        variant="filled"
        href="#skip-to-content"
        hrefTarget="_self"
        color="indigo"
        anchorClassName="fixed top-0 z-[100] -translate-y-full focus:translate-y-0 translate-all duration-200 h-max"
      >
        Skip Navigation
      </ActionButton>

      <NavbarComponent />
      <BreathingBackground />

      {children}

      <SiteFooter />

      {/* back to top button */}
      <GoToTopBtn
        isVisible={goTopBtnIsVisible}
        callback={() => scrollbarRef.current?.scrollToTop()}
      />

      {/* tooltip declarartions */}
      <StyledTooltip anchorSelect=".icon-tooltip" />
    </StyledScrollbar>
  );
}
