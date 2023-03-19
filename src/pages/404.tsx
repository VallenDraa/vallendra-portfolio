import LinkWithUnderline from "components/Showcase/ShowcaseDetailsPage/LinkWithUnderline";

export default function NotFoundPage() {
  return (
    <div className="fade-bottom relative flex min-h-[75vh] translate-y-20 flex-col items-center justify-center gap-3 px-8 after:-top-20">
      <div className="flex flex-col items-start space-y-2">
        <span className="text-xl font-bold text-zinc-700 dark:text-zinc-300 md:text-2xl">
          Error 404 😕
        </span>
        <span className="text-base font-medium text-zinc-500 dark:text-zinc-300 md:text-lg">
          Can&apos;t seem to find the page
        </span>
      </div>

      <LinkWithUnderline href="/" className="relative z-10">
        Back To Home Page
      </LinkWithUnderline>
    </div>
  );
}
