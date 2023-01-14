import { Typography } from "@material-tailwind/react";
import { useContext, useState, useEffect } from "react";
import Timeline from "./Timeline";
import IntersectingProjectContext, {
  IIntersectingProjectHistoryProvider,
} from "../../../context/IntersectingProjectCP";
import topPickedProjects from "../../../utils/datas/projects/web/topPickedProjects";
import Quote from "./Quote";
import ProjectInfoDashboard from "./TopPicksInfoDashboard";
import Image from "next/image";
import FadeTop from "../../FadePageTranstition/FadeTop";
import FadeBottom from "../../FadePageTranstition/FadeBottom";
import Line from "../../Line";

export default function TopPicksSection() {
  const { history } = useContext(
    IntersectingProjectContext
  ) as IIntersectingProjectHistoryProvider;
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  useEffect(() => {
    setActiveProjectIdx(
      topPickedProjects.findIndex((p) => p._id === history.currentId)
    );
  }, [history.currentId]);

  return (
    <section
      aria-label="top-picks-section"
      id="top-picks"
      className="relative pt-32 dark:bg-gray-900"
    >
      <Quote />

      {/* main timeline */}
      <div className="relative mx-auto">
        <Line className="absolute left-1/2 top-16 scale-y-[2] bg-gradient-to-b from-cyan-300/40 to-green-300/40" />

        {/* section Title */}
        <header className="relative flex flex-col items-center pt-40">
          <div className="gradient-underline gradient-underline--cyan-to-green relative z-20 flex h-20 items-center gap-1">
            <Typography
              as="h2"
              variant="h2"
              className="w-max animate-breathing bg-gradient-to-r from-cyan-300 to-green-200 bg-gradient bg-clip-text text-5xl font-bold capitalize !leading-[initial] text-transparent lg:text-6xl"
            >
              Top Picks
            </Typography>
            <span className="text-5xl">🌟</span>
          </div>
        </header>

        {/* main content */}
        <footer className="relative py-7">
          <div className="sticky top-0">
            <div className="absolute inset-x-0 h-screen overflow-hidden">
              <Image
                className="sticky top-0 z-0 min-h-full min-w-full object-cover opacity-30"
                src={
                  topPickedProjects[activeProjectIdx]?.image ||
                  topPickedProjects[0]?.image
                }
                alt={
                  topPickedProjects[activeProjectIdx]?.name ||
                  topPickedProjects[0]?.name
                }
                fill
                sizes="75vw"
              />
            </div>
          </div>
          <div className="mx-auto max-w-screen-xl px-6">
            {/* the short project name description  */}
            <div className="relative mt-16 flex min-h-[4000px] gap-8">
              <ProjectInfoDashboard
                activeProject={topPickedProjects[activeProjectIdx]}
              />
              <Timeline />
            </div>

            {/* top fade to timeline */}
            <FadeTop position="top-5" />

            {/* bottom fade to footer */}
            <FadeBottom position="-bottom-10" />
          </div>
        </footer>
      </div>

      <Line className="relative -bottom-10 left-1/2 z-30 -translate-x-1/2 scale-y-[3.5] bg-white/40" />
    </section>
  );
}
