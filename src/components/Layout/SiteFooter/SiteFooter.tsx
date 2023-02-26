import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import menuData, { siteFooterMenus } from "utils/data/menus";
import SiteFooterMenu from "./SiteFooterMenu";

export default function SiteFooter() {
  return (
    <footer className="gradient-underline gradient-underline--primary relative flex animate-fade-in flex-col gap-2 px-8 py-4 before:!top-0">
      {/* site links */}
      <ul className="layout mb-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-medium text-indigo-300 dark:text-gray-400">
        {menuData.map(menu => (
          <SiteFooterMenu key={menu.name} data={menu} />
        ))}
        {siteFooterMenus.map(menu => (
          <SiteFooterMenu key={menu.name} data={menu} />
        ))}
      </ul>

      {/* socials */}
      <div className="layout flex w-fit items-center gap-2.5 text-3xl text-indigo-300 dark:text-gray-400 [&>*]:p-1">
        <a
          target="_blank"
          aria-label="Email link button"
          href="mailto:vallenatwork@gmail.com"
          rel="noreferrer"
        >
          <MdEmail />
        </a>
        <a
          aria-label="Instagram link button"
          href="https://instagram.com/vallendra_"
        >
          <AiFillInstagram />
        </a>
        <a
          target="_blank"
          aria-label="Github link button"
          href="https://github.com/vallendraa"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
        <a
          target="_blank"
          aria-label="Linkedin link"
          href="https://www.linkedin.com/in/vallendra/"
          rel="noreferrer"
        >
          <AiFillLinkedin />
        </a>
      </div>

      {/* tech */}
      <div className="layout flex flex-col items-center text-indigo-300 dark:text-gray-500">
        {/* portfolio tech stack */}
        <div className="flex items-center gap-1 text-sm">
          <span>Built with</span>
          <a
            href="https://nextjs.org"
            target="_blank"
            className="text-pink-300 underline underline-offset-2 dark:text-pink-200"
            rel="noreferrer"
          >
            Next.js,
          </a>
          <a
            href="https://www.material-tailwind.com/"
            target="_blank"
            className="text-pink-300 underline underline-offset-2 dark:text-pink-200"
            rel="noreferrer"
          >
            Material Tailwind,
          </a>
          <span>and</span>
          <span className="translate-y-[1px] text-lg text-pink-300 dark:text-pink-200">
            &hearts;
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span>
            &copy; {new Date().getFullYear()} VallenDra | Front-End Developer
          </span>
        </div>
      </div>
    </footer>
  );
}