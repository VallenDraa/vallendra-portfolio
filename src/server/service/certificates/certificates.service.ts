import Certificate from "../../../interfaces/certificate.interface";
import CertificateModel from "../../model/certificate.model";
import connectMongo from "../../mongo/mongodb";

export async function getCertificateWithPrevAndNext(slug: string) {
  try {
    connectMongo();

    const certificate = (await CertificateModel.findOne({
      slug,
    }).lean()) as Certificate;

    /* get the next and previous Certificate name and slug
    ================================================= */
    const [nextCertificate] = await CertificateModel.find({
      createdAt: { $gt: certificate.createdAt },
    })
      .sort({ createdAt: 1 })
      .limit(1)
      .select(["slug", "name"]);

    const [prevCertificate] = await CertificateModel.find({
      createdAt: { $lt: certificate.createdAt },
    })
      .sort({ createdAt: -1 })
      .limit(1)
      .select(["slug", "name"]);

    return JSON.stringify({
      certificate,
      nextCertificate: nextCertificate || prevCertificate,
      prevCertificate: prevCertificate || nextCertificate,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCertificates() {
  try {
    connectMongo();

    const allCertificates = await CertificateModel.find().lean();

    return JSON.stringify(allCertificates);
  } catch (error) {
    console.error(error);
  }
}
