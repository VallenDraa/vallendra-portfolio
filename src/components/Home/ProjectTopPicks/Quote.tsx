import { Typography } from "@material-tailwind/react";
import { FaQuoteLeft } from "react-icons/fa";

export default function Quotes() {
  const quoteGradient =
    "before:absolute before:top-0 before:-bottom-3 before:left-12 before:right-10 before:-skew-x-12 before:animate-breathing before:rounded-md before:bg-gradient-to-tr before:from-indigo-200 before:to-purple-200 before:bg-gradient dark:before:from-indigo-300 dark:before:to-purple-200";

  return (
    <div
      className={`relative z-40 mx-auto flex max-w-screen-xl flex-col items-center gap-4 p-8  sm:gap-6 lg:gap-8 lg:px-0 ${quoteGradient}`}
    >
      <FaQuoteLeft className="absolute right-24 bottom-5 z-20 text-7xl text-white/20 dark:text-white/10  md:text-8xl lg:text-9xl" />
      <Typography
        as="q"
        variant="h1"
        className="relative z-20 pb-4 text-center text-5xl font-extrabold leading-[initial] text-white dark:text-gray-50 md:text-6xl xl:text-7xl"
      >
        I'm clueless at programming, because I'm a{" "}
        <em className="text-[#818cf8] underline">JS Dev.</em>
      </Typography>
      <Typography
        as="span"
        variant="h4"
        className="relative z-20 text-xl font-bold text-white/50 sm:text-2xl md:text-3xl"
      >
        - Me
      </Typography>

      {/* background and shadow for the quote */}
      <div className="absolute inset-y-0 left-12 right-12 z-10 -skew-x-12 transform rounded-md bg-gradient-to-r from-indigo-200/50 to-white/50 dark:from-gray-900/90 dark:to-gray-800/60" />
    </div>
  );
}
