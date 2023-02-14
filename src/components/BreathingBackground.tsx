import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import PagesEnum from "utils/data/pages";
import fadeIn from "utils/client/helpers/animateOnObserved";
import useNetworkStatus from "utils/client/hooks/useNetworkStatus";
import Observe from "./Observe";
import FloatingSquares from "./FloatingSquares";

export default function BreathingBackground() {
  const { route } = useRouter();
  const bgRef = useRef<HTMLDivElement>(null);

  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    if (!bgRef.current) return;

    if (!isOnline) {
      bgRef.current.style.height = "100vh";
      return;
    }

    switch (route) {
      case PagesEnum.index:
        bgRef.current.style.height = "750px";
        break;

      default:
        bgRef.current.style.height = "140px";
        break;
    }
  }, [route, isOnline]);

  return (
    <Observe freezeOnceVisible onEnter={ref => fadeIn(ref, "animate-fade-in")}>
      <div className="absolute inset-x-0 opacity-0">
        <div
          ref={bgRef}
          className="animate-main-gradient bg-main-gradient bg-gradient"
        >
          <FloatingSquares />
        </div>
      </div>
    </Observe>
  );
}
