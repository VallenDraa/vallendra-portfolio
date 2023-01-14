import { Button } from "@material-tailwind/react";
import { useEffect, useRef, useContext, FC } from "react";
import IntersectingProjectContext, {
  IIntersectingProjectHistoryProvider,
} from "../../../context/IntersectingProjectCP";
import { IProject } from "../../../interfaces/projectInterfaces";
import useIntersectionObserver from "../../../utils/hooks/useIntersectionObserver";

interface IProps {
  data: IProject;
  projectIndex: number;
}

export default function TimelineItem({ data, projectIndex }: IProps) {
  const projectRef = useRef<HTMLLIElement>(null);
  const entry = useIntersectionObserver(projectRef, {});
  const { setHistory } = useContext(
    IntersectingProjectContext
  ) as IIntersectingProjectHistoryProvider;

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
        className={`absolute bottom-0 -top-6 z-10 w-0.5 animate-main-gradient rounded-full bg-gradient-to-b from-green-300 to-blue-400 bg-gradient ${
          projectIndex % 2 == 0 ? "rotate-180" : ""
        }`}
      />

      {/* the moving date */}
      <div className="sticky top-1/2 z-20 -translate-y-1/2 rounded-full bg-teal-400/90 px-5 py-3 text-xl font-bold capitalize text-gray-200 opacity-0 shadow lg:opacity-100">
        {projectIndex}
      </div>
    </li>
  );
}
