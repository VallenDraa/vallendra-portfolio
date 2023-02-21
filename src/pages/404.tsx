import { Typography } from "@material-tailwind/react";
import LinkWithUnderline from "components/Showcase/ShowcaseDetailsPage/LinkWithUnderline";

export default function NotFoundPage() {
  return (
    <div className="fade-bottom relative flex min-h-[75vh] translate-y-20 flex-col items-center justify-center gap-3 px-8 after:-top-20">
      <div className="flex flex-col items-start space-y-2">
        <Typography
          variant="h3"
          as="span"
          className="relative z-10 font-bold text-indigo-500 dark:text-gray-300"
        >
          Error 404 😕
        </Typography>
        <Typography
          variant="h4"
          as="span"
          className="text-indigo-300 dark:text-gray-500"
        >
          Can&apos;t seem to find the page
        </Typography>
      </div>

      <LinkWithUnderline href="/" className="relative z-10">
        Back To Home Page
      </LinkWithUnderline>
    </div>
  );
}
