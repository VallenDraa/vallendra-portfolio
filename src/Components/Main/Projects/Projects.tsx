import { Typography } from "@material-tailwind/react";
import { FC } from "react";
import Line from "../../Line/Line";

const Projects: FC = () => {
  return (
    <section
      aria-label="project-section"
      id="projects"
      className="h-[500px] bg-gray-900"
    >
      <div className="max-w-screen-xl mx-auto relative">
        <Line className="scale-y-[2] bg-white/30 absolute left-1/2 -top-10 z-20" />
        <Line className="scale-y-[11.5] bg-white/30 absolute left-[800px] top-0 z-20 rotate-90" />
        <Line className="scale-y-[2] bg-white/30 absolute right-[109px] top-[39px] z-20" />

        {/* section Title */}
        <header className="relative pt-28 flex justify-end">
          <Typography
            as="h2"
            variant="h2"
            className=" w-max text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200 capitalize"
          >
            Projects
          </Typography>
          <Line className="bg-gradient-to-r from-red-100 to-red-300 rotate-90 scale-y-[7] right-[140px] -bottom-8 absolute" />
        </header>
      </div>
    </section>
  );
};

export default Projects;
