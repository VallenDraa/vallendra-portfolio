import { Project } from "../../../interfaces/project.interface";
import ProjectModel from "../../model/project.model";
import connectMongo from "../../mongo/mongodb";

export async function getProjectWithPrevAndNext(slug: string) {
  try {
    connectMongo();
    const project = (await ProjectModel.findOne({ slug }).lean()) as Project;

    /* get the next and previous project name and slug
    ================================================= */
    const [nextProject] = await ProjectModel.find({
      createdAt: { $gt: project.createdAt },
    })
      .sort({ createdAt: 1 })
      .limit(1)
      .select(["slug", "name"]);

    const [prevProject] = await ProjectModel.find({
      createdAt: { $lt: project.createdAt },
    })
      .sort({ createdAt: -1 })
      .limit(1)
      .select(["slug", "name"]);

    return JSON.stringify({
      project,
      nextProject: nextProject || prevProject,
      prevProject: prevProject || nextProject,
    });
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
