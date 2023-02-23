import R from "react";
import { useRouter } from "next/router";
import Scrollbars from "react-custom-scrollbars-2";
import dynamic from "next/dynamic";
import StyledScrollbar from "components/StyledComponents/StyledScrollbar";
import NavbarComponent from "components/Navbar/Navbar";
import BreathingBackground from "components/BreathingBackground";
import GoToTopBtn from "components/GoToTopBtn";
import StyledTooltip from "components/StyledComponents/StyledTooltip";

const SiteFooter = dynamic(
  () => import("components/Layout/SiteFooter/SiteFooter"),
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
      renderView={props => <div {...props} className="flex flex-col" />}
    >
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
