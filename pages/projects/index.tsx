import { Typography } from "@material-tailwind/react";
import FadeBottom from "../../components/FadePageTranstition/FadeBottom";
import Line from "../../components/Line/Line";
import SiteFooter from "../../components/Main/SiteFooter/SiteFooter";
import Head from "next/head";

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>VallenDra | Projects</title>
      </Head>
      <div className="translate-y-40 dark:bg-gray-900 min-h-screen">
        <FadeBottom position="-top-20" />
        <div className="max-w-screen-2xl px-8 mx-auto pb-16 flex flex-col h-full">
          {/* heading, search and categories */}
          <header className="py-6 space-y-5">
            <div className="relative">
              <Typography
                as="h2"
                variant="h2"
                className="animate-breathing bg-gradient bg-gradient-to-r from-indigo-300 to-pink-200 text-start text-5xl font-bold text-transparent bg-clip-text capitalize relative z-40"
              >
                All Projects
              </Typography>
              <Line className="animate-breathing bg-gradient bg-gradient-to-r from-indigo-300 to-pink-200 rotate-90 scale-y-[5.5] -translate-x-0 left-[110px] -bottom-7 absolute" />
            </div>

            <Typography
              as="p"
              variant="paragraph"
              className="text-white/80 font-medium leading-loose pl-0.5 text-justify"
            >
              The ultimate showcase of all my projects. Mostly web but there is
              game and desktop app too 😊.
            </Typography>
          </header>

          {/* the projects list */}
          <main className="grow"></main>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
