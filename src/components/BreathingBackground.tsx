import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import FloatingSquares from "./FloatingSquares";
import pagesEnum from "../utils/data/pages";
import Observe from "./Observe";
import fadeIn from "../utils/client/helpers/animateOnObserved";

export default function BreathingBackground() {
  const { route } = useRouter();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    switch (route) {
      case pagesEnum.index:
        bgRef.current.style.height = "750px";
        break;

      default:
        bgRef.current.style.height = "140px";
        break;
    }
  }, [route]);

  return (
    <Observe
      freezeOnceVisible
      onEnter={(ref) => fadeIn(ref, "animate-fade-in")}
    >
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
