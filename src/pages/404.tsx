import LinkWithUnderline from "components/Showcase/ShowcaseDetailsPage/LinkWithUnderline";

export default function NotFoundPage() {
  return (
    <div className="fade-bottom relative flex min-h-[75vh] translate-y-20 flex-col items-center justify-center gap-3 px-8 after:-top-20">
      <div className="flex flex-col items-start space-y-2">
        <h3 className="relative z-10 font-bold text-zinc-700 dark:text-zinc-300">
          Error 404 😕
        </h3>
        <h4 className="text-zinc-500 dark:text-zinc-300">
          Can&apos;t seem to find the page
        </h4>
      </div>

      <LinkWithUnderline href="/" className="relative z-10">
        Back To Home Page
      </LinkWithUnderline>
    </div>
  );
}
