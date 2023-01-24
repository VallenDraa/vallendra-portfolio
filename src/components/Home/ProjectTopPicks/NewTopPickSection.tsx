import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { Project } from "../../../interfaces/project.interface";
import Line from "../../Line";
import { useRef, useState } from "react";
import TopPickItem, { TwistDirection } from "./TopPickItem";
import { Language } from "../../../types/types";
import LanguageToggle from "../../DetailsPage/LanguageToggle";
import { BsArrowRight } from "react-icons/bs";

interface Props {
  topPickedProjects: Project[];
}

export default function NewTopPickSection({ topPickedProjects }: Props) {
  /* language switcher
  =================== */
  const [activeLanguage, setActiveLanguage] = useState<Language>("en");

  const lineTwistDirection = useRef<TwistDirection>("left");

  return (
    <section
      aria-label="top-picks-section"
      id="top-picks"
      className="fade-bottom fade-top relative before:top-0 after:bottom-0 dark:bg-gray-800/20"
    >
      <div className="relative mx-auto flex w-full max-w-screen-xl flex-col items-center gap-10 px-8 2xl:px-0">
        <Line className="relative z-40 scale-y-[3]" />

        {/* project timeline */}
        <div className="relative w-full">
          {/* section Title */}
          <div className="relative z-20 w-1/2 space-y-3 pb-6 pr-5 after:absolute after:inset-y-0 after:right-0 after:w-[0.5px] after:bg-gradient-to-b after:from-white/40 after:to-white/50">
            <div className="flex items-center">
              <Typography
                as="h2"
                variant="h1"
                className="primary-gradient w-max animate-breathing bg-gradient-to-r bg-gradient bg-clip-text font-bold capitalize !leading-[initial] text-transparent"
              >
                Top Picks
              </Typography>
              <span className="text-3xl">🌟</span>
            </div>

            <Typography
              as="p"
              variant="paragraph"
              className="mb-5 pl-0.5 text-justify font-medium leading-loose text-indigo-700 dark:text-white/80 md:text-lg"
            >
              A selection of my best projects as of now.
            </Typography>

            <LanguageToggle
              activeLanguage={activeLanguage}
              setActiveLanguage={setActiveLanguage}
            />
          </div>

          {/* projects */}
          <div>
            {topPickedProjects.map((project, i) => {
              const component = (
                <TopPickItem
                  language={activeLanguage}
                  key={project._id}
                  project={project}
                  twistDirection={lineTwistDirection.current}
                  isFirst={i === 0}
                />
              );

              lineTwistDirection.current =
                lineTwistDirection.current === "left" ? "right" : "left";

              return component;
            })}
          </div>

          {/* see all projects */}
          <div className="flex w-full flex-col items-center gap-1 before:z-50 before:h-28 before:w-12 before:-translate-x-6 before:rounded-tr-2xl before:border-r-2 before:border-dashed before:border-white/70 after:z-50 after:h-28 after:w-[1px] after:bg-gradient-to-b after:from-white/70 after:to-white/20">
            <Tooltip
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              content="See All Projects"
            >
              {/* dot in line */}
              <IconButton
                variant="gradient"
                color="teal"
                size="lg"
                className="rounded-full dark:bg-gray-900"
              >
                <BsArrowRight className="text-3xl" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  );
}
