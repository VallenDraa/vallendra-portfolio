import { useState, useEffect } from "react";

export default function useDebounce(
  callback: () => void,
  duration: number
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
  });

  return [isWaiting, error];
}
