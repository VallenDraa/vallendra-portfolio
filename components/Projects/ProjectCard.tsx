import { Typography, Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { IProject } from "../../interfaces/projectInterfaces";
import { BsArrowRight } from "react-icons/bs";
import techIcons from "../MappedComponents/TechIcons";

export default function ProjectCard({ project }: { project: IProject }) {
  return (
    <div>
      <Link
        href={`/projects/${project._id}`}
        className="block w-full bg-transparent overflow-clip relative shadow-lg shadow-gray-800/40 rounded-xl aspect-square group hover:scale-105 transition-transform duration-300 ease-out"
      >
        {/* image */}
        <Image
          width={400}
          height={400}
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover opacity-90 absolute transition-transform duration-300 ease-out group-hover:scale-110"
        />

        {/* fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/90 group-hover:opacity-90 transition-opacity duration-200"></div>

        {/* detail */}
        <div className="h-full w-full relative z-20 flex flex-col gap-1 justify-end transition-colors duration-200">
          <Typography
            variant="h5"
            as="h3"
            className="px-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-amber-200 font-bold"
          >
            {project.name}
          </Typography>
          <Typography
            variant="paragraph"
            as="p"
            className="px-3 text-white/90 font-normal text-sm"
          >
            {project.shortDescription}
          </Typography>

          {/* tech stack */}
          <ul className="flex items-center gap-1 px-3 overflow-x-auto mt-3">
            {project.tech.map((tech) => {
              return <li key={tech}>{techIcons[tech]}</li>;
            })}
          </ul>

          <Button
            variant="text"
            className="relative w-full py-3 px-7 flex items-center justify-center gap-2 text-indigo-300 rounded-none border-t-2 border-gray-500/30 mt-2"
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
