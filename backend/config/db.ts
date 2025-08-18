import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async ():Promise<void> =>{
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err
  }
}

export default connectDB;
