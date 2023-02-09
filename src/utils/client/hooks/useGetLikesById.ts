import useSWR, { useSWRConfig } from "swr";
import R from "react";

interface LikedResponse {
  _id: string;
  likes: number;
  hasLiked: boolean; // has liked the project
}

export default function useGetLikesById(
  id: string,
  type: "certificates" | "projects",
  willFetch = true,
) {
  const url = R.useMemo(() => `/api/likes/${type}/${id}`, [type, id]);

  const { mutate } = useSWRConfig();

  const { data, isLoading, error } = useSWR<LikedResponse>(
    url,
    async () => {
      if (!willFetch) return;

      const likes = await fetch(url).then(r => r.json());

      // eslint-disable-next-line consistent-return
      return likes;
    },
    { revalidateOnFocus: true },
  );

  R.useEffect(() => {
    if (willFetch) mutate(url);
  }, [willFetch, id]);

  return { data, isLoading, error };
}
