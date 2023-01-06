import { Typography } from "@material-tailwind/react";
import FadeBottom from "../../components/FadePageTranstition/FadeBottom";
import Line from "../../components/Line/Line";
import SiteFooter from "../../components/SiteFooter/SiteFooter";
import Head from "next/head";
import ProjectCard from "../../components/Projects/ProjectCard";
import projects from "../../utils/misc/projects";

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>VallenDra | Projects</title>
      </Head>
      <div className="translate-y-40 dark:bg-gray-900 grow">
        <FadeBottom position="-top-20" />
        <div className="max-w-screen-2xl px-8 mx-auto flex flex-col h-full">
          {/* heading and searchbar */}
          <section className="pt-6 pb-3">
            <div className="relative">
              <Typography
                as="h2"
                variant="h2"
                className="animate-breathing bg-gradient text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-200 text-start text-5xl font-bold capitalize relative z-40"
              >
                All Projects
              </Typography>
              <Line className="animate-breathing bg-gradient bg-gradient-to-r from-indigo-300 to-pink-200 rotate-90 scale-y-[5.5] -translate-x-0 left-[110px] -bottom-7 absolute" />
            </div>

            <Typography
              as="p"
              variant="paragraph"
              className="text-white/80 font-medium leading-loose pl-0.5 text-justify mt-5"
            >
              The ultimate showcase of all my projects. Mostly web but there is
              game and desktop app too 😊.
            </Typography>

            <input
              role="search"
              type="text"
              placeholder="Search Projects..."
              className="outline-none w-full rounded-lg mt-6 h-12 px-4 dark:bg-gray-800/70 dark:focus:bg-gray-800 dark:text-gray-300 text-lg transition-colors"
            />
          </section>

          {/* the projects list */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-5 px-4">
            <ProjectCard project={projects[0]} />
            <ProjectCard project={projects[1]} />
            <ProjectCard project={projects[2]} />
            <ProjectCard project={projects[3]} />
          </section>
        </div>
        <SiteFooter />
      </div>
    </>
  );
}
