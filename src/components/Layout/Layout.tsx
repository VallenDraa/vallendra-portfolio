import R from "react";
import { useRouter } from "next/router";
import Scrollbars from "react-custom-scrollbars-2";
import dynamic from "next/dynamic";
import NavbarComponent from "../Navbar/Navbar";
import BreathingBackground from "../BreathingBackground";
import StyledScrollbar from "../StyledComponents/StyledScrollbar";
import GoToTopBtn from "../GoToTopBtn";

const SiteFooter = dynamic(() => import("../SiteFooter"), { ssr: false });

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
    </StyledScrollbar>
  );
}
