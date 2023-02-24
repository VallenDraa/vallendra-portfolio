import type Project from "interfaces/project.interface";
import type Category from "interfaces/category.interface";
import type Certificate from "interfaces/certificate.interface";
import type { ShowcaseType } from "interfaces/showcase.interface";
import type ShowcaseItem from "interfaces/showcase.interface";
import { useMemo } from "react";
import fadeIn from "utils/client/helpers/animateOnObserved";
import Observe from "components/Observe";
import SectionSubHeading from "components/Typography/SectionSubHeading";
import ItemCard from "components/Showcase/Card/ShowcaseItemCard";

type ShowcaseCategorySectionProps = {
  categoryItems: ShowcaseItem[];
  category: Category;
  showcaseType: ShowcaseType;
};

type PickedItems = {
  [key: string]: Project | Certificate;
};

export default function ShowcaseCategorySection({
  category,
  categoryItems,
  showcaseType,
}: ShowcaseCategorySectionProps) {
  const itemsInCategory = useMemo<PickedItems>(() => {
    const { items: allItemsId } = category;

    const pickedProjects = allItemsId.reduce((res, id) => {
      const pickedProject = categoryItems.find(item => item._id === id);

      return { ...res, [id]: pickedProject };
    }, {});

    return pickedProjects;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in-top", 250)}
      >
        <div className="opacity-0">
          <SectionSubHeading>{category.name}</SectionSubHeading>
        </div>
      </Observe>

      {/* display projects in this category */}
      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in-top", 350)}
      >
        <ul className="grid grid-cols-1 gap-6 px-3 opacity-0 md:grid-cols-2 lg:grid-cols-3">
          {category.items.map(id => (
            <li key={id}>
              <ItemCard type={showcaseType} data={itemsInCategory[id]} />
            </li>
          ))}
        </ul>
      </Observe>
    </section>
  );
}
