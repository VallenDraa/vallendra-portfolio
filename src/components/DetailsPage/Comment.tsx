import Giscus, { Repo } from "@giscus/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import R from "react";

export default function Comment() {
  const { pathname, query } = useRouter();
  const term = R.useMemo(() => {
    const splitPathname = pathname.split("/");
    splitPathname[2] = query.slug as string;

    const result = splitPathname.join("/");

    return result;
  }, [pathname, query]);
  const { theme } = useTheme();

  return (
    <Giscus
      term={term}
      repo={(process.env.NEXT_PUBLIC_REPO as Repo) || ""}
      repoId={process.env.NEXT_PUBLIC_REPOID || ""}
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
