import {
  Card,
  Chip,
  Typography,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { IProject } from "../../../interfaces/projectInterface";
import Link from "next/link";
import TECHS from "../../MappedComponents/TechsWithTooltip";
import { IoCodeSlash } from "react-icons/io5";
import { useState, useEffect, useContext } from "react";
import Show from "../../../utils/jsx/Show";
import { technologies } from "../../../types/types";
import StyledButton from "../../StyledComponents/StyledButton";
import { BiDetail } from "react-icons/bi";
import { SlGlobe } from "react-icons/sl";
import { DashboardControllerContext } from "../../../context/TopPicksDashboardControllerCP";

export default function TopPicksInfoDashboard({
  activeProject,
}: {
  activeProject: IProject;
}) {
  const { dashboardRef } = useContext(DashboardControllerContext);

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
    <Card
      ref={dashboardRef}
      className="sticky inset-x-0 top-1/2 z-10 h-max w-full -translate-y-1/2 rounded-md bg-indigo-50/80 shadow-md backdrop-blur transition duration-500  dark:bg-gray-900/60 dark:shadow-gray-900/60"
    >
      <CardBody className="flex flex-col gap-10">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <Typography
              as="h3"
              className="primary-gradient h-fit animate-breathing bg-gradient-to-r bg-gradient bg-clip-text py-3 text-4xl font-bold capitalize text-transparent sm:text-5xl"
            >
              {activeProject?.name || ""}
            </Typography>

            <Show when={numberIsVisible}>
              <Chip
                color="teal"
                value={activeProject?._id || ""}
                className="flex aspect-square h-12 w-12 items-center justify-center rounded-full text-lg"
              />
            </Show>
          </div>

          {/* project short description */}
          <Typography
            as="p"
            variant="lead"
            className="mt-3 font-medium text-indigo-400 dark:text-gray-400"
          >
            {activeProject?.shortDescription || ""}
          </Typography>
        </div>

        {/* Tech Stack */}
        <div>
          <Typography
            as="h4"
            variant="h4"
            className="mb-2 flex items-center gap-2 bg-gradient-to-tr  from-green-500 to-green-200 bg-clip-text font-bold uppercase text-transparent dark:to-white"
          >
            <IoCodeSlash className="rounded-lg bg-indigo-800/50 p-1 text-3xl text-green-400 dark:bg-gray-700/90" />
            Tech Stack
          </Typography>
          <Typography
            as="p"
            className="mb-4 mt-2 text-sm font-medium text-indigo-300 dark:text-gray-300"
          >
            These Are the {activeProject?.tech.length || 0} Technologies That
            Were Used For This Project :
          </Typography>
          <ul className="relative flex  items-center gap-1 overflow-auto">
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
        className="flex justify-end gap-2 border-gray-600 py-3 text-gray-500"
      >
        <Link href={`/projects/${activeProject?.slug}`}>
          <StyledButton
            icon={<BiDetail />}
            size="md"
            variant="text"
            color="gray"
          >
            Detail
          </StyledButton>
        </Link>
        <a target="__blank" href={activeProject?.siteLink || "#"}>
          <StyledButton icon={<SlGlobe />} variant="filled" size="md">
            Visit Site
          </StyledButton>
        </a>
      </CardFooter>
    </Card>
  );
}
