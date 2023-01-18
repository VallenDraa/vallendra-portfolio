import Link from "next/link";
import IconWithTooltip from "./IconWithTooltip";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { useTheme } from "next-themes";

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
      <Link
        passHref
        href="https://wa.me/6281282029927"
        target="_blank"
        className="block"
      >
        <IconWithTooltip
          placement="top"
          icon={<FaWhatsapp className={`${sizeClasses} text-green-300`} />}
          text={"Whatsapp"}
        />
      </Link>
      <Link
        passHref
        href="https://github.com/vallendraa"
        target="_blank"
        className="block"
      >
        <IconWithTooltip
          placement="top"
          icon={
            <FaGithub
              className={`${sizeClasses} text-gray-800 dark:text-gray-100`}
            />
          }
          text={"Github"}
        />
      </Link>
      <Link
        passHref
        href="https://linkedin.com"
        target="_blank"
        className="block"
      >
        <IconWithTooltip
          placement="top"
          icon={<FaLinkedinIn className={`${sizeClasses} text-blue-600`} />}
          text={"LinkedIn"}
        />
      </Link>
      <Link
        passHref
        href="https://instagram.com"
        target="_blank"
        className="block"
      >
        <IconWithTooltip
          placement="top"
          icon={<FaInstagram className={`${sizeClasses} text-pink-300`} />}
          text={"Instagram"}
        />
      </Link>
    </>
  );
}
