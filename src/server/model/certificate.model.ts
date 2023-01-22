import mongoose from "mongoose";
import Certificate from "../../interfaces/certificate.interface";

interface CertificateDocument
  extends Omit<Certificate, "_id">,
    mongoose.Document {
  createdAt: Date;
  updatedAt?: Date;
}

const CertificateSchema = new mongoose.Schema<CertificateDocument>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  shortDescriptionEN: { type: String, required: true },
  descriptionEN: { type: String, required: true },
  shortDescriptionID: { type: String, required: true },
  descriptionID: { type: String, required: true },
  views: { type: Number },
  likes: { type: Number },
  image: { type: String, required: true },
  categoryIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "certificate-categories",
      default: [],
    },
  ],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: false },
  certificateLink: { type: String, required: true },
});

const CertificateModel =
  mongoose.models.certificates ||
  mongoose.model<CertificateDocument>("certificates", CertificateSchema);

export default CertificateModel;
