import { LeanDocument } from "mongoose";
import { Project } from "../../../interfaces/project.interface";
import ProjectModel from "../../model/project.model";
import connectMongo from "../../mongo/mongodb";

export async function getTopPickedProjects() {
  try {
    connectMongo();
    const topPickedProjects = await ProjectModel.find({
      isTopPick: true,
    }).lean();

    return topPickedProjects;
  } catch (error) {
    console.error(error);
  }
}

export async function getProjectWithPrevAndNext(slug: string) {
  try {
    connectMongo();

    let nextProject: LeanDocument<Project>, prevProject: LeanDocument<Project>;
    const project = await ProjectModel.findOne({ slug }).lean();

    if (project === null) throw new Error();
    if (!project.createdAt) throw new Error();

    const projectId = project._id.toString();
    const projectCreatedAt = project.createdAt as Date;

    const { _id: firstProjectId } = await getFirstProject(["_id"]);
    const { _id: lastProjectId } = await getLastProject(["_id"]);

    const projectIsFirst = projectId === firstProjectId.toString();
    const projectIsLast = projectId === lastProjectId.toString();

    /* get the next and previous project name and slug
    ================================================= */
    if (projectIsFirst) {
      nextProject = await getNextProject(projectCreatedAt);
      prevProject = await getLastProject(["slug", "name"]);
    } else {
      if (projectIsLast) {
        prevProject = await getPrevProject(projectCreatedAt);
        nextProject = await getFirstProject(["slug", "name"]);
      } else {
        prevProject = await getPrevProject(projectCreatedAt);
        nextProject = await getNextProject(projectCreatedAt);
      }
    }

    return {
      project,
      nextProject: nextProject || prevProject,
      prevProject: prevProject || nextProject,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllProjects() {
  try {
    connectMongo();

    const allProjects = await ProjectModel.find().lean();

    return allProjects;
  } catch (error) {
    console.error(error);
  }
}

/* Helpers
========== */
async function getFirstProject(select: (keyof Project)[] = []) {
  const [firstProject] = await ProjectModel.find<Project>()
    .sort({ createdAt: 1 })
    .limit(1)
    .select(select)
    .lean();

  return firstProject;
}

async function getLastProject(select: (keyof Project)[] = []) {
  const [lastProject] = await ProjectModel.find<Project>()
    .sort({ createdAt: -1 })
    .limit(1)
    .select(select)
    .lean();

  return lastProject;
}

async function getNextProject(createdAt: Date) {
  const [nextProject] = await ProjectModel.find<Project>({
    createdAt: { $gt: createdAt },
  })
    .sort({ createdAt: 1 })
    .limit(1)
    .select(["slug", "name"])
    .lean();

  return nextProject;
}

async function getPrevProject(createdAt: Date) {
  const [prevProject] = await ProjectModel.find<Project>({
    createdAt: { $lt: createdAt },
  })
    .sort({ createdAt: -1 })
    .limit(1)
    .select(["slug", "name"])
    .lean();

  return prevProject;
}
