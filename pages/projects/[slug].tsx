import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { IProject } from "../../interfaces/projectInterfaces";
import allProjects from "../../utils/datas/projects/allProjects";
import Head from "next/head";
import SiteFooter from "../../components/SiteFooter";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import FadeBottom from "../../components/FadePageTranstition/FadeBottom";
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
      <div className="relative min-h-screen flex flex-col dark:bg-gray-900 translate-y-40">
        {/* blur */}
        <div className="h-80 w-80 scale-110 transition-transform duration-200 blur-3xl rounded-full skew-x-12 rotate-0 bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 absolute right-20 top-20" />
        <FadeBottom position="-top-20" />

        <header className="max-w-screen-xl px-8 mx-auto flex flex-col w-full overflow-hidden mt-6">
          <section className="pb-3 relative z-10 border-b-2 border-white/30">
            {/* back to project button */}
            <LinkWithUnderline href="/projects">
              <BsArrowLeft />
              Back To Projects
            </LinkWithUnderline>

            {/* title */}
            <Typography
              as="h1"
              variant="h1"
              className="animate-breathing bg-gradient bg-gradient-to-r from-indigo-300 to-pink-200 text-start text-4xl md:text-5xl font-bold text-transparent bg-clip-text capitalize relative z-40 w-fit mt-4 !leading-[initial]"
            >
              {project.name}
            </Typography>

            {/* short description */}
            <Typography
              as="p"
              variant="paragraph"
              className="dark:text-gray-200 font-medium pl-0.5 text-justify mt-2 text-sm md:text-lg"
            >
              {project.shortDescription}
            </Typography>

            {/* project views*/}
            <div className="flex gap-3 mt-2.5 dark:text-gray-400">
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
                {likes} likes
              </Typography>
            </div>
          </section>
        </header>

        {/* the project data */}
        <main className="max-w-screen-xl px-8 relative mx-auto grow py-5 w-full flex flex-col gap-8">
          {/* image */}
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
              <span>Screenshot of {project.name}</span>
            </figcaption>
          </figure>

          {/* details */}
          <section className="flex flex-col lg:flex-row gap-8 lg:gap-2">
            <div className="relative flex flex-col gap-12 basis-3/4">
              {/* app tech stack */}
              <div className="flex flex-col gap-4 relative z-10">
                <SectionHeading>Tech Stack</SectionHeading>
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
                <SectionHeading>Description</SectionHeading>
                <Typography
                  variant="paragraph"
                  className="dark:text-white/80 px-3 font-normal leading-loose"
                >
                  {project.description}
                </Typography>
              </div>
            </div>

            {/* link for the code of this project */}
            <aside className="sticky top-0 h-fit grow flex flex-row lg:flex-col justify-between items-center gap-4 mt-3 p-4 border-2 border-[#30363d] rounded-md">
              <div className="flex flex-col gap-3 w-full">
                <Show when={hasSiteOrDownloadLink}>
                  <ActionButton
                    href={`${project.downloadLink || project.siteLink}`}
                    variant="outlined"
                    color="blue"
                    className="w-full flex justify-center"
                  >
                    {/* download text */}
                    <Show when={!!project.downloadLink}>
                      <FaDownload className="text-blue-500 text-lg" />
                      <span>Download</span>
                    </Show>

                    {/* website text */}
                    <Show when={!!project.siteLink}>
                      <SlGlobe className="text-blue-500 text-lg" />
                      <span>Visit Site</span>
                    </Show>
                  </ActionButton>
                </Show>

                {/* Github Link */}
                <ActionButton
                  href={project.gitLink}
                  variant="outlined"
                  color="gray"
                  className="w-full flex justify-center border-gray-400 text-gray-400"
                >
                  <FaGithub className="text-gray-400 text-lg" />
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
                  className="text-5xl flex flex-col items-center gap-1"
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
            <div className="w-full flex justify-between mt-5 text-lg">
              {/* link to previous listed projects */}
              <LinkWithUnderline href={`/projects/${prevProject.slug}`}>
                <BsArrowLeft />
                {prevProject.name}
              </LinkWithUnderline>

              {/* link to next listed projects */}
              <LinkWithUnderline href={`/projects/${prevProject.slug}`}>
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
