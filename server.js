import env from "dotenv";
import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/users.js";
import { authRoutes } from "./routes/auth.js";
import { connectDB } from "./config/db.js";
//import { errorHandler } from "./middleware/error.js";
import { resetPasswordRoutes } from "./routes/passwordReset.js";
import { dashboardHomeRouter } from "./routes/dashboardHome.js";
env.config();

const app = express();
//middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
console.log(PORT);
const MONGO_URL = process.env.MONGO_URL;

//Connection DB
connectDB();

//Routes

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/password-reset", resetPasswordRoutes);
app.use("/api/pinterest", dashboardHomeRouter);

//Error Handler Should be the last piece of  middleware
//app.use(errorHandler);

app.get("/", (req, res) => {
  res.send(
    "Hi There, this is the Backend service for Pinterest Clone Project 💐💐💐"
  );
});

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
