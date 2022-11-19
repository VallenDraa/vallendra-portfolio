import projects from "../../../Utils/Misc/ProjectDatas";
import TimelineItem from "./TimelineItem";

const Timeline = () => {
  return (
    <>
      {/* The Line */}
      <ul className="flex flex-col items-end relative z-0 max-w-screen-xl mx-auto -top-20">
        {projects.map((p, i) => {
          return <TimelineItem key={p._id} data={p} projectIndex={i} />;
        })}
      </ul>
    </>
  );
};

export default Timeline;
