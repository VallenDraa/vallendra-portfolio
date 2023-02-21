import { IconButton, Tooltip } from "@material-tailwind/react";
import { useRef } from "react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import type Project from "interfaces/project.interface";
import fadeIn from "utils/client/helpers/animateOnObserved";
import Observe from "components/Observe";
import SectionHeading from "components/Typography/SectionHeading";
import TopBottomWaves from "./TopBottomWaves";
import TopPickItem from "./TopPickItem";

interface Props {
  topPickedProjects: Project[];
}

export type TwistDirection = "right" | "left";

export default function TopPickSection({ topPickedProjects }: Props) {
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
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in", 0)}
          >
            <div className="relative z-20 pt-24 pb-1 opacity-0 after:absolute after:inset-y-0 after:right-1/2 after:w-[0.5px] after:translate-x-1/2 after:border-r-2 after:border-indigo-300/70 dark:after:border-white/30 md:w-1/2 md:pt-48 md:pr-5 md:after:right-0 md:after:translate-x-0">
              <div className="relative z-30 bg-[#dbdef1] supports-[backdrop-filter]:bg-transparent supports-[backdrop-filter]:backdrop-blur-sm dark:bg-[#2f2f2f] dark:supports-[backdrop-filter]:bg-transparent md:pb-0">
                <SectionHeading
                  titleAs="h2"
                  title="Top Projects"
                  subTitle="A selection of my best projects as of now."
                  animation={{
                    title: "animate-fade-in-top",
                    subTitle: "animate-fade-in-top",
                  }}
                  duration={{ title: 100, subTitle: 200 }}
                  willFade
                />
              </div>
            </div>
          </Observe>

          {/* projects */}
          <div>
            {topPickedProjects.map((project, i) => {
              const component = (
                <TopPickItem
                  projectOrder={i + 1}
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
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in", 50)}
          >
            <div className="relative flex w-full flex-col items-center gap-1 opacity-0 before:z-50 before:h-28 before:w-12 before:-translate-x-6 before:rounded-tr-lg before:border-r-2 before:border-dashed before:border-indigo-300/70 after:z-50 after:h-40 after:w-[1.5px] after:bg-indigo-300/70 dark:before:border-white/40 dark:after:bg-white/30">
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
          </Observe>
        </div>
      </div>
    </section>
  );
}
