import { Typography } from "@material-tailwind/react";
import { useMemo } from "react";
import ProjectCard from "./CertificateCard";
import SectionHeading from "../SectionHeading";
import ICertificate, {
  ICertificateCategory,
} from "../../interfaces/certificateInterface";
import CertificateCard from "./CertificateCard";

interface IProps {
  categoryIndex: number;
  certificates: ICertificate[];
  category: ICertificateCategory;
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
    const { certificates: allProjectIds } = category;

    const pickedProjects = allProjectIds.reduce((res, id) => {
      const pickedProject = certificates.find((project) => project._id === id);

      return { ...res, [id]: pickedProject };
    }, {});

    return pickedProjects;
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <SectionHeading>{category.name}</SectionHeading>

      {/* display certificates in this category */}
      <ul className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.certificates.map((id, i) => {
          return (
            <li key={id}>
              <CertificateCard
                imgIsPriority={isImgImportant(categoryIndex, i)}
                certificate={certificatesInCategory[id]}
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
