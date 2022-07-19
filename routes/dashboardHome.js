import express from "express";
const router = express.Router();
import { dashBoardHome } from "../models/dashboardHome.js";
import { dbHomeDatacrud } from "./../controllers/dbHome.js";

router.get("/dashboard-home", dbHomeDatacrud.getAllHome);

router.get("/dashboard-home/:id", dbHomeDatacrud.getHomeById);

router.post("/dashboard-home/createHome", dbHomeDatacrud.createHome);
router.put("/dashboard-home/:id", dbHomeDatacrud.updateHomeById);
router.delete("/dashboard-home/:id", dbHomeDatacrud.deleteHome);

// router.post("/dashboard-home", async (req, res) => {
//   try {
//     await dashBoardHome.insertMany(req.body);
//     res
//       .status(200)
//       .send({ message: "dashboard home data is inseted successfully" });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

export const dashboardHomeRouter = router;
