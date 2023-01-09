import {
  Card,
  Chip,
  Typography,
  CardBody,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { IProject } from "../../../interfaces/projectInterfaces";
import Link from "next/link";
import TECHS from "../../MappedComponents/TechsWithTooltip";
import { IoCodeSlash } from "react-icons/io5";
import { useState, useEffect } from "react";
import Show from "../../../utils/jsx/Show";
import { technologies } from "../../../types/types";

export default function TopPicksInfoDashboard({
  activeProject,
}: {
  activeProject: IProject;
}) {
  const [numberIsVisible, setNumberIsVisible] = useState(false);

  /* contains window resize listener to handle number visibility
  ============================================================== */
  useEffect(() => {
    setNumberIsVisible(window.innerWidth < 960);

    function numberVisibiiltyHandler() {
      window.innerWidth < 960 && !numberIsVisible
        ? setNumberIsVisible(true)
        : setNumberIsVisible(false);
    }

    window.addEventListener("resize", numberVisibiiltyHandler);

    return () => window.removeEventListener("resize", numberVisibiiltyHandler);
  }, []);

  return (
    <Card className="sticky top-[20%] z-10 bg-gray-900/60 backdrop-blur rounded-xl shadow-md shadow-gray-900/60 h-max w-full inset-x-0">
      <CardBody className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="py-3 text-5xl h-fit font-bold animate-breathing bg-gradient text-transparent bg-clip-text bg-gradient-to-r from-light-blue-400 to-blue-500 capitalize">
              {activeProject?.name}
            </h3>

            <Show when={numberIsVisible}>
              <Chip
                color="teal"
                value={activeProject?._id || ""}
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg"
              />
            </Show>
          </div>

          {/* Project Type*/}
          <div className="flex flex-wrap gap-2">
            {activeProject?.categoryIds.map((cat) => {
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

          {/* project short description */}
          <Typography
            as="p"
            variant="paragraph"
            className="text-gray-300 font-medium mt-3 "
          >
            {activeProject?.description || ""}
          </Typography>
        </div>

        {/* Tech Stack */}
        <div>
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
            className="text-gray-400 text-sm font-medium mb-6 mt-2"
          >
            These Are the {activeProject?.tech.length} Technologies That Were
            Used For This Project :
          </Typography>
          <ul className="flex items-center mt-4 relative gap-1 overflow-auto">
            {activeProject?.tech.map(
              (tech: technologies, i): JSX.Element => (
                <li key={i}>{TECHS[tech]}</li>
              )
            )}
          </ul>
        </div>
      </CardBody>
      <CardFooter
        divider
        className="flex justify-end gap-2 py-3 border-gray-600 text-gray-500"
      >
        <Button size="md" variant="text" className="rounded-full p-0">
          <Link
            className="inline-block h-full w-full py-3 px-7"
            href={`/projects/${activeProject?.slug}`}
          >
            Detail
          </Link>
        </Button>
        <Button
          variant="filled"
          size="md"
          className="group flex items-center relative w-max rounded-full p-0"
        >
          <a
            target="__blank"
            href={activeProject?.siteLink || "#"}
            className="h-full duration-200 text-center relative w-max inline-block py-3 px-7"
          >
            Visit Site
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
