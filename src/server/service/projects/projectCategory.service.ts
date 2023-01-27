import ProjectCategoryModel from "../../model/projectCategory.model";
import connectMongo from "../../mongo/mongodb";

export async function getAllProjectCategories() {
  connectMongo();

  const allProjectCategories = await ProjectCategoryModel.find().lean();

  return allProjectCategories;
}
