import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { IProject } from "../../interfaces/projectInterfaces";
import allProjects from "../../utils/datas/projects/allProjects";
import Head from "next/head";
import SiteFooter from "../../components/SiteFooter/SiteFooter";
import { Typography } from "@material-tailwind/react";
import Show from "../../utils/jsx/Show";
import Line, { indigoToPink } from "../../components/Line/GradientUnderline";
import FadeBottom from "../../components/FadePageTranstition/FadeBottom";
import gradientUnderlineMaker from "../../components/Line/GradientUnderline";

interface IProps {
  project: IProject;
}

export default function ProjectDetails({ project }: IProps) {
  return (
    <>
      <Head>
        <title>VallenDra | {project.name}</title>
      </Head>
      <div className="relative min-h-screen flex flex-col dark:bg-gray-900 translate-y-40">
        {/* blur */}
        <div className="h-80 w-80 scale-110 transition-transform duration-200 blur-3xl rounded-full skew-x-12 rotate-0 bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 absolute right-20 top-20" />
        <FadeBottom position="-top-20" />

        <header className="max-w-screen-2xl px-8 mx-auto flex flex-col w-full relative overflow-hidden">
          {/* heading and searchbar */}
          <section className="pt-6 pb-3 relative z-10">
            <div className="relative flex items-center gap-1 w-max">
              <Typography
                as="h2"
                variant="h2"
                className={`animate-breathing bg-gradient bg-gradient-to-r from-indigo-300 to-pink-200 text-start text-5xl font-bold text-transparent bg-clip-text capitalize relative z-40 ${gradientUnderlineMaker(
                  indigoToPink
                )}`}
              >
                {project.name}
              </Typography>
            </div>

            <Typography
              as="p"
              variant="paragraph"
              className="text-white/80 font-medium leading-loose pl-0.5 text-justify mt-5"
            >
              {project.shortDescription}
            </Typography>
          </section>
        </header>

        {/* the projects list */}
        <main className="max-w-screen-2xl px-10 relative mx-auto grow pt-5 pb-10 w-full">
          {/* fallback for when the target project failed to load */}
          <Show when={!project}>
            {/* text fallback */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-center space-y-2 w-full px-8">
              <Typography
                variant="h4"
                as="h2"
                className="dark:text-white/80 text-lg md:text-xl lg:text-2xl"
              >
                Sorry, Can't Seem To Load The Project 😅
              </Typography>
              <Typography
                variant="h5"
                as="h3"
                className="dark:text-white/60 text-sm md:text-base lg:text-lg"
              >
                Try reloading the page. If the problem persists, please try
                again later.
              </Typography>
            </div>
          </Show>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

export function getServerSideProps(
  context: GetServerSidePropsContext
): GetServerSidePropsResult<IProps> {
  const { params } = context;
  const project = allProjects.find((project) => project.slug === params?.slug);

  /* check if the project exists
  ============================= */
  return !project ? { notFound: true } : { props: { project } };
}
