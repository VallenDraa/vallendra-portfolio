import { Typography } from "@material-tailwind/react";
import { FaQuoteLeft } from "react-icons/fa";

export default function Quotes() {
  const backgroundRadient =
    "before:animate-breathing before:bg-gradient before:bg-gradient-to-r before:from-cyan-400 before:to-green-400/90 before:rounded-xl before:absolute before:top-0 before:-bottom-3 before:left-12 before:right-10 before:-skew-x-12";

  return (
    <div
      className={`flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 relative z-10 py-8 max-w-screen-xl px-8 mx-auto ${backgroundRadient}`}
    >
      <FaQuoteLeft className="text-7xl md:text-8xl lg:text-9xl absolute text-cyan-100/20 right-24 bottom-5 z-20" />
      <Typography
        as="q"
        variant="h1"
        className="text-gray-50 font-extrabold text-center text-5xl md:text-6xl xl:text-7xl pb-4 relative z-20"
      >
        The only source of knowledge is{" "}
        <em className="underline text-cyan-300/90">experience.</em>
      </Typography>
      <Typography
        as="span"
        variant="h4"
        className="text-xl sm:text-2xl md:text-3xl relative z-20 font-bold text-white/50"
      >
        - Albert Einstein
      </Typography>

      {/* background and shadow for the quote */}
      <div className="" />
      <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/60 rounded-xl absolute inset-y-0 left-12 right-12 transform -skew-x-12 z-10" />
    </div>
  );
}
