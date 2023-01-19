import Giscus, { Repo } from "@giscus/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Comment() {
  const { asPath } = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    setIsVisible(false);
    setIsVisible(true);
  }, [asPath]);

  if (!isVisible) return null;

  return (
    <Giscus
      term={asPath}
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
