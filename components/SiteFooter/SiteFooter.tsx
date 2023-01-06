import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import IconWithTooltip from "../IconWithTooltip/IconWithTooltip";
import Line from "../Line/Line";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 relative">
      <Line className="animate-breathing bg-gradient bg-gradient-to-r from-indigo-300 to-pink-200 absolute top-0 inset-x-0 h-[1px] z-40 min-w-full" />

      <div className="max-w-screen-2xl px-8 py-8 mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-5 relative z-40">
        <span className="text-gray-400">
          &copy; {new Date().getFullYear()} VallenDra | Front-End Developer
        </span>

        <div className="flex items-center justify-center lg:justify-end gap-2 grow">
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
