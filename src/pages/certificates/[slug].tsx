import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import SiteFooter from "../../components/SiteFooter";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { AiFillHeart } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import Image from "next/image";
import { FaRegNewspaper } from "react-icons/fa";
import Show from "../../utils/client/jsx/Show";
import CopyLinkBtn from "../../components/DetailsPage/CopyLinkBtn";
import ActionButton from "../../components/StyledComponents/ActionButton";
import SectionHeading from "../../components/SectionHeading";
import LinkWithUnderline from "../../components/DetailsPage/LinkWithUnderline";
import { useState, useMemo } from "react";
import Certificate from "../../interfaces/certificate.interface";
import Head from "next/head";
import allCertificates from "../../utils/datas/certificates/allCertificates";
import ViewsAndLikes from "../../components/DetailsPage/ViewsAndLikes";
import DetailFooter from "../../components/DetailsPage/DetailFooter";
import { commaSeparator } from "../../utils/client/helpers/formatter";
import LanguageToggle from "../../components/DetailsPage/LanguageToggle";
import { language } from "../../types/types";
import {
  getAllCertificates,
  getCertificateWithPrevAndNext,
} from "../../server/service/certificates/certificates.service";
import { CldImage } from "next-cloudinary";

interface CertificateRedirect {
  slug: string;
  name: string;
}

interface PropsData {
  certificate: Certificate;
  prevCertificate: CertificateRedirect;
  nextCertificate: CertificateRedirect;
}

export default function CertificateDetails({
  certificate,
  prevCertificate,
  nextCertificate,
}: PropsData) {
  const pageTitle = `VallenDra | ${certificate.name}`;

  /* language switcher
  =================== */
  const [activeLanguage, setActiveLanguage] = useState<language>("en");

  /* Likes
  ========= */
  const [likes, setLikes] = useState(certificate.likes);
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
          <section className="relative z-10 flex flex-col justify-between gap-5 border-b-2 border-indigo-100 pb-3 dark:border-white/30 lg:flex-row">
            <div>
              {/* back to certificates button */}
              <LinkWithUnderline href="/certificates">
                <BsArrowLeft />
                Back To Certificates
              </LinkWithUnderline>

              {/* title */}
              <Typography
                as="h1"
                variant="h1"
                className="primary-gradient relative z-40 mt-4 w-fit animate-breathing bg-gradient-to-r bg-gradient bg-clip-text text-start text-4xl font-bold capitalize !leading-[initial] text-transparent md:text-5xl"
              >
                {certificate.name}
              </Typography>

              {/* short description */}
              <Typography
                as="p"
                variant="paragraph"
                className="mt-1 pl-0.5 text-justify text-base font-medium leading-loose text-indigo-700 dark:text-gray-200 md:text-lg"
              >
                <Show when={activeLanguage === "en"}>
                  {certificate.shortDescriptionEN}
                </Show>
                <Show when={activeLanguage === "id"}>
                  {certificate.shortDescriptionID}
                </Show>
              </Typography>

              <ViewsAndLikes
                hasLiked={hasLiked}
                likes={likes}
                views={certificate.views}
              />
            </div>
            <div className="flex lg:self-end lg:px-2">
              <LanguageToggle
                activeLanguage={activeLanguage}
                cb={() =>
                  setActiveLanguage((prev) => (prev === "en" ? "id" : "en"))
                }
              />
            </div>
          </section>
        </header>

        {/* the certificate data */}
        <main className="relative mx-auto flex w-full max-w-screen-xl grow flex-col gap-8 px-8 py-5 xl:px-0">
          {/* image */}
          <figure className="mx-auto w-full md:w-[95%]">
            <CldImage
              priority
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
                <SectionHeading>Description</SectionHeading>
                <Typography
                  variant="paragraph"
                  className="px-3 font-normal leading-loose text-indigo-600 dark:text-gray-400"
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
            <aside className="detail-aside-colors sticky top-10 mt-3 flex h-fit grow flex-row items-center justify-between gap-4 rounded-md p-4 lg:flex-col">
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

          {/* details footer, includes link */}
          <DetailFooter
            prevLink={`/certificates/${prevCertificate.slug}`}
            prevTitle={prevCertificate.name}
            nextLink={`/certificates/${nextCertificate.slug}`}
            nextTitle={nextCertificate.name}
          />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getAllCertificates();

  if (res) {
    const certificates = JSON.parse(res) as Certificate[];
    const paths = certificates.map((c) => ({ params: { slug: c.slug } }));

    return { fallback: false, paths };
  } else {
    return { fallback: false, paths: [] };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  if (!params?.slug) return { notFound: true };

  const res = await getCertificateWithPrevAndNext(params.slug as string);

  if (res) {
    const parsedData = JSON.parse(res) as PropsData;

    const { certificate, prevCertificate, nextCertificate } = parsedData;

    return certificate === null
      ? { notFound: true }
      : {
          props: {
            certificate,
            nextCertificate: {
              name: nextCertificate.name,
              slug: nextCertificate.slug,
            },
            prevCertificate: {
              name: prevCertificate.name,
              slug: prevCertificate.slug,
            },
          },
        };
  } else {
    return { notFound: true };
  }
};
