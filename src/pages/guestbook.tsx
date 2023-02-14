import Giscus, { Repo } from "@giscus/react";
import { useTheme } from "next-themes";
import { BsArrowLeft } from "react-icons/bs";
import Observe from "../components/Observe";
import SectionHeading from "../components/Typography/SectionHeading";
import Seo from "../seo/Seo";
import guestbookPageSeo from "../seo/guestbook.seo";
import fadeIn from "../utils/client/helpers/animateOnObserved";
import LinkWithUnderline from "../components/ShowcaseDetailsPage/LinkWithUnderline";

export default function Guestbook() {
  const { theme } = useTheme();

  return (
    <>
      <Seo {...guestbookPageSeo} />

      <header className="fade-bottom relative mt-6 mb-3 w-full after:-top-7">
        <div className="mx-auto flex max-w-screen-xl flex-col px-8 pt-16 2xl:px-2">
          {/* back to project button */}
          <LinkWithUnderline href="/">
            <BsArrowLeft />
            Back To Home Page
          </LinkWithUnderline>

          {/* heading */}
          <div className="pt-4">
            <Observe
              freezeOnceVisible
              onEnter={ref => fadeIn(ref, "animate-fade-in-top", 0)}
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
      <main className="mx-auto w-full max-w-screen-xl grow px-8 pt-5 pb-10 2xl:px-2">
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
