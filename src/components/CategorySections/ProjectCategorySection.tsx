import Project from "../../interfaces/project.interface";
import { useMemo } from "react";
import SectionHeading from "../SectionHeading";
import ItemCard from "../Cards/ItemCard";
import Category from "../../interfaces/category.interface";
import Observe from "../Observe";
import fadeIn from "../../utils/client/helpers/animateOnObserved";

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
      <Observe
        freezeOnceVisible
        onEnter={(ref) => fadeIn(ref, "animate-fade-in-top", 250)}
      >
        <div className="opacity-0">
          <SectionHeading>{category.name}</SectionHeading>
        </div>
      </Observe>

      {/* display projects in this category */}
      <Observe
        freezeOnceVisible
        onEnter={(ref) => fadeIn(ref, "animate-fade-in-top", 350)}
      >
        <ul className="grid grid-cols-1 gap-6 px-3 opacity-0 md:grid-cols-2 lg:grid-cols-3">
          {category.items.map((id, i) => {
            return (
              <li key={id}>
                <ItemCard
                  _id={id}
                  type="projects"
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
      </Observe>
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
