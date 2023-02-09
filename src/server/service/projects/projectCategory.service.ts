import ProjectCategoryModel from "../../mongo/model/projectCategory.model";
import connectMongo from "../../mongo/mongodb";

// eslint-disable-next-line import/prefer-default-export
export async function getAllProjectCategories() {
  connectMongo();

  const allProjectCategories = await ProjectCategoryModel.find().lean();

  return allProjectCategories;
}
