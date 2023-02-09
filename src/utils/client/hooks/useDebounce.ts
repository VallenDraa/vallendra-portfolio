import { useState, useEffect, DependencyList } from "react";

export default function useDebounce(
  callback: () => void,
  duration: number,
  deps: DependencyList,
): [isWaiting: boolean, error: Error | null] {
  // states
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // where the magic happens
  useEffect(() => {
    try {
      setIsWaiting(true);

      const timer = setTimeout(() => {
        callback();

        setIsWaiting(false);
      }, duration);

      return () => clearTimeout(timer);
    } catch (e) {
      setError(e as Error);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [isWaiting, error];
}
