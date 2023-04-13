import useSWR, { useSWRConfig } from "swr";
import R from "react";
import type { ShowcaseType } from "interfaces/showcase.interface";

type LikedResponse = {
  _id: string;
  likes: number;
  hasLiked: boolean; // has liked the project
};

export default function useGetLikesById(
  id: string,
  type: ShowcaseType,
  willFetch = true
) {
  const { mutate: reFetch } = useSWRConfig();

  const url = R.useMemo(() => `/api/${type}/likes/${id}`, [type, id]);

  const { data, isLoading, error, mutate } = useSWR<LikedResponse>(
    url,
    async () => {
      if (!willFetch) return;

      const likes = await fetch(url).then((r) => r.json());

      // eslint-disable-next-line consistent-return
      return likes;
    },
    { revalidateOnFocus: false }
  );

  R.useEffect(() => {
    if (willFetch) reFetch(url);
  }, [willFetch, url]);

  return { data, isLoading, error, mutate };
}
