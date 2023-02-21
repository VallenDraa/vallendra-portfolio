import { Types } from "mongoose";
import ProjectModel from "server/mongo/model/project.model";
import connectMongo from "server/mongo/mongodb";
import { StatsType } from "types/api.types";

/* Services for fetching stats
============================== */
export async function getProjectStats(_id: string, fields: StatsType[]) {
  connectMongo();

  const project = await ProjectModel.findById(_id)
    .select([...fields, "_id"])
    .lean();

  if (project === null) throw new Error("The target project can't be found !");

  return project;
}

export async function getAllProjectStats(fields: StatsType[]) {
  connectMongo();

  const projects = await ProjectModel.find()
    .select([...fields, "_id"])
    .lean();

  return projects;
}

/* Services for mutating stats
============================== */
export async function incProjectStat(_id: string, field: "views" | "likes") {
  connectMongo();

  await ProjectModel.updateOne({ _id }, { $inc: { [field]: 1 } }).lean();
}

export async function decProjectStat(_id: string, field: "views" | "likes") {
  connectMongo();

  await ProjectModel.updateOne({ _id }, { $inc: { [field]: -1 } }).lean();
}

/* Services for project likes
============================= */
export async function editLikersList(
  projectId: string,
  uniqueId: string,
  operation: "add" | "remove",
) {
  connectMongo();

  await ProjectModel.updateOne(
    { _id: projectId },
    operation === "add"
      ? { $push: { likers: uniqueId } }
      : { $pull: { likers: uniqueId } },
    {
      new: true,
    },
  );
}

export async function getProjectLikers(_id: string) {
  connectMongo();

  const likers: { _id: Types.ObjectId; likers: string[] } | null =
    await ProjectModel.findById(_id).select("likers").lean();

  return likers;
}

export async function getHasLiked(_id: string, uniqueIpId: string) {
  connectMongo();

  const res = await getProjectLikers(_id);
  if (!res) throw new Error("The target project can't be found !");

  const hasLiked = res.likers.includes(uniqueIpId);

  return hasLiked;
}
