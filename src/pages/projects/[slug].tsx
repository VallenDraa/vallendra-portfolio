import { GetStaticPaths, GetStaticProps } from "next";
import Project from "../../interfaces/project.interface";
import SiteFooter from "../../components/SiteFooter";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { AiFillHeart } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { Language, LikesOperationBody, technologies } from "../../types/types";
import TECHS from "../../components/MappedComponents/TechsWithTooltip";
import { FaDownload, FaGithub } from "react-icons/fa";
import { SlGlobe } from "react-icons/sl";
import Show from "../../utils/client/jsx/Show";
import CopyLinkBtn from "../../components/DetailsPage/CopyLinkBtn";
import ActionButton from "../../components/StyledComponents/ActionButton";
import SectionHeading from "../../components/SectionHeading";
import LinkWithUnderline from "../../components/DetailsPage/LinkWithUnderline";
import ViewsAndLikes from "../../components/DetailsPage/ViewsAndLikes";
import DetailFooter from "../../components/DetailsPage/DetailFooter";
import { commaSeparator } from "../../utils/client/helpers/formatter";
import LanguageToggle from "../../components/DetailsPage/LanguageToggle";
import {
  getAllProjects,
  getProjectWithPrevAndNext,
} from "../../server/service/projects/projects.service";
import { CldImage } from "next-cloudinary";
import { JSONSerialize } from "../../utils/server/serialize";
import useGetViewsById from "../../utils/client/hooks/useGetViewsById";
import R from "react";
import { useRouter } from "next/router";
import useGetLikesById from "../../utils/client/hooks/useGetLikesById";
import useDebounce from "../../utils/client/hooks/useDebounce";
import showcaseSeo from "../../seo/showcase.seo";
import Seo from "../../seo/Seo";
import StyledAlert from "../../components/StyledComponents/StyledAlert";
import alertHandler from "../../utils/client/helpers/alertHandler";
import { IoWarning } from "react-icons/io5";

interface ProjectRedirect {
  slug: string;
  name: string;
}

interface PropsData {
  project: Project;
  prevProject: ProjectRedirect;
  nextProject: ProjectRedirect;
}

