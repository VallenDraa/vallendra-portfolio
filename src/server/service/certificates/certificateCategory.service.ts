import CertificateCategoryModel from "../../mongo/model/certificateCategory.model";
import connectMongo from "../../mongo/mongodb";

// eslint-disable-next-line import/prefer-default-export
export async function getAllCertificateCategories() {
  connectMongo();

  const allCertificateCategories = await CertificateCategoryModel.find().lean();

  return allCertificateCategories;
}
