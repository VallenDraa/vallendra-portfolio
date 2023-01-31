import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export default async function connectMongo(): Promise<void | Error> {
  if (!isMongoConnected()) {
    if (!MONGO_URI)
      throw new Error(
        "Please provide a mongo URI to connect to the database !"
      );

    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGO_URI);

    console.log("connected");
  }
}

export function isMongoConnected(): boolean {
  let isConnected;
  const { readyState } = mongoose.connection;

  isConnected = readyState === 1 ? true : false;

  return isConnected;
}
