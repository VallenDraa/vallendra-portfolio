import React from "react";
import { Project } from "../../../interfaces/project.interface";
import { CldImage } from "next-cloudinary";
import { Typography } from "@material-tailwind/react";
import { Language, technologies } from "../../../types/types";
import Show from "../../../utils/client/jsx/Show";
import techsWithTooltip from "../../MappedComponents/TechsWithTooltip";
import StyledButton from "../../StyledComponents/StyledButton";
import { BiDetail } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

export type TwistDirection = "right" | "left";

interface Props {
  twistDirection: TwistDirection;
  project: Project;
  language: Language;
  isFirst: boolean;
}

export default function TopPickItem({
  twistDirection,
  project,
  language,
  isFirst = false,
}: Props) {
  return (
    <div
      className={`flex min-h-[425px] flex-col ${
        twistDirection === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      <div
        className={`relative flex basis-1/2 items-center ${
          twistDirection === "left"
            ? `after:absolute after:inset-y-0 after:right-0 after:z-50 after:w-12 after:rounded-br-2xl after:border-r-2 after:border-dashed after:border-white/70 ${
                isFirst ? "" : "after:rounded-tr-2xl"
              } `
            : "before:absolute before:inset-y-0 before:-left-6 before:z-50 before:w-12 before:rounded-tl-2xl before:rounded-bl-2xl before:border-l-2 before:border-dashed before:border-white/70 lg:justify-end"
        }`}
      >
        <CldImage
          src={project.image}
          width={960}
          height={540}
          effect={[{ aspectRatio: "16:9" }]}
          className="aspect-video w-11/12 rounded-2xl object-cover"
        />

        {/* dot in line */}
        <div
          className={`absolute top-1/2 z-[60] h-5 w-5 -translate-y-1/2 rounded-full border-2 border-indigo-300 dark:bg-gray-900 ${
            twistDirection === "left" ? "right-[-9px]" : "left-[-33px]"
          }`}
        />
      </div>

      <div
        className={`flex basis-1/2 items-center ${
          twistDirection === "left" ? "justify-end" : ""
        }`}
      >
        <div
          className={`${twistDirection === "left" ? "w-11/12" : "w-full pr-5"}`}
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
            <ul className="relative flex items-center gap-1 overflow-auto">
              {project.tech.map(
                (tech: technologies, i): JSX.Element => (
                  <li key={i}>{techsWithTooltip[tech]}</li>
                )
              )}
            </ul>

            <Link href={`/projects/${project.slug}`}>
              <StyledButton
                variant="outlined"
                icon={<BsArrowRight />}
                className="relative mt-2 flex items-center justify-center gap-2 self-start rounded"
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
