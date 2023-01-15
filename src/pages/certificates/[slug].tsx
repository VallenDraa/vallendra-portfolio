import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import SiteFooter from "../../components/SiteFooter";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import { FaRegNewspaper } from "react-icons/fa";
import Show from "../../utils/jsx/Show";
import Comment from "../../components/DetailsPage/Comment";
import CopyLinkBtn from "../../components/DetailsPage/CopyLinkBtn";
import ActionButton from "../../components/DetailsPage/ActionButton";
import SectionHeading from "../../components/SectionHeading";
import LinkWithUnderline from "../../components/DetailsPage/LinkWithUnderline";
import { useState } from "react";
import ICertificate from "../../interfaces/certificateInterface";
import Head from "next/head";
import allCertificates from "../../utils/datas/certificates/allCertificates";

interface ICertificateRedirect {
  slug: string;
  name: string;
}

interface IPropsData {
  certificate: ICertificate;
  prevCertificate: ICertificateRedirect;
  nextCertificate: ICertificateRedirect;
}

export default function CertificateDetails({
  certificate,
  prevCertificate,
  nextCertificate,
}: IPropsData) {
  const pageTitle = `VallenDra | ${certificate.name}`;

  /* Likes
  ========= */
  const [likes, setLikes] = useState(certificate.likes);
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
      <div className="fade-bottom relative flex min-h-screen translate-y-40 flex-col after:-top-20 dark:bg-gray-900">
        {/* blur */}
        <div className="absolute right-20 top-20 h-80 w-80 rotate-0 skew-x-12 scale-110 rounded-full bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 blur-3xl transition-transform duration-200" />

        <header className="mx-auto mt-6 flex w-full max-w-screen-xl flex-col overflow-hidden px-8">
          <section className="relative z-10 border-b-2 border-white/30 pb-3">
            {/* back to certificate button */}
            <LinkWithUnderline href="/certificates">
              <BsArrowLeft />
              Back To Certificates
            </LinkWithUnderline>

            {/* title */}
            <Typography
              as="h1"
              variant="h1"
              className="relative z-40 mt-4 w-fit animate-breathing bg-gradient-to-r from-indigo-300 to-pink-200 bg-gradient bg-clip-text text-start text-4xl font-bold capitalize !leading-[initial] text-transparent md:text-5xl"
            >
              {certificate.name}
            </Typography>

            {/* short description */}
            <Typography
              as="p"
              variant="paragraph"
              className="mt-2 pl-0.5 text-justify text-sm font-medium dark:text-gray-200 md:text-lg"
            >
              {certificate.shortDescription}
            </Typography>

            {/* certificate views*/}
            <div className="mt-2.5 flex gap-3 dark:text-gray-400">
              <Typography
                variant="paragraph"
                as="span"
                className="flex items-center gap-1 text-sm font-bold"
              >
                <AiFillEye />
                {certificate.views} views
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

        {/* the certificate data */}
        <main className="relative mx-auto flex w-full max-w-screen-xl grow flex-col gap-8 px-8 py-5">
          {/* image */}
          <figure className="mx-auto w-[95%]">
            <Image
              priority
              src={certificate.image}
              alt={certificate.name}
              width={960}
              height={540}
              className="w-full rounded-md object-cover opacity-90"
            />

            <figcaption className="pt-2 text-center text-sm dark:text-gray-500">
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
                  className="px-3 font-normal leading-loose dark:text-white/80"
                >
                  {certificate.description}
                </Typography>
              </div>
            </div>

            {/* link for the code of this certificate */}
            <aside className="sticky top-0 mt-3 flex h-fit grow flex-row items-center justify-between gap-4 rounded-md border-2 border-[#30363d] p-4 lg:flex-col">
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
                href={`/certificates/${prevCertificate.slug}`}
              >
                <BsArrowLeft />
                {prevCertificate.name}
              </LinkWithUnderline>

              {/* link to next listed projects */}
              <LinkWithUnderline
                className="grow justify-end md:flex-grow-0"
                href={`/certificates/${nextCertificate.slug}`}
              >
                {nextCertificate.name}
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

  // get target certificate index
  const certifIdx = allCertificates.findIndex(
    (certificate) => certificate.slug === params?.slug
  );

  // get the certificate itself
  const certificate: ICertificate = allCertificates[certifIdx] || null;

  /* (fetch 3 certificates later when working on the API)
  ================================================== */

  // get the next certificate slug
  const nextCertificate =
    certifIdx === allCertificates.length - 1
      ? allCertificates[0]
      : allCertificates[certifIdx + 1];

  // get the previous slug
  const prevCertificate =
    certifIdx === 0
      ? allCertificates[allCertificates.length - 1]
      : allCertificates[certifIdx - 1];

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
}
