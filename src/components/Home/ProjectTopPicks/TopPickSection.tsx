import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import Project from "../../../interfaces/project.interface";
import { useRef, useState } from "react";
import TopPickItem, { TwistDirection } from "./TopPickItem";
import { Language } from "../../../types/types";
import LanguageToggle from "../../DetailsPage/LanguageToggle";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import Observe from "../../Observe";
import fadeIn from "../../../utils/client/helpers/animateOnObserved";
import TopBottomWaves from "./TopBottomWaves";

interface Props {
  topPickedProjects: Project[];
}

export default function TopPickSection({ topPickedProjects }: Props) {
  /* language switcher
  =================== */
  const [activeLanguage, setActiveLanguage] = useState<Language>("en");

  const lineTwistDirection = useRef<TwistDirection>("left");

  return (
    <section
      aria-label="top-picks-section"
      id="top-picks"
      className="relative bg-top-pick-light transition-colors dark:bg-top-pick-dark"
    >
      <TopBottomWaves />

      <div className="relative mx-auto flex w-full max-w-screen-xl flex-col items-center gap-10 px-8 2xl:px-2">
        {/* project timeline */}
        <div className="relative w-full">
          {/* section Title */}
          <div className="relative z-20 pt-24 pb-6 after:absolute after:inset-y-0 after:right-1/2 after:w-[0.5px] after:translate-x-1/2 after:border-r-2 after:border-indigo-500/50 dark:after:border-white/30 md:w-1/2 md:pt-48 md:pr-5 md:after:right-0 md:after:translate-x-0">
            <div className="relative z-30 pb-5 backdrop-blur-sm md:pb-0 lg:bg-transparent lg:backdrop-blur-sm">
              <Observe
                freezeOnceVisible
                onEnter={(ref) => fadeIn(ref, "animate-fade-in-top", 0)}
              >
                <div className="flex items-center opacity-0">
                  <Typography
                    as="h2"
                    variant="h1"
                    className="primary-gradient w-max animate-breathing bg-gradient-to-r bg-gradient bg-clip-text font-bold capitalize !leading-[initial] text-transparent"
                  >
                    Top Picks
                  </Typography>
                  <span className="text-3xl">🌟</span>
                </div>
              </Observe>

              <Observe
                freezeOnceVisible
                onEnter={(ref) => fadeIn(ref, "animate-fade-in-top", 100)}
              >
                <Typography
                  as="p"
                  variant="paragraph"
                  className="mb-5 pl-0.5 text-justify font-medium leading-loose text-indigo-700 opacity-0 dark:text-gray-300 md:text-lg"
                >
                  A selection of my best projects as of now.
                </Typography>
              </Observe>

              <Observe
                freezeOnceVisible
                onEnter={(ref) => fadeIn(ref, "animate-fade-in-top", 200)}
              >
                <div className="opacity-0">
                  <LanguageToggle
                    activeLanguage={activeLanguage}
                    setActiveLanguage={setActiveLanguage}
                  />
                </div>
              </Observe>
            </div>
          </div>

          {/* projects */}
          <div>
            {topPickedProjects.map((project, i) => {
              const component = (
                <TopPickItem
                  projectOrder={i + 1}
                  language={activeLanguage}
                  key={project._id}
                  project={project}
                  twistDirection={lineTwistDirection.current}
                  isFirst={i === 0}
                  isLast={i === topPickedProjects.length - 1}
                />
              );

              lineTwistDirection.current =
                lineTwistDirection.current === "left" ? "right" : "left";

              return component;
            })}
          </div>

          {/* see all projects */}
          <div className="relative flex w-full flex-col items-center gap-1 before:z-50 before:h-28 before:w-12 before:-translate-x-6 before:rounded-tr-lg before:border-r-2 before:border-dashed before:border-indigo-300/50 after:z-50 after:h-40 after:w-[2px] after:bg-indigo-300/50 dark:before:border-white/40 dark:after:bg-white/30">
            {/* blur */}
            <div className="absolute left-1/2 top-[40%] h-24 w-24 -translate-x-1/2 -translate-y-[40%] rounded-full bg-deep-purple-300 blur-2xl dark:bg-deep-purple-500" />

            <Link aria-label="All projects link" href="/projects">
              <Tooltip
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                content="See All Projects"
              >
                {/* dot in line */}
                <IconButton
                  aria-label="All projects button"
                  variant="gradient"
                  color="deep-purple"
                  size="lg"
                  className="group relative z-[55] rounded-full transition duration-200 hover:scale-125"
                >
                  <BsArrowRight className="text-3xl" />
                </IconButton>
              </Tooltip>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
