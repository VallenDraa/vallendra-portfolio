import mongoose from "mongoose";
import Category from "../../interfaces/category";

interface CertificateCategory extends Omit<Category, "_id">, mongoose.Document {
  createdAt: Date;
  updatedAt?: Date;
}

const CertificateCategorySchema = new mongoose.Schema<CertificateCategory>({
  name: { type: String, required: true },
  items: [
    { type: mongoose.Schema.Types.ObjectId, ref: "certificates", default: [] },
  ],
});

const CertificateCategoryModel =
  mongoose.models["certificate-categories"] ||
  mongoose.model<CertificateCategory>(
    "certificate-categories",
    CertificateCategorySchema
  );

export default CertificateCategoryModel;
