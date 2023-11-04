import Giscus, { Repo } from "@giscus/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

export default function Comment() {
  const { theme } = useTheme();
  const { asPath } = useRouter();

  return (
    <Giscus
      key={asPath} // this removes the need for force re-render
      term={asPath}
      repo={process.env.NEXT_PUBLIC_REPO as Repo}
      repoId={process.env.NEXT_PUBLIC_REPOID as string}
      category="Comments"
      categoryId="DIC_kwDOIQ1RLM4CTkQ3"
      mapping="specific"
      strict="0"
      emitMetadata="0"
      lang="en"
      loading="lazy"
      reactionsEnabled="0"
      theme={theme === "dark" ? "transparent_dark" : "light"}
      inputPosition="top"
    />
  );
}
