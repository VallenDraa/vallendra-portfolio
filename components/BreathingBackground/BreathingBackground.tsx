import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import pagesEnum from "../../utils/datas/Pages";
import FloatingSquares from "../FloatingSquares/FloatingSquares";

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
      className="absolute bg-gradient bg-main-gradient animate-main-gradient inset-x-0"
    >
      <FloatingSquares />
    </div>
  );
}
