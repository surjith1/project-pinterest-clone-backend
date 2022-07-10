import express from "express";
const router = express.Router();
import { dashBoardHome } from "../models/dashboardHome.js";

router.get("/dashboard-home", async (req, res) => {
  try {
    const { data } = req.body;
    const getDetails = await dashBoardHome.find({ data });
    res.status(200).send(getDetails);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/dashboard-home", async (req, res) => {
  try {
    await dashBoardHome.insertMany(req.body);
    res
      .status(200)
      .send({ message: "dashboard home data is inseted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export const dashboardHomeRouter = router;
