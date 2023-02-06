import { useMemo } from "react";
import { FaHeart } from "react-icons/fa";

export default function SiteFooter() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="gradient-underline gradient-underline--primary relative before:!top-0">
      <div className="relative z-40 mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-2 px-8 py-6">
        {/* portfolio tech stack */}
        <div className="flex items-center gap-1 text-sm text-indigo-300 dark:text-gray-500">
          <span>Built with</span>
          <a
            href="https://nextjs.org"
            target="_blank"
            className="underline underline-offset-2"
          >
            Next.js,
          </a>
          <a
            href="https://www.material-tailwind.com/"
            target="_blank"
            className="underline underline-offset-2"
          >
            Material Tailwind,
          </a>
          <span className="flex items-center gap-1.5">
            and
            <span className="flex items-center">
              <FaHeart className="translate-y-0.5 text-sm text-red-500" />.
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-indigo-500 dark:text-gray-400">
          <span className="text-xs">
            &copy; {year} VallenDra | Front-End Developer
          </span>
        </div>
      </div>
    </footer>
  );
}
