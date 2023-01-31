import ApiVisitorModel from "../mongo/model/apiVisitor.model";

export async function incApiVisitors() {
  const data = ApiVisitorModel.findOneAndUpdate(
    {},
    { $inc: { visitors: 1 } },
    { new: true }
  ).lean();

  return data;
}
