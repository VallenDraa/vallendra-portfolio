import R from "react";

export default function useNetworkStatus() {
  const [isOnline, setIsOnline] = R.useState<boolean>(true);
  const [error, setError] = R.useState<Error | null>(null);

  R.useEffect(() => {
    try {
      setIsOnline(navigator.onLine);

      window.addEventListener("online", () => setIsOnline(navigator.onLine));
      window.addEventListener("offline", () => setIsOnline(navigator.onLine));

      return () => {
        window.removeEventListener("online", () =>
          setIsOnline(navigator.onLine),
        );
        window.removeEventListener("offline", () =>
          setIsOnline(navigator.onLine),
        );
      };
    } catch (e) {
      setIsOnline(false);

      setError(e as Error);
    }
  }, []);

  return { isOnline, error };
}
