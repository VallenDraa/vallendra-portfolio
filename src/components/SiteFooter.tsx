import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import IconWithTooltip from "./IconWithTooltip";
import Link from "next/link";
import { useMemo } from "react";
import Line from "./Line";

export default function SiteFooter() {
  const year = useMemo(() => new Date().getFullYear(), []);
  // const visitors = useMemo(() => {
  //   const num = compactNumberFormatter.format(69420);

  //   return num;
  // }, []);

  return (
    <footer className="gradient-underline gradient-underline--indigo-to-pink relative bg-gray-900 before:!top-0">
      <div className="relative z-40 mx-auto flex max-w-screen-xl flex-col-reverse items-center justify-between gap-5 px-8 py-8 lg:flex-row lg:px-0">
        <span className="text-gray-400 lg:basis-1/3">
          &copy; {year} VallenDra | Front-End Developer
        </span>

        {/* <span className="text-gray-400 lg:basis-1/3 flex items-center justify-center gap-1">
          <AiFillEye className="translate-y-0.5" /> Visitors: {visitors}
        </span> */}

        <div className="flex grow items-center justify-center gap-2 lg:flex-grow-0 lg:basis-1/3 lg:justify-end">
          <Link
            href="https://github.com/vallendraa"
            target="_blank"
            className="block"
          >
            <IconWithTooltip
              placement="top"
              Icon={<FaGithub className="text-4xl text-gray-100" />}
              text={"Github"}
            />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="block">
            <IconWithTooltip
              placement="top"
              Icon={<FaLinkedin className="text-4xl text-blue-600" />}
              text={"LinkedIn"}
            />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="block">
            <IconWithTooltip
              placement="top"
              Icon={<FaInstagram className="text-4xl text-pink-300" />}
              text={"Instagram"}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
