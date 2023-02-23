import Link from "next/link";
import { Typography } from "@material-tailwind/react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { CldImage } from "next-cloudinary";
import R from "react";
import Show from "utils/client/jsx/Show";
import Observe from "components/Observe";
import StyledButton from "components/StyledComponents/StyledButton";
import type { ShowcaseType } from "interfaces/showcase.interface";
import type ShowcaseItem from "interfaces/showcase.interface";
import Project from "interfaces/project.interface";
import useGetViewsById from "utils/client/hooks/useGetViewsById";
import useGetLikesById from "utils/client/hooks/useGetLikesById";
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
  const [hasFetched, setHasFetched] = R.useState(false);
  const [willFetch, setWillFetch] = R.useState(false);

  /* Getting the stats
  ====================== */
  const viewsRes = useGetViewsById(data._id, type, willFetch);
  const likesRes = useGetLikesById(data._id, type, willFetch);

  /* Check if views and likes had been fetched 
  =========================================== */
  R.useEffect(() => {
    if (
      typeof viewsRes.data?.views === "number" &&
      typeof likesRes.data?.likes === "number"
    ) {
      setHasFetched(true);
    }
  }, [viewsRes.data?.views, likesRes.data?.likes]);

  return (
    <Observe
      freezeOnceVisible
      onEnter={() => !hasFetched && setWillFetch(true)}
    >
      <Link
        href={`/${type}/${data.slug}`}
        className="group relative block aspect-square w-full overflow-clip rounded-md bg-transparent shadow-lg shadow-indigo-100 transition-transform duration-300 ease-out hover:scale-105 dark:shadow-gray-800/30"
      >
        {/* image */}
        <CldImage
          width={500}
          height={500}
          src={data.image}
          alt={data.name}
          format="webp"
          crop="fill"
          quality={45}
          className="absolute w-full object-cover opacity-90 transition duration-300 ease-out group-hover:scale-105"
        />

        {/* fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/80 transition-opacity duration-200 group-hover:opacity-90 dark:from-gray-900/50 dark:to-gray-900/90" />

        {/* detail */}
        <div className="relative z-20 flex h-full w-full flex-col justify-end transition-colors duration-200">
          {/* props title */}
          <Typography
            variant="h5"
            as="span"
            className="block bg-gradient-to-r from-pink-200 to-amber-200 bg-clip-text px-3 text-2xl font-bold text-transparent md:text-xl"
          >
            {data.name}
          </Typography>

          {/* props short description */}
          <Typography
            variant="paragraph"
            as="p"
            className="mt-1 px-3 text-base font-normal text-gray-300 line-clamp-2 sm:text-sm"
          >
            {data.shortDescriptionEN}
          </Typography>

          {/* props likes and views */}
          <div className="mt-1.5 flex gap-3 px-3">
            <Stats
              icon={<AiFillEye />}
              textColor="text-teal-300"
              isLoading={viewsRes?.isLoading || !hasFetched}
              number={viewsRes?.data?.views || data.views}
            />

            <Stats
              icon={<AiFillHeart />}
              textColor="text-red-300"
              isLoading={likesRes.isLoading || !hasFetched}
              number={likesRes?.data?.likes || data.likes}
            />
          </div>

          <Show when={(data as Project).tech?.length > 0}>
            <TechsSection techs={(data as Project).tech} />
          </Show>

          <StyledButton
            variant="text"
            icon={<BsArrowRight />}
            className="relative mt-2 flex w-full items-center justify-center gap-2 rounded-none border-t-2 border-gray-500/30 py-3 px-7 text-indigo-300"
            color="indigo"
          >
            See Detail
          </StyledButton>
        </div>
      </Link>
    </Observe>
  );
}
