import Giscus, { Repo } from "@giscus/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Comment() {
  const { asPath } = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);

    const timer = setTimeout(() => setIsVisible(true), 1);

    return () => clearTimeout(timer);
  }, [asPath]);

  return isVisible ? (
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
      theme="transparent_dark"
      inputPosition="top"
    />
  ) : null;
}
