import { Button } from "@material-tailwind/react";
import { useEffect, useRef, useContext } from "react";
import IntersectingProjectContext, {
  IIntersectingProjectHistoryProvider,
} from "../../../Context/IntersectingProjectCP";
import { IProject } from "../../../Interfaces/Interfaces";
import useIntersectionObserver from "../../../Utils/Hooks/useIntersectionObserver";

const Project = ({ data }: { data: IProject }) => {
  const projectRef = useRef<HTMLLIElement>(null);
  const entry = useIntersectionObserver(projectRef, {});
  const { setHistory } = useContext(
    IntersectingProjectContext
  ) as IIntersectingProjectHistoryProvider;

  // mount and dismount intersection observer
  useEffect(() => {
    if (entry?.isIntersecting)
      setHistory((prevValue) => ({
        prevId: prevValue.currentId,
        currentId: data._id,
      }));
  }, [entry?.isIntersecting]);

  return (
    <li
      ref={projectRef}
      className="flex flex-col items-center gap-4 mb-4 h-[1500px] relative"
    >
      {/* the line */}
      <div className="bottom-0 top-20 w-1 bg-main-gradient bg-gradient animate-main-gradient absolute z-10 rounded-full" />

      {/* the moving date */}
      <Button
        ripple={false}
        variant="filled"
        color="cyan"
        className="capitalize bg-cyan-600/90 text-gray-200 shadow font-bold text-2xl tracking-wider sticky top-1/2 -translate-y-1/2 z-20 rounded-full px-5 py-3"
      >
        <a href={data.link} target="_blank">
          {data.name}
        </a>
      </Button>
    </li>
  );
};

export default Project;
