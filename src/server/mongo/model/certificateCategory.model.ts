import m from "mongoose";
import type Category from "interfaces/category.interface";

type CertificateCategory = {
  madeAt: Date;
  updatedAt?: Date;
} & Omit<Category, "_id"> &
  m.Document;

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
  { timestamps: true },
);

const CertificateCategoryModel: m.Model<CertificateCategory> =
  m.models["certificate-categories"] ||
  m.model<CertificateCategory>(
    "certificate-categories",
    CertificateCategorySchema,
  );

export default CertificateCategoryModel;
