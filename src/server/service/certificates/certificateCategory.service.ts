import CertificateCategoryModel from "../../model/certificateCategory.model";
import connectMongo from "../../mongo/mongodb";

export async function getAllCertificateCategories() {
  try {
    connectMongo();

    const allCertificateCategories =
      await CertificateCategoryModel.find().lean();

    return allCertificateCategories;
  } catch (error) {
    console.error(error);
  }
}
