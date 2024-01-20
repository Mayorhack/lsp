import mongoose from "mongoose";

export default async function connectToMongoDb() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL || "");
  } catch (error) {
    console.log(error);
  }
}
