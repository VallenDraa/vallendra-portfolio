import { useState, useEffect, useCallback } from "react";

export default function useShareInfo() {
  const [isSupported, setIsSupported] = useState(false);
  const [hasBeenPressed, setHasBeenPressed] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsSupported(!!navigator?.share);

    setIsLoading(true);
  }, []);

  const share = useCallback(
    (data: ShareData, errorTimeoutMs = 1500) => {
      if (!isSupported) return;

      navigator
        ?.share(data)
        .then(() => setHasBeenPressed(true))
        .catch(error => {
          if (error.name === "AbortError") return;

          setIsError(true);
          setTimeout(() => setIsError(false), errorTimeoutMs);
        })
        .finally(() => setHasBeenPressed(false));
    },
    [isSupported],
  );

  return {
    share,
    isLoading,
    isSupported,
    hasBeenPressed,
    isError,
  } as const;
}
