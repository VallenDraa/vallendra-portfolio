import useSWR, { useSWRConfig } from "swr";
import R from "react";

interface Response {
  _id: string;
  views: number;
}

export default function useGetViewsById(
  id: string,
  type: "certificates" | "projects",
  willFetch: boolean
) {
  const url = `/api/views/${type}/${id}`;

  const { data, isLoading, error } = useSWR<Response>(
    url,
    async () => {
      if (!willFetch) return;

      const views = await fetch(url).then((r) => r.json());

      return views;
    },
    {
      revalidateOnFocus: true,
    }
  );
  const { mutate } = useSWRConfig();

  R.useEffect(() => {
    if (willFetch) mutate(url);
  }, [willFetch]);

  return { data, isLoading, error };
}
