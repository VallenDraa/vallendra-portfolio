import React from "react";
import { Project } from "../../../interfaces/project.interface";
import { CldImage } from "next-cloudinary";
import { Typography } from "@material-tailwind/react";
import { Language } from "../../../types/types";
import Show from "../../../utils/client/jsx/Show";

export type TwistDirection = "right" | "left";

interface Props {
  twistDirection: TwistDirection;
  project: Project;
  language: Language;
}

export default function TopPickItem({
  twistDirection,
  project,
  language,
}: Props) {
  return (
    <div
      className={`flex flex-col ${
        twistDirection === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* <div
        className={`relative flex basis-1/2 ${
          twistDirection === "left"
            ? "after:absolute after:inset-y-0 after:right-[-0.5px] after:w-12 after:rounded-br-3xl after:border-r-2 after:border-dashed after:border-white/70"
            : "before:absolute before:inset-y-0 before:left-[-0.5px] before:w-12 before:rounded-bl-3xl before:border-l-2 before:border-dashed before:border-white/70 lg:justify-end"
        }`}
      >
        <CldImage
          src={project.image}
          width={960}
          height={540}
          effect={[{ aspectRatio: "16:9" }]}
          className="aspect-video w-11/12 rounded-lg object-cover"
        />
      </div>

      <div
        className={`flex basis-1/2 items-center ${
          twistDirection === "left" ? "justify-end" : ""
        }`}
      >
        <div className={`${twistDirection === "left" ? "w-11/12" : ""}`}>
          <Typography variant="h3">{project.name}</Typography>
          <Typography
            variant="paragraph"
            className="font-normal leading-loose text-indigo-600 dark:text-gray-400"
          >
            <Show when={language === "en"}>{project.shortDescriptionEN}</Show>
            <Show when={language === "id"}>{project.shortDescriptionID}</Show>
          </Typography>
        </div>
      </div> */}
    </div>
  );
}
