import { useEffect, useRef, useContext } from "react";
import IntersectingProjectContext from "../../../context/IntersectingProjectCP";
import { IProject } from "../../../interfaces/projectInterface";
import useIntersectionObserver from "../../../utils/hooks/useIntersectionObserver";
import Show from "../../../utils/jsx/Show";
import DashboardController from "./DashboardController";
import { DashboardControllerContext } from "../../../context/TopPicksDashboardControllerCP";

interface IProps {
  data: IProject;
  projectIndex: number;
}

export default function TimelineItem({ data, projectIndex }: IProps) {
  const lineIsInverted = projectIndex === 0 ? false : projectIndex % 2 === 0;
  const projectIsFirstTopPick = projectIndex === 0;

  const projectRef = useRef<HTMLLIElement>(null);
  const entry = useIntersectionObserver(projectRef, {});
  const { setHistory } = useContext(IntersectingProjectContext);

  const { openDashboard } = useContext(DashboardControllerContext);

  // mount and dismount intersection observer
  useEffect(() => {
    if (entry?.isIntersecting) {
      setHistory((prevValue) => ({
        prevId: prevValue.currentId,
        currentId: data._id,
      }));
    }
  }, [entry?.isIntersecting]);

  return (
    <li
      ref={projectRef}
      className="relative mb-4 flex h-[1000px] flex-col items-center"
    >
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
        <DashboardController topPercentage={40} callback={openDashboard} />
      </Show>

      <Show when={!projectIsFirstTopPick}>
        <DashboardController topPercentage={10} callback={openDashboard} />
      </Show>
    </li>
  );
}
