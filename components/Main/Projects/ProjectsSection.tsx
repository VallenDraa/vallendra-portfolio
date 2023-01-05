import { Typography } from "@material-tailwind/react";
import { FC, useContext, useState, useEffect } from "react";
import Line from "../../Line/Line";
import Timeline from "./Timeline";
import IntersectingProjectContext, {
  IIntersectingProjectHistoryProvider,
} from "../../../context/IntersectingProjectCP";
import projects from "../../../utils/misc/ProjectDatas";
import Quote from "./Quote";
import ProjectInfoDashboard from "./ProjectInfoDashboard";
import Image from "next/image";

const ProjectsSection: FC = () => {
  const { history } = useContext(
    IntersectingProjectContext
  ) as IIntersectingProjectHistoryProvider;
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  useEffect(() => {
    setActiveProjectIdx(projects.findIndex((p) => p._id === history.currentId));
  }, [history.currentId]);

  return (
    <section
      aria-label="projects-section"
      id="projects"
      className="bg-gray-900 relative pt-32"
    >
      <Quote />

      {/* main timeline */}
      <div className="mx-auto relative ">
        <Line className="scale-y-[2] bg-gradient-to-b from-cyan-300/40 to-green-300/40 absolute left-1/2 top-16 z-20" />

        {/* section Title */}
        <header className="relative z-10 pt-40 flex flex-col items-center">
          <Typography
            as="h2"
            variant="h2"
            className="animate-breathing bg-gradient w-max text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-green-200 font-bold capitalize"
          >
            Projects
          </Typography>
          <Line className="animate-breathing bg-gradient bg-gradient-to-r from-cyan-300 to-green-300 rotate-90 scale-y-[7] shadow-lg shadow-cyan-300" />
        </header>

        {/* main content */}
        <footer className="relative py-20">
          <div className="sticky top-0">
            <div className="absolute inset-x-0 h-screen">
              <Image
                className="object-cover sticky top-0 min-w-full min-h-full z-0 opacity-30"
                width={816}
                height={459}
                src={projects[activeProjectIdx]?.image || projects[0]?.image}
                alt={projects[activeProjectIdx]?.name || projects[0]?.name}
              />
            </div>
          </div>
          <div className="max-w-screen-2xl px-8 mx-auto">
            {/* the short project name description  */}
            <div className="flex gap-8 my-16 relative min-h-[4070px]">
              <ProjectInfoDashboard
                activeProject={projects[activeProjectIdx]}
              />
              <Timeline />
            </div>

            {/* top fade to timeline */}
            <div className="h-20 bg-gradient-to-b from-gray-900 to-transparent absolute top-20 inset-x-0 z-20" />

            {/* bottom fade to footer */}
            <div className="h-20 bg-gradient-to-b from-transparent to-gray-900 absolute -bottom-10 inset-x-0" />
          </div>
        </footer>
      </div>

      <Line className="scale-y-[6] relative bottom-5 left-1/2 -translate-x-1/2 bg-white/40 z-30" />
    </section>
  );
};

export default ProjectsSection;
