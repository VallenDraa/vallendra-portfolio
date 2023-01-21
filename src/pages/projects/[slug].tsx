import { GetServerSideProps } from "next";
import { IProject } from "../../interfaces/projectInterface";
import allProjects from "../../utils/datas/projects/allProjects";
import Head from "next/head";
import SiteFooter from "../../components/SiteFooter";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { AiFillHeart } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import Image from "next/image";
import { technologies } from "../../types/types";
import TECHS from "../../components/MappedComponents/TechsWithTooltip";
import { FaDownload, FaGithub } from "react-icons/fa";
import { SlGlobe } from "react-icons/sl";
import Show from "../../utils/jsx/Show";
import CopyLinkBtn from "../../components/DetailsPage/CopyLinkBtn";
import ActionButton from "../../components/StyledComponents/ActionButton";
import SectionHeading from "../../components/SectionHeading";
import LinkWithUnderline from "../../components/DetailsPage/LinkWithUnderline";
import { useState, useMemo } from "react";
import ViewsAndLikes from "../../components/Details/ViewsAndLikes";
import DetailFooter from "../../components/Details/DetailFooter";
import { useTheme } from "next-themes";
import { commaSeparator } from "../../utils/helpers/formatter";

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

  const { theme } = useTheme();

  /* Likes
  ========= */
  const [likes, setLikes] = useState(project.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const formattedLikes = useMemo(() => commaSeparator.format(likes), [likes]);

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
      <div className="fade-bottom relative flex min-h-[80vh] translate-y-20 flex-col bg-indigo-50 after:-top-20 dark:bg-gray-900">
        <header className="mx-auto mt-6 flex w-full max-w-screen-xl flex-col overflow-hidden px-8 xl:px-0">
          <section className="relative z-10 border-b-2 border-indigo-100 pb-3 dark:border-white/30 ">
            {/* back to project button */}
            <LinkWithUnderline href="/projects">
              <BsArrowLeft />
              Back To Projects
            </LinkWithUnderline>

            {/* title */}
            <Typography
              as="h1"
              variant="h1"
              className="primary-gradient relative z-40 mt-4 w-fit animate-breathing bg-gradient-to-r bg-gradient bg-clip-text text-start text-4xl font-bold capitalize !leading-[initial] text-transparent md:text-5xl"
            >
              {project.name}
            </Typography>

            {/* short description */}
            <Typography
              as="p"
              variant="paragraph"
              className="mt-1 pl-0.5 text-justify text-base font-medium leading-loose text-indigo-700 dark:text-gray-200 md:text-lg"
            >
              {project.shortDescription}
            </Typography>

            <ViewsAndLikes
              hasLiked={hasLiked}
              likes={likes}
              views={project.views}
            />
          </section>
        </header>

        {/* the project data */}
        <main className="relative mx-auto flex w-full max-w-screen-xl grow flex-col gap-8 px-8 py-5 xl:px-0">
          {/* image */}
          <figure className="mx-auto w-full md:w-[95%]">
            <Image
              priority
              src={project.image}
              alt={project.name}
              width={960}
              height={540}
              className="w-full rounded-md object-cover opacity-90 shadow"
            />

            <figcaption className="pt-2 text-center text-sm text-indigo-300 dark:text-gray-500">
              <span>Screenshot of {project.name}</span>
            </figcaption>
          </figure>

          {/* details */}
          <section className="flex flex-col gap-8 lg:flex-row lg:gap-2">
            <div className="relative flex basis-3/4 flex-col gap-12">
              {/* app tech stack */}
              <div className="relative z-10 flex flex-col gap-4">
                <SectionHeading>Tech Stack</SectionHeading>
                <ul className="scrollbar-kece relative flex items-center gap-1 overflow-auto">
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
                  className="px-3 font-normal leading-loose text-indigo-600 dark:text-gray-400"
                >
                  {project.description}
                </Typography>
              </div>
            </div>

            {/* link for the code of this project */}
            <aside className="detail-aside-colors sticky top-10 mt-3 flex h-fit grow flex-row items-center justify-between gap-4 rounded-md p-4 lg:flex-col">
              <div className="flex w-full flex-col gap-3">
                {/* when the project has download link */}
                <Show when={!!project.downloadLink === true}>
                  <ActionButton
                    href={`${project.downloadLink}`}
                    icon={<FaDownload className="text-lg text-blue-500" />}
                  >
                    Download
                  </ActionButton>
                </Show>

                {/* when the project has a website link */}
                <Show when={!!project.siteLink === true}>
                  <ActionButton
                    href={`${project.siteLink}`}
                    icon={<SlGlobe className="text-lg text-blue-500" />}
                  >
                    Visit Site
                  </ActionButton>
                </Show>

                {/* Github Link */}
                <ActionButton
                  icon={<FaGithub className="text-lg" />}
                  href={project.gitLink}
                  color={"gray"}
                >
                  Visit Repo
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
                  <span className="text-sm">{formattedLikes}</span>
                </Button>
              </Tooltip>
            </aside>
          </section>

          {/* comments */}
          <DetailFooter
            prevLink={`/projects/${prevProject.slug}`}
            prevTitle={prevProject.name}
            nextLink={`/projects/${nextProject.slug}`}
            nextTitle={nextProject.name}
          />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
};
