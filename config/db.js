import mongoose from "mongoose";
import env from "dotenv";
env.config();

export const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGO_URL}/pinterest`, () =>
    console.log("MONGODB connected")
  );
};
