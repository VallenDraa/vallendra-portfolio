import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { FC, useContext, useState, useEffect, Fragment } from "react";
import Line from "../../Line/Line";
import { FaQuoteLeft } from "react-icons/fa";
import Timeline from "./Timeline";
import IntersectingProjectContext, {
  IIntersectingProjectHistoryProvider,
} from "../../../Context/IntersectingProjectCP";
import projects from "../../../Utils/Misc/ProjectDatas";
import { IoCodeSlash, IoShare } from "react-icons/io5";
import { Link } from "react-router-dom";
import TECHS from "../../MappedComponents/Techs";

const ProjectsSection: FC = () => {
  const { history } = useContext(
    IntersectingProjectContext
  ) as IIntersectingProjectHistoryProvider;
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);

  useEffect(() => {
    setActiveProjectIdx(projects.findIndex((p) => p._id === history.currentId));
  }, [history.currentId]);

  return (
    <section
      aria-label="projects-section"
      id="projects"
      className=" bg-gray-900 relative pt-32"
    >
      {/* transition from profile to projects */}
      <Line className="scale-y-[3] bg-gradient-to-b from-cyan-300/50 to-green-300/50 absolute left-[764px] top-3 z-30" />
      <Line className="scale-y-[9.6] bg-gradient-to-b from-cyan-300/50 to-green-300/50 absolute right-[572px] -top-12 z-30 rotate-90" />
      <Line className="scale-y-[1.6] bg-gradient-to-b from-cyan-300/50 to-green-300/50 absolute right-[380px] -top-20 z-30" />

      {/* Quotes */}
      <div className="flex flex-col items-center gap-8 relative z-10 py-8 max-w-screen-xl mx-auto">
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

      {/* main timeline */}
      <div className=" mx-auto relative">
        <Line className="scale-y-[2] bg-gradient-to-b from-cyan-300/50 to-green-300/50 absolute left-1/2 top-16 z-20" />

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
        <footer
          className="relative py-20"
          style={{
            backgroundImage: `url(${projects[activeProjectIdx]?.image})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="max-w-screen-xl mx-auto">
            {/* for applying filter to the background image */}
            <div className="fixed top-0 inset-x-0 h-screen backdrop-saturate-0 bg-radial-fade" />

            {/* the short  project name description  */}
            <div className="flex gap-8 my-16">
              <article className="sticky top-28 flex flex-col gap-5 z-10 h-max">
                {/* name, categories, and short description*/}
                <div className="bg-gray-900/60 backdrop-blur rounded-xl p-5 space-y-8 shadow-md shadow-gray-900/60">
                  <div className="flex flex-col gap-3">
                    <h3 className="py-3 text-5xl h-fit font-bold animate-breathing bg-gradient text-transparent bg-clip-text bg-gradient-to-r from-light-blue-400 to-blue-500 capitalize">
                      {projects[activeProjectIdx]?.name}
                    </h3>

                    {/* Categories*/}
                    <div className="flex flex-wrap gap-2">
                      {projects[activeProjectIdx]?.categories.map((cat) => {
                        return (
                          <Chip
                            key={cat}
                            className="text-[0.675rem] py-1 px-3 rounded-full bg-gray-600/70 font-semibold"
                            value={cat}
                            variant="filled"
                            animate={{ mount: { y: 0 }, unmount: { y: 50 } }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* project short description */}
                  <Typography
                    as="p"
                    variant="paragraph"
                    className="text-gray-300 font-medium"
                  >
                    {projects[activeProjectIdx]?.description || ""}
                  </Typography>
                </div>

                <Card className="bg-gray-900/60 backdrop-blur shadow-md shadow-gray-900/60">
                  <CardBody>
                    {/* Tech Stack */}
                    <Typography
                      as="h4"
                      variant="h4"
                      className="uppercase flex items-center gap-2 mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-green-500 to-white"
                    >
                      <IoCodeSlash className="text-green-400 bg-gray-700/90 p-1 rounded-lg text-3xl" />
                      Tech Stack
                    </Typography>
                    <Typography
                      as="p"
                      className="text-gray-400 font-medium mb-6 mt-2"
                    >
                      These Are the {projects[activeProjectIdx]?.tech.length}{" "}
                      Technologies That Were Used For This Project :
                    </Typography>
                    <ul className="flex items-center mt-4 relative gap-1">
                      {projects[activeProjectIdx]?.tech.map(
                        (tech: string, i): JSX.Element => (
                          <Fragment key={i}>{TECHS[tech]}</Fragment>
                        )
                      )}
                    </ul>
                  </CardBody>
                  <CardFooter
                    divider
                    className="py-3 border-gray-600 text-gray-500"
                  >
                    {/* button group */}
                    <div>
                      <nav className="flex justify-end gap-2">
                        <Button
                          size="md"
                          variant="text"
                          className="rounded-full p-0"
                        >
                          <Link
                            className="inline-block h-full w-full py-3 px-7"
                            to={"/"}
                          >
                            Detail
                          </Link>
                        </Button>
                        <Button
                          variant="filled"
                          size="md"
                          className="group hidden lg:flex items-center relative w-max rounded-full p-0"
                        >
                          <a
                            target="__blank"
                            href={projects[activeProjectIdx]?.siteLink}
                            className="h-full duration-200 text-center relative w-max inline-block py-3 px-7"
                          >
                            Visit Site
                          </a>
                        </Button>
                      </nav>
                    </div>
                  </CardFooter>
                </Card>
              </article>
              <Timeline />
            </div>

            {/*  top fade to timeline */}
            <div className="h-20 bg-gradient-to-b from-gray-900 to-transparent absolute top-0 inset-x-0" />

            {/* bottom fade to footer */}
            <div className="h-20 bg-gradient-to-b from-transparent to-gray-900 absolute botom-0 inset-x-0" />
          </div>
        </footer>
      </div>
    </section>
  );
};

export default ProjectsSection;
