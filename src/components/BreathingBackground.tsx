import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import FloatingSquares from "./FloatingSquares";
import pagesEnum from "../utils/datas/pages";

export default function BreathingBackground() {
  const { route } = useRouter();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    switch (route) {
      case pagesEnum.index:
        bgRef.current.style.height = "770px";
        break;

      case pagesEnum.contact:
        bgRef.current.style.height = "100vh";
        break;

      default:
        bgRef.current.style.height = "200px";
        break;
    }
  }, [route]);

  return (
    <div
      ref={bgRef}
      className="absolute inset-x-0 animate-main-gradient bg-main-gradient bg-gradient"
    >
      <FloatingSquares />
    </div>
  );
}
