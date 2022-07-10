import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import env from "dotenv";
import { userRoutes } from "./routes/users.js";
import { authRoutes } from "./routes/auth.js";
import { dbConnection } from "./db.js";
import { resetPasswordRoutes } from "./routes/passwordReset.js";
import { dashboardHomeRouter } from "./routes/dashboardHome.js";

const app = express();
env.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
// const createConection = async () => {
//   const client = new MongoClient(MONGO_URL);
//   await client.connect();
//   console.log("Mongo Db is Connected ✌ 😊 👌.");
//   return client;
// };
// export const client = await createConection();

//database Connection
dbConnection();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/password-reset", resetPasswordRoutes);
app.use("/api/pinterest", dashboardHomeRouter);

app.get("/", (req, res) => {
  res.send(
    `Welcome to Hall Booking API in Port ${PORT} and endpoint is "/hall-booking"`
  );
});

app.listen(PORT, () => console.log(`Local host running on ${PORT}`));
