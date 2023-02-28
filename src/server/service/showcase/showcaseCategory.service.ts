import type { CertificateCategory } from "server/mongo/model/certificateCategory.model";
import type { ProjectCategory } from "server/mongo/model/projectCategory.model";

import connectMongo from "server/mongo/mongodb";
import { MainShowcaseCategoryModels } from "types/api.types";

// eslint-disable-next-line import/prefer-default-export
export async function getAllItemCategories<
  T extends ProjectCategory | CertificateCategory,
>(model: MainShowcaseCategoryModels<T>) {
  connectMongo();

  const allCategories = await model.find().lean();
  const sortedCategories = allCategories.sort(
    (a, b) => b.items.length - a.items.length,
  ); // sort by the largest amounts of items

  return sortedCategories;
}
