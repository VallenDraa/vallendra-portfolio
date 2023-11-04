/* eslint-disable @typescript-eslint/no-use-before-define */
import type { LeanDocument, Model } from "mongoose";
import type { CertificateDocument } from "server/mongo/model/certificate.model";
import type Certificate from "interfaces/certificate.interface";
import type { ProjectDocument } from "server/mongo/model/project.model";
import type Project from "interfaces/project.interface";

import connectMongo from "server/mongo/mongodb";
import ProjectModel from "server/mongo/model/project.model";

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

export async function getItemWithPrevAndNext<
  T extends ProjectDocument | CertificateDocument,
  R extends Project | Certificate,
>(model: Model<T>, slug: string) {
  connectMongo();

  let nextItem: LeanDocument<R>;
  let prevItem: LeanDocument<R>;
  const item = await model.findOne({ slug }).select("-likers").lean();

  if (item === null) throw new Error("The target item can't be found !");

  if (!item.createdAt)
    throw new Error("The target item doesn't have a createdAt field !");

  const itemId = item._id.toString();
  const itemCreatedAt = item.createdAt as Date;

  const { _id: firstItemId } = await getFirstItem<T, R>(model, ["_id"]);
  const { _id: lastItemId } = await getLastItem<T, R>(model, ["_id"]);

  const itemIsFirst = itemId === firstItemId.toString();
  const itemIsLast = itemId === lastItemId.toString();

  /* get the next and previous item name and slug
    ================================================= */
  if (itemIsFirst) {
    nextItem = await getNextItem<T, R>(model, itemCreatedAt);
    prevItem = await getLastItem<T, R>(model, ["slug", "name"]);
  } else if (itemIsLast) {
    prevItem = await getPrevItem<T, R>(model, itemCreatedAt);
    nextItem = await getFirstItem<T, R>(model, ["slug", "name"]);
  } else {
    prevItem = await getPrevItem<T, R>(model, itemCreatedAt);
    nextItem = await getNextItem<T, R>(model, itemCreatedAt);
  }

  return {
    item,
    nextItem: nextItem || prevItem,
    prevItem: prevItem || nextItem,
  };
}

export async function getAllItems<
  T extends ProjectDocument | CertificateDocument,
>(model: Model<T>) {
  connectMongo();

  const allItems = await model.find().select("-likers").lean();

  return allItems;
}

/* Helpers
========== */
async function getFirstItem<
  T extends ProjectDocument | CertificateDocument,
  E extends Project | Certificate,
>(model: Model<T>, select: (keyof E)[] = []) {
  const [firstProject] = await model
    .find()
    .sort({ createdAt: 1 })
    .limit(1)
    .select(select)
    .lean();

  return firstProject as LeanDocument<E>;
}

async function getLastItem<
  T extends ProjectDocument | CertificateDocument,
  E extends Project | Certificate,
>(model: Model<T>, select: (keyof E)[] = []) {
  const [lastItem] = await model
    .find()
    .sort({ createdAt: -1 })
    .limit(1)
    .select(select)
    .lean();

  return lastItem as LeanDocument<E>;
}

async function getNextItem<
  T extends ProjectDocument | CertificateDocument,
  R extends Project | Certificate,
>(model: Model<T>, createdAt: Date) {
  const [nextItem] = await model
    .find({ createdAt: { $gt: createdAt } })
    .sort({ createdAt: 1 })
    .limit(1)
    .select(["slug", "name"])
    .lean();

  return nextItem as LeanDocument<R>;
}

async function getPrevItem<
  T extends ProjectDocument | CertificateDocument,
  R extends Project | Certificate,
>(model: Model<T>, createdAt: Date) {
  const [prevItem] = await model
    .find({ createdAt: { $lt: createdAt } })
    .sort({ createdAt: -1 })
    .limit(1)
    .select(["slug", "name"])
    .lean();

  return prevItem as LeanDocument<R>;
}
