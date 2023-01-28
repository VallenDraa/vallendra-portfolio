import { useMemo } from "react";
import SectionHeading from "../SectionHeading";
import Certificate from "../../interfaces/certificate.interface";
import ItemCard from "../Cards/ItemCard";
import Category from "../../interfaces/category.interface";

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
        (project) => project._id === id
      );

      return { ...res, [id]: pickedCertificate };
    }, {});

    return pickedCertificates;
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading>{category.name}</SectionHeading>

      {/* display certificates in this category */}
      <ul className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    </div>
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
