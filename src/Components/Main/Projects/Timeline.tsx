import projects from "../../../Utils/Misc/ProjectDatas";
import Project from "./Project";

const Timeline = () => {
  return (
    <>
      {/* The Line */}
      <ul className="flex flex-col items-center relative z-40">
        {projects.map((p) => {
          return <Project key={p._id} data={p} />;
        })}
      </ul>
    </>
  );
};

export default Timeline;
