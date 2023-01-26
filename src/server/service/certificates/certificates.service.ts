import { LeanDocument } from "mongoose";
import Certificate from "../../../interfaces/certificate.interface";
import CertificateModel from "../../model/certificate.model";
import connectMongo from "../../mongo/mongodb";

export async function getCertificateWithPrevAndNext(slug: string) {
  try {
    connectMongo();

    let nextCertificate: LeanDocument<Certificate>,
      prevCertificate: LeanDocument<Certificate>;
    const certificate = await CertificateModel.findOne<Certificate>({
      slug,
    }).lean();

    if (certificate === null) throw new Error();
    if (!certificate.createdAt) throw new Error();

    const certificateId = certificate._id.toString();
    const certificateCreatedAt = certificate.createdAt as Date;

    const { _id: firstCertificateId } = await getFirstCertificate(["_id"]);
    const { _id: lastCertificateId } = await getLastCertificate(["_id"]);

    const certificateIsFirst = certificateId === firstCertificateId.toString();
    const certificateIsLast = certificateId === lastCertificateId.toString();

    /* get the next and previous certificate name and slug
    ================================================= */
    if (certificateIsFirst) {
      nextCertificate = await getNextCertificate(certificateCreatedAt);
      prevCertificate = await getLastCertificate(["slug", "name"]);
    } else {
      if (certificateIsLast) {
        prevCertificate = await getPrevCertificate(certificateCreatedAt);
        nextCertificate = await getFirstCertificate(["slug", "name"]);
      } else {
        prevCertificate = await getPrevCertificate(certificateCreatedAt);
        nextCertificate = await getNextCertificate(certificateCreatedAt);
      }
    }

    return {
      certificate,
      nextCertificate: nextCertificate || prevCertificate,
      prevCertificate: prevCertificate || nextCertificate,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCertificates() {
  try {
    connectMongo();

    const allCertificates = await CertificateModel.find().lean();

    return allCertificates;
  } catch (error) {
    console.error(error);
  }
}

/* Helpers
========== */
async function getFirstCertificate(select: (keyof Certificate)[] = []) {
  const [firstCertificate] = await CertificateModel.find<Certificate>()
    .sort({ createdAt: 1 })
    .limit(1)
    .select(select)
    .lean();

  return firstCertificate;
}

async function getLastCertificate(select: (keyof Certificate)[] = []) {
  const [lastCertificate] = await CertificateModel.find<Certificate>()
    .sort({ createdAt: -1 })
    .limit(1)
    .select(select)
    .lean();

  return lastCertificate;
}

async function getNextCertificate(createdAt: Date) {
  const [nextCertificate] = await CertificateModel.find<Certificate>({
    createdAt: { $gt: createdAt },
  })
    .sort({ createdAt: 1 })
    .limit(1)
    .select(["slug", "name"])
    .lean();

  return nextCertificate;
}

async function getPrevCertificate(createdAt: Date) {
  const [prevCertificate] = await CertificateModel.find<Certificate>({
    createdAt: { $lt: createdAt },
  })
    .sort({ createdAt: -1 })
    .limit(1)
    .select(["slug", "name"])
    .lean();

  return prevCertificate;
}
