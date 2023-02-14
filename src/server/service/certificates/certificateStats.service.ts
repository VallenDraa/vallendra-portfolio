import { Types } from "mongoose";
import { StatsType } from "types/types";
import CertificateModel from "server/mongo/model/certificate.model";
import connectMongo from "server/mongo/mongodb";

/* Services for fetching stats
============================== */
export async function getCertificateStats(_id: string, fields: StatsType[]) {
  connectMongo();

  const certificate = await CertificateModel.findById(_id)
    .select([...fields, "_id"])
    .lean();

  if (certificate === null)
    throw new Error("The target certificate can't be found !");

  return certificate;
}

export async function getAllCertificateStats(fields: StatsType[]) {
  connectMongo();

  const certificates = await CertificateModel.find()
    .select([...fields, "_id"])
    .lean();

  return certificates;
}

/* Services for mutating stats
============================== */
export async function incCertificateStat(
  _id: string,
  field: "views" | "likes",
) {
  connectMongo();

  await CertificateModel.updateOne({ _id }, { $inc: { [field]: 1 } }).lean();
}

export async function decCertificateStat(
  _id: string,
  field: "views" | "likes",
) {
  connectMongo();

  await CertificateModel.updateOne({ _id }, { $inc: { [field]: -1 } }).lean();
}

/* Services for certificate likes
============================= */
export async function editLikersList(
  certificateId: string,
  uniqueId: string,
  operation: "add" | "remove",
) {
  connectMongo();

  await CertificateModel.updateOne(
    { _id: certificateId },
    operation === "add"
      ? { $push: { likers: uniqueId } }
      : { $pull: { likers: uniqueId } },
    {
      new: true,
    },
  );
}

export async function getCertificateLikers(_id: string) {
  connectMongo();

  const likers: { _id: Types.ObjectId; likers: string[] } | null =
    await CertificateModel.findById(_id).select("likers").lean();

  return likers;
}

export async function getHasLiked(_id: string, uniqueIpId: string) {
  connectMongo();

  const res = await getCertificateLikers(_id);
  if (!res) throw new Error("The target certificate can't be found !");

  const hasLiked = res.likers.includes(uniqueIpId);

  return hasLiked;
}
