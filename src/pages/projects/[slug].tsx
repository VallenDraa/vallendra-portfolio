import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { IProject } from "../../interfaces/projectInterface";
import allProjects from "../../utils/datas/projects/allProjects";
import Head from "next/head";
import SiteFooter from "../../components/SiteFooter";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import { technologies } from "../../types/types";
import TECHS from "../../components/MappedComponents/TechsWithTooltip";
import { FaDownload, FaGithub } from "react-icons/fa";
import { SlGlobe } from "react-icons/sl";
import Show from "../../utils/jsx/Show";
import Comment from "../../components/DetailsPage/Comment";
import CopyLinkBtn from "../../components/DetailsPage/CopyLinkBtn";
import ActionButton from "../../components/DetailsPage/ActionButton";
import SectionHeading from "../../components/SectionHeading";
import LinkWithUnderline from "../../components/DetailsPage/LinkWithUnderline";
import { useState } from "react";

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
  const hasSiteOrDownloadLink = !!(project.downloadLink || project.siteLink);

  /* Likes
  ========= */
  const [likes, setLikes] = useState(project.likes);
  const [hasLiked, setHasLiked] = useState(false);

  async function addLike() {
    if (!hasLiked) {
      setLikes((likes) => likes + 1);
      setHasLiked(true);
    } else {
      setLikes((likes) => likes - 1);
      setHasLiked(false);
    }
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="fade-bottom relative flex min-h-screen translate-y-20 flex-col after:-top-20 dark:bg-gray-900">
        {/* blur */}
        <div className="absolute right-20 top-20 h-80 w-80 rotate-0 skew-x-12 scale-110 rounded-full bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 blur-3xl transition-transform duration-200" />

        <header className="mx-auto mt-6 flex w-full max-w-screen-xl flex-col overflow-hidden px-8">
          <section className="relative z-10 border-b-2 border-white/30 pb-3">
            {/* back to project button */}
            <LinkWithUnderline href="/projects">
              <BsArrowLeft />
              Back To Projects
            </LinkWithUnderline>

            {/* title */}
            <Typography
              as="h1"
              variant="h1"
              className="relative z-40 mt-4 w-fit animate-breathing bg-gradient-to-r from-indigo-300 to-pink-200 bg-gradient bg-clip-text text-start text-4xl font-bold capitalize !leading-[initial] text-transparent md:text-5xl"
            >
              {project.name}
            </Typography>

            {/* short description */}
            <Typography
              as="p"
              variant="paragraph"
              className="mt-2 pl-0.5 text-justify text-sm font-medium dark:text-gray-200 md:text-lg"
            >
              {project.shortDescription}
            </Typography>

            {/* project views*/}
            <div className="mt-2.5 flex gap-3 dark:text-gray-400">
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
                className={`flex items-center gap-1 text-sm font-bold ${
                  hasLiked ? "text-red-300" : "text-inherit"
                }`}
              >
                <AiFillHeart />
                {likes} likes
              </Typography>
            </div>
          </section>
        </header>

        {/* the project data */}
        <main className="relative mx-auto flex w-full max-w-screen-xl grow flex-col gap-8 px-8 py-5">
          {/* image */}
          <figure className="mx-auto w-[95%]">
            <Image
              priority
              src={project.image}
              alt={project.name}
              width={960}
              height={540}
              className="w-full rounded-md object-cover opacity-90"
            />

            <figcaption className="pt-2 text-center text-sm dark:text-gray-500">
              <span>Screenshot of {project.name}</span>
            </figcaption>
          </figure>

          {/* details */}
          <section className="flex flex-col gap-8 lg:flex-row lg:gap-2">
            <div className="relative flex basis-3/4 flex-col gap-12">
              {/* app tech stack */}
              <div className="relative z-10 flex flex-col gap-4">
                <SectionHeading>Tech Stack</SectionHeading>
                <ul className="relative flex items-center gap-1 overflow-auto">
                  {project?.tech.map(
                    (tech: technologies, i): JSX.Element => (
                      <li key={i}>{TECHS[tech]}</li>
                    )
                  )}
                </ul>
              </div>

              {/* description and features of the app */}
              <div className="relative z-10 flex flex-col gap-4">
                <SectionHeading>Description</SectionHeading>
                <Typography
                  variant="paragraph"
                  className="px-3 font-normal leading-loose dark:text-white/80"
                >
                  {project.description}
                </Typography>
              </div>
            </div>

            {/* link for the code of this project */}
            <aside className="sticky top-0 mt-3 flex h-fit grow flex-row items-center justify-between gap-4 rounded-md border-2 border-[#30363d] p-4 lg:flex-col">
              <div className="flex w-full flex-col gap-3">
                <Show when={hasSiteOrDownloadLink}>
                  <ActionButton
                    href={`${project.downloadLink || project.siteLink}`}
                    variant="outlined"
                    color="blue"
                    className="flex w-full justify-center"
                  >
                    {/* download text */}
                    <Show when={!!project.downloadLink}>
                      <FaDownload className="text-lg text-blue-500" />
                      <span>Download</span>
                    </Show>

                    {/* website text */}
                    <Show when={!!project.siteLink}>
                      <SlGlobe className="text-lg text-blue-500" />
                      <span>Visit Site</span>
                    </Show>
                  </ActionButton>
                </Show>

                {/* Github Link */}
                <ActionButton
                  href={project.gitLink}
                  variant="outlined"
                  color="gray"
                  className="flex w-full justify-center border-gray-400 text-gray-400"
                >
                  <FaGithub className="text-lg text-gray-400" />
                  <span>Visit Repo</span>
                </ActionButton>

                {/* copy link to clipboard */}
                <CopyLinkBtn />
              </div>

              <Tooltip
                placement="top"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                content={
                  hasLiked ? "Thank you so much !" : "Likes are appreciated !"
                }
              >
                <Button
                  onClick={addLike}
                  variant="text"
                  color={hasLiked ? "red" : "gray"}
                  className={`flex flex-col items-center gap-1 text-5xl ${
                    hasLiked ? "text-red-300" : ""
                  }`}
                >
                  <AiFillHeart />
                  <span className="text-sm">{likes}</span>
                </Button>
              </Tooltip>
            </aside>
          </section>

          {/* comments */}
          <section className="mb-5">
            <Comment />
            {/* links to previous and next projects */}
            <div className="mt-5 flex w-full flex-wrap justify-between gap-8 text-base">
              {/* link to previous listed projects */}
              <LinkWithUnderline
                className="grow md:flex-grow-0"
                href={`/projects/${prevProject.slug}`}
              >
                <BsArrowLeft />
                {prevProject.name}
              </LinkWithUnderline>

              {/* link to next listed projects */}
              <LinkWithUnderline
                className="grow justify-end md:flex-grow-0"
                href={`/projects/${nextProject.slug}`}
              >
                {nextProject.name}
                <BsArrowRight />
              </LinkWithUnderline>
            </div>
          </section>
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
