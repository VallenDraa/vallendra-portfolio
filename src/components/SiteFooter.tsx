import { useMemo } from "react";
import SocialsWithIcon from "./SocialWithIcons";

export default function SiteFooter() {
  const year = useMemo(() => new Date().getFullYear(), []);
  // const visitors = useMemo(() => {
  //   const num = compactNumberFormatter.format(69420);

  //   return num;
  // }, []);

  return (
    <footer className="gradient-underline gradient-underline--indigo-to-pink relative bg-indigo-50 before:!top-0 dark:bg-gray-900">
      <div className="relative z-40 mx-auto flex max-w-screen-xl flex-col-reverse items-center justify-between gap-5 px-8 py-8 lg:flex-row xl:px-0">
        <span className="text-indigo-400 dark:text-gray-400 lg:basis-1/3">
          &copy; {year} VallenDra | Front-End Developer
        </span>

        {/* <span className="text-gray-400 lg:basis-1/3 flex items-center justify-center gap-1">
          <AiFillEye className="translate-y-0.5" /> Visitors: {visitors}
        </span> */}

        <div className="flex grow items-center justify-center gap-2 lg:flex-grow-0 lg:basis-1/3 lg:justify-end">
          <SocialsWithIcon size="text-4xl" />
        </div>
      </div>
    </footer>
  );
}
