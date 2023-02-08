import { useMemo } from "react";
import SectionHeading from "../SectionHeading";
import Certificate from "../../interfaces/certificate.interface";
import ItemCard from "../Cards/ItemCard";
import Category from "../../interfaces/category.interface";
import Observe from "../Observe";
import fadeIn from "../../utils/client/helpers/animateOnObserved";

interface Props {
  categoryIndex: number;
  certificates: Certificate[];
  category: Category;
}

interface PickedCertificates {
  [key: string]: Certificate;
}

export default function CertificateCategorySection({
  categoryIndex,
  category,
  certificates,
}: Props) {
  const certificatesInCategory = useMemo<PickedCertificates>(() => {
    const { items: allCertifIds } = category;

    const pickedCertificates = allCertifIds.reduce((res, id) => {
      const pickedCertificate = certificates.find(
        project => project._id === id,
      );

      return { ...res, [id]: pickedCertificate };
    }, {});

    return pickedCertificates;
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in-top", 250)}
      >
        <div className="opacity-0">
          <SectionHeading>{category.name}</SectionHeading>
        </div>
      </Observe>

      {/* display certificates in this category */}
      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in-top", 350)}
      >
        <ul className="grid grid-cols-1 gap-6 px-3 opacity-0 md:grid-cols-2 lg:grid-cols-3">
          {category.items.map((id, i) => {
            return (
              <li key={id}>
                <ItemCard
                  _id={id}
                  type="certificates"
                  imgIsPriority={isImgImportant(categoryIndex, i)}
                  imgSrc={certificatesInCategory[id].image}
                  itemLikes={certificatesInCategory[id].likes}
                  itemLink={`/certificates/${certificatesInCategory[id].slug}`}
                  itemName={certificatesInCategory[id].name}
                  itemShortDesc={certificatesInCategory[id].shortDescriptionEN}
                  itemViews={certificatesInCategory[id].views}
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
