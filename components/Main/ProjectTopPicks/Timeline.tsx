import projects from "../../../utils/misc/topPickedProjects";
import TimelineItem from "./TimelineItem";

export default function Timeline() {
  return (
    <div className="absolute lg:static inset-0 flex lg:block justify-center">
      {/* The Line */}
      <ul className="flex flex-col items-end relative z-0 max-w-screen-2xl px-8 mx-auto">
        {projects.map((p) => {
          return (
            <TimelineItem key={p._id} data={p} projectIndex={Number(p._id)} />
          );
        })}
      </ul>
    </div>
  );
}
