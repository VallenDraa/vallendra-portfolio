import m from "mongoose";
import Category from "../../../interfaces/category.interface";

interface CertificateCategory extends Omit<Category, "_id">, m.Document {
  madeAt: Date;
  updatedAt?: Date;
}

const CertificateCategorySchema = new m.Schema<CertificateCategory>(
  {
    name: { type: String, required: true },
    items: [
      {
        type: m.Schema.Types.ObjectId,
        ref: "certificates",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const CertificateCategoryModel: m.Model<CertificateCategory> =
  m.models["certificate-categories"] ||
  m.model<CertificateCategory>(
    "certificate-categories",
    CertificateCategorySchema
  );

export default CertificateCategoryModel;
