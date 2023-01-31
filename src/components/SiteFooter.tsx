import { useMemo } from "react";
import SocialsWithIcon from "./SocialWithIcons";

export default function SiteFooter() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="gradient-underline gradient-underline--primary relative bg-indigo-50 before:!top-0 dark:bg-gray-900">
      <div className="relative z-40 mx-auto flex max-w-screen-xl flex-col-reverse items-center justify-between gap-5 px-8 py-4 lg:flex-row 2xl:px-2">
        <span className="text-indigo-500 dark:text-gray-400 lg:basis-1/3">
          &copy; {year} VallenDra | Front-End Developer
        </span>

        <div className="flex grow items-center justify-center gap-2 lg:flex-grow-0 lg:basis-1/3 lg:justify-end">
          <SocialsWithIcon size="text-4xl" />
        </div>
      </div>
    </footer>
  );
}
