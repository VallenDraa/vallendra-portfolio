import { useEffect, useState, useCallback } from "react";

export default function useCopyToClipboard() {
  const [isError, setIsError] = useState(false);
  const [hasBeenPressed, setHasBeenPressed] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsSupported(!!navigator.clipboard?.writeText);
    setIsLoading(false);
  }, []);

  const copy = useCallback(
    (str: string, waitDuration = 1500) => {
      if (!isSupported) return;

      navigator.clipboard
        ?.writeText(str)
        .then(() => {
          setHasBeenPressed(true);
          setTimeout(() => setHasBeenPressed(false), waitDuration);
        })
        .catch(() => {
          setIsError(true);
          setTimeout(() => setIsError(false), waitDuration);
        });
    },
    [isSupported],
  );

  return {
    copy,
    isLoading,
    isSupported,
    hasBeenPressed,
    isError,
  } as const;
}
