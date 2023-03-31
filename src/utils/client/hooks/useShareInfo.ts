import { useState, useEffect, useCallback } from "react";

export default function useShareInfo() {
  const [shareIsSupported, setShareIsSupported] = useState(false);
  const [hasBeenPressed, setHasBeenPressed] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => setShareIsSupported(!!navigator.share), []);

  const shareInfo = useCallback(
    (data: ShareData, waitDuration = 1500) => {
      if (!shareIsSupported) return;

      navigator
        .share(data)
        .then(() => setHasBeenPressed(true))
        .catch(error => {
          if (error.name === "AbortError") return;

          setIsError(true);
          setTimeout(() => setIsError(false), waitDuration);
        })
        .finally(() => setHasBeenPressed(false));
    },
    [shareIsSupported],
  );

  return [shareInfo, shareIsSupported, hasBeenPressed, isError] as const;
}
