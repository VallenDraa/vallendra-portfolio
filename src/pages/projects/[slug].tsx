import { GetStaticPaths, GetStaticProps } from "next";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { AiFillHeart } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { FaDownload, FaGithub } from "react-icons/fa";
import { SlGlobe } from "react-icons/sl";
import { CldImage } from "next-cloudinary";
import R from "react";
import { useRouter } from "next/router";
import { IoWarning } from "react-icons/io5";
import dynamic from "next/dynamic";
import Project from "../../interfaces/project.interface";
import { Language, LikesOperationBody, Technologies } from "../../types/types";
import TechWithTooltip from "../../components/MappedComponents/TechsWithTooltip";
import Show from "../../utils/client/jsx/Show";
import CopyLinkBtn from "../../components/ShowcaseDetailsPage/CopyLinkBtn";
import ActionButton from "../../components/StyledComponents/ActionButton";
import SectionSubHeading from "../../components/Typography/SectionSubHeading";
import LinkWithUnderline from "../../components/ShowcaseDetailsPage/LinkWithUnderline";
import { commaSeparator } from "../../utils/client/helpers/formatter";
import LanguageToggle from "../../components/ShowcaseDetailsPage/LanguageToggle";
import {
  getAllProjects,
  getProjectWithPrevAndNext,
} from "../../server/service/projects/projects.service";
import { JSONSerialize } from "../../utils/server/serialize";
import useGetViewsById from "../../utils/client/hooks/useGetViewsById";
import useGetLikesById from "../../utils/client/hooks/useGetLikesById";
import useDebounce from "../../utils/client/hooks/useDebounce";
import showcaseSeo from "../../seo/showcase.seo";
import Seo from "../../seo/Seo";
import ShowcaseStats from "../../components/ShowcaseDetailsPage/ShowcaseStats";
import SectionHeading from "../../components/Typography/SectionHeading";
import StyledScrollbar from "../../components/StyledComponents/StyledScrollbar";

interface ProjectRedirect {
  slug: string;
  name: string;
}

interface PropsData {
  project: Project;
  prevProject: ProjectRedirect;
  nextProject: ProjectRedirect;
}

const StyledAlert = dynamic(
  () => import("../../components/StyledComponents/StyledAlert"),
  { ssr: false },
);

const DetailFooter = dynamic(
  () => import("../../components/ShowcaseDetailsPage/DetailFooter"),
  { ssr: false },
);

