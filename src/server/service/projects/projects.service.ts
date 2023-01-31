import { LeanDocument } from "mongoose";
import ProjectModel from "../../mongo/model/project.model";
import Project from "../../../interfaces/project.interface";
import connectMongo from "../../mongo/mongodb";

export async function getTopPickedProjects() {
  connectMongo();

  const topPickedProjects = await ProjectModel.find({
    isTopPick: true,
  })
    .sort({ madeAt: -1 })
    .select("-likers")
    .lean();

  return topPickedProjects;
}

export async function getProjectWithPrevAndNext(slug: string) {
  connectMongo();

  let nextProject: LeanDocument<Project>, prevProject: LeanDocument<Project>;
  const project = await ProjectModel.findOne({
    slug,
  })
    .select("-likers")
    .lean();

  if (project === null) throw new Error("The target project can't be found !");

  if (!project.createdAt)
    throw new Error("The target projcet doesn't have a createdAt field !");

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
}

export async function getAllProjects() {
  connectMongo();

  const allProjects = await ProjectModel.find().select("-likers").lean();

  return allProjects;
}

/* Helpers
========== */
async function getFirstProject(select: (keyof Project)[] = []) {
  const [firstProject] = await ProjectModel.find()
    .sort({ createdAt: 1 })
    .limit(1)
    .select(select)
    .lean();

  return firstProject;
}

async function getLastProject(select: (keyof Project)[] = []) {
  const [lastProject] = await ProjectModel.find()
    .sort({ createdAt: -1 })
    .limit(1)
    .select(select)
    .lean();

  return lastProject;
}

async function getNextProject(createdAt: Date) {
  const [nextProject] = await ProjectModel.find({
    createdAt: { $gt: createdAt },
  })
    .sort({ createdAt: 1 })
    .limit(1)
    .select(["slug", "name"])
    .lean();

  return nextProject;
}

async function getPrevProject(createdAt: Date) {
  const [prevProject] = await ProjectModel.find({
    createdAt: { $lt: createdAt },
  })
    .sort({ createdAt: -1 })
    .limit(1)
    .select(["slug", "name"])
    .lean();

  return prevProject;
}
