import ApiVisitorModel from "mongo/model/apiVisitor.model";

// eslint-disable-next-line import/prefer-default-export
export async function incApiVisitors() {
  const data = ApiVisitorModel.findOneAndUpdate(
    {},
    { $inc: { visitors: 1 } },
    { new: true },
  ).lean();

  return data;
}
