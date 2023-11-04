import m from "mongoose";

type ApiVisitorDocument = {
  visitors: number;
} & m.Document;

const ApiVisitorSchema = new m.Schema<ApiVisitorDocument>({
  visitors: { type: Number, default: 0 },
});

const ApiVisitorModel: m.Model<ApiVisitorDocument> =
  m.models["api-visitors"] ||
  m.model<ApiVisitorDocument>("api-visitors", ApiVisitorSchema);

export default ApiVisitorModel;
