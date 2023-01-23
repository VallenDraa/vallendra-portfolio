import { Typography } from "@material-tailwind/react";
import { Project } from "../../../interfaces/project.interface";
import Line from "../../Line";
import { useRef, useState } from "react";
import TopPickItem, { TwistDirection } from "./TopPickItem";
import { Language } from "../../../types/types";
import LanguageToggle from "../../DetailsPage/LanguageToggle";

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
      <div className="relative mx-auto flex w-full max-w-screen-xl flex-col items-center gap-10 px-8 xl:px-0">
        <Line className="relative z-40 scale-y-[3]" />

        {/* project timeline */}
        <div className="relative w-full">
          {/* section Title */}
          <div className="relative z-20 w-1/2 space-y-3 pb-6 after:absolute after:inset-y-0 after:right-[-0.5px] after:w-[1px] after:bg-gradient-to-b after:from-white/40 after:to-white/70">
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
            <LanguageToggle
              activeLanguage={activeLanguage}
              setActiveLanguage={setActiveLanguage}
            />
          </div>

          <div>
            {topPickedProjects.map((project) => {
              const component = (
                <TopPickItem
                  language={activeLanguage}
                  key={project._id}
                  project={project}
                  twistDirection={lineTwistDirection.current}
                />
              );

              lineTwistDirection.current =
                lineTwistDirection.current === "left" ? "right" : "left";

              return component;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
