import React from "react";
import { Project } from "../../../interfaces/project.interface";
import { CldImage } from "next-cloudinary";
import { Typography } from "@material-tailwind/react";
import { Language, technologies } from "../../../types/types";
import Show from "../../../utils/client/jsx/Show";
import techsWithTooltip from "../../MappedComponents/TechsWithTooltip";
import StyledButton from "../../StyledComponents/StyledButton";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

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
  return (
    <div
      className={`relative flex min-h-[500px] flex-col gap-0.5 border-t-[1px] border-dashed border-white/60 lg:h-fit lg:items-center lg:gap-0 lg:rounded-tr-none ${
        isLast ? "border-b-[1px]" : ""
      } ${
        twistDirection === "left"
          ? `rounded-r-2xl border-r-[1px] after:absolute after:inset-y-0 after:right-0 after:z-50 after:hidden after:w-12 after:border-r-[1px] after:border-dashed after:border-white/60 lg:flex-row lg:border-0 lg:border-r-0 lg:after:right-1/2 lg:after:block after:lg:rounded-br-2xl ${
              isFirst
                ? "after:rounded-tr-2xl lg:after:rounded-none"
                : "ml-3 after:rounded-tr-2xl lg:ml-0"
            }`
          : "mx-auto mr-4 rounded-l-xl border-l-[1px] before:absolute before:inset-y-0 before:left-0 before:z-50 before:hidden before:w-12 before:rounded-tl-2xl before:border-l-[1px] before:border-dashed before:border-white/60 lg:mr-0 lg:w-full lg:flex-row-reverse lg:justify-end lg:border-0 lg:border-l-0 lg:before:left-1/2 lg:before:block lg:before:-translate-x-1/2 before:lg:rounded-bl-2xl"
      }`}
    >
      {/* div to hide the top-left border for smaller screen */}
      <Show when={isFirst}>
        <div className="absolute left-0 right-1/2 -top-3 h-3 bg-indigo-50 dark:bg-[#272727]" />
      </Show>

      {/* div to hide the bottom-right border for smaller screen */}
      <Show when={isLast}>
        <div className="absolute right-0 left-1/2 -bottom-3 h-3 bg-indigo-50 dark:bg-[#272727]" />
      </Show>

      {/* dot in line */}
      <div
        className={`absolute top-1/2 z-[60] flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border-[1px] text-xs dark:border-indigo-300 dark:bg-gray-900 dark:text-white/60 ${
          twistDirection === "left"
            ? "right-[-11px] lg:right-1/2 lg:translate-x-1/2"
            : "left-[-11px] lg:left-1/2 lg:-translate-x-[33px]"
        }`}
      >
        {projectOrder}
      </div>

      {/* picture wrapper*/}
      <div className="relative flex basis-1/2 items-center">
        {/* picture */}
        <CldImage
          src={project.image}
          alt={project.name}
          width={960}
          height={540}
          className={`mt-8 aspect-video w-11/12 rounded object-cover lg:mt-0 ${
            twistDirection === "left" ? "" : "ml-auto"
          }`}
        />
      </div>

      {/* description */}
      <div
        className={`flex basis-1/2 items-center pt-2 pb-8 lg:p-0 ${
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
            className="text-base font-medium leading-loose text-indigo-600 dark:text-white/70"
          >
            <Show when={language === "en"}>{project.shortDescriptionEN}</Show>
            <Show when={language === "id"}>{project.shortDescriptionID}</Show>
          </Typography>

          <div className="flex flex-col">
            <ul
              className={`relative flex items-center gap-1 overflow-auto ${
                twistDirection === "left" ? "" : "justify-end lg:justify-start"
              }`}
            >
              {project.tech.map(
                (tech: technologies, i): JSX.Element => (
                  <li key={i}>{techsWithTooltip[tech]}</li>
                )
              )}
            </ul>

            <Link
              href={`/projects/${project.slug}`}
              className="inline-block lg:w-max"
            >
              <StyledButton
                variant="outlined"
                icon={<BsArrowRight />}
                className="relative mt-2 flex w-full items-center justify-center gap-2 self-start rounded lg:w-max"
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
