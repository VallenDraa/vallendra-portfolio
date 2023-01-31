import m from "mongoose";
import Certificate from "../../../interfaces/certificate.interface";

interface CertificateDocument
  extends Omit<Certificate, "_id">,
    m.Document {
  madeAt: Date;
  updatedAt?: Date;
}

const CertificateSchema = new m.Schema<CertificateDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    shortDescriptionEN: { type: String, required: true },
    descriptionEN: { type: String, required: true },
    shortDescriptionID: { type: String, required: true },
    descriptionID: { type: String, required: true },
    views: { type: Number },
    likes: { type: Number },
    likers: [{ type: String, default: [] }],
    image: { type: String, required: true },
    categoryIds: [
      {
        type: m.Schema.Types.ObjectId,
        ref: "certificate-categories",
        default: [],
      },
    ],
    madeAt: { type: Date, required: true },
    certificateLink: { type: String, required: true },
  },
  { timestamps: true }
);

const CertificateModel: m.Model<CertificateDocument> =
  m.models.certificates ||
  m.model<CertificateDocument>("certificates", CertificateSchema);

export default CertificateModel;