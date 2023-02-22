import useSWR, { useSWRConfig } from "swr";
import R from "react";

type ViewsResponse = {
  _id: string;
  views: number;
};

export default function useGetViewsById(
  id: string,
  type: "certificates" | "projects",
  willFetch = true,
) {
  const { mutate: reFetch } = useSWRConfig();

  const url = R.useMemo(() => `/api/views/${type}/${id}`, [type, id]);

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
  }, [willFetch, id]);

  return { data, isLoading, error, mutate };
}
