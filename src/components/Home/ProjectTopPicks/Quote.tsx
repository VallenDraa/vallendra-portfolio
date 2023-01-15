import { Typography } from "@material-tailwind/react";
import { FaQuoteLeft } from "react-icons/fa";

export default function Quotes() {
  const backgroundRadient =
    "before:animate-breathing before:bg-gradient before:bg-gradient-to-r before:from-cyan-400 before:to-green-400/90 before:rounded-md before:absolute before:top-0 before:-bottom-3 before:left-12 before:right-10 before:-skew-x-12";

  return (
    <div
      className={`relative z-10 mx-auto flex max-w-screen-xl flex-col items-center gap-4 py-8 px-8 sm:gap-6 lg:gap-8 lg:px-0 ${backgroundRadient}`}
    >
      <FaQuoteLeft className="absolute right-24 bottom-5 z-20 text-7xl text-cyan-100/20 md:text-8xl lg:text-9xl" />
      <Typography
        as="q"
        variant="h1"
        className="relative z-20 pb-4 text-center text-5xl font-extrabold text-gray-50 md:text-6xl xl:text-7xl"
      >
        The only source of knowledge is{" "}
        <em className="text-cyan-300/90 underline">experience.</em>
      </Typography>
      <Typography
        as="span"
        variant="h4"
        className="relative z-20 text-xl font-bold text-white/50 sm:text-2xl md:text-3xl"
      >
        - Albert Einstein
      </Typography>

      {/* background and shadow for the quote */}
      <div className="" />
      <div className="absolute inset-y-0 left-12 right-12 z-10 -skew-x-12 transform rounded-md bg-gradient-to-r from-gray-900/90 to-gray-800/60" />
    </div>
  );
}
