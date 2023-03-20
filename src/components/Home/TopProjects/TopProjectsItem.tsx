import type { Technologies } from "types/types";
import type Project from "interfaces/project.interface";

import R from "react";
import { CldImage } from "next-cloudinary";
import { BsArrowRight } from "react-icons/bs";
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
  }, []);

  const [projectIsInView, setProjectIsInView] = R.useState(false);

  return (
    <div
      className={clsx(
        "relative flex min-h-[500px] flex-col gap-0.5 border-t-2 border-dashed border-indigo-300/70 before:border-dashed after:border-dashed dark:border-white/40 lg:h-fit lg:items-center lg:gap-0 lg:rounded-tr-none",
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
        <div className="absolute left-0 right-[calc(50%-1px)] -top-3 block h-3.5 bg-[#E9EDFF] dark:bg-[#1E1E21] lg:hidden" />
      </Show>

      {/* div to hide the bottom-right border for smaller screen */}
      <Show when={isLast}>
        <div className="absolute right-0 left-[calc(50%-1px)] -bottom-3 block h-3.5 bg-[#E9EDFF] dark:bg-[#1E1E21] lg:hidden" />
      </Show>

      {/* project number */}
      <Observe
        onIntersectingStatusChange={isInView => setProjectIsInView(isInView)}
      >
        <div
          className={clsx(
            "absolute top-1/2 z-[60] flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border-2 border-indigo-500/70 bg-[#E9EDFF] text-xs text-zinc-900 dark:bg-[#1E1E21] dark:text-zinc-300",
            twistDirection === "left"
              ? "right-[-11px] lg:right-[calc(50%+1px)] lg:translate-x-1/2"
              : "left-[-11px] lg:left-1/2 lg:-translate-x-[33px]",
          )}
        >
          {projectOrder}
        </div>
      </Observe>

      {/* picture wrapper */}
      <div
        className={clsx(
          !projectIsInView && "scale-90 grayscale",
          "relative flex basis-1/2 items-center transition duration-500",
        )}
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
            "mt-8 aspect-video w-11/12 rounded object-cover shadow-lg shadow-zinc-100/50 transition-transform duration-200 dark:shadow-zinc-600/50 lg:mt-0",
            twistDirection !== "left" && "ml-auto",
          )}
        />
      </div>

      {/* description */}
      <div
        className={clsx(
          !projectIsInView && "scale-90 grayscale",
          twistDirection === "left" && "lg:justify-end",
          "relative z-40 flex basis-1/2 items-center pt-2 pb-8 transition duration-500 lg:p-0",
        )}
      >
        <div
          className={clsx(
            "w-11/12",
            twistDirection === "left" ? "" : "ml-auto lg:ml-0",
          )}
        >
          {/* short description */}
          <h3 className="primary-gradient bg-gradient-to-r bg-clip-text font-bold !leading-[initial] text-transparent">
            {project.name}
          </h3>
          <p className="mt-1 leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.shortDescriptionEN}
          </p>

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
                      fadeIn(ref, "animate-fade-in-left", animationTechDelay[i])
                    }
                  >
                    <li className="opacity-0">{techsWithTooltip[tech]()}</li>
                  </Observe>
                ),
              )}
            </StyledScrollbar>

            <StyledButton
              hrefTarget="_self"
              href={`/projects/${project.slug}`}
              alwaysShowIcon={false}
              icon={<BsArrowRight className="text-indigo-400" />}
              className="relative mt-2 flex w-full items-center justify-center gap-2 self-start border !border-indigo-400 py-3 px-4 !text-indigo-400 hover:bg-indigo-500/10 lg:w-max"
              color="indigo"
            >
              See Project
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
}
