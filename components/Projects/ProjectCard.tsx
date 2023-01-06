import { Typography, Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import Line from "../Line/Line";
import { IProject } from "../../interfaces/Interfaces";

export default function ProjectCard({ project }: { project: IProject }) {
  return (
    <Link
      href={`/projects/${project._id}`}
      className="block w-full bg-transparent overflow-clip relative shadow-lg shadow-gray-800/40 rounded-xl aspect-square group"
    >
      {/* image */}
      <Image
        width={400}
        height={400}
        src={project.image}
        alt={project.name}
        className="h-full w-full object-cover opacity-90 absolute"
      />

      {/* detail */}
      <div className="h-full w-full bg-gradient-to-b from-gray-900/50 to-gray-900/90 relative z-20 flex flex-col gap-1 justify-end transition-colors duration-200">
        <Typography
          variant="h5"
          as="h3"
          className="px-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-amber-200 font-bold"
        >
          {project.name}
        </Typography>
        <Typography variant="paragraph" as="p" className="px-3 text-white/80">
          {project.shortDescription}
        </Typography>

        <Button
          variant="text"
          className="p-0 rounded-none border-t-2 border-gray-500/30 mt-2"
          color="gray"
        >
          <Link
            className="inline-block h-full w-full py-3 px-7 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-200"
            href={`/projects/${project._id}`}
          >
            See Detail
          </Link>
        </Button>
      </div>
    </Link>
  );
}
