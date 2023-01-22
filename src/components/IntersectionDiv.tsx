import { useEffect, useRef } from "react";
import useIntersectionObserver from "../utils/client/hooks/useIntersectionObserver";

export default function IntersectionDiv({
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
      className="absolute"
      style={{ top: `${topPercentage}%` }}
    />
  );
}
