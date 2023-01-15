import { Typography } from "@material-tailwind/react";
import { ReactNode } from "react";

export default function SectionHeading({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) {
  return (
    <Typography
      as="h2"
      variant="h4"
      className="flex h-fit gap-2 font-bold capitalize leading-[initial] before:inline-block before:w-1 before:bg-gradient-to-r before:from-indigo-300 before:to-pink-200 dark:text-white"
    >
      {children}
    </Typography>
  );
}
