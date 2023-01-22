import ProjectCategoryModel from "../../model/projectCategory.model";
import connectMongo from "../../mongo/mongodb";

export async function getAllProjectCategories() {
  try {
    connectMongo();

    const allProjects = await ProjectCategoryModel.find().lean();

    return JSON.stringify(allProjects);
  } catch (error) {
    console.error(error);
  }
}
