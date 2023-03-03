/* eslint-disable @typescript-eslint/no-use-before-define */
import type { Model, Types } from "mongoose";
import type { CertificateDocument } from "server/mongo/model/certificate.model";
import type { ProjectDocument } from "server/mongo/model/project.model";
import type { MainShowcaseModels, StatsType } from "types/api.types";
import type { BlogPostDocument } from "server/mongo/model/blogPost.model";

import connectMongo from "server/mongo/mongodb";
import { isBlogModel } from "../blog/blog.service";

/* Services for fetching stats
============================== */
export async function selectStatsFromItem<
  T extends ProjectDocument | CertificateDocument | BlogPostDocument,
>(model: MainShowcaseModels<T>, _id: string, fields: StatsType[]) {
  connectMongo();

  const stats = await model
    .findOne(queryKey(model, _id))
    .select([...fields, "_id"])
    .lean();

  return stats;
}

/* Services for mutating stats
============================== */
export async function incItemStat<
  T extends ProjectDocument | CertificateDocument | BlogPostDocument,
>(model: MainShowcaseModels<T>, _id: string, field: "views" | "likes") {
  connectMongo();

  await model.updateOne(queryKey(model, _id), {
    $inc: field === "likes" ? { likes: 1 } : { views: 1 },
  });
}

export async function decItemStat<
  T extends ProjectDocument | CertificateDocument | BlogPostDocument,
>(model: MainShowcaseModels<T>, _id: string, field: "views" | "likes") {
  connectMongo();

  await model.updateOne(queryKey(model, _id), {
    $inc: field === "likes" ? { likes: -1 } : { views: -1 },
  });
}

/* Services for project likes
============================= */
export async function editItemLikersList<
  T extends ProjectDocument | CertificateDocument | BlogPostDocument,
>(
  model: MainShowcaseModels<T>,
  _id: string,
  uniqueId: string,
  operation: "add" | "remove",
) {
  connectMongo();

  await model.updateOne(
    queryKey(model, _id),
    operation === "add"
      ? { $push: { likers: uniqueId } }
      : { $pull: { likers: uniqueId } },
  );
}

export async function getItemLikers<
  T extends ProjectDocument | CertificateDocument | BlogPostDocument,
>(model: MainShowcaseModels<T>, _id: string) {
  connectMongo();

  const likers: { _id: Types.ObjectId; likers: string[] } | null = await model
    .findOne(queryKey(model, _id))
    .select("likers")
    .lean();

  return likers;
}

export async function getHasLiked<
  T extends ProjectDocument | CertificateDocument | BlogPostDocument,
>(model: MainShowcaseModels<T>, _id: string, uniqueIpId: string) {
  connectMongo();

  const res = await getItemLikers(model, _id);
  if (!res) throw new Error("The target can't be found !");

  const hasLiked = res.likers.includes(uniqueIpId);

  return hasLiked;
}

/* Helpers
========== */
function queryKey<T>(model: Model<T>, queryValue: unknown) {
  return isBlogModel(model) ? { slug: queryValue } : { _id: queryValue };
}
