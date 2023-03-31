import { useEffect, useState, useCallback } from "react";

export default function useCopyToClipboard() {
  const [isError, setIsError] = useState(false);
  const [hasBeenPressed, setHasBeenPressed] = useState(false);
  const [copyLinkIsSupported, setCopyLinkIsSupported] = useState(false);

  useEffect(() => setCopyLinkIsSupported(!!navigator.clipboard.writeText), []);

  const copy = useCallback(
    (str: string, waitDuration = 1500) => {
      if (!copyLinkIsSupported) return;

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
    [copyLinkIsSupported],
  );

  return [copy, copyLinkIsSupported, hasBeenPressed, isError] as const;
}
