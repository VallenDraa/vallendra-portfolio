import { IProject } from "../../interfaces/projectInterface";
import { useMemo } from "react";
import SectionHeading from "../SectionHeading";
import ItemCard from "../Cards/ItemCard";
import ICategory from "../../interfaces/category";

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
    const { items: allProjectIds } = category;

    const pickedProjects = allProjectIds.reduce((res, id) => {
      const pickedProject = projects.find((project) => project._id === id);

      return { ...res, [id]: pickedProject };
    }, {});

    return pickedProjects;
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <SectionHeading>{category.name}</SectionHeading>

      {/* display projects in this category */}
      <ul className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.items.map((id, i) => {
          return (
            <li key={id}>
              <ItemCard
                imgIsPriority={isImgImportant(categoryIndex, i)}
                imgSrc={projectsInCategory[id].image}
                itemLikes={projectsInCategory[id].likes}
                itemLink={`/projects/${projectsInCategory[id].slug}`}
                itemName={projectsInCategory[id].name}
                itemShortDesc={projectsInCategory[id].shortDescription}
                itemViews={projectsInCategory[id].views}
                techs={projectsInCategory[id].tech}
              />
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
