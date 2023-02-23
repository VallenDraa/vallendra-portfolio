import type { GetStaticPaths, GetStaticProps } from "next";
import { Typography } from "@material-tailwind/react";
import { BsArrowLeft } from "react-icons/bs";
import { FaDownload, FaGithub } from "react-icons/fa";
import { SlGlobe } from "react-icons/sl";
import R from "react";
import { useRouter } from "next/router";
import { IoWarning } from "react-icons/io5";
import dynamic from "next/dynamic";
import type Project from "interfaces/project.interface";
import type { Technologies, Language } from "types/types";
import TechWithTooltip from "components/MappedComponents/TechsWithTooltip";
import Show from "utils/client/jsx/Show";
import CopyLinkBtn from "components/Showcase/ShowcaseDetailsPage/CopyLinkBtn";
import ActionButton from "components/StyledComponents/ActionButton";
import SectionSubHeading from "components/Typography/SectionSubHeading";
import LinkWithUnderline from "components/Showcase/ShowcaseDetailsPage/LinkWithUnderline";
import { commaSeparator } from "utils/client/helpers/formatter";
import LanguageToggle from "components/Showcase/ShowcaseDetailsPage/LanguageToggle";
import {
  getAllProjects,
  getProjectWithPrevAndNext,
} from "server/service/projects/projects.service";
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
  /* Others
  =================== */
  const router = useRouter();
  const [showAlert, setShowAlert] = R.useState(false);

  /* Language switcher
  =================== */
  const [activeLanguage, setActiveLanguage] = R.useState<Language>("en");

  /* Dynamic data
  ================== */
  const [willFetchStats, setWillFetchStats] = R.useState(false);
  const viewsRes = useGetViewsById(project._id, "projects", willFetchStats);
  const likesRes = useGetLikesById(project._id, "projects", willFetchStats);

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
        const alertHandler = (await import("utils/client/helpers/alertHandler"))
          .default;

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
        const alertHandler = (await import("utils/client/helpers/alertHandler"))
          .default;

        alertHandler({ setShowAlert });
      } finally {
        setWillFetchStats(true);
      }
    })();
  }, [router.asPath, project._id]);

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
      likesRes.mutate(
        likesRes.data === undefined
          ? undefined
          : {
              ...likesRes.data,
              hasLiked: true,
              likes: likesRes.data.likes + 1,
            },
        { revalidate: false },
      );
      setHasLiked(true);
    } else {
      likesRes.mutate(
        likesRes.data === undefined
          ? undefined
          : {
              ...likesRes.data,
              hasLiked: false,
              likes: likesRes.data.likes - 1,
            },
        { revalidate: false },
      );
      setHasLiked(false);
    }

    setWillSendLike(true);
  }

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

      <header className="fade-bottom relative mt-6 mb-3 after:-top-7">
        <section className="layout flex flex-col justify-between gap-2 border-b-2 border-indigo-100 pt-16 pb-3 dark:border-white/30 lg:flex-row lg:gap-5">
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
      <main className="layout relative flex grow flex-col gap-8 py-5">
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
          <aside className="detail-aside-colors sticky top-20 mt-3 flex h-fit grow flex-row items-center justify-between gap-4 rounded-md p-4 lg:flex-col">
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
              onClick={toggleLike}
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
