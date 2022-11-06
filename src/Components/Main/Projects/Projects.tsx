import { Typography } from "@material-tailwind/react";
import { FC } from "react";
import Line from "../../Line/Line";
import { FaQuoteLeft } from "react-icons/fa";
import Timeline from "./Timeline";

const Projects: FC = () => {
  return (
    <section
      aria-label="projects-section"
      id="projects"
      className=" bg-gray-900 relative py-32"
    >
      {/* transition from profile to projects */}
      <Line className="scale-y-[3] bg-gradient-to-b from-cyan-300/50 to-green-300/50 absolute left-[764px] top-3 z-30" />
      <Line className="scale-y-[9.6] bg-gradient-to-b from-cyan-300/50 to-green-300/50 absolute right-[572px] -top-12 z-30 rotate-90" />
      <Line className="scale-y-[1.6] bg-gradient-to-b from-cyan-300/50 to-green-300/50 absolute right-[380px] -top-20 z-30" />

      {/* Quotes */}
      <div className="flex flex-col items-center gap-8 relative py-8 max-w-screen-xl mx-auto">
        <FaQuoteLeft className="text-9xl absolute text-cyan-100/20 right-24 bottom-3 z-20" />
        <Typography
          as="q"
          variant="h1"
          className="text-gray-50 font-extrabold text-center text-7xl duration-200 pb-4 relative z-20"
        >
          The only source of knowledge is{" "}
          <em className="underline text-cyan-300/90">experience.</em>
        </Typography>
        <Typography
          as="span"
          variant="h4"
          className="relative z-20 font-bold text-white/50"
        >
          - Albert Einstein
        </Typography>
        {/* icon decoration */}
        {/* background and shadow for the quote */}
        <div className="animate-breathing bg-gradient bg-gradient-to-r from-cyan-400 to-green-400/90 absolute -top-2 -bottom-3 left-6 right-12 transform -skew-x-12" />
        <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/60 absolute inset-y-0 left-6 right-14 transform -skew-x-12 z-10" />
      </div>

      <div className=" mx-auto relative">
        <Line className="scale-y-[2] bg-white/30 absolute left-1/2 top-16 z-20" />

        {/* section Title */}
        <header className="relative pt-40 flex flex-col items-center">
          <Typography
            as="h2"
            variant="h2"
            className="animate-breathing bg-gradient w-max text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-green-200 capitalize"
          >
            Projects
          </Typography>
          <Line className="animate-breathing bg-gradient bg-gradient-to-r from-cyan-300 to-green-300 rotate-90 scale-y-[7] shadow-lg shadow-cyan-300" />
        </header>

        {/* main content */}
        <footer>
          <Timeline />
        </footer>
      </div>
    </section>
  );
};

export default Projects;
