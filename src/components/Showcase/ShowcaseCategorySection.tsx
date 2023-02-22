import type Project from "interfaces/project.interface";
import type Category from "interfaces/category.interface";
import type Certificate from "interfaces/certificate.interface";
import type { ShowcaseType } from "interfaces/showcase.interface";
import type ShowcaseItem from "interfaces/showcase.interface";
import { useMemo } from "react";
import fadeIn from "utils/client/helpers/animateOnObserved";
import Observe from "components/Observe";
import SectionSubHeading from "components/Typography/SectionSubHeading";
import ItemCard from "components/Cards/ItemCard";

interface Props {
  categoryIndex: number;
  categoryItems: ShowcaseItem[];
  category: Category;
  showcaseType: ShowcaseType;
}

interface PickedItems {
  [key: string]: Project | Certificate;
}

function isImgImportant(categoryIndex: number, itemIndex: number): boolean {
  let imgIsPriority;

  // determining if the image is important
  if (categoryIndex === 0) {
    imgIsPriority = itemIndex < 4;
  } else {
    imgIsPriority = false;
  }

  return imgIsPriority;
}

export default function ShowcaseCategorySection({
  categoryIndex,
  category,
  categoryItems,
  showcaseType,
}: Props) {
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
          {category.items.map((id, i) => (
            <li key={id}>
              <ItemCard
                type={showcaseType}
                imgIsPriority={isImgImportant(categoryIndex, i)}
                data={itemsInCategory[id]}
              />
            </li>
          ))}
        </ul>
      </Observe>
    </section>
  );
}
