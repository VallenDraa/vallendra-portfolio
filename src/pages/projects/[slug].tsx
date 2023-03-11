import type { GetStaticPaths, GetStaticProps } from "next";
import { Typography } from "@material-tailwind/react";
import { BsArrowLeft } from "react-icons/bs";
import { FaDownload, FaGithub } from "react-icons/fa";
import { SlGlobe } from "react-icons/sl";
import R from "react";
import { IoWarning } from "react-icons/io5";
import dynamic from "next/dynamic";
import type Project from "interfaces/project.interface";
import type { Technologies, Language } from "types/types";
import TechWithTooltip from "components/MappedComponents/TechsWithTooltip";
import Show from "utils/client/jsx/Show";
import CopyLinkBtn from "components/Showcase/ShowcaseDetailsPage/CopyLinkBtn";
import SectionSubHeading from "components/Typography/SectionSubHeading";
import LinkWithUnderline from "components/Showcase/ShowcaseDetailsPage/LinkWithUnderline";
import { commaSeparator } from "utils/client/helpers/formatter";
import LanguageToggle from "components/Showcase/ShowcaseDetailsPage/LanguageToggle";
import { JSONSerialize } from "utils/server/serialize";
import useGetViewsById from "utils/client/hooks/useGetViewsById";
import useGetLikesById from "utils/client/hooks/useGetLikesById";
import useDebounce from "utils/client/hooks/useDebounce";
import ShowcaseStats from "components/Showcase/ShowcaseDetailsPage/ShowcaseStats";
import SectionHeading from "components/Typography/SectionHeading";
import StyledScrollbar from "components/StyledComponents/StyledScrollbar";
import type { LikesOperationBody } from "types/api.types";
import ShowcaseImage from "components/Showcase/ShowcaseDetailsPage/ShowcaseImage";
import LikeButton from "components/Showcase/ShowcaseDetailsPage/LikeButton";
import ShowcaseSeoComponent from "components/Showcase/ShowcaseDetailsPage/ShowcaseSeoComponent";
import type { ShowcaseDetailRedirect } from "interfaces/showcase.interface";
import useIncrementViewOnLoad from "utils/client/hooks/useIncrementViewOnLoad";
import {
  getAllItems,
  getItemWithPrevAndNext,
} from "server/service/showcase/showcase.service";
import ProjectModel from "server/mongo/model/project.model";
import StyledButton from "components/StyledComponents/StyledButton";

export type ProjectDetailsProps = {
  project: Project;
  prevProject: ShowcaseDetailRedirect;
  nextProject: ShowcaseDetailRedirect;
};

const StyledAlert = dynamic(
  () => import("components/StyledComponents/StyledAlert"),
  { ssr: false },
);

const DetailFooter = dynamic(
  () => import("components/Showcase/ShowcaseDetailsPage/DetailFooter"),
  { ssr: false },
);

