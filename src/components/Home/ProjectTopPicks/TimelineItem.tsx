import { useEffect, useRef, useContext } from "react";
import IntersectingProjectContext from "../../../context/IntersectingProjectCP";
import { IProject } from "../../../interfaces/projectInterface";
import useIntersectionObserver from "../../../utils/hooks/useIntersectionObserver";
import Show from "../../../utils/jsx/Show";
import { DashboardControllerContext } from "../../../context/TopPicksDashboardControllerCP";
import IntersectionDiv from "../../IntersectionDiv";

interface IProps {
  data: IProject;
  projectIndex: number;
}

export default function TimelineItem({ data, projectIndex }: IProps) {
  const lineIsInverted = projectIndex === 0 ? false : projectIndex % 2 === 0;
  const projectIsFirstTopPick = projectIndex === 0;

  const { setHistory } = useContext(IntersectingProjectContext);

  const { openDashboard } = useContext(DashboardControllerContext);

  // mount and dismount intersection observer
  function changeProject() {
    setHistory((prevValue) => ({
      prevId: prevValue.currentId,
      currentId: data._id,
    }));
  }

  return (
    <li className="relative mb-4 flex h-[1000px] flex-col items-center">
      {/* project changer div */}
      <IntersectionDiv topPercentage={0} callback={changeProject} />

      {/* the line */}
      <div
        className={`absolute bottom-0 -top-6 z-10 w-0.5 rounded-full bg-white/20 ${
          lineIsInverted ? "rotate-180" : ""
        }`}
      />

      {/* the moving project number */}
      <div className="sticky top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-teal-500 text-xl font-bold capitalize text-gray-200 opacity-0 shadow lg:opacity-100">
        {projectIndex + 1}
      </div>

      {/* open dashboard when this controller is visible */}
      <Show when={projectIsFirstTopPick}>
        <IntersectionDiv topPercentage={40} callback={openDashboard} />
      </Show>

      <Show when={!projectIsFirstTopPick}>
        <IntersectionDiv topPercentage={10} callback={openDashboard} />
      </Show>

      {/* project changer div */}
      <IntersectionDiv topPercentage={70} callback={changeProject} />
    </li>
  );
}
