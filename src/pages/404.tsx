import { Typography } from "@material-tailwind/react";
import LinkWithUnderline from "../components/DetailsPage/LinkWithUnderline";

export default function NotFoundPage() {
  return (
    <div className="fade-bottom relative flex min-h-[80vh] translate-y-20 flex-col items-center justify-center gap-3 bg-indigo-50 px-8 after:-top-20 dark:bg-gray-900">
      <div className="space-y-2 text-center">
        <Typography
          variant="h4"
          as="span"
          className="relative z-10 text-lg text-indigo-500 dark:text-white/80 md:text-xl lg:text-2xl"
        >
          This page doesn't seem to exist 😕
        </Typography>
        <Typography
          variant="h5"
          as="span"
          className="text-sm text-indigo-300 dark:text-white/60 md:text-base lg:text-lg"
        >
          Click the link below to go back.
        </Typography>
      </div>

      <LinkWithUnderline href="/" className="relative z-10">
        Home page
      </LinkWithUnderline>
    </div>
  );
}
