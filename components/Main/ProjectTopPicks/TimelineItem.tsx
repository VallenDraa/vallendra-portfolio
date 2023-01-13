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
      className="flex flex-col items-center mb-4 h-[1000px] relative"
    >
      {/* the line */}
      <div
        className={`bottom-0 -top-6 w-0.5 bg-gradient-to-b from-green-300 to-blue-400 bg-gradient animate-main-gradient absolute z-10 rounded-full ${
          projectIndex % 2 == 0 ? "rotate-180" : ""
        }`}
      />

      {/* the moving date */}
      <div className="opacity-0 lg:opacity-100 capitalize bg-teal-400/90 text-gray-200 shadow font-bold text-xl sticky top-1/2 -translate-y-1/2 z-20 rounded-full px-5 py-3">
        {projectIndex}
      </div>
    </li>
  );
}
