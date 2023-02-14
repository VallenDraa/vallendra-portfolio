import ProjectCategoryModel from "server/mongo/model/projectCategory.model";
import connectMongo from "server/mongo/mongodb";

// eslint-disable-next-line import/prefer-default-export
export async function getAllProjectCategories() {
  connectMongo();

  const allProjectCategories = await ProjectCategoryModel.find().lean();

  return allProjectCategories;
}