export default function ProjectDetails({
  project,
  nextProject,
  prevProject,
}: ProjectDetailsProps) {
  const [showAlert, setShowAlert] = R.useState(false);
  const [activeLanguage, setActiveLanguage] = R.useState<Language>("en");

  /* add view on load 
  =================== */
  const onIncrementError = R.useCallback(async () => {
    const alertHandler = (await import("utils/client/helpers/alertHandler"))
      .default;

    alertHandler({ setShowAlert });
  }, []);
  const { finishedUpdatingViews } = useIncrementViewOnLoad(
    project._id,
    "projects",
    onIncrementError,
  );

  /* Dynamic data
  ================== */
  const viewsRes = useGetViewsById(
    project._id,
    "projects",
    finishedUpdatingViews,
  );
  const likesRes = useGetLikesById(
    project._id,
    "projects",
    finishedUpdatingViews,
  );

  /* Likes
  ================== */
  const [willSendLike, setWillSendLike] = R.useState(false);
  const [hasLiked, setHasLiked] = R.useState(false);
  const formattedLikes = R.useMemo(
    () =>
      commaSeparator.format(
        likesRes.data?.likes !== undefined
          ? likesRes.data?.likes
          : project.likes,
      ),
    [likesRes.data?.likes, project.likes],
  );

  const optimisticLikeUpdate = R.useCallback(async () => {
    if (!hasLiked) {
      likesRes.mutate(
        oldData =>
          oldData === undefined
            ? undefined
            : { ...oldData, hasLiked: true, likes: oldData.likes + 1 },
        { revalidate: false },
      );

      setHasLiked(true);
    } else {
      likesRes.mutate(
        oldData =>
          oldData === undefined
            ? undefined
            : { ...oldData, hasLiked: false, likes: oldData.likes - 1 },
        { revalidate: false },
      );

      setHasLiked(false);
    }

    setWillSendLike(true);
  }, [hasLiked]);

  const updateLike = R.useCallback(async () => {
    if (!willSendLike) return;
    const operation: LikesOperationBody = {
      operation: hasLiked ? "increment" : "decrement",
    };

    try {
      await fetch(`/api/projects/likes/${project._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(operation),
      });

      setWillSendLike(false);
    } catch (error) {
      onIncrementError();
    }
  }, [willSendLike, hasLiked]);

  const [, likeUpdateError] = useDebounce(updateLike, 500, [
    willSendLike,
    hasLiked,
  ]);

  R.useEffect(
    () => setHasLiked(likesRes.data?.hasLiked || false),
    [likesRes.data?.hasLiked],
  );

  /* Toggle alert when there is an like error
  =================================================== */
  R.useEffect(() => {
    if (likeUpdateError) setShowAlert(true);
  }, [likeUpdateError]);

  return (
    <>
      <ShowcaseSeoComponent
        activeLanguage={activeLanguage}
        showcaseItem={project}
      />

      <StyledAlert
        icon={<IoWarning className="text-2xl" />}
        color="red"
        show={showAlert}
        dismissible={{ onClose: () => setShowAlert(false) }}
      >
        Oops, please try to reload or try visiting the page at a later time !
      </StyledAlert>

      <header className="fade-bottom relative mt-6 mb-3 after:-top-6">
        <section className="layout flex flex-col justify-between gap-2 border-b-2 border-indigo-200 pt-16 pb-3 dark:border-zinc-700">
          {/* back to project button */}
          <LinkWithUnderline href="/projects">
            <BsArrowLeft />
            Back To Project Page
          </LinkWithUnderline>

          {/* title */}
          <div className="pt-2">
            <SectionHeading
              title={project.name}
              subTitle={
                activeLanguage === "en"
                  ? project.shortDescriptionEN
                  : project.shortDescriptionID
              }
            />
          </div>

          <div className="flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
            <ShowcaseStats
              dateString={project.madeAt as string}
              isLoadingStats={
                !(viewsRes.error && likesRes.error) &&
                (viewsRes.data?.views === undefined ||
                  likesRes.data?.likes === undefined)
              }
              hasLiked={hasLiked}
              likes={
                likesRes.data?.likes !== undefined
                  ? likesRes.data?.likes
                  : project.likes
              }
              views={
                viewsRes.data?.views !== undefined
                  ? viewsRes.data?.views
                  : project.views
              }
            />
            <LanguageToggle
              activeLanguage={activeLanguage}
              setActiveLanguage={setActiveLanguage}
            />
          </div>
        </section>
      </header>

      {/* the project data */}
      <main
        id="skip-to-content"
        className="layout relative flex grow flex-col gap-8 py-5"
      >
        {/* image */}
        <ShowcaseImage cldImageSrc={project.image} name={project.name} />

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
                {project.tech.map(
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
                className="px-3 text-justify font-normal leading-loose text-zinc-600 dark:text-zinc-400"
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
          <aside className="detail-aside-colors sticky top-20 mt-3 flex h-fit grow flex-row items-center justify-between gap-4 rounded-md p-4 lg:flex-col">
            <div className="flex w-full flex-col gap-3">
              {/* when the project has download link */}
              <Show when={!!project.downloadLink}>
                <StyledButton
                  alwaysShowIcon
                  className="border border-blue-500 py-3 px-6 text-blue-500 hover:bg-blue-500/10"
                  href={project.downloadLink as string}
                  icon={<FaDownload className="text-lg text-blue-500" />}
                >
                  Download
                </StyledButton>
              </Show>

              {/* when the project has a website link */}
              <Show when={!!project.siteLink}>
                <StyledButton
                  alwaysShowIcon
                  className="border border-blue-500 py-3 px-6 text-blue-500 hover:bg-blue-500/10"
                  href={project.siteLink as string}
                  icon={<SlGlobe className="text-lg text-blue-500" />}
                >
                  Visit Site
                </StyledButton>
              </Show>

              {/* Github Link */}
              <StyledButton
                alwaysShowIcon
                icon={<FaGithub className="text-lg" />}
                href={project.gitLink}
                className="border border-zinc-500 py-3 px-6 text-zinc-500 hover:bg-zinc-500/10 dark:border-zinc-400 dark:text-zinc-400"
              >
                Visit Repo
              </StyledButton>

              {/* copy link to clipboard */}
              <CopyLinkBtn />
            </div>

            {/* Like button */}
            <LikeButton
              showSkeleton={
                !(viewsRes.error && likesRes.error) &&
                (viewsRes.data?.views === undefined ||
                  likesRes.data?.likes === undefined)
              }
              revealButton={
                !(viewsRes.error && likesRes.error) &&
                viewsRes.data?.views !== undefined &&
                likesRes.data?.likes !== undefined
              }
              hasLikedShowcase={hasLiked}
              formattedLikes={formattedLikes}
              onClick={optimisticLikeUpdate}
            />
          </aside>
        </section>

        {/* comments */}
        <DetailFooter
          showcaseType="projects"
          prevShowcase={prevProject}
          nextShowcase={nextProject}
        />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await JSONSerialize(await getAllItems(ProjectModel));

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

  const { item, nextItem, prevItem } = await getItemWithPrevAndNext(
    ProjectModel,
    params.slug,
  );

  const props = await JSONSerialize({
    project: item,
    nextProject: nextItem,
    prevProject: prevItem,
  });

  if (props) {
    return props.project === null ? { notFound: true } : { props };
  }
  return { notFound: true };
};
