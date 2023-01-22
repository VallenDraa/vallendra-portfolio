import mongoose from "mongoose";
import createError from "../error/createError";

let isConnected = false;
const MONGO_URI = process.env.MONGO_URI;

export default async function connectMongo(): Promise<void | Error> {
  if (!isConnected) {
    if (!MONGO_URI) return createError();

    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(MONGO_URI);

      console.log("connected");

      isConnected = isMongoConnected();
    } catch (error) {
      isConnected = false;
    }
  }
}

export function isMongoConnected(): boolean {
  let isConnected;
  const { readyState } = mongoose.connection;

  isConnected = readyState === 1 ? true : false;

  return isConnected;
}
