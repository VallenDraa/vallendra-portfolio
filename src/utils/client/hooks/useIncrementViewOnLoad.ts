import R from "react";
import type { ShowcaseType } from "interfaces/showcase.interface";
import { useRouter } from "next/router";

export default function useIncrementViewOnLoad(
  showcaseItemId: string,
  showcaseType: ShowcaseType,
  onError: () => void,
) {
  const router = useRouter();

  const [finishedUpdatingViews, setFinishedUpdating] = R.useState(false);

  R.useEffect(() => {
    (async () => {
      try {
        setFinishedUpdating(false);

        await fetch(`/api/views/${showcaseType}/${showcaseItemId}`, {
          method: "PUT",
        });
      } catch (err) {
        onError();
      } finally {
        setFinishedUpdating(true);
      }
    })();
  }, [router.asPath, showcaseItemId]);

  return { finishedUpdatingViews };
}
