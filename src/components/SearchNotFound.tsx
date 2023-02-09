import { Typography } from "@material-tailwind/react";

export default function SearchNotFound() {
  return (
    <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 animate-fade-in space-y-2 px-8 text-center lg:px-0">
      <Typography
        variant="h4"
        as="span"
        className="text-lg text-indigo-500 dark:text-gray-300 md:text-xl lg:text-2xl"
      >
        Sorry, Can&apos;t Find Anything 😕
      </Typography>
      <Typography
        variant="h5"
        as="span"
        className="text-sm text-indigo-300 dark:text-gray-500 md:text-base lg:text-lg"
      >
        Try searching for something else.
      </Typography>
    </div>
  );
}
