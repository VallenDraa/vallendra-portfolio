import { useMemo } from "react";
import SectionHeading from "../SectionHeading";
import ICertificate from "../../interfaces/certificateInterface";
import ItemCard from "../Cards/ItemCard";
import ICategory from "../../interfaces/category";

interface IProps {
  categoryIndex: number;
  certificates: ICertificate[];
  category: ICategory;
}

interface IPickedCertificates {
  [key: string]: ICertificate;
}

export default function CertificateCategorySection({
  categoryIndex,
  category,
  certificates,
}: IProps) {
  const certificatesInCategory = useMemo<IPickedCertificates>(() => {
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
    <section className="flex flex-col gap-6">
      <SectionHeading>{category.name}</SectionHeading>

      {/* display certificates in this category */}
      <ul className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.items.map((id, i) => {
          return (
            <li key={id}>
              <ItemCard
                imgIsPriority={isImgImportant(categoryIndex, i)}
                imgSrc={certificatesInCategory[id].image}
                itemLikes={certificatesInCategory[id].likes}
                itemLink={`/certificates/${certificatesInCategory[id].slug}`}
                itemName={certificatesInCategory[id].name}
                itemShortDesc={certificatesInCategory[id].shortDescription}
                itemViews={certificatesInCategory[id].views}
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
