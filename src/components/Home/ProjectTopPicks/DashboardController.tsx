import { useEffect, useRef } from "react";
import useIntersectionObserver from "../../../utils/hooks/useIntersectionObserver";

export default function DashboardController({
  callback,
  topPercentage,
}: {
  callback: () => void;
  topPercentage: number;
}) {
  const revealerRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(revealerRef, {});

  useEffect(() => {
    if (entry?.isIntersecting) callback();
  }, [entry?.isIntersecting]);

  return (
    <div
      ref={revealerRef}
      className="absolute bg-white"
      style={{ top: `${topPercentage}%` }}
    />
  );
}
