import mongoose from "mongoose";
import env from "dotenv";

env.config();

// main().catch((err) => console.log(err));

export const dbConnection = async function main() {
  await mongoose.connect(`${process.env.MONGO_URL}/pinterest`, () =>
    console.log("DB Connected Successfylly")
  );
};
