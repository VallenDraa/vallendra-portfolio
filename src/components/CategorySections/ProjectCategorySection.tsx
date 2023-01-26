import { Project } from "../../interfaces/project.interface";
import { useMemo } from "react";
import SectionHeading from "../SectionHeading";
import ItemCard from "../Cards/ItemCard";
import Category from "../../interfaces/category.interface";

interface Props {
  categoryIndex: number;
  projects: Project[];
  category: Category;
}

interface PickedProjects {
  [key: string]: Project;
}

export default function ProjectCategorySection({
  categoryIndex,
  category,
  projects,
}: Props) {
  const projectsInCategory = useMemo<PickedProjects>(() => {
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
                _id={id}
                type="project"
                imgIsPriority={isImgImportant(categoryIndex, i)}
                imgSrc={projectsInCategory[id].image}
                itemLikes={projectsInCategory[id].likes}
                itemLink={`/projects/${projectsInCategory[id].slug}`}
                itemName={projectsInCategory[id].name}
                itemShortDesc={projectsInCategory[id].shortDescriptionEN}
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
