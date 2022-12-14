import { Typography } from "@material-tailwind/react";
import { useContext, useState, useEffect } from "react";
import Timeline from "./Timeline";
import IntersectingProjectContext, {
  IIntersectingProjectHistoryProvider,
} from "../../../context/IntersectingProjectCP";
import topPickedProjects from "../../../utils/datas/projects/websites/topPickedProjects";
import Quote from "./Quote";
import ProjectInfoDashboard from "./TopPicksInfoDashboard";
import Image from "next/image";
import FadeTop from "../../FadePageTranstition/FadeTop";
import FadeBottom from "../../FadePageTranstition/FadeBottom";
import Line from "../../Line/Line";

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
      className="dark:bg-gray-900 relative pt-32"
    >
      <Quote />

      {/* main timeline */}
      <div className="mx-auto relative">
        <Line className="scale-y-[2] bg-gradient-to-b from-cyan-300/40 to-green-300/40 absolute left-1/2 top-16" />

        {/* section Title */}
        <header className="relative pt-40 flex flex-col items-center">
          <div className="flex items-center gap-1 relative h-20 z-20 gradient-underline gradient-underline--cyan-to-green">
            <Typography
              as="h2"
              variant="h2"
              className="animate-breathing bg-gradient w-max text-5xl lg:text-6xl !leading-[initial] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-green-200 font-bold capitalize"
            >
              Top Picks
            </Typography>
            <span className="text-5xl">🌟</span>
          </div>
        </header>

        {/* main content */}
        <footer className="relative pb-20 pt-5">
          <div className="sticky top-0">
            <div className="absolute inset-x-0 h-screen overflow-hidden">
              <Image
                className="object-cover sticky top-0 min-w-full min-h-full z-0 opacity-30"
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
          <div className="max-w-screen-xl px-6 mx-auto">
            {/* the short project name description  */}
            <div className="flex gap-8 my-16 relative min-h-[4070px]">
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

      <Line className="scale-y-[6] relative bottom-5 left-1/2 -translate-x-1/2 bg-white/40 z-30" />
    </section>
  );
}
