import connectMongo from "server/mongo/mongodb";
import CertificateCategoryModel from "server/mongo/model/certificateCategory.model";

// eslint-disable-next-line import/prefer-default-export
export async function getAllCertificateCategories() {
  connectMongo();

  const allCertificateCategories = await CertificateCategoryModel.find().lean();
  const sortedCategories = allCertificateCategories.sort(
    (a, b) => b.items.length - a.items.length,
  ); // sort by the largest amounts of items

  return sortedCategories;
}
