import CertificateCategoryModel from "../../mongo/model/certificateCategory.model";
import connectMongo from "../../mongo/mongodb";

export async function getAllCertificateCategories() {
  connectMongo();

  const allCertificateCategories = await CertificateCategoryModel.find().lean();

  return allCertificateCategories;
}
