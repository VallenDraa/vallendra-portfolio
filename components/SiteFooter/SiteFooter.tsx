import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import IconWithTooltip from "../IconWithTooltip/IconWithTooltip";
import Link from "next/link";
import { useMemo } from "react";
import Line from "../Line/Line";

export default function SiteFooter() {
  const year = useMemo(() => new Date().getFullYear(), []);
  // const visitors = useMemo(() => {
  //   const num = compactNumberFormatter.format(69420);

  //   return num;
  // }, []);

  return (
    <footer className="bg-gray-900 relative gradient-underline gradient-underline--indigo-to-pink before:!top-0">
      <div className="max-w-screen-2xl px-8 py-8 mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-5 relative z-40">
        <span className="text-gray-400 lg:basis-1/3">
          &copy; {year} VallenDra | Front-End Developer
        </span>

        {/* <span className="text-gray-400 lg:basis-1/3 flex items-center justify-center gap-1">
          <AiFillEye className="translate-y-0.5" /> Visitors: {visitors}
        </span> */}

        <div className="flex items-center justify-center lg:justify-end gap-2 grow lg:flex-grow-0 lg:basis-1/3">
          <Link
            href="https://github.com/vallendraa"
            target="_blank"
            className="block"
          >
            <IconWithTooltip
              placement="top"
              Icon={<FaGithub className="text-gray-100 text-4xl" />}
              text={"Github"}
            />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="block">
            <IconWithTooltip
              placement="top"
              Icon={<FaLinkedin className="text-blue-600 text-4xl" />}
              text={"LinkedIn"}
            />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="block">
            <IconWithTooltip
              placement="top"
              Icon={<FaInstagram className="text-pink-300 text-4xl" />}
              text={"Instagram"}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
