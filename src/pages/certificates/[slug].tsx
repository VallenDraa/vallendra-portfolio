import { GetStaticPaths, GetStaticProps } from "next";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { AiFillHeart } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa";
import R from "react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/router";
import { IoWarning } from "react-icons/io5";
import dynamic from "next/dynamic";
import Show from "utils/client/jsx/Show";
import CopyLinkBtn from "components/Showcase/ShowcaseDetailsPage/CopyLinkBtn";
import ActionButton from "components/StyledComponents/ActionButton";
import SectionSubHeading from "components/Typography/SectionSubHeading";
import LinkWithUnderline from "components/Showcase/ShowcaseDetailsPage/LinkWithUnderline";
import type Certificate from "interfaces/certificate.interface";
import { commaSeparator } from "utils/client/helpers/formatter";
import LanguageToggle from "components/Showcase/ShowcaseDetailsPage/LanguageToggle";
import type { Language } from "components/Showcase/ShowcaseDetailsPage/LanguageToggle";
import {
  getAllCertificates,
  getCertificateWithPrevAndNext,
} from "server/service/certificates/certificates.service";
import { JSONSerialize } from "utils/server/serialize";
import useGetViewsById from "utils/client/hooks/useGetViewsById";
import useGetLikesById from "utils/client/hooks/useGetLikesById";
import showcaseSeo from "seo/showcase.seo";
import useDebounce from "utils/client/hooks/useDebounce";
import Seo from "seo/Seo";
import ShowcaseStats from "components/Showcase/ShowcaseDetailsPage/ShowcaseStats";
import SectionHeading from "components/Typography/SectionHeading";
import type { LikesOperationBody } from "types/api.types";

interface CertificateRedirect {
  slug: string;
  name: string;
}

interface PropsData {
  certificate: Certificate;
  prevCertificate: CertificateRedirect;
  nextCertificate: CertificateRedirect;
}

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
    const { name, slug, shortDescriptionEN, shortDescriptionID } = certificate;

    return showcaseSeo({
      title: name,
      slug,
      shortDesc:
        activeLanguage === "en" ? shortDescriptionEN : shortDescriptionID,
      type: "certificates",
    });
  }, [certificate, activeLanguage]);

  /* Dynamic data
  ================== */
  const [willFetchStats, setWillFetchStats] = R.useState(false);
  const viewsRes = useGetViewsById(
    certificate._id,
    "certificates",
    willFetchStats,
  );
  const likesRes = useGetLikesById(
    certificate._id,
    "certificates",
    willFetchStats,
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
  const [, likeUpdateError] = useDebounce(
    async () => {
      if (!willSendLike) return;
      const operation: LikesOperationBody = {
        operation: hasLiked ? "increment" : "decrement",
      };

      try {
        await fetch(`/api/likes/certificates/${certificate._id}`, {
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
        await fetch(`/api/views/certificates/${certificate._id}`, {
          method: "PUT",
        });
      } catch (error) {
        const alertHandler = (await import("utils/client/helpers/alertHandler"))
          .default;

        alertHandler({ setShowAlert });
      } finally {
        setWillFetchStats(true);
      }
    })();
  }, [router.asPath, certificate._id]);

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
      setHasLiked(true);

      likesRes.mutate(
        likesRes.data === undefined
          ? undefined
          : {
              ...likesRes.data,
              hasLiked: true,
              likes: likesRes.data.likes + 1,
            },
      );
    } else {
      setHasLiked(false);

      likesRes.mutate(
        likesRes.data === undefined
          ? undefined
          : {
              ...likesRes.data,
              hasLiked: false,
              likes: likesRes.data.likes - 1,
            },
      );
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
            {/* back to certificates button */}
            <LinkWithUnderline href="/certificates">
              <BsArrowLeft />
              Back To Certificates
            </LinkWithUnderline>

            {/* title */}
            <div className="pt-4">
              <SectionHeading
                title={certificate.name}
                subTitle={
                  activeLanguage === "en"
                    ? certificate.shortDescriptionEN
                    : certificate.shortDescriptionID
                }
              />
            </div>

            <div className="mt-5">
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

      {/* the certificate data */}
      <main className="relative mx-auto flex w-full max-w-screen-xl grow flex-col gap-8 px-8 py-5 2xl:px-2">
        {/* image */}
        <figure className="mx-auto w-full md:w-[95%]">
          <CldImage
            format="webp"
            priority
            quality={45}
            src={certificate.image}
            alt={certificate.name}
            width={1280}
            height={720}
            className="w-full rounded-md object-cover opacity-90"
          />

          <figcaption className="pt-2 text-center text-sm text-indigo-300 dark:text-gray-500">
            <span>Screenshot of {certificate.name}</span>
          </figcaption>
        </figure>

        {/* details */}
        <section className="flex flex-col gap-8 lg:flex-row lg:gap-2">
          <div className="relative flex basis-3/4 flex-col gap-12">
            {/* description of the certicates */}
            <div className="relative z-10 flex flex-col gap-4">
              <SectionSubHeading>Description</SectionSubHeading>
              <Typography
                variant="paragraph"
                className="px-3 text-justify font-normal leading-loose text-indigo-600 dark:text-gray-400"
              >
                <Show when={activeLanguage === "en"}>
                  {certificate.descriptionEN}
                </Show>
                <Show when={activeLanguage === "id"}>
                  {certificate.descriptionID}
                </Show>
              </Typography>
            </div>
          </div>

          {/* link for the code of this certificate */}
          <aside className="detail-aside-colors sticky top-20 mt-3 flex h-fit grow flex-row items-center justify-between gap-4 rounded-md p-4 lg:flex-col">
            {/* see certificate and copy link button */}
            <div className="flex w-full flex-col gap-3">
              <ActionButton
                href={certificate.certificateLink}
                variant="outlined"
                color="blue"
                className="flex w-full justify-center"
              >
                {/* certificate link text */}
                <Show when={!!certificate.certificateLink}>
                  <FaRegNewspaper className="text-lg text-blue-500" />
                  <span>See Certificate</span>
                </Show>
              </ActionButton>

              {/* copy link to clipboard */}
              <CopyLinkBtn />
            </div>

            {/* Like button */}
            <Show
              when={
                !(viewsRes.error && likesRes.error) &&
                (viewsRes.data?.views === undefined ||
                  likesRes.data?.likes === undefined)
              }
            >
              <div className="flex h-24 w-24 animate-pulse flex-col gap-2">
                <div className="basis-3/4 rounded-lg bg-white/20" />
                <div className="basis-1/4 rounded-lg bg-white/20" />
              </div>
            </Show>
            <Show
              when={
                !(viewsRes.error && likesRes.error) &&
                viewsRes.data?.views !== undefined &&
                likesRes.data?.likes !== undefined
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

        {/* details footer, includes link */}
        <DetailFooter
          prevLink={`/certificates/${prevCertificate.slug}`}
          prevTitle={prevCertificate.name}
          nextLink={`/certificates/${nextCertificate.slug}`}
          nextTitle={nextCertificate.name}
        />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const certificates = await JSONSerialize(await getAllCertificates());

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

  const props = await JSONSerialize(
    await getCertificateWithPrevAndNext(params.slug),
  );

  if (props) {
    return props.certificate === null ? { notFound: true } : { props };
  }
  return { notFound: true };
};
