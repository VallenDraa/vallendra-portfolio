import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { IProject } from "../../interfaces/projectInterfaces";
import allProjects from "../../utils/datas/projects/allProjects";
import Head from "next/head";
import SiteFooter from "../../components/SiteFooter";
import { Button, Card, Typography } from "@material-tailwind/react";
import FadeBottom from "../../components/FadePageTranstition/FadeBottom";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import Image from "next/image";
import { technologies } from "../../types/types";
import TECHS from "../../components/MappedComponents/TechsWithTooltip";
import { FaDownload, FaGithub, FaGlobe } from "react-icons/fa";
import Show from "../../utils/jsx/Show";
import Comment from "../../components/ProjectDetails/Comment/Comment";

interface IProjectRedirect {
  slug: string;
  name: string;
}

interface IPropsData {
  project: IProject;
  prevProject: IProjectRedirect;
  nextProject: IProjectRedirect;
}

export default function ProjectDetails({
  project,
  prevProject,
  nextProject,
}: IPropsData) {
  const pageTitle = `VallenDra | ${project.name}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="relative min-h-screen flex flex-col dark:bg-gray-900 translate-y-40">
        {/* blur */}
        <div className="h-80 w-80 scale-110 transition-transform duration-200 blur-3xl rounded-full skew-x-12 rotate-0 bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 absolute right-20 top-20" />
        <FadeBottom position="-top-20" />

        <header className="max-w-screen-xl px-8 mx-auto flex flex-col w-full overflow-hidden mt-6">
          <section className="pb-3 relative z-10 border-b-2 dark:border-gray-700">
            {/* back to project button */}
            <Link
              href="/projects"
              className="pb-2 text-pink-200 relative border-b-[1px] border-transparent hover:border-pink-200 w-fit h-fit flex items-center gap-1"
            >
              <BsArrowLeft />
              Back To Projects
            </Link>

            {/* title */}
            <Typography
              as="h1"
              variant="h1"
              className="animate-breathing bg-gradient bg-gradient-to-r from-indigo-300 to-pink-200 text-start text-5xl font-bold text-transparent bg-clip-text capitalize relative z-40 w-fit mt-2 leading-[initial]"
            >
              {project.name}
            </Typography>

            {/* short description */}
            <Typography
              as="p"
              variant="paragraph"
              className="dark:text-gray-200 font-medium pl-0.5 text-justify mt-2 text-lg"
            >
              {project.shortDescription}
            </Typography>

            {/* project likes and views*/}
            <div className="flex gap-2 mt-2.5 dark:text-gray-400">
              <Typography
                variant="paragraph"
                as="span"
                className="flex items-center gap-1 text-sm font-bold"
              >
                <AiFillEye />
                {project.views} views
              </Typography>

              <span>&bull;</span>

              <Typography
                variant="paragraph"
                as="span"
                className="flex items-center gap-1 text-sm font-bold"
              >
                <AiFillHeart />
                {project.likes} likes
              </Typography>
            </div>
          </section>
        </header>

        {/* the project data */}
        <main className="max-w-screen-xl px-8 relative mx-auto grow pt-5 pb-10 w-full flex flex-col gap-8">
          {/* detail */}
          <figure className="w-[95%] mx-auto">
            <Image
              priority
              src={project.image}
              alt={project.name}
              width={960}
              height={540}
              className="opacity-90 object-cover rounded-md w-full"
            />

            <figcaption className="dark:text-gray-500 text-sm pt-2 text-center">
              <span>{project.name} screenshot</span>
            </figcaption>
          </figure>

          {/* details */}
          <div className="relative flex flex-col gap-12">
            {/* app tech stack */}
            <div className="flex flex-col gap-4 relative z-10">
              <Typography
                as="h2"
                variant="h3"
                className="dark:text-white/90 capitalize font-bold flex gap-2 before:inline-block before:bg-gradient-to-r before:from-indigo-300 before:to-pink-200 before:w-1 h-fit leading-[initial]"
              >
                Tech-Stack
              </Typography>
              <ul className="flex items-center relative gap-1 overflow-auto">
                {project?.tech.map(
                  (tech: technologies, i): JSX.Element => (
                    <li key={i}>{TECHS[tech]}</li>
                  )
                )}
              </ul>
            </div>

            {/* description and features of the app */}
            <div className="flex flex-col gap-4 relative z-10">
              <Typography
                as="h2"
                variant="h3"
                className="dark:text-white/90 capitalize font-bold flex gap-2 before:inline-block before:bg-gradient-to-r before:from-indigo-300 before:to-pink-200 before:w-1 h-fit leading-[initial]"
              >
                Description
              </Typography>
              <Typography
                variant="paragraph"
                className="dark:text-white/80 px-3"
              >
                {project.description}
              </Typography>
            </div>
          </div>

          {/* links */}
          <Card className="relative flex flex-col md:flex-row justify-between items-center gap-4 mt-8 px-3 py-4 dark:bg-gray-800/40">
            {/* link for the code of this project */}
            <div className="flex justify-between gap-2 static md:absolute md:left-1/2 md:-translate-x-1/2">
              {/* Github Link */}
              <Link
                className="inline-block"
                target="_blank"
                href={project.gitLink}
              >
                <Button
                  variant="filled"
                  color="gray"
                  className="flex items-center gap-1.5 shadow-sm hover:shadow text-gray-200 bg-gray-800 rounded-full"
                >
                  <FaGithub className="text-gray-100 text-xl" />
                  Visit Repo
                </Button>
              </Link>

              <Show when={!!(project.downloadLink || project.siteLink)}>
                <Link
                  className="inline-block"
                  target="_blank"
                  href={`${project.downloadLink || project.siteLink}`}
                >
                  <Button
                    variant="filled"
                    color="blue"
                    className="flex items-center gap-1.5 shadow-sm hover:shadow text-gray-200 rounded-full"
                  >
                    {/* download text */}
                    <Show when={!!project.downloadLink}>
                      <>
                        <FaDownload className="text-gray-200 text-xl" />
                        Download
                      </>
                    </Show>

                    {/* website text */}
                    <Show when={!!project.siteLink}>
                      <>
                        <FaGlobe className="text-gray-200 text-xl" />
                        Visit Site
                      </>
                    </Show>
                  </Button>
                </Link>
              </Show>
            </div>

            {/* links to previous and next projects */}
            <div className="w-full flex justify-between">
              {/* link to previous listed projects */}
              <Link
                className="inline-block"
                href={`/projects/${prevProject.slug}`}
              >
                <Button
                  variant="text"
                  color="indigo"
                  className="underline-offset-2 hover:underline transition-colors text-indigo-200 rounded-full"
                >
                  {"<"} {prevProject.name}
                </Button>
              </Link>

              {/* link to next listed projects */}
              <Link
                className="inline-block"
                href={`/projects/${nextProject.slug}`}
              >
                <Button
                  variant="text"
                  color="indigo"
                  className="underline-offset-2 hover:underline transition-colors text-indigo-200 rounded-full"
                >
                  {nextProject.name} {">"}
                </Button>
              </Link>
            </div>
          </Card>

          {/* comments */}
          <Comment />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

export function getServerSideProps(
  context: GetServerSidePropsContext
): GetServerSidePropsResult<IPropsData> {
  const { params } = context;

  // get target project index
  const projectIdx = allProjects.findIndex(
    (project) => project.slug === params?.slug
  );

  // get the project itself
  const project: IProject = allProjects[projectIdx] || null;

  /* (fetch 3 projects later when working on the API)
  ================================================== */

  // get the next project slug
  const nextProject =
    projectIdx === allProjects.length - 1
      ? allProjects[0]
      : allProjects[projectIdx + 1];

  // get the previous slug
  const prevProject =
    projectIdx === 0
      ? allProjects[allProjects.length - 1]
      : allProjects[projectIdx - 1];

  return project === null
    ? { notFound: true }
    : {
        props: {
          project,
          nextProject: { name: nextProject.name, slug: nextProject.slug },
          prevProject: { name: prevProject.name, slug: prevProject.slug },
        },
      };
}
