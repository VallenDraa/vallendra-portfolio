import R from "react";
import Project from "../../../interfaces/project.interface";
import { CldImage } from "next-cloudinary";
import { Typography } from "@material-tailwind/react";
import { Language, technologies } from "../../../types/types";
import Show from "../../../utils/client/jsx/Show";
import techsWithTooltip from "../../MappedComponents/TechsWithTooltip";
import StyledButton from "../../StyledComponents/StyledButton";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import Observe from "../../Observe";
import fadeIn from "../../../utils/client/helpers/animateOnObserved";
import LeftRightMesh from "./LeftRightMesh";

export type TwistDirection = "right" | "left";

interface Props {
  projectOrder: number;
  twistDirection: TwistDirection;
  project: Project;
  language: Language;
  isFirst: boolean;
  isLast: boolean;
}

export default function TopPickItem({
  projectOrder,
  twistDirection,
  project,
  language,
  isFirst = false,
  isLast = false,
}: Props) {
  const animationTechDelay = R.useMemo(() => {
    let delay = 0;
    const delayArray: number[] = [];

    for (let i = 0; i < project.tech.length; i++) {
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
    <div
      className={`relative flex min-h-[500px] flex-col gap-0.5 border-t-2 border-dashed border-indigo-300/70 dark:border-white/40 lg:h-fit lg:items-center lg:gap-0 lg:rounded-tr-none ${
        isLast ? "border-b-2" : ""
      } ${
        twistDirection === "left"
          ? `rounded-r-2xl border-r-2 after:absolute after:inset-y-0 after:right-0 after:z-50 after:hidden after:w-12 after:border-r-2 after:border-dashed after:border-indigo-300/70 dark:after:border-white/40 lg:flex-row lg:border-0 lg:border-r-0 lg:after:right-1/2 lg:after:block after:lg:rounded-br-2xl ${
              isFirst
                ? "after:rounded-tr-2xl lg:after:rounded-none"
                : "ml-3 after:rounded-tr-2xl lg:ml-0"
            }`
          : "mx-auto mr-3 rounded-l-xl border-l-2 before:absolute before:inset-y-0 before:left-0 before:z-50 before:hidden before:w-12 before:rounded-tl-2xl before:border-l-2 before:border-dashed before:border-indigo-300/70 dark:before:border-white/40 lg:w-full lg:flex-row-reverse lg:justify-end lg:border-0 lg:border-l-0 lg:before:left-1/2 lg:before:block lg:before:-translate-x-1/2 before:lg:rounded-bl-2xl"
      }`}
    >
      {/* Mesh */}

      <LeftRightMesh
        className="hidden lg:block"
        twistDirection={twistDirection}
      />

      {/* div to hide the top-left border for smaller screen */}
      <Show when={isFirst}>
        <div className="absolute left-0 right-1/2 -top-3 block h-3 bg-top-pick-light dark:bg-top-pick-dark lg:hidden" />
      </Show>

      {/* div to hide the bottom-right border for smaller screen */}
      <Show when={isLast}>
        <div className="absolute right-0 left-1/2 -bottom-3 block h-3 bg-top-pick-light dark:bg-top-pick-dark lg:hidden" />
      </Show>

      {/* dot in line */}
      <Observe onEnter={projectInView} onExit={projectNotInView}>
        <div
          className={`absolute top-1/2 z-[60] flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border-2 border-indigo-500 bg-top-pick-light text-xs text-indigo-900 dark:border-indigo-300 dark:bg-top-pick-dark dark:text-gray-400 ${
            twistDirection === "left"
              ? "right-[-11px] lg:right-1/2 lg:translate-x-1/2"
              : "left-[-11px] lg:left-1/2 lg:-translate-x-[33px]"
          }`}
        >
          {projectOrder}
        </div>
      </Observe>

      {/* picture wrapper*/}
      <div
        ref={picWrapperRef}
        className="relative flex basis-1/2 scale-90 items-center grayscale transition duration-500"
      >
        {/* picture */}
        <CldImage
          src={project.image}
          alt={project.name}
          width={960}
          height={540}
          className={`mt-8 aspect-video w-11/12 rounded object-cover shadow-lg shadow-indigo-100/50 dark:shadow-gray-900/50 lg:mt-0 ${
            twistDirection === "left" ? "" : "ml-auto"
          }`}
        />
      </div>

      {/* description */}
      <div
        ref={descWrapperRef}
        className={`relative z-40 flex basis-1/2 scale-90 items-center pt-2 pb-8 grayscale transition duration-500 lg:p-0 ${
          twistDirection === "left" ? "lg:justify-end" : "pl-5"
        }`}
      >
        <div
          className={`w-11/12 ${
            twistDirection === "left"
              ? ""
              : "ml-auto text-end lg:ml-0 lg:text-start"
          }`}
        >
          {/* short description */}
          <Typography
            variant="h2"
            as="h3"
            className="primary-gradient animate-breathing bg-gradient-to-r bg-gradient bg-clip-text font-bold !leading-[initial] text-transparent"
          >
            {project.name}
          </Typography>
          <Typography
            variant="paragraph"
            className="text-base font-medium leading-loose text-indigo-600 dark:text-gray-300"
          >
            <Show when={language === "en"}>{project.shortDescriptionEN}</Show>
            <Show when={language === "id"}>{project.shortDescriptionID}</Show>
          </Typography>

          <div className="flex flex-col">
            <ul
              className={`scrollbar-kece relative flex items-center gap-1 overflow-x-auto overflow-y-hidden ${
                twistDirection === "left" ? "" : "justify-end lg:justify-start"
              }`}
            >
              {project.tech.map((tech: technologies, i): JSX.Element => {
                return (
                  <Observe
                    key={i}
                    freezeOnceVisible
                    onEnter={(ref) =>
                      fadeIn(ref, "animate-fade-in-left", animationTechDelay[i])
                    }
                  >
                    <li className="opacity-0">{techsWithTooltip[tech]}</li>
                  </Observe>
                );
              })}
            </ul>

            <Link
              href={`/projects/${project.slug}`}
              className="mt-2 inline-block lg:w-max"
            >
              <StyledButton
                variant="outlined"
                icon={<BsArrowRight />}
                className="relative flex w-full items-center justify-center gap-2 self-start rounded lg:w-max"
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
  );
}
