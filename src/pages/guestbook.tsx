import Giscus, { Repo } from "@giscus/react";
import { useTheme } from "next-themes";
import { BsArrowLeft } from "react-icons/bs";
import Observe from "components/Observe";
import SectionHeading from "components/Typography/SectionHeading";
import Seo from "seo/Seo";
import guestbookPageSeo from "seo/guestbook.seo";
import fadeIn from "utils/client/helpers/animateOnObserved";
import LinkWithUnderline from "components/Showcase/ShowcaseDetailsPage/LinkWithUnderline";

export default function Guestbook() {
  const { theme } = useTheme();

  return (
    <>
      <Seo {...guestbookPageSeo} />

      <header className="fade-bottom relative mb-3 mt-6 w-full after:top-10">
        <div className="layout flex flex-col pt-36">
          {/* back to project button */}
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 0)}
          >
            <div className="opacity-0">
              <LinkWithUnderline href="/">
                <BsArrowLeft />
                Back To Home Page
              </LinkWithUnderline>
            </div>
          </Observe>

          {/* heading */}
          <div className="pt-4">
            <Observe
              freezeOnceVisible
              onEnter={ref => fadeIn(ref, "animate-fade-in-top", 200)}
            >
              <div className="opacity-0">
                <SectionHeading
                  title="Guestbook"
                  subTitle="This is where you post messages about this site, me, or just about anything you want."
                />
              </div>
            </Observe>
          </div>
        </div>
      </header>
      <main className="layout grow pb-10 pt-5">
        <Giscus
          term="/guestbook"
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
      </main>
    </>
  );
}
