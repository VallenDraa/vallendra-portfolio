import Link from "next/link";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import R from "react";
import Show from "utils/client/jsx/Show";
import Observe from "components/Observe";
import StyledButton from "components/StyledComponents/StyledButton";
import type { ShowcaseType } from "interfaces/showcase.interface";
import type ShowcaseItem from "interfaces/showcase.interface";
import Project from "interfaces/project.interface";
import useGetViewsById from "utils/client/hooks/useGetViewsById";
import useGetLikesById from "utils/client/hooks/useGetLikesById";
import CldImgWithBlur from "components/StyledComponents/CldImgWithBlur";
import Stats from "./Stats";
import TechsSection from "./TechsSection";

type ItemCardProps = {
  // for data fetching purpose
  type: ShowcaseType;

  // image props
  data: ShowcaseItem;
};

export default function ItemCard({ data, type }: ItemCardProps) {
  /* Helper state
   ====================== */
  const [willFetch, setWillFetch] = R.useState(false);

  /* Getting the stats
  ====================== */
  const viewsRes = useGetViewsById(data._id, type, willFetch);
  const likesRes = useGetLikesById(data._id, type, willFetch);

  return (
    <Observe
      freezeOnceVisible
      onIntersectingStatusChange={isIntersecing => {
        setWillFetch(isIntersecing);
      }}
    >
      <Link
        href={`/${type}/${data.slug}`}
        className="group relative block aspect-square w-full overflow-clip rounded-md bg-transparent shadow-lg shadow-indigo-100 transition-transform duration-300 ease-out hover:scale-105 dark:shadow-zinc-800/30"
      >
        {/* image */}
        <CldImgWithBlur
          width={500}
          height={500}
          src={data.image}
          alt={data.name}
          format="webp"
          crop="fill"
          quality={50}
          className="absolute inset-0 object-cover opacity-90 transition duration-300 ease-out group-hover:scale-105"
        />

        {/* fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 to-slate-800/80 transition-opacity duration-200 group-hover:opacity-90 dark:from-zinc-900/40 dark:to-zinc-900/80" />

        {/* detail */}
        <div className="relative z-20 flex h-full w-full flex-col justify-end transition-colors duration-200">
          {/* showcase title */}
          <span className="secondary-gradient line-clamp-2 block bg-gradient-to-r bg-clip-text px-3 text-2xl font-bold text-transparent md:text-xl">
            {data.name}
          </span>

          {/* showcase short description */}
          <p className="mt-1 line-clamp-2 px-3 text-base font-normal text-white/80 sm:text-sm">
            {data.shortDescriptionEN}
          </p>

          {/* showcase likes and views */}
          <div className="mt-1.5 flex gap-3 px-3">
            <Stats
              icon={<AiFillEye />}
              textColor="text-teal-400"
              isLoading={
                !(viewsRes.error && likesRes.error) &&
                (viewsRes.data?.views === undefined ||
                  likesRes.data?.likes === undefined)
              }
              number={viewsRes?.data?.views ?? data.views}
            />

            <Stats
              icon={<AiFillHeart />}
              textColor="text-red-400"
              isLoading={
                !(viewsRes.error && likesRes.error) &&
                (viewsRes.data?.views === undefined ||
                  likesRes.data?.likes === undefined)
              }
              number={likesRes?.data?.likes ?? data.likes}
            />
          </div>

          <Show when={(data as Project).tech?.length > 0}>
            <TechsSection techs={(data as Project).tech} />
          </Show>

          <StyledButton
            tabIndex={-1}
            type="button"
            icon={<BsArrowRight />}
            className="relative z-20 mt-2 flex w-full items-center justify-center gap-2 rounded-none border-t-2 border-zinc-500/30 px-7 py-3 text-indigo-400 hover:bg-indigo-500/10"
          >
            See Detail
          </StyledButton>
        </div>
      </Link>
    </Observe>
  );
}
