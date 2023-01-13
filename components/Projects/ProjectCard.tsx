import { Typography, Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { IProject } from "../../interfaces/projectInterfaces";
import { BsArrowRight } from "react-icons/bs";
import techIcons from "../MappedComponents/TechIcons";
import { compactNumberFormatter } from "../../utils/helpers/formatter";
import { AiFillEye, AiFillHeart } from "react-icons/ai";

export default function ProjectCard({
  project,
  imgIsPriority,
}: {
  project: IProject;
  imgIsPriority: boolean;
}) {
  return (
    <div>
      <Link
        href={`/projects/${project.slug}`}
        className="block w-full bg-transparent overflow-clip relative shadow-lg shadow-gray-800/40 rounded-md aspect-square group hover:scale-105 transition-transform duration-300 ease-out"
      >
        {/* image */}
        <Image
          priority={imgIsPriority}
          src={project.image}
          alt={project.name}
          className="h-full object-cover opacity-90 absolute transition-transform duration-300 ease-out group-hover:scale-110"
          fill
          sizes="90vw, (min-width: 720px) 75vw, (min-width: 960px) 50vw, (min-width: 1140px) 25vw"
        />

        {/* fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/90 group-hover:opacity-90 transition-opacity duration-200"></div>

        {/* detail */}
        <div className="h-full w-full relative z-20 flex flex-col justify-end transition-colors duration-200">
          {/* project title */}

          <Typography
            variant="h5"
            as="h4"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-amber-200 font-bold px-3"
          >
            {project.name}
          </Typography>

          {/* project short description */}
          <Typography
            variant="paragraph"
            as="p"
            className="text-white/90 font-normal text-sm mt-1 px-3 md:line-clamp-2"
          >
            {project.shortDescription}
          </Typography>

          {/* project likes and views*/}
          <div className="flex gap-3 mt-1.5 px-3">
            <Typography
              variant="paragraph"
              as="span"
              className="text-light-green-300 flex items-center gap-1 text-xs font-bold"
            >
              <AiFillEye />
              {compactNumberFormatter.format(project.views)}
            </Typography>

            <Typography
              variant="paragraph"
              as="span"
              className="text-red-300 flex items-center gap-1 text-xs font-bold"
            >
              <AiFillHeart />
              {compactNumberFormatter.format(project.likes)}
            </Typography>
          </div>

          {/* tech stack */}
          <ul className="flex items-center gap-1 overflow-x-auto mt-2.5 px-3">
            {project.tech.map((tech) => {
              return <li key={tech}>{techIcons[tech]}</li>;
            })}
          </ul>

          <Button
            variant="text"
            className="relative w-full py-2 px-7 flex items-center justify-center gap-2 text-indigo-300 rounded-none border-t-2 border-gray-500/30 mt-2"
            color="indigo"
          >
            <span className="translate-x-3 group-hover:translate-x-0 transition-transform duration-200">
              See Detail
            </span>
            <BsArrowRight className="text-xl opacity-0 group-hover:opacity-100  relative -translate-x-4 group-hover:translate-x-0 transition duration-200" />
          </Button>
        </div>
      </Link>
    </div>
  );
}
