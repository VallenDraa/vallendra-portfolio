import projects from "../../../utils/datas/projects/web/topPickedProjects";
import TimelineItem from "./TimelineItem";

export default function Timeline() {
  return (
    <div className="absolute inset-0 flex justify-center lg:static lg:block">
      {/* The Line */}
      <ul className="relative z-0 mx-auto flex max-w-screen-xl flex-col items-end px-8 xl:px-0">
        {projects.map((p, i) => {
          return <TimelineItem key={p._id} data={p} projectIndex={i} />;
        })}
      </ul>
    </div>
  );
}
