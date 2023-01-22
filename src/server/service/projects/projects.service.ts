import ProjectModel from "../../model/project.model";
import connectMongo from "../../mongo/mongodb";

export async function getProject(slug: string) {
  try {
    connectMongo();

    const project = await ProjectModel.findOne({ slug }).lean();

    return JSON.stringify(project);
  } catch (error) {
    console.error(error);
  }
}

export async function getAllProjects() {
  try {
    connectMongo();

    const allProjects = await ProjectModel.find().lean();

    return JSON.stringify(allProjects);
  } catch (error) {
    console.error(error);
  }
}
