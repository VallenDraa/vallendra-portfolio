import { Typography } from "@material-tailwind/react";
import { useContext, useState, useEffect } from "react";
import Timeline from "./Timeline";
import IntersectingProjectContext from "../../../context/IntersectingProjectCP";
import topPickedProjects from "../../../utils/datas/projects/web/topPickedProjects";
import Quote from "./Quote";
import TopPicksInfoDashboard from "./TopPicksInfoDashboard";
import Image from "next/image";
import Line from "../../Line";
import { DashboardControllerContext } from "../../../context/TopPicksDashboardControllerCP";
import IntersectionDiv from "../../IntersectionDiv";

export default function TopPicksSection() {
  const { history } = useContext(IntersectingProjectContext);

  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  useEffect(() => {
    setActiveProjectIdx(
      topPickedProjects.findIndex((p) => p._id === history.currentId)
    );
  }, [history.currentId]);

  const { hideDashboard } = useContext(DashboardControllerContext);

  return (
    <section
      aria-label="top-picks-section"
      id="top-picks"
      className="relative bg-indigo-50 pt-32 dark:bg-gray-900"
    >
      <div className="mx-0 sm:mx-4 xl:mx-0">
        <Quote />
      </div>

      {/* main timeline */}
      <div className="relative mx-auto bg-indigo-100/90 dark:bg-gray-900">
        <Line className="absolute left-1/2 top-16 z-30 scale-y-[2]" />

        {/* section Title */}
        <header className="relative z-20 flex flex-col items-center bg-indigo-50 pt-40 pb-12 dark:bg-gray-900">
          <div className="gradient-underline gradient-underline--indigo-to-pink relative z-20 flex h-20 items-center gap-1">
            <Typography
              as="h2"
              variant="h2"
              className="primary-gradient w-max animate-breathing bg-gradient-to-r bg-gradient bg-clip-text text-5xl font-bold capitalize !leading-[initial] text-transparent lg:text-6xl"
            >
              Top Picks
            </Typography>
            <span className="text-5xl">🌟</span>
            {/* hides dashboard when this controller is visible */}
            <IntersectionDiv topPercentage={0} callback={hideDashboard} />
          </div>
        </header>

        {/* main content */}
        <footer className="fade-top fade-bottom relative pb-7 before:top-0 after:-bottom-10">
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
            <div className="relative flex min-h-[4000px] gap-8 pt-16">
              <TopPicksInfoDashboard
                activeProject={topPickedProjects[activeProjectIdx]}
              />
              <Timeline />
            </div>
          </div>
        </footer>
      </div>

      <Line className="relative -bottom-4 left-1/2 z-40 -translate-x-1/2 scale-y-[4] lg:scale-y-[3.5] xl:-bottom-10" />
    </section>
  );
}
