import Giscus, { Repo } from "@giscus/react";
import { useRouter } from "next/router";

export default function Comment() {
  const { asPath } = useRouter();

  return (
    <Giscus
      term={asPath}
      repo={(process.env.NEXT_PUBLIC_REPO as Repo) || ""}
      repoId={process.env.NEXT_PUBLIC_REPOID || ""}
      category={process.env.NEXT_PUBLIC_CATEGORYNAME}
      categoryId={process.env.NEXT_PUBLIC_CATEGORYID}
      mapping="pathname"
      strict="1"
      emitMetadata="0"
      lang="en"
      reactionsEnabled="0"
      loading="lazy"
      theme="transparent_dark"
      inputPosition="top"
    />
  );
}
