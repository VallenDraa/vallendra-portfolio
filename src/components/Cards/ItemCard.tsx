import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { technologies } from "../../types/types";
import { Typography } from "@material-tailwind/react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { compactNumberFormatter } from "../../utils/helpers/formatter";
import StyledButton from "../StyledComponents/StyledButton";
import { BsArrowRight } from "react-icons/bs";
import Show from "../../utils/jsx/Show";
import TechsSection from "./TechsSection";

interface IProps {
  // image props
  imgIsPriority: boolean;
  imgSrc: string | StaticImageData;

  // project props
  itemLink: string;
  itemName: string;
  itemShortDesc: string;
  itemViews: number;
  itemLikes: number;

  // optional props
  techs?: technologies[];
}

export default function ItemCard({ techs = [], ...props }: IProps) {
  return (
    <Link
      href={props.itemLink}
      className="group relative block aspect-square w-full overflow-clip rounded-md bg-transparent shadow-lg shadow-gray-800/40 transition-transform duration-300 ease-out hover:scale-105"
    >
      {/* image */}
      <Image
        priority={props.imgIsPriority}
        src={props.imgSrc}
        alt={props.itemName}
        className="absolute h-full object-cover opacity-90 transition-transform duration-300 ease-out group-hover:scale-110"
        fill
        sizes="90vw, (min-width: 720px) 75vw, (min-width: 960px) 50vw, (min-width: 1140px) 25vw"
      />

      {/* fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/90 transition-opacity duration-200 group-hover:opacity-90" />

      {/* detail */}
      <div className="relative z-20 flex h-full w-full flex-col justify-end transition-colors duration-200">
        {/* props title */}

        <Typography
          variant="h5"
          as="h4"
          className="bg-gradient-to-r from-pink-200 to-amber-200 bg-clip-text px-3 font-bold text-transparent"
        >
          {props.itemName}
        </Typography>

        {/* props short description */}
        <Typography
          variant="paragraph"
          as="p"
          className="mt-1 px-3 text-sm font-normal text-white/90 md:line-clamp-2"
        >
          {props.itemShortDesc}
        </Typography>

        {/* props likes and views*/}
        <div className="mt-1.5 flex gap-3 px-3">
          <Typography
            variant="paragraph"
            as="span"
            className="flex items-center gap-1 text-xs font-bold text-green-300"
          >
            <AiFillEye />
            {compactNumberFormatter.format(props.itemViews)}
          </Typography>

          <Typography
            variant="paragraph"
            as="span"
            className="flex items-center gap-1 text-xs font-bold text-red-300"
          >
            <AiFillHeart />
            {compactNumberFormatter.format(props.itemLikes)}
          </Typography>
        </div>

        <Show when={techs.length > 0}>
          <TechsSection techs={techs} />
        </Show>

        <StyledButton
          variant="text"
          icon={<BsArrowRight />}
          className="relative mt-2 flex w-full items-center justify-center gap-2 rounded-none border-t-2 border-gray-500/30 py-2 px-7 text-indigo-300"
          color="indigo"
        >
          See Detail
        </StyledButton>
      </div>
    </Link>
  );
}