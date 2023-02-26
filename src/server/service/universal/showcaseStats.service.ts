import type { Types } from "mongoose";
import type { CertificateDocument } from "server/mongo/model/certificate.model";
import type { ProjectDocument } from "server/mongo/model/project.model";
import type { MainShowcaseModels, StatsType } from "types/api.types";

import connectMongo from "server/mongo/mongodb";

/* Services for fetching stats
============================== */
export async function selectStatsFromItem<
  T extends ProjectDocument | CertificateDocument,
>(model: MainShowcaseModels<T>, _id: string, fields: StatsType[]) {
  connectMongo();

  const project = await model
    .findById(_id)
    .select([...fields, "_id"])
    .lean();

  if (project === null) throw new Error("The target project can't be found !");

  return project;
}

export async function selectStatsFromAllItems<
  T extends ProjectDocument | CertificateDocument,
>(model: MainShowcaseModels<T>, fields: StatsType[]) {
  connectMongo();

  const projects = await model
    .find()
    .select([...fields, "_id"])
    .lean();

  return projects;
}

/* Services for mutating stats
============================== */
export async function incItemStat<
  T extends ProjectDocument | CertificateDocument,
>(model: MainShowcaseModels<T>, _id: string, field: "views" | "likes") {
  connectMongo();

  await model
    .updateOne(
      { _id },
      { $inc: field === "likes" ? { likes: 1 } : { views: 1 } },
    )
    .lean();
}

export async function decItemStat<
  T extends ProjectDocument | CertificateDocument,
>(model: MainShowcaseModels<T>, _id: string, field: "views" | "likes") {
  connectMongo();

  await model
    .updateOne(
      { _id },
      { $inc: field === "likes" ? { likes: 1 } : { views: 1 } },
    )
    .lean();
}

/* Services for project likes
============================= */
export async function editItemLikersList<
  T extends ProjectDocument | CertificateDocument,
>(
  model: MainShowcaseModels<T>,
  projectId: string,
  uniqueId: string,
  operation: "add" | "remove",
) {
  connectMongo();

  await model.updateOne(
    { _id: projectId },
    operation === "add"
      ? { $push: { likers: uniqueId } }
      : { $pull: { likers: uniqueId } },
    {
      new: true,
    },
  );
}

export async function getItemLikers<
  T extends ProjectDocument | CertificateDocument,
>(model: MainShowcaseModels<T>, _id: string) {
  connectMongo();

  const likers: { _id: Types.ObjectId; likers: string[] } | null = await model
    .findById(_id)
    .select("likers")
    .lean();

  return likers;
}

export async function getHasLiked<
  T extends ProjectDocument | CertificateDocument,
>(model: MainShowcaseModels<T>, _id: string, uniqueIpId: string) {
  connectMongo();

  const res = await getItemLikers(model, _id);
  if (!res) throw new Error("The target project can't be found !");

  const hasLiked = res.likers.includes(uniqueIpId);

  return hasLiked;
}
