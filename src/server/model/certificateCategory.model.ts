import mongoose, { Model } from "mongoose";
import Category from "../../interfaces/category.interface";

interface CertificateCategory extends Omit<Category, "_id">, mongoose.Document {
  madeAt: Date;
  updatedAt?: Date;
}

const CertificateCategorySchema = new mongoose.Schema<CertificateCategory>(
  {
    name: { type: String, required: true },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "certificates",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const CertificateCategoryModel: Model<CertificateCategory> =
  mongoose.models["certificate-categories"] ||
  mongoose.model<CertificateCategory>(
    "certificate-categories",
    CertificateCategorySchema
  );

export default CertificateCategoryModel;
