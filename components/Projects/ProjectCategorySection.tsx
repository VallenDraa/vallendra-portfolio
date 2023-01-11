import { Typography } from "@material-tailwind/react";
import { ICategory, IProject } from "../../interfaces/projectInterfaces";
import { useMemo } from "react";
import ProjectCard from "./ProjectCard";

interface IProps {
  categoryIndex: number;
  projects: IProject[];
  category: ICategory;
}

interface IPickedProjects {
  [key: string]: IProject;
}

export default function ProjectCategorySection({
  categoryIndex,
  category,
  projects,
}: IProps) {
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
        className="dark:text-white/90 uppercase font-bold flex gap-2 before:inline-block before:bg-gradient-to-r before:from-indigo-300 before:to-pink-200 before:w-1"
      >
        {category.name}
      </Typography>

      {/* display projects in this category */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 px-1">
        {category.projects.map((id, i) => {
          return (
            <li key={id}>
              <ProjectCard
                imgIsPriority={isImgImportant(categoryIndex, i)}
                project={projectsInCategory[id]}
              />
              ;
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function isImgImportant(categoryIndex: number, projectIndex: number): boolean {
  let imgIsPriority;

  // determining if the image is important
  if (categoryIndex === 0) {
    imgIsPriority = projectIndex < 4 ? true : false;
  } else {
    imgIsPriority = false;
  }

  return imgIsPriority;
}
