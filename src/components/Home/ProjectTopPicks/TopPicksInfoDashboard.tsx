import {
  Card,
  Chip,
  Typography,
  CardBody,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { IProject } from "../../../interfaces/projectInterface";
import Link from "next/link";
import TECHS from "../../MappedComponents/TechsWithTooltip";
import { IoCodeSlash } from "react-icons/io5";
import { useState, useEffect } from "react";
import Show from "../../../utils/jsx/Show";
import { technologies } from "../../../types/types";
import projectCategories from "../../../utils/datas/projects/projectCategories";

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
    <Card className="sticky inset-x-0 top-[20%] z-10 h-max w-full rounded-md shadow-md backdrop-blur dark:bg-gray-900/60 dark:shadow-gray-900/60">
      <CardBody className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="h-fit animate-breathing bg-gradient-to-r from-light-blue-400 to-blue-500 bg-gradient bg-clip-text py-3 text-5xl font-bold capitalize text-transparent">
              {activeProject?.name}
            </h3>

            <Show when={numberIsVisible}>
              <Chip
                color="teal"
                value={activeProject?._id || ""}
                className="flex aspect-square h-12 w-12 items-center justify-center rounded-full text-lg"
              />
            </Show>
          </div>

          {/* Project Type*/}
          <div className="flex flex-wrap gap-2">
            {activeProject?.categoryIds.map((catId) => {
              const category = projectCategories.find(
                ({ _id }) => _id === catId
              );

              return category ? (
                <Chip
                  key={catId}
                  className="rounded-full bg-gray-600/70 py-1 px-3 text-[0.675rem] font-semibold"
                  value={category?.name}
                  variant="filled"
                  animate={{ mount: { y: 0 }, unmount: { y: 50 } }}
                />
              ) : null;
            })}
          </div>

          {/* project short description */}
          <Typography
            as="p"
            variant="paragraph"
            className="mt-3 font-medium text-gray-300 "
          >
            {activeProject?.shortDescription || ""}
          </Typography>
        </div>

        {/* Tech Stack */}
        <div>
          <Typography
            as="h4"
            variant="h4"
            className="mb-2 flex items-center gap-2 bg-gradient-to-tr from-green-500 to-white bg-clip-text font-bold uppercase text-transparent"
          >
            <IoCodeSlash className="rounded-lg bg-gray-700/90 p-1 text-3xl text-green-400" />
            Tech Stack
          </Typography>
          <Typography
            as="p"
            className="mb-4 mt-2 text-sm font-medium text-gray-400"
          >
            These Are the {activeProject?.tech.length} Technologies That Were
            Used For This Project :
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
          <Button
            size="md"
            variant="text"
            color="gray"
            className="rounded-full"
          >
            Detail
          </Button>
        </Link>
        <a target="__blank" href={activeProject?.siteLink || "#"}>
          <Button
            variant="filled"
            size="md"
            className="group relative flex w-max items-center rounded-full"
          >
            Visit Site
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