export default function ProjectDetails({
  project,
  prevProject,
  nextProject,
}: PropsData) {
  /* Others
  =================== */
  const router = useRouter();
  const [showAlert, setShowAlert] = R.useState(false);

  /* For incrementing view upon page load
  ==================================================== */
  R.useEffect(() => {
    (async () => {
      try {
        await fetch(`/api/views/projects/${project._id}`, { method: "PUT" });
      } catch (error) {
        alertHandler({ setShowAlert });
      }
    })();
  }, [router.asPath]);

  /* Language switcher
  =================== */
  const [activeLanguage, setActiveLanguage] = R.useState<Language>("en");

  /* Seo Data
  =================== */
  const seoData = R.useMemo(() => {
    const { name, slug, image, shortDescriptionEN, shortDescriptionID } =
      project;

    return showcaseSeo({
      title: name,
      cldImage: image,
      slug,
      shortDesc:
        activeLanguage === "en" ? shortDescriptionEN : shortDescriptionID,
      type: "projects",
    });
  }, [project, activeLanguage]);

  /* Dynamic Views
  ================== */
  const viewsRes = useGetViewsById(project._id, "projects", true);
  const likesRes = useGetLikesById(project._id, "projects", true);

  /* Likes
  ================== */
  const [likes, setLikes] = R.useState(project.likes);
  const [willSendLike, setWillSendLike] = R.useState(false);
  const [hasLiked, setHasLiked] = R.useState(false);
  const formattedLikes = R.useMemo(() => commaSeparator.format(likes), [likes]);
  const [, likeUpdateError] = useDebounce(
    async () => {
      if (!willSendLike) return;
      const operation: LikesOperationBody = {
        operation: hasLiked ? "increment" : "decrement",
      };

      try {
        await fetch(`/api/likes/projects/${project._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(operation),
        });

        setWillSendLike(false);
      } catch (error) {
        alertHandler({ setShowAlert });
      }
    },
    500,
    [willSendLike, hasLiked]
  );

  /* For setting the fetched like to the local likes 
  ==================================================== */
  R.useEffect(() => {
    setLikes(
      typeof likesRes.data?.likes !== "number"
        ? project.likes
        : likesRes.data?.likes
    );
  }, [likesRes.data?.likes]);

  /* For setting the fetched hasLiked to the local hasLiked 
  ==================================================== */
  R.useEffect(() => {
    setHasLiked(likesRes.data?.hasLiked || false);
  }, [likesRes.data?.hasLiked]);

  async function toggleLike() {
    if (!hasLiked) {
      setLikes((likes) => likes + 1);
      setHasLiked(true);
    } else {
      setLikes((likes) => likes - 1);
      setHasLiked(false);
    }

    setWillSendLike(true);
  }

  return (
    <>
      <Seo base={seoData.base} og={seoData.og} />

      <StyledAlert
        icon={<IoWarning className="text-2xl" />}
        color={"red"}
        show={showAlert}
        dismissible={{ onClose: () => setShowAlert(false) }}
      >
        Oops, please try to reload or try visiting the page at a later time !
      </StyledAlert>

      <div className="fade-bottom relative flex min-h-[80vh] translate-y-20 flex-col after:-top-20">
        <header className="mx-auto mt-6 flex w-full max-w-screen-xl flex-col overflow-hidden px-8 2xl:px-2">
          <section className="relative z-10 flex flex-col justify-between gap-5 border-b-2 border-indigo-100 pb-3 dark:border-white/30 lg:flex-row">
            <div>
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
                className="mt-1 pl-0.5 text-justify text-base font-medium leading-loose text-indigo-700 dark:text-white/80 md:text-lg"
              >
                <Show when={activeLanguage === "en"}>
                  {project.shortDescriptionEN}
                </Show>
                <Show when={activeLanguage === "id"}>
                  {project.shortDescriptionID}
                </Show>
              </Typography>

              <ViewsAndLikes
                isLoading={viewsRes.isLoading && likesRes.isLoading}
                hasLiked={hasLiked}
                likes={likes}
                views={viewsRes.data?.views || project.views}
              />
            </div>
            <div className="flex lg:self-end lg:px-2">
              <LanguageToggle
                activeLanguage={activeLanguage}
                setActiveLanguage={setActiveLanguage}
              />
            </div>
          </section>
        </header>

        {/* the project data */}
        <main className="relative mx-auto flex w-full max-w-screen-xl grow flex-col gap-8 px-8 py-5 2xl:px-2">
          {/* image */}
          <figure className="mx-auto w-full md:w-[95%]">
            <CldImage
              priority
              src={project.image}
              alt={project.name}
              width={1280}
              height={720}
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
                  <Show when={activeLanguage === "en"}>
                    {project.descriptionEN}
                  </Show>
                  <Show when={activeLanguage === "id"}>
                    {project.descriptionID}
                  </Show>
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
                  color="gray"
                >
                  Visit Repo
                </ActionButton>

                {/* copy link to clipboard */}
                <CopyLinkBtn />
              </div>

              {/* Like button */}
              <Show when={viewsRes.isLoading && likesRes.isLoading}>
                <div className="flex h-24 w-24 animate-pulse flex-col gap-2">
                  <div className="basis-3/4 rounded-lg bg-white/20" />
                  <div className="basis-1/4 rounded-lg bg-white/20" />
                </div>
              </Show>
              <Show when={!(viewsRes.isLoading && likesRes.isLoading)}>
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
                    onClick={toggleLike}
                    variant="text"
                    color={hasLiked ? "red" : "gray"}
                    className={`flex animate-fade-in flex-col items-center gap-1 text-5xl ${
                      hasLiked ? "text-red-300" : ""
                    }`}
                  >
                    <AiFillHeart />
                    <span className="text-sm">{formattedLikes}</span>
                  </Button>
                </Tooltip>
              </Show>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await JSONSerialize(await getAllProjects());

  if (projects) {
    const paths = projects.map((p) => ({ params: { slug: p.slug } }));

    return { fallback: false, paths };
  } else {
    return { fallback: false, paths: [] };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  if (!params?.slug) return { notFound: true };
  if (typeof params.slug !== "string") return { notFound: true };

  const props = await JSONSerialize(
    await getProjectWithPrevAndNext(params.slug)
  );

  if (props) {
    return props.project === null ? { notFound: true } : { props };
  } else {
    return { notFound: true };
  }
};
