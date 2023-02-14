import connectMongo from "server/mongo/mongodb";
import CertificateCategoryModel from "server/mongo/model/certificateCategory.model";

// eslint-disable-next-line import/prefer-default-export
export async function getAllCertificateCategories() {
  connectMongo();

  const allCertificateCategories = await CertificateCategoryModel.find().lean();

  return allCertificateCategories;
}
