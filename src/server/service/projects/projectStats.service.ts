import { Types } from "mongoose";
import { StatsType } from "../../../types/types";
import ProjectModel from "../../model/project.model";

/* Services for fetching stats
============================== */
export async function getProjectStats(_id: string, fields: StatsType[]) {
  const project = await ProjectModel.findById(_id)
    .select([...fields, "_id"])
    .lean();

  if (project === null) throw new Error();

  return project;
}

export async function getAllProjectStats(fields: StatsType[]) {
  const projects = await ProjectModel.find()
    .select([...fields, "_id"])
    .lean();

  return projects;
}

/* Services for mutating stats
============================== */
export async function incProjectStat(_id: string, field: "views" | "likes") {
  await ProjectModel.updateOne({ _id }, { $inc: { [field]: 1 } }).lean();
}

export async function decProjectStat(_id: string, field: "views" | "likes") {
  await ProjectModel.updateOne({ _id }, { $inc: { [field]: -1 } }).lean();
}

/* Services for project likes
============================= */
export async function editLikersList(
  projectId: string,
  uniqueId: string,
  operation: "add" | "remove"
) {
  await ProjectModel.updateOne(
    { _id: projectId },
    operation === "add"
      ? { $push: { likers: uniqueId } }
      : { $pull: { likers: uniqueId } },
    {
      new: true,
    }
  );
}

export async function getProjectLikers(_id: string) {
  const likers: { _id: Types.ObjectId; likers: string[] } | null =
    await ProjectModel.findById(_id).select("likers").lean();

  return likers;
}

export async function getHasLiked(_id: string, uniqueIpId: string) {
  const res = await getProjectLikers(_id);
  if (!res) throw new Error();

  const hasLiked = res.likers.includes(uniqueIpId);

  return hasLiked;
}
