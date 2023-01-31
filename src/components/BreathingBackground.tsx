import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import FloatingSquares from "./FloatingSquares";
import pagesEnum from "../utils/data/pages";

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
    <div className="absolute inset-x-0 animate-fade-in">
      <div
        ref={bgRef}
        className="animate-main-gradient bg-main-gradient bg-gradient"
      >
        <FloatingSquares />
      </div>
    </div>
  );
}
