import { Typography } from "@material-tailwind/react";

export default function ServerErrorPage() {
  return (
    <div className="fade-bottom relative flex min-h-[75vh] translate-y-20 flex-col items-center justify-center gap-3 px-8 after:-top-20">
      <div className="flex flex-col items-start space-y-2">
        <Typography
          variant="h3"
          as="span"
          className="relative z-10 font-bold text-indigo-500 dark:text-gray-300"
        >
          Error 500 😕
        </Typography>
        <Typography
          variant="h4"
          as="span"
          className="text-indigo-300 dark:text-gray-400"
        >
          Please try reloading the page or come again later.
        </Typography>
      </div>
    </div>
  );
}
