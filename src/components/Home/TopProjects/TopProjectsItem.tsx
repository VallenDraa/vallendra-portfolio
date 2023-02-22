import type { Technologies } from "types/types";
import R from "react";
import { CldImage } from "next-cloudinary";
import { Typography } from "@material-tailwind/react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import type Project from "interfaces/project.interface";
import Show from "utils/client/jsx/Show";
import Observe from "components/Observe";
import fadeIn from "utils/client/helpers/animateOnObserved";
import StyledScrollbar from "components/StyledComponents/StyledScrollbar";
import techsWithTooltip from "components/MappedComponents/TechsWithTooltip";
import StyledButton from "components/StyledComponents/StyledButton";
import clsx from "clsx";
import type { TwistDirection } from "./TopProjectsSection";
import LeftRightMesh from "./LeftRightMesh";

type TopProjectsItemProps = {
  projectOrder: number;
  twistDirection: TwistDirection;
  project: Project;
  isFirst: boolean;
  isLast: boolean;
};

export default function TopProjectsItem({
  projectOrder,
  twistDirection,
  project,
  isFirst = false,
  isLast = false,
}: TopProjectsItemProps) {
  const animationTechDelay = R.useMemo(() => {
    let delay = 0;
    const delayArray: number[] = [];

    for (let i = 0; i < project.tech.length; i += 1) {
      delayArray[i] = delay;

      delay += 75;
    }

    return delayArray;
  }, [project.tech]);

  const picWrapperRef = R.useRef<HTMLDivElement>(null);
  const descWrapperRef = R.useRef<HTMLDivElement>(null);

  function projectInView() {
    picWrapperRef.current?.classList.remove("grayscale");
    picWrapperRef.current?.classList.remove("scale-90");

    descWrapperRef.current?.classList.remove("grayscale");
    descWrapperRef.current?.classList.remove("scale-90");
  }

  function projectNotInView() {
    picWrapperRef.current?.classList.add("grayscale");
    picWrapperRef.current?.classList.add("scale-90");

    descWrapperRef.current?.classList.add("grayscale");
    descWrapperRef.current?.classList.add("scale-90");
  }

  return (
    <Observe
      freezeOnceVisible
      onEnter={ref => fadeIn(ref, "animate-fade-in", 50)}
    >
      <div
        className={clsx(
          "relative flex min-h-[500px] flex-col gap-0.5 border-t-2 border-dashed border-indigo-300/70 opacity-0 dark:border-white/40 lg:h-fit lg:items-center lg:gap-0 lg:rounded-tr-none",
          isLast && "border-b-2",
          twistDirection !== "left"
            ? "border-l-2 pr-3 before:absolute before:inset-y-0 before:left-0 before:z-50 before:mx-auto before:hidden before:w-12 before:border-l-2 before:border-indigo-300/70 dark:before:border-white/40 lg:w-full lg:flex-row-reverse lg:justify-end lg:rounded-l-xl lg:border-0 lg:border-l-0 lg:before:left-1/2 lg:before:block lg:before:-translate-x-1/2 lg:before:rounded-tl-2xl before:lg:rounded-bl-2xl"
            : clsx(
                !isFirst && "lg:after:rounded-r-2xl",
                "border-r-2 pl-3 after:absolute after:inset-y-0 after:right-0 after:z-50 after:hidden after:w-12 after:border-r-2 after:border-indigo-300/70 dark:after:border-white/40 lg:flex-row lg:border-0 lg:border-r-0 lg:after:right-1/2 lg:after:block after:lg:rounded-br-2xl",
              ),
        )}
      >
        {/* Mesh */}
        <LeftRightMesh twistDirection={twistDirection} />

        {/* div to hide the top-left border for smaller screen */}
        <Show when={isFirst}>
          <div className="absolute left-0 right-[calc(50%-1px)] -top-3 block h-3.5 bg-top-pick-light dark:bg-top-pick-dark lg:hidden" />
        </Show>

        {/* div to hide the bottom-right border for smaller screen */}
        <Show when={isLast}>
          <div className="absolute right-0 left-[calc(50%-1px)] -bottom-3 block h-3.5 bg-top-pick-light dark:bg-top-pick-dark lg:hidden" />
        </Show>

        {/* project number */}
        <Observe onEnter={projectInView} onExit={projectNotInView}>
          <div
            className={clsx(
              "absolute top-1/2 z-[60] flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border-2 border-indigo-300 bg-top-pick-light text-xs text-indigo-900 dark:border-indigo-300 dark:bg-top-pick-dark dark:text-gray-400",
              twistDirection === "left"
                ? "right-[-11px] lg:right-1/2 lg:translate-x-1/2"
                : "left-[-11px] lg:left-1/2 lg:-translate-x-[33px]",
            )}
          >
            {projectOrder}
          </div>
        </Observe>

        {/* picture wrapper */}
        <div
          ref={picWrapperRef}
          className="relative flex basis-1/2 scale-90 items-center grayscale transition duration-500"
        >
          {/* picture */}
          <CldImage
            src={project.image}
            alt={project.name}
            width={1024}
            height={576}
            format="webp"
            quality={50}
            className={clsx(
              "mt-8 aspect-video w-11/12 rounded object-cover shadow-lg shadow-indigo-100/50 dark:shadow-gray-900/50 lg:mt-0",
              twistDirection === "left" ? "" : "ml-auto",
            )}
          />
        </div>

        {/* description */}
        <div
          ref={descWrapperRef}
          className={`relative z-40 flex basis-1/2 scale-90 items-center pt-2 pb-8 grayscale transition duration-500 lg:p-0 ${
            twistDirection === "left" ? "lg:justify-end" : ""
          }`}
        >
          <div
            className={`w-11/12 ${
              twistDirection === "left" ? "" : "ml-auto lg:ml-0"
            }`}
          >
            {/* short description */}
            <Typography
              as="h3"
              variant="h2"
              className="primary-gradient bg-gradient-to-r bg-clip-text font-bold !leading-[initial] text-transparent"
            >
              {project.name}
            </Typography>
            <Typography
              variant="paragraph"
              className="font-normal leading-loose text-indigo-600 dark:text-gray-300"
            >
              {project.shortDescriptionEN}
            </Typography>

            <div className="flex flex-col">
              <StyledScrollbar
                autoHeight
                autoHeightMin="100%"
                autoHeightMax="100%"
                renderView={props => (
                  <ul {...props} className="relative flex items-center gap-1" />
                )}
              >
                {project.tech.map(
                  (tech: Technologies, i): JSX.Element => (
                    <Observe
                      key={tech}
                      freezeOnceVisible
                      onEnter={ref =>
                        fadeIn(
                          ref,
                          "animate-fade-in-left",
                          animationTechDelay[i],
                        )
                      }
                    >
                      <li className="opacity-0">{techsWithTooltip[tech]()}</li>
                    </Observe>
                  ),
                )}
              </StyledScrollbar>

              <Link
                href={`/projects/${project.slug}`}
                className="mt-2 inline-block lg:w-max"
              >
                <StyledButton
                  variant="outlined"
                  icon={<BsArrowRight className="text-teal-600" />}
                  className="relative flex w-full items-center justify-center gap-2 self-start rounded border-2 lg:w-max"
                  color="teal"
                  size="md"
                >
                  See Project
                </StyledButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Observe>
  );
}
