import CertificateModel from "../../model/certificate.model";
import connectMongo from "../../mongo/mongodb";

export async function getCertificate(slug: string) {
  try {
    connectMongo();

    const certificate = await CertificateModel.findOne({ slug }).lean();

    return JSON.stringify(certificate);
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
