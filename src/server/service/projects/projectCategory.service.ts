import ProjectCategoryModel from "../../model/projectCategory.model";
import connectMongo from "../../mongo/mongodb";

export async function getAllProjectCategories() {
  try {
    connectMongo();

    const allProjectCategories = await ProjectCategoryModel.find().lean();

    return allProjectCategories;
  } catch (error) {
    console.error(error);
  }
}