export default function ProjectDetails({
  project,
  prevProject,
  nextProject,
}: PropsData) {
  /* Others
  =================== */
  const router = useRouter();
  const [showAlert, setShowAlert] = R.useState(false);

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

  /* Dynamic data
  ================== */
  const [willFetchStats, setWillFetchStats] = R.useState(false);
  const viewsRes = useGetViewsById(project._id, "projects", willFetchStats);
  const likesRes = useGetLikesById(project._id, "projects", willFetchStats);

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
        const alertHandler = (
          await import("../../utils/client/helpers/alertHandler")
        ).default;

        alertHandler({ setShowAlert });
      }
    },
    500,
    [willSendLike, hasLiked],
  );

  /* For incrementing view upon page load
  ==================================================== */
  R.useEffect(() => {
    (async () => {
      try {
        setWillFetchStats(false);
        await fetch(`/api/views/projects/${project._id}`, { method: "PUT" });
      } catch (error) {
        const alertHandler = (
          await import("../../utils/client/helpers/alertHandler")
        ).default;

        alertHandler({ setShowAlert });
      } finally {
        setWillFetchStats(true);
      }
    })();
  }, [router.asPath, project._id]);

  /* For setting the fetched like to the local likes 
  =================================================== */
  R.useEffect(() => {
    setLikes(
      typeof likesRes.data?.likes !== "number"
        ? project.likes
        : likesRes.data?.likes,
    );
  }, [likesRes.data?.likes]);

  /* For setting the fetched hasLiked to the local hasLiked 
  =================================================== */
  R.useEffect(() => {
    setHasLiked(likesRes.data?.hasLiked || false);
  }, [likesRes.data?.hasLiked]);

  /* Toggle alert when there is an like error
  =================================================== */
  R.useEffect(() => {
    if (likeUpdateError) setShowAlert(true);
  }, [likeUpdateError]);

  async function toggleLike() {
    if (!hasLiked) {
      setLikes(oldLikes => oldLikes + 1);
      setHasLiked(true);
    } else {
      setLikes(oldLikes => oldLikes - 1);
      setHasLiked(false);
    }

    setWillSendLike(true);
  }

  return (
    <>
      <Seo {...seoData} />

      <StyledAlert
        icon={<IoWarning className="text-2xl" />}
        color="red"
        show={showAlert}
        dismissible={{ onClose: () => setShowAlert(false) }}
      >
        Oops, please try to reload or try visiting the page at a later time !
      </StyledAlert>

      <header className="fade-bottom relative mt-6 mb-3 w-full px-8 after:-top-7">
        <section className="mx-auto flex max-w-screen-xl flex-col justify-between gap-2 border-b-2 border-indigo-100 pt-16 pb-3 dark:border-white/30 lg:flex-row lg:gap-5 2xl:px-2">
          <div>
            {/* back to project button */}
            <LinkWithUnderline href="/projects">
              <BsArrowLeft />
              Back To Projects
            </LinkWithUnderline>

            {/* title */}
            <div className="pt-4">
              <SectionHeading
                title={project.name}
                subTitle={
                  activeLanguage === "en"
                    ? project.shortDescriptionEN
                    : project.shortDescriptionID
                }
              />
            </div>

            <div className="mt-5">
              <ShowcaseStats
                dateString={project.madeAt as string}
                isLoadingStats={
                  viewsRes.isLoading &&
                  likesRes.isLoading &&
                  !(viewsRes.error && likesRes.error) &&
                  !viewsRes.data?.views &&
                  !likesRes.data?.likes &&
                  !willFetchStats
                }
                hasLiked={hasLiked}
                likes={likes}
                views={viewsRes.data?.views || project.views}
              />
            </div>
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
            format="webp"
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
              <SectionSubHeading>Tech Stack</SectionSubHeading>
              <StyledScrollbar
                autoHeight
                autoHeightMin="100%"
                autoHeightMax="100%"
                renderView={props => (
                  <ul {...props} className="relative flex items-center gap-1" />
                )}
              >
                {project?.tech.map(
                  (tech: Technologies): JSX.Element => (
                    <li key={tech}>{TechWithTooltip[tech]()}</li>
                  ),
                )}
              </StyledScrollbar>
            </div>

            {/* description and features of the app */}
            <div className="relative z-10 flex flex-col gap-4">
              <SectionSubHeading>Description</SectionSubHeading>
              <Typography
                variant="paragraph"
                className="px-3 text-justify font-normal leading-loose text-indigo-600 dark:text-gray-400"
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
            <Show
              when={
                viewsRes.isLoading &&
                likesRes.isLoading &&
                !(viewsRes.error && likesRes.error) &&
                !viewsRes.data?.views &&
                !likesRes.data?.likes &&
                !willFetchStats
              }
            >
              <div className="flex h-24 w-24 animate-pulse flex-col gap-2">
                <div className="basis-3/4 rounded-lg bg-white/20" />
                <div className="basis-1/4 rounded-lg bg-white/20" />
              </div>
            </Show>
            <Show
              when={
                !(viewsRes.isLoading && likesRes.isLoading) &&
                !(viewsRes.error && likesRes.error) &&
                !!viewsRes.data?.views &&
                !!likesRes.data?.likes &&
                willFetchStats
              }
            >
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
                  className={`flex animate-fade-in flex-col items-center gap-1 overflow-hidden text-5xl ${
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
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await JSONSerialize(await getAllProjects());

  if (projects) {
    const paths = projects.map(p => ({ params: { slug: p.slug } }));

    return { fallback: false, paths };
  }
  return { fallback: false, paths: [] };
};

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context;

  if (!params?.slug) return { notFound: true };
  if (typeof params.slug !== "string") return { notFound: true };

  const props = await JSONSerialize(
    await getProjectWithPrevAndNext(params.slug),
  );

  if (props) {
    return props.project === null ? { notFound: true } : { props };
  }
  return { notFound: true };
};
