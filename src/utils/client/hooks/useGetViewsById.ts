import useSWR from "swr";

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

  return { data, isLoading, error };
}
