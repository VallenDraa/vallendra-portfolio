import ProjectModel from "../../model/project.model";

export async function getProjectViews(id: string) {
  try {
    const project = await ProjectModel.findById(id)
      .select(["views", "_id"])
      .lean();

    if (project === null) throw new Error();

    const { _id, views } = project;

    return { _id, views };
  } catch (error) {
    console.error(error);
  }
}

export async function getProjectLikes(id: string) {
  try {
    const project = await ProjectModel.findById(id)
      .select(["likes", "_id"])
      .lean();

    if (project === null) throw new Error();

    const { _id, likes } = project;

    return { _id, likes };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllProjectViews() {
  try {
    const projects = await ProjectModel.find().select(["views", "_id"]).lean();

    return projects;
  } catch (error) {
    console.error(error);
  }
}

export async function incProjectStat(id: string, type: "views" | "likes") {
  try {
    await ProjectModel.findByIdAndUpdate(id, { $inc: { [type]: 1 } });
  } catch (error) {
    console.error(error);
  }
}

export async function decProjectStat(id: string, type: "views" | "likes") {
  try {
    await ProjectModel.findByIdAndUpdate(id, { $dec: { [type]: 1 } });
  } catch (error) {
    console.error(error);
  }
}
