import mongoose from "mongoose";

const { MONGO_URI } = process.env;

export function isMongoConnected(): boolean {
  const { readyState } = mongoose.connection;
  const isConnected = readyState === 1;

  return isConnected;
}

export default async function connectMongo(): Promise<void | Error> {
  if (!isMongoConnected()) {
    if (!MONGO_URI)
      throw new Error(
        "Please provide a mongo URI to connect to the database !",
      );

    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGO_URI);
  }
}
