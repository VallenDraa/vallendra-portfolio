import { ReactNode } from "react";

export default function SectionSubHeading({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) {
  return (
    <h2 className="before:primary-gradient flex h-fit gap-2 text-2xl font-bold capitalize leading-[initial] text-indigo-400 before:inline-block before:w-1 before:bg-gradient-to-t dark:text-zinc-300">
      {children}
    </h2>
  );
}
