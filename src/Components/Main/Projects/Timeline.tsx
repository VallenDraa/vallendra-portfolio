import { Button, Typography } from "@material-tailwind/react";
import projects from "../../../Utils/Misc/ProjectDatas";
import { useState, useEffect } from "react";

const Timeline = () => {
  const [activeProject, setActiveProject] = useState<number>(0);

  useEffect(() => {
    // console.log(activeProject);
  }, [activeProject]);

  return (
    <>
      {/* the floating background */}
      <div className="sticky top-20">
        <img
          src={projects[activeProject].image}
          alt={`${projects[activeProject].name} Preview Picture`}
          className="saturate-0"
        />
      </div>
      {/* The Line */}
      <ul className="flex flex-col items-center relative z-40">
        {projects.map((p, i) => {
          return (
            <li
              key={p._id}
              className="flex flex-col items-center gap-4 mb-4 h-96 relative"
            >
              <div className="bottom-0 top-20 border-2 border-solid border-white absolute z-10 rounded-2xl" />
              <Button
                onClick={() => setActiveProject(i)}
                ripple={false}
                color="light-green"
                variant="gradient"
                className="text-gray-200 font-bold text-3xl tracking-wider sticky top-14 z-20"
              >
                <time dateTime={p.createdAt.toLocaleDateString()}>
                  {p.createdAt.toLocaleDateString()}
                </time>
              </Button>
              {/* <Typography as="h3" className="font-bold text-gray-100">
              {p.name}
            </Typography> */}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Timeline;
