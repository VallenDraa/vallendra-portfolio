import type { GetStaticPaths, GetStaticProps } from "next";
import { BsArrowLeft } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa";
import R from "react";
import { IoWarning } from "react-icons/io5";
import dynamic from "next/dynamic";
import Show from "utils/client/jsx/Show";
import CopyLinkBtn from "components/Showcase/ShowcaseDetailsPage/CopyLinkBtn";
import SectionSubHeading from "components/Typography/SectionSubHeading";
import LinkWithUnderline from "components/Showcase/ShowcaseDetailsPage/LinkWithUnderline";
import type Certificate from "interfaces/certificate.interface";
import { commaSeparator } from "utils/client/helpers/formatter";
import LanguageToggle from "components/Showcase/ShowcaseDetailsPage/LanguageToggle";
import type { Language } from "types/types";
import { JSONSerialize } from "utils/server/serialize";
import useGetViewsById from "utils/client/hooks/useGetViewsById";
import useGetLikesById from "utils/client/hooks/useGetLikesById";
import useDebounce from "utils/client/hooks/useDebounce";
import ShowcaseStats from "components/Showcase/ShowcaseDetailsPage/ShowcaseStats";
import SectionHeading from "components/Typography/SectionHeading";
import type { LikesOperationBody } from "types/api.types";
import LikeButton from "components/Showcase/ShowcaseDetailsPage/LikeButton";
import ShowcaseImage from "components/Showcase/ShowcaseDetailsPage/ShowcaseImage";
import ShowcaseSeoComponent from "components/Showcase/ShowcaseDetailsPage/ShowcaseSeoComponent";
import type { ShowcaseDetailRedirect } from "interfaces/showcase.interface";
import useIncrementViewOnLoad from "utils/client/hooks/useIncrementViewOnLoad";
import {
  getAllItems,
  getItemWithPrevAndNext,
} from "server/service/showcase/showcase.service";
import CertificateModel from "server/mongo/model/certificate.model";
import StyledButton from "components/StyledComponents/StyledButton";

type CertificateDetailsProps = {
  certificate: Certificate;
  prevCertificate: ShowcaseDetailRedirect;
  nextCertificate: ShowcaseDetailRedirect;
};

const StyledAlert = dynamic(
  () => import("components/StyledComponents/StyledAlert"),
  { ssr: false },
);

const DetailFooter = dynamic(
  () => import("components/Showcase/ShowcaseDetailsPage/DetailFooter"),
  { ssr: false },
);

export default function CertificateDetails({
  certificate,
  prevCertificate,
  nextCertificate,
}: CertificateDetailsProps) {
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
    certificate._id,
    "certificates",
    onIncrementError,
  );

  /* Dynamic data
  ================== */
  const viewsRes = useGetViewsById(
    certificate._id,
    "certificates",
    finishedUpdatingViews,
  );
  const likesRes = useGetLikesById(
    certificate._id,
    "certificates",
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
          : certificate.likes,
      ),
    [likesRes.data?.likes, certificate.likes],
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
      await fetch(`/api/certificates/likes/${certificate._id}`, {
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
        showcaseItem={certificate}
      />

      <StyledAlert
        icon={<IoWarning className="text-2xl" />}
        color="red"
        show={showAlert}
        onClose={() => setShowAlert(false)}
      >
        <span>
          Oops, please try to reload or try visiting the page at a later time !
        </span>
      </StyledAlert>

      <header
        id="skip-to-content"
        className="fade-bottom relative mb-3 mt-6 after:top-10"
      >
        <section className="layout flex flex-col justify-between gap-2 border-b-2 border-indigo-200 pb-3 pt-36 dark:border-zinc-700">
          <LinkWithUnderline href="/certificates">
            <BsArrowLeft />
            Back To Certificate Page
          </LinkWithUnderline>

          {/* title */}
          <div className="pt-2">
            <SectionHeading
              title={certificate.name}
              subTitle={
                activeLanguage === "en"
                  ? certificate.shortDescriptionEN
                  : certificate.shortDescriptionID
              }
            />
          </div>

          <div className="flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
            <ShowcaseStats
              dateString={certificate.madeAt as string}
              isLoadingStats={
                !(viewsRes.error && likesRes.error) &&
                (viewsRes.data?.views === undefined ||
                  likesRes.data?.likes === undefined)
              }
              hasLiked={hasLiked}
              likes={
                likesRes.data?.likes !== undefined
                  ? likesRes.data?.likes
                  : certificate.likes
              }
              views={
                viewsRes.data?.views !== undefined
                  ? viewsRes.data?.views
                  : certificate.views
              }
            />
            <LanguageToggle
              activeLanguage={activeLanguage}
              setActiveLanguage={setActiveLanguage}
            />
          </div>
        </section>
      </header>

      {/* the certificate data */}
      <main className="layout relative flex grow flex-col gap-8 py-5">
        <ShowcaseImage
          cldImageSrc={certificate.image}
          name={certificate.name}
        />

        {/* details */}
        <section className="flex flex-col gap-8 lg:flex-row lg:gap-2">
          <div className="relative flex basis-3/4 flex-col gap-12">
            {/* description of the certicates */}
            <div className="relative z-10 flex flex-col gap-4">
              <SectionSubHeading>Description</SectionSubHeading>
              <p className="px-3 text-justify font-normal leading-loose text-indigo-600 dark:text-zinc-400">
                <Show when={activeLanguage === "en"}>
                  {certificate.descriptionEN}
                </Show>
                <Show when={activeLanguage === "id"}>
                  {certificate.descriptionID}
                </Show>
              </p>
            </div>
          </div>

          {/* link for the code of this certificate */}
          <aside className="detail-aside-colors sticky top-20 mt-3 flex h-fit grow flex-row items-center justify-between gap-4 rounded-md border-2 p-4 lg:flex-col">
            {/* see certificate and copy link button */}
            <div className="flex w-full flex-col gap-3">
              <Show when={!!certificate.certificateLink}>
                <StyledButton
                  alwaysShowIcon
                  className="border border-blue-500 px-6 py-3 text-blue-500 hover:bg-blue-500/10"
                  href={certificate.certificateLink}
                  icon={<FaRegNewspaper className="text-lg text-blue-500" />}
                >
                  See Certificate
                </StyledButton>
              </Show>

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

        {/* details footer, includes link */}
        <DetailFooter
          showcaseType="certificates"
          prevShowcase={prevCertificate}
          nextShowcase={nextCertificate}
        />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const certificates = await JSONSerialize(await getAllItems(CertificateModel));

  if (certificates) {
    const paths = certificates.map(c => ({ params: { slug: c.slug } }));

    return { fallback: false, paths };
  }
  return { fallback: false, paths: [] };
};

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context;

  if (!params?.slug) return { notFound: true };
  if (typeof params.slug !== "string") return { notFound: true };

  const { item, nextItem, prevItem } = await getItemWithPrevAndNext(
    CertificateModel,
    params.slug,
  );

  const props = await JSONSerialize({
    certificate: item,
    nextCertificate: nextItem,
    prevCertificate: prevItem,
  });

  if (props) {
    return props.certificate === null ? { notFound: true } : { props };
  }
  return { notFound: true };
};
