import Link from "next/link";
import IconWithTooltip from "./IconWithTooltip";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

type Size = "text-4xl" | "text-5xl" | "text-6xl" | "text-7xl";
type SMSize = `sm:${Size}`;
type MDSize = `md:${Size}`;
type LGSize = `lg:${Size}`;
type XLSize = `xl:${Size}`;
type XXLSize = `2xl:${Size}`;

interface IProps {
  size: Size;
  smSize?: SMSize;
  mdSize?: MDSize;
  lgSize?: LGSize;
  xlSize?: XLSize;
  xxlSize?: XXLSize;
}

export default function SocialsWithIcon({
  size,
  smSize,
  mdSize,
  lgSize,
  xlSize,
  xxlSize,
}: IProps) {
  const sizeClasses = `${size} ${smSize || ""} ${mdSize || ""} ${
    lgSize || ""
  } ${xlSize || ""} ${xxlSize || ""}`.trim();

  return (
    <>
      {/* <Link
        aria-label="Whatsapp link"
        href="https://wa.me/6281282029927"
        target="_blank"
        className="block"
      >
        <IconWithTooltip
          isButton
          placement="top"
          aria-label="Whatsapp link button"
          icon={
            <FaWhatsapp
              className={`${sizeClasses} text-green-400 dark:text-green-300`}
            />
          }
          text="Whatsapp"
        />
      </Link> */}
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
      <Link
        aria-label="Instagram link"
        href="https://instagram.com"
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
        href="https://linkedin.com"
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
