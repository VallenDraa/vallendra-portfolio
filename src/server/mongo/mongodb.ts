import mongoose from "mongoose";
import createError from "../error/createError";

const MONGO_URI = process.env.MONGO_URI;

export default async function connectMongo(): Promise<void | Error> {
  if (!isMongoConnected()) {
    if (!MONGO_URI) return createError();

    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(MONGO_URI);

      console.log("connected");
    } catch (error) {
      console.error(error);
    }
  }
}

export function isMongoConnected(): boolean {
  let isConnected;
  const { readyState } = mongoose.connection;

  isConnected = readyState === 1 ? true : false;

  return isConnected;
}
