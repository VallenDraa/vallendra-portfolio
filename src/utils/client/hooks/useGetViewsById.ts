import useSWR, { useSWRConfig } from "swr";
import R from "react";

interface ViewsResponse {
  _id: string;
  views: number;
}

export default function useGetViewsById(
  id: string,
  type: "certificates" | "projects",
  willFetch: boolean = true
) {
  const url = R.useMemo(() => `/api/views/${type}/${id}`, [type, id]);

  const { mutate } = useSWRConfig();

  const { data, isLoading, error } = useSWR<ViewsResponse>(
    url,
    async () => {
      if (!willFetch) return;

      const views = await fetch(url).then((r) => r.json());

      return views;
    },
    { revalidateOnFocus: true }
  );

  R.useEffect(() => {
    if (willFetch) mutate(url);
  }, [willFetch, id]);

  return { data, isLoading, error };
}
