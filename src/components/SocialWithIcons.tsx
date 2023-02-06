import Link from "next/link";
import IconWithTooltip from "./IconWithTooltip";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import Show from "../utils/client/jsx/Show";

type Size =
  | "text-xs"
  | "text-sm"
  | "text-md"
  | "text-lg"
  | "text-xl"
  | "text-2xl"
  | "text-3xl"
  | "text-4xl"
  | "text-5xl"
  | "text-6xl"
  | "text-7xl";
type SMSize = `sm:${Size}`;
type MDSize = `md:${Size}`;
type LGSize = `lg:${Size}`;
type XLSize = `xl:${Size}`;
type XXLSize = `2xl:${Size}`;

interface Props {
  size: Size;
  smSize?: SMSize;
  mdSize?: MDSize;
  lgSize?: LGSize;
  xlSize?: XLSize;
  xxlSize?: XXLSize;
  redirectToEmailAddress?: boolean;
}

export default function SocialsWithIcon({
  size,
  smSize,
  mdSize,
  lgSize,
  xlSize,
  xxlSize,
  redirectToEmailAddress = false,
}: Props) {
  const sizeClasses = `${size} ${smSize || ""} ${mdSize || ""} ${
    lgSize || ""
  } ${xlSize || ""} ${xxlSize || ""}`.trim();

  return (
    <>
      <Show when={!redirectToEmailAddress}>
        <Link aria-label="Email link" href="/contacts" className="block">
          <IconWithTooltip
            isButton
            placement="top"
            aria-label="Email link button"
            icon={
              <AiOutlineMail
                className={`${sizeClasses} text-green-400 dark:text-green-300`}
              />
            }
            text="Email"
          />
        </Link>
      </Show>
      <Show when={redirectToEmailAddress}>
        <a
          aria-label="Email link"
          href="mailto:vallenatwork@gmail.com"
          className="block"
        >
          <IconWithTooltip
            isButton
            placement="top"
            aria-label="Email link button"
            icon={
              <AiOutlineMail
                className={`${sizeClasses} text-green-400 dark:text-green-300`}
              />
            }
            text="Mail me through an email service instead."
          />
        </a>
      </Show>
      <Link
        aria-label="Instagram link"
        href="https://instagram.com/vallendra_"
        target="_blank"
        className="block"
      >
        <IconWithTooltip
          isButton
          placement="top"
          aria-label="Instagram link button"
          icon={<FaInstagram className={`${sizeClasses} text-pink-300`} />}
          text="Instagram"
        />
      </Link>
      <Link
        aria-label="Github link"
        href="https://github.com/vallendraa"
        target="_blank"
        className="block"
      >
        <IconWithTooltip
          isButton
          placement="top"
          aria-label="Github link button"
          icon={
            <FaGithub
              className={`${sizeClasses} text-gray-800 dark:text-gray-100`}
            />
          }
          text="Github"
        />
      </Link>
      <Link
        aria-label="Linkedin link"
        href="https://www.linkedin.com/in/vallendra/"
        target="_blank"
        className="block"
      >
        <IconWithTooltip
          isButton
          placement="top"
          aria-label="Linkedin link button"
          icon={<FaLinkedinIn className={`${sizeClasses} text-blue-600`} />}
          text="LinkedIn"
        />
      </Link>
    </>
  );
}
