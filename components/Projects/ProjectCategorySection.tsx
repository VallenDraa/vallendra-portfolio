import { Typography } from "@material-tailwind/react";
import { ICategory, IProject } from "../../interfaces/projectInterfaces";
import { useMemo } from "react";
import ProjectCard from "./ProjectCard";

interface IProps {
  projects: IProject[];
  category: ICategory;
}

interface IPickedProjects {
  [key: string]: IProject;
}

export default function ProjectCategorySection({ category, projects }: IProps) {
  const projectsInCategory = useMemo<IPickedProjects>(() => {
    const { projects: allProjectIds } = category;

    const pickedProjects = allProjectIds.reduce((res, id) => {
      const pickedProject = projects.find((project) => project._id === id);

      return { ...res, [id]: pickedProject };
    }, {});

    return pickedProjects;
  }, []);

  return (
    <section className="flex flex-col gap-5">
      <Typography
        as="h3"
        variant="h3"
        className="text-white uppercase font-bold flex gap-2 before:inline-block before:bg-gradient-to-r before:from-indigo-300 before:to-pink-200 before:w-1"
      >
        {category.name}
      </Typography>

      {/* project swiper */}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-1">
        {category.projects.map((id) => {
          return (
            <li className="">
              <ProjectCard project={projectsInCategory[id]} />;
            </li>
          );
        })}
      </ul>
    </section>
  );
}
