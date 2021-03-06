import mongoose from "mongoose";

const dsHomeSchema = new mongoose.Schema(
  {
    image: { type: String },
    title: { type: String },
    summary: { type: String },
    logo: { type: String },
    logoName: { type: String },
    followSize: { type: String },
    followText: { type: String },
    saveText: { type: String },
    landingUrl: { type: String },
    comment: { type: String },
  },
  { timestamps: true }
);

export const dashBoardHome = mongoose.model("DashboardHome", dsHomeSchema);
