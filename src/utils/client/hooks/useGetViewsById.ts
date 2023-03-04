import useSWR, { useSWRConfig } from "swr";
import R from "react";
import type { ShowcaseType } from "interfaces/showcase.interface";

type ViewsResponse = {
  _id: string;
  views: number;
};

export default function useGetViewsById(
  id: string,
  type: ShowcaseType,
  willFetch = true,
) {
  const { mutate: reFetch } = useSWRConfig();

  const url = R.useMemo(() => `/api/${type}/views/${id}`, [type, id]);

  const { data, isLoading, error, mutate } = useSWR<ViewsResponse>(
    url,
    async () => {
      if (!willFetch) return;

      const views = await fetch(url).then(r => r.json());

      // eslint-disable-next-line consistent-return
      return views;
    },
    { revalidateOnFocus: true },
  );

  R.useEffect(() => {
    if (willFetch) reFetch(url);
  }, [willFetch, url]);

  return { data, isLoading, error, mutate };
}
